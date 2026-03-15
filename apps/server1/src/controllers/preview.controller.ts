import { Request, Response, NextFunction } from 'express';
import { PreviewService } from '../services/preview.service';
import { sendSuccess } from '@repo/shared-utils';

export class PreviewController {
  static async start(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;
      const { userId } = req.user!;

      const result = await PreviewService.startPreview(Number(projectId), Number(userId));
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }

  static async stop(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;
      const { userId } = req.user!;

      await PreviewService.stopPreview(Number(projectId), Number(userId));
      return sendSuccess(res, { success: true });
    } catch (error) {
      next(error);
    }
  }

  static async getStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;
      const result = await PreviewService.getStatus(projectId);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }
}
