import { Request, Response, NextFunction } from 'express';
import { AIService } from '../services/ai.service';
import { sendSuccess } from '@repo/shared-utils';

export class AIController {
  /**
   * POST /api/ai/merge-resume
   * Body: { currentData: object, resumeData: object }
   * Returns: { updatedData: object }
   */
  static async mergeResume(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentData, resumeData } = req.body;

      if (!currentData || typeof currentData !== 'object') {
        return res.status(400).json({
          success: false,
          error: { message: 'currentData (portfolio template data) is required', code: 'BAD_REQUEST' }
        });
      }

      if (!resumeData || typeof resumeData !== 'object') {
        return res.status(400).json({
          success: false,
          error: { message: 'resumeData (parsed resume) is required', code: 'BAD_REQUEST' }
        });
      }

      const updatedData = await AIService.mergeResumeIntoPortfolioData(currentData, resumeData);
      return sendSuccess(res, { updatedData });
    } catch (error: any) {
      next(error);
    }
  }
}
