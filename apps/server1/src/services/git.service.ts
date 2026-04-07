import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'
import { env } from '../config/env'

// Helper: run a shell command inside a specific directory
const exec = (cmd: string, cwd: string): string => {
  return execSync(cmd, { cwd, encoding: 'utf-8' }).toString().trim()
}

// Uses GITHUB_USER consistently — matches createRepo which posts to /user/repos
const authUrl = (repoName: string): string =>
  `https://x-access-token:${env.GITHUB_TOKEN}@github.com/${env.GITHUB_USER}/${repoName}.git`

// Automatically detects whether the source template uses 'main' or 'master'
export const getDefaultBranch = (localPath: string): string => {
  try {
    const result = exec('git branch -a', localPath)
    // 1. Check local active branch
    if (result.includes('* main')) return 'main'
    if (result.includes('* master')) return 'master'
    // 2. Check remote branches
    if (result.includes('remotes/origin/main')) return 'main'
    if (result.includes('remotes/origin/master')) return 'master'
    // 3. Check for any current branch name as fallback
    const currentBranch = exec('git branch --show-current', localPath)
    if (currentBranch) return currentBranch
    return 'main'
  } catch {
    return 'main'
  }
}

// ── Clone template & Push to NEW repo ─────────────────────────────────────
export const initializeWithTemplate = (
  sourceUrl:    string,
  newRepoName:  string,
  localPath:    string,
  patchCallback?: (path: string) => void
): void => {
  const newUrl = authUrl(newRepoName)
  
  // 1. Simple Clone
  console.log(`[Git] Cloning template...`)
  execSync(`git clone --depth 1 ${sourceUrl} "${localPath}"`, { stdio: 'ignore' })
  
  // 2. WIPE HISTORY: Remove original history to kill large files like portfolio.zip
  const gitDir = path.join(localPath, '.git')
  if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true })
      console.log(`[Git] Template history wiped for a clean start.`)
  }

  // 3. Patch
  if (patchCallback) {
    patchCallback(localPath)
  }

  // 4. Fresh Start
  console.log(`[Git] Initializing fresh repository...`)
  execSync(`git init`, { cwd: localPath })
  execSync(`git config user.email "${env.GIT_USER_EMAIL}"`, { cwd: localPath })
  execSync(`git config user.name "${env.GIT_USER_NAME}"`,   { cwd: localPath })
  
  execSync(`git add .`, { cwd: localPath })
  execSync(`git commit -m "Initial commit"`, { cwd: localPath })

  // 5. Connect and PUSH
  console.log(`[Git] Connecting to your GitHub account...`)
  execSync(`git remote add origin ${newUrl}`, { cwd: localPath })
  execSync(`git branch -M main`, { cwd: localPath })
  
  console.log(`[Git] Finalizing deployment code...`)
  execSync(`git push -u origin main`, { cwd: localPath })
  console.log(`[Git] Successfully pushed ${newRepoName} on branch main`)
}

// ── Clone EXISTING repo from your account ──────────────────────────────────
export const cloneRepo = (repoName: string, localPath: string): void => {
  const url = authUrl(repoName)
  execSync(`git clone ${url} "${localPath}"`)
  console.log(`[Git] Cloned ${repoName} to ${localPath}`)
}

// ── Pull latest from remote ───────────────────────────────────────────────
// Always pull before writing to avoid conflicts. Detect branch dynamically.
export const pullLatest = (localPath: string): void => {
  const branch = getDefaultBranch(localPath)
  try {
    exec(`git pull origin ${branch}`, localPath)
  } catch (err) {
    console.warn(`[Git] Pull failed for branch ${branch} (might be empty/new repo):`, err)
  }
}

// ── Commit and push data.json ─────────────────────────────────────────────
// Updated to handle multiple config files and dynamic branch names.
export const commitAndPush = (localPath: string, message: string): void => {
  const repoName = path.basename(localPath)

  // Configure git identity (required for commits to work)
  try {
    exec('git config user.email "bot@yourplatform.com"', localPath)
    exec('git config user.name "Portfolio Bot"', localPath)
  } catch { }

  // Stage ALL changes to ensure absolute consistency with Vercel
  try {
    exec('git add .', localPath)
    console.log('[Git] Staged all changes using add .')
  } catch (err) {
    console.error('[Git] Failed to stage changes:', err)
  }

  // Check if there's actually something staged
  try {
    exec('git diff --cached --exit-code', localPath)
    console.log('[Git] No changes to commit')
    return
  } catch {
    // staged changes exist → proceed
  }

  // Detect branch dynamically (master vs main)
  const branch = getDefaultBranch(localPath)

  // Commit
  try {
    exec(`git commit -m "${message}"`, localPath)
  } catch (err) {
    console.error('[Git] Commit failed:', err)
    return
  }

  // Push to the detected branch
  try {
    exec(`git push ${authUrl(repoName)} ${branch}`, localPath)
    console.log(`[Git] Successfully pushed changes to ${repoName} on branch ${branch}`)
  } catch (err) {
    console.error(`[Git] Push failed for ${repoName}:`, err)
  }
}

// ── Delete local clone ────────────────────────────────────────────────────
// Called when user deletes their project.
export const deleteLocalRepo = (localPath: string): void => {
  if (fs.existsSync(localPath)) {
      try {
        fs.rmSync(localPath, { recursive: true, force: true })
      } catch (err) {
        console.warn(`[Git] Failed to wipe local path ${localPath}:`, err)
      }
  }
}
