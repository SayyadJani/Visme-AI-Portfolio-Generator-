import axios from 'axios';
import * as fs from 'fs';
import { RedisService } from './redis.service';
import { prisma } from '@repo/database';
import { NotFoundError, ForbiddenError, AppError, logger } from '@repo/shared-utils';
import type { AssignRuntimeResponse } from '@repo/types';

const STARTUP_TIMEOUT_MS = 300_000;

export class PreviewService {
  private static server2Url = process.env.SERVER2_URL || 'http://localhost:3002';
  private static secret = process.env.SERVER2_INTERNAL_SECRET || 'secret';
  private static runtimeHost = process.env.RUNTIME_PUBLIC_HOST || '127.0.0.1';

  static async startPreview(projectId: number, userId: number): Promise<AssignRuntimeResponse> {
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundError('Project');
    if (project.userId !== userId) throw new ForbiddenError();

    // Ask Server 2 to assign a runtime
    try {
      const response = await axios.post<AssignRuntimeResponse>(
        `${this.server2Url}/api/assign`,
        { 
          projectId, 
          userId, 
          instancePath: project.diskPath 
        },
        { 
          headers: { 'x-internal-secret': this.secret },
          timeout: STARTUP_TIMEOUT_MS
        }
      );

      // server2 uses sendSuccess wrapper: { success: true, data: { port, runtimeId, ... } }
      const runtimeData = (response.data as any).data;
      
      // Cache in Redis
      await RedisService.setPreviewPort(projectId, runtimeData.port);
      await RedisService.touchRuntime(projectId);

      return {
        ...runtimeData,
        previewUrl: `http://${this.runtimeHost}:${runtimeData.port}`
      };
    } catch (error: any) {
      const server2Error = error.response?.data?.message || error.message;
      const fullError = {
        message: server2Error,
        status:  error.response?.status,
        data:    error.response?.data,
        config:  {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data
        }
      };
      logger.error('Failed to communicate with Server 2:', fullError);
      
      // Also write to a file I can read
      fs.appendFileSync('preview_error.log', `[${new Date().toISOString()}] ${JSON.stringify(fullError)}\n`);

      throw new AppError(500, `Preview runtime assignment failed: ${server2Error}`, 'RUNTIME_START_FAILED');
    }
  }

  static async stopPreview(projectId: number, userId: number): Promise<void> {
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundError('Project');
    if (project.userId !== userId) throw new ForbiddenError();

    try {
      await axios.post(
        `${this.server2Url}/api/release`,
        { projectId },
        { headers: { 'x-internal-secret': this.secret } }
      );
    } catch (error) {
      logger.warn(`Failed to release runtime for project ${projectId} on Server 2`);
    }

    await RedisService.clearPreview(projectId);
  }

  static async getStatus(projectId: string | number): Promise<{ isActive: boolean; port: number | null; previewUrl: string | null }> {
    const port = await RedisService.getPreviewPort(String(projectId));
    return {
      isActive: !!port,
      port,
      previewUrl: port ? `http://${this.runtimeHost}:${port}` : null
    };
  }
}
