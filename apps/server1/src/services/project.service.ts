import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { prisma } from '@repo/database';
import type {
  TemplateDTO,
  ProjectDTO,
  FileNode,
  FileTreeResponse,
  FileContentResponse,
  SaveFileResponse,
  VfsResponse,
} from '@repo/types';
import { RedisService } from './redis.service';
import { NotFoundError, AppError } from '@repo/shared-utils';
import { logger } from '@repo/shared-utils';
import { checkDiskSpace } from '../utils/disk.util';

// Folders to skip when building file tree or taking snapshots
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  '.cache',
  '.turbo',
  'build',
  '.next',
]);

async function getUserWorkspacePath(userId: number): Promise<string> {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { workspacePath: true } });
  return user?.workspacePath ?? path.resolve(process.env.INSTANCES_PATH ?? 'data/instances');
}

// ── HELPER: Path traversal prevention ──────────────────────────────────────────
// Ensures the resolved file path stays inside the project's disk folder.
// Rejects attempts like "../../etc/passwd".

function assertSafePath(diskPath: string, filePath: string): string {
  const resolved = path.resolve(diskPath, filePath);
  if (!resolved.startsWith(diskPath + path.sep) && resolved !== diskPath) {
    throw new AppError(400, 'Invalid file path', 'INVALID_PATH');
  }
  return resolved;
}

// ── HELPER: Safe ProjectDTO — strips diskPath and installStatus ────────────────

function toProjectDTO(project: any): ProjectDTO {
  return {
    id:           project.id,
    name:         project.name,
    templateId:   project.templateId,
    status:       project.status,
    previewUrl:   project.previewUrl,
    lastSavedAt:  project.lastSavedAt,
    lastOpenedAt: project.lastOpenedAt,
    createdAt:    project.createdAt,
  };
}

// ── HELPER: Build recursive file tree ─────────────────────────────────────────

async function ensureProjectDiskState(project: any): Promise<void> {
  // If we're waking it up from sleeping, mark it ready
  if (project.status === 'SLEEPING') {
    await prisma.project.update({
      where: { id: project.id },
      data: { status: 'READY' }
    }).catch(() => {});
  }

  if (fs.existsSync(project.diskPath)) return;

  logger.info(`Disk path missing for project ${project.id}. Restoring from backup...`, undefined, 'project-service');
  fs.mkdirSync(project.diskPath, { recursive: true });

  const template = await prisma.template.findUnique({ where: { id: project.templateId } });
  if (template) {
    try {
      execSync(`git clone --depth 1 --single-branch "${template.gitRepoUrl}" "${project.diskPath}"`, { stdio: 'pipe' });
      const gitDir = path.join(project.diskPath, '.git');
      if (fs.existsSync(gitDir)) fs.rmSync(gitDir, { recursive: true, force: true });
    } catch (e) {
      logger.error(`Failed to clone template for recovery of project ${project.id}`);
    }
  }

  // Restore latest snapshot
  const latestSnapshot = await prisma.projectSnapshot.findFirst({
    where: { projectId: project.id },
    orderBy: { createdAt: 'desc' }
  });

  if (latestSnapshot && latestSnapshot.filesJson) {
    const files = latestSnapshot.filesJson as Record<string, string>;
    for (const [relPath, content] of Object.entries(files)) {
      const fullPath = path.resolve(project.diskPath, relPath);
      if (fullPath.startsWith(project.diskPath + path.sep) || fullPath === project.diskPath) {
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.writeFileSync(fullPath, content, 'utf-8');
      }
    }
    logger.info(`Restored snapshot ${latestSnapshot.id} for project ${project.id}`, undefined, 'project-service');
  } else {
    // Try redis
    const cached = await RedisService.getCachedFiles(project.id);
    if (cached) {
      const files = JSON.parse(cached) as Record<string, string>;
      for (const [relPath, content] of Object.entries(files)) {
        const fullPath = path.resolve(project.diskPath, relPath);
        if (fullPath.startsWith(project.diskPath + path.sep) || fullPath === project.diskPath) {
          fs.mkdirSync(path.dirname(fullPath), { recursive: true });
          fs.writeFileSync(fullPath, content as string, 'utf-8');
        }
      }
      logger.info(`Restored from Redis cache for project ${project.id}`, undefined, 'project-service');
    }
  }
}

function buildFileTree(dir: string, baseDir: string): FileNode[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const nodes: FileNode[] = [];

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    if (
      entry.name.startsWith('.') &&
      !['.gitignore', '.eslintrc', '.prettierrc', '.env.example'].includes(entry.name)
    ) continue;

    const fullPath    = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      nodes.push({
        name:     entry.name,
        path:     relativePath,
        type:     'dir',
        children: buildFileTree(fullPath, baseDir),
      });
    } else {
      nodes.push({ name: entry.name, path: relativePath, type: 'file' });
    }
  }

  return nodes.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'dir' ? -1 : 1;
  });
}

