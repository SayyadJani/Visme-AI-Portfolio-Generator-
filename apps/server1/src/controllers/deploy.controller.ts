import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import { sendSuccess, NotFoundError, ForbiddenError } from '@repo/shared-utils';
import { deployQueueInstance } from '../jobs/deploy.worker';

export class DeployController {
  /**
   * POST /api/deploy/:projectId
   * Trigger a build and deploy
   */
  static async deploy(req: Request, res: Response, next: NextFunction) {
    try {
      const projectId = Number(req.params.projectId);
      const userId = Number(req.user!.userId);

      const project = await prisma.project.findUnique({
        where: { id: projectId }
      });

      if (!project) throw new NotFoundError('Project');
      if (Number(project.userId) !== userId) throw new ForbiddenError();

      // 1. Create deployment record
      const deployment = await prisma.deployment.create({
        data: {
          projectId,
          userId,
          status: 'QUEUED'
        }
      });

      // 2. Add to queue
      await deployQueueInstance.add({
        deployId: deployment.id,
        projectId,
        userId,
        diskPath: project.diskPath
      });

      return sendSuccess(res, { 
        deployId: deployment.id, 
        status: deployment.status 
      }, 202);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/deploy/:deployId/status
   * Poll deployment status
   */
  static async getStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const deployId = Number(req.params.deployId);
      const userId = Number(req.user!.userId);

      const deployment = await prisma.deployment.findUnique({
        where: { id: deployId },
        select: {
          id: true,
          userId: true,
          status: true,
          url: true,
          error: true
        }
      });

      if (!deployment) throw new NotFoundError('Deployment');
      if (Number(deployment.userId) !== userId) throw new ForbiddenError();

      return sendSuccess(res, {
        status: deployment.status,
        url: deployment.url,
        error: deployment.error
      });
    } catch (error) {
      next(error);
    }
  }
}
