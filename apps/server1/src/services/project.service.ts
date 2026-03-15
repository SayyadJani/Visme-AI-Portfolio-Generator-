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

const INSTANCES_ROOT = process.env.INSTANCES_PATH ?? '/data/instances';

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
    // installStatus removed
    previewUrl:   project.previewUrl,
    lastSavedAt:  project.lastSavedAt,
    lastOpenedAt: project.lastOpenedAt,
    createdAt:    project.createdAt,
    // diskPath intentionally excluded — never sent to client
  };
}

// ── HELPER: Build recursive file tree ─────────────────────────────────────────

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

  // folders first, then files, both alphabetically
  return nodes.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'dir' ? -1 : 1;
  });
}


// ════════════════════════════════════════════════════════════════════════════════
// 1. getTemplates()
// GET /api/projects/templates
// ════════════════════════════════════════════════════════════════════════════════

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
      techStack: true, domain: true, thumbUrl: true, isActive: true,
      gitRepoUrl: true, createdAt: true, updatedAt: true,
    },
  });

  await RedisService.setCachedTemplates(JSON.stringify(templates));
  logger.info(`${templates.length} templates cached in Redis`, undefined, 'project-service');
  return templates;
}


// ════════════════════════════════════════════════════════════════════════════════
// 2. createProjectInstance()
// POST /api/projects/create
// ════════════════════════════════════════════════════════════════════════════════
// CHANGED: removed pnpm install entirely.
// Now only does: INSERT row → git clone → delete .git → mark READY
// Total time: ~3–5 seconds (was ~15–20 seconds)
// npm install will happen in the runtime container on first preview start.

export async function createProjectInstance(
  userId:     number,
  templateId: string,
  name?:      string
): Promise<ProjectDTO> {

  // 1. Load template — verify it exists and is active
  const template = await prisma.template.findUnique({ where: { id: templateId } });
  if (!template || !template.isActive) {
    throw new NotFoundError('Template');
  }

  // 2. Insert project row — get back the auto-incremented ID
  //    Status starts at CREATING so UI can show loading state
  //    No installStatus field anymore
  const project = await prisma.project.create({
    data: {
      userId,
      templateId,
      name:     name ?? template.name,
      diskPath: '',          // placeholder — filled after we know the id
      status:   'CREATING',
      // installStatus intentionally not set — field removed from model
    },
  });

  // 3. Build disk path now that we have the project id
  const diskPath = path.join(INSTANCES_ROOT, String(userId), String(project.id));

  // 4. Update diskPath in DB
  await prisma.project.update({
    where: { id: project.id },
    data:  { diskPath },
  });

  // 5. Create instance folder on disk
  if (!fs.existsSync(diskPath)) {
    fs.mkdirSync(diskPath, { recursive: true });
  }
  logger.info(`Created instance folder: ${diskPath}`, undefined, 'project-service');

  try {
    // 6. Git clone the template repo
    //    --depth 1        = shallow clone, only latest commit (fast, lightweight)
    //    --single-branch  = only default branch
    //    node_modules is NOT in the repo, so clone is small (just source files)
    logger.info(`Cloning ${template.gitRepoUrl}`, undefined, 'project-service');
    execSync(
      `git clone --depth 1 --single-branch "${template.gitRepoUrl}" "${diskPath}"`,
      {
        timeout: 60_000,   // 60s max for slow connections
        stdio:   'pipe',   // suppress git output from server logs
      }
    );

    // 7. Delete the .git folder
    //    The instance is plain files from this point — not a git repo.
    //    Deleting .git prevents Vite from seeing git internals and prevents
    //    the user's edits appearing as uncommitted changes to your template.
    const gitDir = path.join(diskPath, '.git');
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true });
    }

    // 8. Mark project as READY
    //    node_modules does NOT exist yet — that is intentional.
    //    The runtime container (Server 2) will run npm install
    //    the first time the user clicks Preview.
    const ready = await prisma.project.update({
      where: { id: project.id },
      data:  { status: 'READY' },
    });

    logger.info(
      `Project ${project.id} READY — no node_modules yet, container will install on first preview`,
      undefined,
      'project-service'
    );

    return toProjectDTO(ready);

  } catch (err: any) {
    const errorMsg = err.stderr?.toString() || err.message;
    logger.error(`Failed to create project ${project.id}. Git Error: ${errorMsg}`, err, 'project-service');

    // Mark as ERROR — do NOT delete the folder (may help debugging)
    await prisma.project.update({
      where: { id: project.id },
      data:  { status: 'ERROR' },
    }).catch(() => {});

    throw new AppError(500, 'Failed to set up project. Please try again.', 'SETUP_FAILED');
  }
}