export async function getTemplates(): Promise<TemplateDTO[]> {
  const cached = await RedisService.getCachedTemplates();
  if (cached) {
    logger.info('Templates served from Redis cache', undefined, 'project-service');
    return JSON.parse(cached) as TemplateDTO[];
  }

  const templates = await prisma.template.findMany({
    where:   { isActive: true },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true, name: true, slug: true, description: true,
      techStack: true, domain: true, thumbUrl: true, previews: true, isActive: true,
      gitRepoUrl: true, createdAt: true, updatedAt: true,
    },
  });

  await RedisService.setCachedTemplates(JSON.stringify(templates));
  return templates;
}

export async function createProjectInstance(
  userId:     number,
  templateId: string,
  name?:      string
): Promise<ProjectDTO> {
  const template = await prisma.template.findUnique({ where: { id: templateId } });
  if (!template || !template.isActive) {
    throw new NotFoundError('Template');
  }

  const project = await prisma.project.create({
    data: {
      userId,
      templateId,
      name:     name ?? template.name,
      diskPath: '',          
      status:   'CREATING',
    },
  });

  const rootPath = await getUserWorkspacePath(userId);
  const diskPath = path.join(rootPath, String(userId), String(project.id));

  await prisma.project.update({
    where: { id: project.id },
    data:  { diskPath },
  });

  if (!fs.existsSync(diskPath)) {
    fs.mkdirSync(diskPath, { recursive: true });
  }

  try {
    execSync(
      `git clone --depth 1 --single-branch "${template.gitRepoUrl}" "${diskPath}"`,
      {
        timeout: 60_000,   
        stdio:   'pipe',   
      }
    );

    const gitDir = path.join(diskPath, '.git');
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true });
    }

    const ready = await prisma.project.update({
      where: { id: project.id },
      data:  { status: 'READY' },
    });

    return toProjectDTO(ready);

  } catch (err: any) {
    const errorMsg = err.stderr?.toString() || err.message;
    logger.error(`Failed to create project ${project.id}. Git Error: ${errorMsg}`, err, 'project-service');

    await prisma.project.update({
      where: { id: project.id },
      data:  { status: 'ERROR' },
    }).catch(() => {});

    throw new AppError(500, 'Failed to set up project. Please try again.', 'SETUP_FAILED');
  }
}

export async function getFileTree(
  projectId: number,
  userId:    number
): Promise<FileTreeResponse> {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });
  if (!project) throw new NotFoundError('Project');

  if (project.status === 'CREATING') {
    throw new AppError(409, 'Project is still being set up', 'PROJECT_NOT_READY');
  }
  if (project.status === 'ERROR') {
    throw new AppError(409, 'Project setup failed', 'PROJECT_ERROR');
  }

  await ensureProjectDiskState(project);

  if (!fs.existsSync(project.diskPath)) {
    throw new AppError(500, 'Project files could not be restored on disk', 'DISK_MISSING');
  }

  const tree = buildFileTree(project.diskPath, project.diskPath);
  prisma.project.update({
    where: { id: projectId },
    data:  { lastOpenedAt: new Date() },
  }).catch(() => {});

  return { projectId, tree };
}

export async function getFullVfsCached(
  projectId: number,
  userId:    number
): Promise<VfsResponse> {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });
  if (!project) throw new NotFoundError('Project');

  const cached = await RedisService.getCachedFiles(projectId);
  if (cached) {
    return { projectId, files: JSON.parse(cached) };
  }

  await ensureProjectDiskState(project);

  const files: Record<string, string> = {};
  const walk = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
         walk(fullPath);
      } else {
         const relPath = path.relative(project.diskPath, fullPath).replace(/\\/g, '/');
         files[relPath] = fs.readFileSync(fullPath, 'utf-8');
      }
    }
  };

  walk(project.diskPath);
  await RedisService.setCachedFiles(projectId, JSON.stringify(files));
  return { projectId, files };
}

export async function getFileContent(
  projectId: number,
  userId:    number,
  filePath:  string
): Promise<FileContentResponse> {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });
  if (!project) throw new NotFoundError('Project');

  if (project.status !== 'READY' && project.status !== 'SLEEPING') {
    throw new AppError(409, 'Project is not ready', 'PROJECT_NOT_READY');
  }

  await ensureProjectDiskState(project);
  const fullPath = assertSafePath(project.diskPath, filePath);
  if (!fs.existsSync(fullPath)) throw new NotFoundError(`File ${filePath}`);

  const stat = fs.statSync(fullPath);
  if (!stat.isFile()) throw new AppError(400, 'Requested path is a directory', 'NOT_A_FILE');

  const content = fs.readFileSync(fullPath, 'utf-8');
  return { projectId, filePath, content };
}

