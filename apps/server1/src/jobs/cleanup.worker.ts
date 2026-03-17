import * as fs from 'fs';
import * as path from 'path';
import { prisma } from '@repo/database';
import { logger } from '@repo/shared-utils';

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
const CLEANUP_INTERVAL = 60 * 60 * 1000; // Check every hour

export function startDiskCleanupWorker() {
  setInterval(async () => {
    try {
      logger.info('Running routine disk clearance for inactive projects...', undefined, 'disk-cleanup');

      const cutoffTime = new Date(Date.now() - TWENTY_FOUR_HOURS);

      // Find projects where lastOpenedAt and lastSavedAt are older than 24h
      // Oh wait, prisma might not let me query both cleanly if one is null, 
      // but usually they are both set. 
      const idleProjects = await prisma.project.findMany({
        where: {
          OR: [
            { lastSavedAt: { lt: cutoffTime } },
            { lastSavedAt: null }
          ],
          AND: [
            {
              OR: [
                { lastOpenedAt: { lt: cutoffTime } },
                { lastOpenedAt: null }
              ]
            }
          ]
        }
      });

      let removedCount = 0;

      for (const project of idleProjects) {
        if (project.diskPath && fs.existsSync(project.diskPath)) {
          // Check if it's really older than 24 hours from BOTH last saved and last opened
          const savedAt = project.lastSavedAt ? project.lastSavedAt.getTime() : 0;
          const openedAt = project.lastOpenedAt ? project.lastOpenedAt.getTime() : 0;
          const latestActivity = Math.max(savedAt, openedAt);

          if (Date.now() - latestActivity > TWENTY_FOUR_HOURS) {
            try {
              // Physically wipe the directory to save space
              fs.rmSync(project.diskPath, { recursive: true, force: true });
              removedCount++;
              
              // We also mark it as SLEEPING in the database to indicate it was hibernated
              await prisma.project.update({
                where: { id: project.id },
                data: { status: 'SLEEPING' }
              });
              
            } catch (err) {
              logger.error(`Failed to wipe disk path ${project.diskPath} for project ${project.id}`, err, 'disk-cleanup');
            }
          }
        }
      }

      if (removedCount > 0) {
        logger.info(`Cleaned up ${removedCount} inactive project directories to free up disk space.`, undefined, 'disk-cleanup');
      }

    } catch (err) {
      logger.error('Error during routine disk cleanup task', err, 'disk-cleanup');
    }
  }, CLEANUP_INTERVAL);
  
  logger.info('Disk cleanup worker started - will hibernate projects inactive for >24h', undefined, 'disk-cleanup');
}