// ════════════════════════════════════════════════════════════════════════════════
// 3. getFileTree()
// GET /api/projects/:id/files
// ════════════════════════════════════════════════════════════════════════════════

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
  if (!fs.existsSync(project.diskPath)) {
    throw new AppError(500, 'Project files not found on disk', 'DISK_MISSING');
  }

  const tree = buildFileTree(project.diskPath, project.diskPath);

  // Update lastOpenedAt — fire and forget
  prisma.project.update({
    where: { id: projectId },
    data:  { lastOpenedAt: new Date() },
  }).catch(() => {});

  return { projectId, tree };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3.5 getFullVfsCached()
// GET /api/projects/:id/full-vfs
// ─────────────────────────────────────────────────────────────────────────────

export async function getFullVfsCached(
  projectId: number,
  userId:    number
): Promise<VfsResponse> {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });
  if (!project) throw new NotFoundError('Project');

  // 1. Try Redis cache
  const cached = await RedisService.getCachedFiles(projectId);
  if (cached) {
    logger.info(`Project ${projectId} VFS served from Redis`, undefined, 'project-service');
    return { projectId, files: JSON.parse(cached) };
  }

  // 2. Fallback to Disk read
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

  // 3. Save to Redis
  await RedisService.setCachedFiles(projectId, JSON.stringify(files));
  logger.info(`Project ${projectId} VFS cached in Redis`, undefined, 'project-service');

  return { projectId, files };
}


// ════════════════════════════════════════════════════════════════════════════════
// 4. getFileContent()
// GET /api/projects/:id/files/*
// ════════════════════════════════════════════════════════════════════════════════

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

  const fullPath = assertSafePath(project.diskPath, filePath);

  if (!fs.existsSync(fullPath)) throw new NotFoundError(`File ${filePath}`);

  const stat = fs.statSync(fullPath);
  if (!stat.isFile()) throw new AppError(400, 'Requested path is a directory', 'NOT_A_FILE');

  const content = fs.readFileSync(fullPath, 'utf-8');
  return { projectId, filePath, content };
}


// ════════════════════════════════════════════════════════════════════════════════
// 5. saveFileContent()
// PUT /api/projects/:id/files/*
// ════════════════════════════════════════════════════════════════════════════════

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

  const fullPath = assertSafePath(project.diskPath, filePath);

  // Ensure parent dirs exist (handles new files in new subfolders)
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  // THE SAVE — synchronous disk write, Vite chokidar detects this immediately
  fs.writeFileSync(fullPath, content, 'utf-8');

  // Fire-and-forget side effects
  prisma.project.update({
    where: { id: projectId },
    data:  { lastSavedAt: new Date() },
  }).catch(() => {});

  RedisService.touchProjectActivity(projectId).catch(() => {});

  maybeCreateAutoSnapshot(projectId, project.diskPath).catch(() => {});

  // 4. Invalidate Redis VFS Cache
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
        const relPath  = path.relative(diskPath, fullPath);
        if (entry.isDirectory()) {
          if (!SKIP_DIRS.has(entry.name)) walk(fullPath);
        } else {
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
      // filesJson intentionally excluded from list
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

  // Safety: Create PRERESTORE snapshot of current state
  await createSnapshot(projectId, project.diskPath, 'PRERESTORE', `Before restoring snapshot ${snapshotId}`);

  const files = snapshot.filesJson as Record<string, string>;
  let count = 0;

  for (const [relPath, content] of Object.entries(files)) {
    const fullPath = path.resolve(project.diskPath, relPath);
    // Safety check
    if (!fullPath.startsWith(project.diskPath + path.sep) && fullPath !== project.diskPath) continue;

    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf-8');
    count++;
  }

  logger.info(`Restored snapshot ${snapshotId} for project ${projectId}`, undefined, 'project-service');
  return { restored: true, filesRestored: count };
}


// ════════════════════════════════════════════════════════════════════════════════
// 6. listUserProjects()
// GET /api/projects
// ════════════════════════════════════════════════════════════════════════════════

export async function listUserProjects(userId: number): Promise<ProjectDTO[]> {
  const projects = await prisma.project.findMany({
    where:   { userId },
    orderBy: { lastOpenedAt: { sort: 'desc', nulls: 'last' } },
  });
  return projects.map(toProjectDTO);
}
