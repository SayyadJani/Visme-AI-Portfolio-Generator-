import fs from 'fs'
import path from 'path'
import { sleep, sanitizeRepoName } from '@repo/shared-utils'
import { prisma } from '@repo/database'
import { IPortfolioData } from '@repo/types'
import { createRepo, deleteRepo } from './github.service'
import { deployToVercel, waitForDeployment } from './vercel.service'
import { initializeWithTemplate, pullLatest, commitAndPush, getDefaultBranch } from './git.service'
import { env } from '../config/env'
import { patchTemplateForVercel } from './patcher.service'

// Per-project write lock: prevents concurrent writes corrupting data.json
const writeLocks = new Map<string, boolean>()

const acquireLock = async (projectId: string): Promise<void> => {
  while (writeLocks.get(projectId)) {
    await sleep(100)
  }
  writeLocks.set(projectId, true)
}

const releaseLock = (projectId: string): void => {
  writeLocks.delete(projectId)
}

function findDataJson(localPath: string): string {
    const candidates = ['data.json', 'data/data.json', 'public/data.json', 'content/data.json', 'src/data.json'];
    for (const c of candidates) {
        const full = path.join(localPath, c);
        if (fs.existsSync(full)) return full;
    }

    // Deep search fallback
    const findRecursive = (dir: string): string | null => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const res = path.resolve(dir, entry.name);
            if (entry.isDirectory() && entry.name !== '.git' && entry.name !== 'node_modules') {
                const found = findRecursive(res);
                if (found) return found;
            } else if (entry.name === 'data.json') {
                return res;
            }
        }
        return null;
    };

    const found = findRecursive(localPath);
    if (found) return found;

    throw new Error('Could not locate data.json in this project structure.');
}

// ── CREATE PROJECT ────────────────────────────────────────────────────────
export const createProject = async (
  userId: string,
  templateId: string,
  projectName: string,
): Promise<any> => {

  let repoName = '';
  let localPath = '';
  let repoCreated = false;
  let pushSucceeded = false;

  try {
    const template = await prisma.template.findUnique({ where: { id: templateId } })
    if (!template) throw new Error('Template not found')

    const sourceUrl = template.gitRepoUrl;
    if (!sourceUrl || !sourceUrl.startsWith('http')) {
      throw new Error(`Template "${template.name}" has no valid gitRepoUrl.`)
    }

    repoName = sanitizeRepoName(`portfolio-${userId.slice(-6)}-${Date.now().toString(36)}`)
    localPath = path.join(env.PROJECTS_BASE_PATH, repoName)

    const repoResult = await createRepo(repoName)
    repoCreated = true

    await sleep(2000)

    // 1. Initial Push
    initializeWithTemplate(sourceUrl, repoName, localPath, patchTemplateForVercel)
    pushSucceeded = true

    // 2. Detect the builder branch (main vs master)
    const branch = getDefaultBranch(localPath)

    // 3. GitHub Propagation
    console.log(`[ProjectService] Code pushed. Waiting 15s for GitHub propagation...`)
    await sleep(15000)

    // 4. Deploy to Vercel (using numeric repoId)
    console.log(`[ProjectService] Triggering Vercel deployment...`)
    const deployResult = await deployToVercel(repoName, repoName, repoResult.repoId, branch)
    const liveUrl = await waitForDeployment(deployResult.deploymentId)

    const project = await prisma.project.create({
      data: {
        userId,
        templateId,
        projectName,
        repoName,
        repoUrl: repoResult.repoUrl,
        liveUrl,
        localPath,
        status: 'READY',
        lastUpdated: new Date(),
      }
    })

    // Record History
    await prisma.projectUpdate.create({
      data: {
        projectId: project.id,
        userId,
        message: `Initial Creation: Synchronized with ${projectName} blueprint`
      }
    })

    return project

  } catch (err: any) {
    console.error(`[Project] ❌ FAILED: ${err.message}`)

    // Only delete repo ONLY if we hadn't pushed code yet (don't delete if Vercel failed after push)
    if (repoCreated && !pushSucceeded) {
        await deleteRepo(repoName).catch(e => 
            console.warn(`[GitHub] Cleanup failed (non-critical): ${e.message}`)
        )
    }

    if (localPath && fs.existsSync(localPath)) {
      fs.rmSync(localPath, { recursive: true, force: true })
    }
    throw err
  }
}

// ── READ PORTFOLIO DATA ───────────────────────────────────────────────────
export const getPortfolioData = async (
  projectId: string,
  userId: string,
): Promise<IPortfolioData> => {
  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (!project || project.userId !== userId) throw new Error('Unauthorized or not found')

  // If localPath was wiped (server restart/redeploy), re-clone from GitHub
  if (!project.localPath || !fs.existsSync(project.localPath)) {
    console.log(`[ProjectService] localPath missing, re-cloning ${project.repoName}`)
    const localPath = path.join(env.PROJECTS_BASE_PATH, project.repoName)
    const repoUrl = `https://${env.GITHUB_TOKEN}@github.com/${env.GITHUB_USER}/${project.repoName}.git`

    fs.mkdirSync(localPath, { recursive: true })
    initializeWithTemplate(repoUrl, project.repoName, localPath, patchTemplateForVercel)

    await prisma.project.update({ where: { id: projectId }, data: { localPath } })

    // Refresh the project object with the new localPath
    const updated = await prisma.project.findUnique({ where: { id: projectId } })
    if (!updated) throw new Error('Project not found after re-clone')

    const dataFilePath = findDataJson(updated.localPath)
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')) as IPortfolioData
  }

  const dataFilePath = findDataJson(project.localPath)
  const raw = fs.readFileSync(dataFilePath, 'utf-8')
  return JSON.parse(raw) as IPortfolioData
}

