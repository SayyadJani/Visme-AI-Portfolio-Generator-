import { RuntimePoolService } from './runtimePool.service';
import { logger } from '@repo/shared-utils';

const IDLE_TIMEOUT_MS  = parseInt(process.env.IDLE_TIMEOUT_MS  ?? '600000'); // 10 min
const CLEANUP_INTERVAL = 60_000; // check every 60 seconds

export class CleanupService {
  static start(): void {
    setInterval(async () => {
      try {
        // Sync lastActive from Redis (Server 1 writes it on every file save)
        await RuntimePoolService.syncLastActive();
        // Release any runtimes idle longer than IDLE_TIMEOUT_MS
        await RuntimePoolService.releaseIdle(IDLE_TIMEOUT_MS);
      } catch (err) {
        logger.error('Cleanup error', err, 'cleanup');
      }
    }, CLEANUP_INTERVAL);

    logger.info(
      `Cleanup service started — idle timeout: ${IDLE_TIMEOUT_MS / 1000}s`,
      undefined,
      'cleanup'
    );
  }
}
