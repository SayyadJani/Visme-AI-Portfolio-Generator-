import Bull from 'bull';
import { execSync } from 'child_process';
import { prisma } from '@repo/database';
import type { DeployJobPayload } from '@repo/types';
import { logger } from '@repo/shared-utils';

const deployQueue = new Bull<DeployJobPayload>('deploy', process.env.REDIS_URL || 'redis://localhost:6379');

// Mock function for CDN upload
async function uploadToCDN(distPath: string, projectId: number | string): Promise<string> {
  // In a real app, you'd upload to S3/Firebase/Vercel etc.
  // For now, let's just return a mock URL
  return `https://${projectId}.portfolio-automation.test`;
}

deployQueue.process(async (job) => {
  const { deployId, diskPath, projectId } = job.data;
  try {
    // Update status to BUILDING
    await prisma.deployment.update({ 
      where: { id: deployId }, 
      data: { status: 'BUILDING' } 
    });

    // Run production build
    logger.info(`Building project ${projectId}`, undefined);
    
    // Note: In production, you'd want to use spawn and stream logs
    execSync('npm run build', { cwd: diskPath, timeout: 120_000 });

    // Upload dist/ to CDN
    const url = await uploadToCDN(`${diskPath}/dist`, projectId);

    // Mark as live
    await prisma.deployment.update({
      where: { id: deployId },
      data: { 
        status: 'LIVE', 
        url, 
        completedAt: new Date() 
      },
    });
    logger.info(`Deploy ${deployId} live at ${url}`, undefined);
  } catch (error) {
    logger.error(`Deployment ${deployId} failed:`, error);
    await prisma.deployment.update({
      where: { id: deployId },
      data: { 
        status: 'FAILED', 
        error: String(error), 
        completedAt: new Date() 
      },
    });
    throw error;
  }
});

export const deployQueueInstance = deployQueue;

export function startDeployWorker() {
  logger.info('Deploy worker initialized');
}