// ── UPDATE PORTFOLIO DATA ─────────────────────────────────────────────────
export const updatePortfolioData = async (
  projectId: string,
  userId: string,
  newData: Partial<IPortfolioData>,
): Promise<void> => {

  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (!project || project.userId !== userId) throw new Error('Unauthorized or not found')

  await acquireLock(projectId)

  try {
    // Self-Healing: If localPath was wiped, re-clone before update
    if (!project.localPath || !fs.existsSync(project.localPath)) {
      console.log(`[ProjectService] localPath missing during update, re-cloning ${project.repoName}`)
      const newLocalPath = path.join(env.PROJECTS_BASE_PATH, project.repoName)
      const repoUrl = `https://${env.GITHUB_TOKEN}@github.com/${env.GITHUB_USER}/${project.repoName}.git`

      if (!fs.existsSync(newLocalPath)) fs.mkdirSync(newLocalPath, { recursive: true })
      initializeWithTemplate(repoUrl, project.repoName, newLocalPath, patchTemplateForVercel)

      await prisma.project.update({ where: { id: projectId }, data: { localPath: newLocalPath } })
      project.localPath = newLocalPath // update local object
    }

    pullLatest(project.localPath)

    const dataFilePath = findDataJson(project.localPath)
    const currentRaw = fs.readFileSync(dataFilePath, 'utf-8')
    const currentData = JSON.parse(currentRaw) as IPortfolioData

    const mergedData: IPortfolioData = { ...currentData, ...newData }
    fs.writeFileSync(dataFilePath, JSON.stringify(mergedData, null, 2), 'utf-8')

    // Ensure iframe-allow headers are in vercel.json (idempotent)
    patchTemplateForVercel(project.localPath)

    commitAndPush(project.localPath, 'Update portfolio data')

    await prisma.project.update({
      where: { id: projectId },
      data: { lastUpdated: new Date() }
    })

    await prisma.projectUpdate.create({
      data: {
        projectId,
        userId,
        message: `Update: ${Object.keys(newData).join(', ')}`
      }
    })

  } finally {
    releaseLock(projectId)
  }
}

// ── REPAIR PROJECT (fix iframe headers) ──────────────────────────────────
export const repairProject = async (
  projectId: string,
  userId: string,
): Promise<{ message: string }> => {
  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (!project || project.userId !== userId) throw new Error('Unauthorized or not found')

  // 1. Sync the latest deployment URL from Vercel (fixes 404s)
  try {
    const { getLatestDeploymentState } = require('./vercel.service');
    const latest = await getLatestDeploymentState(project.repoName);
    if (latest && latest.url) {
      await prisma.project.update({
        where: { id: projectId },
        data: { liveUrl: latest.url }
      });
      console.log(`[Repair] Updated liveUrl to: ${latest.url}`);
    }
  } catch (err) {
    console.warn(`[Repair] Could not sync latest Vercel URL:`, err);
  }

  if (!project.localPath || !fs.existsSync(project.localPath)) {
    throw new Error('Local repo not found. Please save the project first to re-clone it.')
  }

  await acquireLock(projectId)
  try {
    pullLatest(project.localPath)
    patchTemplateForVercel(project.localPath)
    commitAndPush(project.localPath, 'chore: allow iframe embedding for portfolio builder')
    return { message: 'URL synchronized and repair pushed to GitHub. Vercel will redeploy.' }
  } finally {
    releaseLock(projectId)
  }
}

// ── PUBLISH PROJECT ────────────────────────────────────────────────────────
export const publishProject = async (
  projectId: string,
  userId: string,
): Promise<any> => {
  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (!project || project.userId !== userId) throw new Error('Unauthorized or not found')
  return project
}

// ── RECENT UPDATES ────────────────────────────────────────────────────────
export const getRecentUpdates = async (
  userId: string,
): Promise<any[]> => {
  return await prisma.projectUpdate.findMany({
    where: { userId },
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      project: { select: { projectName: true, liveUrl: true } }
    }
  })
}

// ── GET PROXY PREVIEW ──────────────────────────────────────────────────────
export const getProxyPreview = async (
  projectId: string,
  userId: string,
): Promise<string> => {
  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (!project || project.userId !== userId) throw new Error('Unauthorized or not found')
  if (!project.liveUrl) throw new Error('Project has no live deployment yet')

  try {
    const axios = require('axios');
    let target = project.liveUrl;
    if (!target.startsWith('http')) target = `https://${target}`;

    console.log(`[Proxy] Fetching preview from: ${target}`);
    const response = await axios.get(target);
    let body = response.data;

    if (typeof body === 'string') {
      const baseUrl = new URL(target).origin;
      body = body.replace('<head>', `<head><base href="${baseUrl}/">`);
    }

    return body;
  } catch (err: any) {
    throw new Error(`Failed to proxy preview: ${err.message}`)
  }
}

// ── DELETE PROJECT ────────────────────────────────────────────────────────
export const deleteProject = async (
  projectId: string,
  userId: string,
): Promise<void> => {
  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (!project || project.userId !== userId) throw new Error('Unauthorized or not found')

  await deleteRepo(project.repoName)
  if (fs.existsSync(project.localPath)) fs.rmSync(project.localPath, { recursive: true, force: true })
  await prisma.project.delete({ where: { id: projectId } })
}
