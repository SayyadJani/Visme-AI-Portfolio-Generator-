import { Request, Response, NextFunction } from 'express';
import { RuntimePoolService } from '../services/runtimePool.service';
import { sendSuccess } from '@repo/shared-utils';
import type { AssignRuntimeRequest } from '@repo/types';

export class RuntimeController {

  // POST /api/assign
  // Body: { projectId, userId, instancePath }
  static assign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as AssignRuntimeRequest;
      const result = await RuntimePoolService.assign(body);
      sendSuccess(res, result, 200);
    } catch (err) {
      next(err);
    }
  };

  // POST /api/release
  // Body: { projectId }
  static release = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.body as { projectId: string };
      await RuntimePoolService.release(projectId);
      sendSuccess(res, { released: true, projectId });
    } catch (err) {
      next(err);
    }
  };

  // GET /api/status?projectId=uuid
  static status = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = req.query.projectId as string;
      const pool = RuntimePoolService.getPoolStatus();
      const entry = Object.values(pool).find(rt => rt.projectId !== null && String(rt.projectId) === String(projectId));
      
      if (!entry) {
        sendSuccess(res, { isActive: false, port: null, previewUrl: null });
        return;
      }

      sendSuccess(res, {
        isActive: true,
        port: entry.port,
        previewUrl: `http://127.0.0.1:${entry.port}`,
      });
    } catch (err) {
      next(err);
    }
  };

  // GET /api/pool — monitoring endpoint
  static poolStatus = (_req: Request, res: Response) => {
    const pool = RuntimePoolService.getPoolStatus();
    const summary = {
      total:  Object.keys(pool).length,
      busy:   Object.values(pool).filter(rt => rt.status === 'busy').length,
      free:   Object.values(pool).filter(rt => rt.status === 'free').length,
      entries: pool,
    };
    sendSuccess(res, summary);
  };
}