export async function saveFileContent(
  projectId: number,
  userId:    number,
  filePath:  string,
  content:   string
): Promise<SaveFileResponse> {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });
  if (!project) throw new NotFoundError('Project');

  if (project.status !== 'READY' && project.status !== 'SLEEPING') {
    throw new AppError(409, 'Project is not ready for editing', 'PROJECT_NOT_READY');
  }

  await ensureProjectDiskState(project);
  const fullPath = assertSafePath(project.diskPath, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf-8');

  prisma.project.update({
    where: { id: projectId },
    data:  { lastSavedAt: new Date() },
  }).catch(() => {});

  RedisService.touchProjectActivity(projectId).catch(() => {});
  maybeCreateAutoSnapshot(projectId, project.diskPath).catch(() => {});
  RedisService.invalidateFileCache(projectId).catch(() => {});

  return { saved: true, filePath };
}

async function maybeCreateAutoSnapshot(projectId: number, diskPath: string): Promise<void> {
  const last = await prisma.projectSnapshot.findFirst({
    where:   { projectId },
    orderBy: { createdAt: 'desc' },
  });
  const FIVE_MIN = 5 * 60 * 1000;
  if (!last || Date.now() - last.createdAt.getTime() > FIVE_MIN) {
    await createSnapshot(projectId, diskPath, 'AUTO', null);
  }
}

export async function createSnapshot(
  projectId: number,
  diskPath:  string,
  type:      'AUTO' | 'MANUAL' | 'PREDEPLOY' | 'PRERESTORE',
  label:     string | null
): Promise<void> {
  const filesJson: Record<string, string> = {};
  const srcDir = path.join(diskPath, 'src');
  if (fs.existsSync(srcDir)) {
    (function walk(dir: string) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (!SKIP_DIRS.has(entry.name)) walk(fullPath);
        } else {
          const relPath  = path.relative(diskPath, fullPath);
          filesJson[relPath] = fs.readFileSync(fullPath, 'utf-8');
        }
      }
    })(srcDir);
  }

  for (const f of ['index.html', 'vite.config.js', 'vite.config.ts', 'tailwind.config.js']) {
    const fp = path.join(diskPath, f);
    if (fs.existsSync(fp)) filesJson[f] = fs.readFileSync(fp, 'utf-8');
  }

  const jsonStr = JSON.stringify(filesJson);
  await prisma.projectSnapshot.create({
    data: {
      projectId, type, label,
      filesJson,
      fileCount: Object.keys(filesJson).length,
      sizeBytes: Buffer.byteLength(jsonStr, 'utf-8'),
    },
  });
}

export async function listSnapshots(projectId: number, userId: number): Promise<any[]> {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });
  if (!project) throw new NotFoundError('Project');

  return prisma.projectSnapshot.findMany({
    where:   { projectId },
    orderBy: { createdAt: 'desc' },
    select:  {
      id: true, type: true, label: true, fileCount: true, 
      sizeBytes: true, createdAt: true,
    },
  });
}

export async function restoreSnapshot(
  projectId: number,
  userId:    number,
  snapshotId: number
): Promise<{ restored: boolean; filesRestored: number }> {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });
  if (!project) throw new NotFoundError('Project');

  const snapshot = await prisma.projectSnapshot.findUnique({
    where: { id: snapshotId },
  });
  if (!snapshot || snapshot.projectId !== projectId) {
    throw new NotFoundError('Snapshot');
  }

  await createSnapshot(projectId, project.diskPath, 'PRERESTORE', `Before restoring snapshot ${snapshotId}`);

  const files = snapshot.filesJson as Record<string, string>;
  let count = 0;

  for (const [relPath, content] of Object.entries(files)) {
    const fullPath = path.resolve(project.diskPath, relPath);
    if (!fullPath.startsWith(project.diskPath + path.sep) && fullPath !== project.diskPath) continue;
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf-8');
    count++;
  }

  return { restored: true, filesRestored: count };
}

export async function listUserProjects(userId: number): Promise<ProjectDTO[]> {
  const projects = await prisma.project.findMany({
    where:   { userId },
    orderBy: { lastOpenedAt: { sort: 'desc', nulls: 'last' } },
  });
  return projects.map(toProjectDTO);
}

export async function deleteProject(projectId: number, userId: number): Promise<void> {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });
  if (!project) throw new NotFoundError('Project');

  await prisma.projectSnapshot.deleteMany({ where: { projectId } });
  
  // @ts-ignore
  await prisma.deployment?.deleteMany({ where: { projectId } });

  await prisma.project.delete({ where: { id: projectId } });

  if (project.diskPath && fs.existsSync(project.diskPath)) {
    try {
      fs.rmSync(project.diskPath, { recursive: true, force: true });
    } catch (err) {}
  }

  await RedisService.invalidateFileCache(projectId);
}

export async function getDiskStatus(userId?: number) {
  const rootPath = userId ? await getUserWorkspacePath(userId) : path.resolve(process.env.INSTANCES_PATH ?? 'data/instances');
  const status = await checkDiskSpace(rootPath);
  return {
    ...status,
    path: rootPath,
    isFull: status.free < 100 * 1024 * 1024, 
  };
}
