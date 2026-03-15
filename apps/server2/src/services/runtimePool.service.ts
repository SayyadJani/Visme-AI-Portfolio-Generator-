import type { RuntimeEntry, AssignRuntimeRequest, AssignRuntimeResponse } from '@repo/types';
import { logger } from '@repo/shared-utils';
import { RuntimeAgentService } from './runtimeAgent.service';
import { RedisService } from './redis.service';
import { NginxService } from './nginx.service';

// Build the pool from env config
const RUNTIME_COUNT = parseInt(process.env.RUNTIME_COUNT ?? '10');
const PORT_START    = parseInt(process.env.RUNTIME_PORT_START ?? '4001');

// THE MAP — this is the entire state of Server 2
const runtimePool = new Map<string, RuntimeEntry>();

// Wait queue for when all runtimes are busy
const waitQueue: Array<{
  request: AssignRuntimeRequest;
  resolve: (result: AssignRuntimeResponse) => void;
  reject:  (err: Error) => void;
}> = [];

// Initialise pool entries
for (let i = 0; i < RUNTIME_COUNT; i++) {
  runtimePool.set(`runtime-${i + 1}`, {
    status: 'free',
    port: PORT_START + i,
    projectId: null,
    pid: null,
    lastActive: null,
  });
}

export class RuntimePoolService {

  static async assign(req: AssignRuntimeRequest): Promise<AssignRuntimeResponse> {
    // Check if project already has a runtime (reconnect case)
    for (const [runtimeId, rt] of runtimePool) {
      if (rt.status === 'busy' && rt.projectId === req.projectId) {
        logger.info(`Project ${req.projectId} reconnected to ${runtimeId}`);
        rt.lastActive = Date.now(); // Refresh activity
        return {
          previewUrl: `http://127.0.0.1:${rt.port}`,
          port: rt.port,
          runtimeId,
        };
      }
    }

    // Find first free runtime
    const runtimeId = this.findFree();

    if (!runtimeId) {
      // All busy — queue the request
      logger.warn(`All runtimes busy, queuing project ${req.projectId}`);
      return new Promise((resolve, reject) => {
        waitQueue.push({ request: req, resolve, reject });
      });
    }

    return this.doAssign(runtimeId, req);
  }

  private static async doAssign(
    runtimeId: string,
    req: AssignRuntimeRequest
  ): Promise<AssignRuntimeResponse> {
    const rt = runtimePool.get(runtimeId)!;

    // Mark busy IMMEDIATELY before any async work — prevents race conditions
    rt.status     = 'busy';
    rt.projectId  = Number(req.projectId);
    rt.lastActive = Date.now();

    try {
      // Spawn Vite dev server
      const pid = await RuntimeAgentService.spawn(req.instancePath, rt.port);
      rt.pid = pid;

      // Write to Redis so Server 1 can read it
      await RedisService.setPreviewPort(String(req.projectId), rt.port);
      await RedisService.touchRuntime(String(req.projectId));

      // Add Nginx route
      await NginxService.addPreviewRoute(String(req.projectId), rt.port);

      logger.info(`Assigned ${runtimeId} (port ${rt.port}) to project ${req.projectId}`);

      return {
        previewUrl: `http://127.0.0.1:${rt.port}`,
        port: rt.port,
        runtimeId,
      };
    } catch (err) {
      // Undo the busy assignment if startup failed
      rt.status     = 'free';
      rt.projectId  = null;
      rt.pid        = null;
      rt.lastActive = null;
      throw err;
    }
  }

  static async release(projectId: string | number): Promise<void> {
    for (const [runtimeId, rt] of runtimePool) {
      if (rt.projectId !== null && String(rt.projectId) === String(projectId)) {
        await this.doRelease(runtimeId, rt);
        return;
      }
    }
  }

  private static async doRelease(runtimeId: string, rt: RuntimeEntry): Promise<void> {
    const projectId = rt.projectId!;
    logger.info(`Releasing ${runtimeId} (was serving project ${projectId})`);

    // Kill Vite process
    if (rt.pid) {
      try { 
        process.kill(rt.pid); 
      } catch (err) { 
        logger.warn(`Failed to kill process ${rt.pid} for project ${projectId}. It might have already exited.`);
      }
    }

    // Reset entry
    rt.status     = 'free';
    rt.projectId  = null;
    rt.pid        = null;
    rt.lastActive = null;

    // Clean Redis
    await RedisService.clearPreview(String(projectId));

    // Remove Nginx route
    await NginxService.removePreviewRoute(String(projectId));

    // Serve next queued request
    if (waitQueue.length > 0) {
      const next = waitQueue.shift()!;
      logger.info(`Draining queue — assigning ${runtimeId} to project ${next.request.projectId}`);
      this.doAssign(runtimeId, next.request)
        .then(next.resolve)
        .catch(next.reject);
    }
  }

  private static findFree(): string | null {
    for (const [id, rt] of runtimePool) {
      if (rt.status === 'free') return id;
    }
    return null;
  }

  static getPoolStatus(): Record<string, RuntimeEntry> {
    return Object.fromEntries(runtimePool);
  }

  // Called by cleanup service
  static async releaseIdle(maxIdleMs: number): Promise<void> {
    const now = Date.now();
    for (const [runtimeId, rt] of runtimePool) {
      if (
        rt.status === 'busy' &&
        rt.lastActive !== null &&
        now - rt.lastActive > maxIdleMs
      ) {
        logger.info(`Auto-releasing idle runtime ${runtimeId} (Project ${rt.projectId})`);
        await this.doRelease(runtimeId, rt);
      }
    }
  }

  // Called by cleanup: sync lastActive from Redis
  static async syncLastActive(): Promise<void> {
    for (const [, rt] of runtimePool) {
      if (rt.status === 'busy' && rt.projectId !== null) {
        const ts = await RedisService.getLastActive(String(rt.projectId));
        if (ts) rt.lastActive = ts;
      }
    }
  }
}
