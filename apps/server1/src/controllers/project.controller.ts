import { Request, Response, NextFunction } from 'express';
import {
  getTemplates,
  createProjectInstance,
  getFileTree,
  getFileContent,
  saveFileContent,
  getFullVfsCached,
  listUserProjects,
  listSnapshots,
  restoreSnapshot,
  createSnapshot,
} from '../services/project.service';
import { prisma } from '@repo/database';
import { sendSuccess, NotFoundError, ValidationError } from '@repo/shared-utils';
import { createProjectSchema, saveFileSchema, createSnapshotSchema } from '@repo/validation';

export class ProjectController {

  // GET /api/projects/templates
  static listTemplates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const templates = await getTemplates();
      sendSuccess(res, templates);
    } catch (err) { next(err); }
  };

  // POST /api/projects/create
  static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = createProjectSchema.safeParse(req.body);
      if (!parsed.success) return next(new ValidationError(parsed.error.flatten().fieldErrors));

      const { templateId, name } = parsed.data;
      const userId = Number(req.user!.userId); // Cast to number for Int-based ID

      const project = await createProjectInstance(userId, templateId, name);
      sendSuccess(res, project, 201);
    } catch (err) { next(err); }
  };

  // GET /api/projects/:id/files
  static getFileTree = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) return next(new ValidationError({ id: ['Invalid project ID'] }));

      const result = await getFileTree(projectId, Number(req.user!.userId));
      sendSuccess(res, result);
    } catch (err) { next(err); }
  };

  // GET /api/projects/:id/files/*
  static getFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) return next(new ValidationError({ id: ['Invalid project ID'] }));

      // Express wildcard puts the matched path in req.params[0]
      // e.g. /api/projects/101/files/src/App.jsx → req.params[0] = "src/App.jsx"
      const filePath = req.params[0];
      if (!filePath) return next(new ValidationError({ path: ['File path required'] }));

      const result = await getFileContent(projectId, Number(req.user!.userId), filePath);
      sendSuccess(res, result);
    } catch (err) { next(err); }
  };

  // PUT /api/projects/:id/files/*
  static saveFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) return next(new ValidationError({ id: ['Invalid project ID'] }));

      const filePath = req.params[0];
      if (!filePath) return next(new ValidationError({ path: ['File path required'] }));

      const parsed = saveFileSchema.safeParse(req.body);
      if (!parsed.success) return next(new ValidationError(parsed.error.flatten().fieldErrors));

      const result = await saveFileContent(projectId, Number(req.user!.userId), filePath, parsed.data.content);
      sendSuccess(res, result);
    } catch (err) { next(err); }
  };

  // GET /api/projects/:id/full-vfs
  static getFullVFS = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) return next(new ValidationError({ id: ['Invalid project ID'] }));

      const result = await getFullVfsCached(projectId, Number(req.user!.userId));
      sendSuccess(res, result);
    } catch (err) { next(err); }
  };

  // GET /api/projects
  static listProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await listUserProjects(Number(req.user!.userId));
      sendSuccess(res, projects);
    } catch (err) { next(err); }
  };

  // GET /api/projects/:id/snapshots
  static listSnapshots = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) return next(new ValidationError({ id: ['Invalid project ID'] }));

      const result = await listSnapshots(projectId, Number(req.user!.userId));
      sendSuccess(res, result);
    } catch (err) { next(err); }
  };

  // POST /api/projects/:id/snapshots
  static createManualSnapshot = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) return next(new ValidationError({ id: ['Invalid project ID'] }));

      const parsed = createSnapshotSchema.safeParse(req.body);
      if (!parsed.success) return next(new ValidationError(parsed.error.flatten().fieldErrors));

      const project = await prisma.project.findFirst({
        where: { id: projectId, userId: Number(req.user!.userId) }
      });
      if (!project) throw new NotFoundError('Project');

      await createSnapshot(projectId, project.diskPath, 'MANUAL', parsed.data.label ?? null);
      sendSuccess(res, { created: true }, 201);
    } catch (err) { next(err); }
  };

  // POST /api/projects/:id/snapshots/:snapshotId/restore
  static restore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = parseInt(req.params.id);
      const snapshotId = parseInt(req.params.snapshotId);
      if (isNaN(projectId) || isNaN(snapshotId)) {
        return next(new ValidationError({ id: ['Invalid ID'] }));
      }

      const result = await restoreSnapshot(projectId, Number(req.user!.userId), snapshotId);
      sendSuccess(res, result);
    } catch (err) { next(err); }
  };
}
