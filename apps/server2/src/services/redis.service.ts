import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

export class RedisService {
  static async setPreviewPort(projectId: string, port: number): Promise<void> {
    await redis.set(`preview:${projectId}:port`, port.toString(), 'EX', 3600);
  }

  static async getLastActive(projectId: string): Promise<number | null> {
    const val = await redis.get(`preview:${projectId}:active`);
    return val ? parseInt(val) : null;
  }

  static async touchRuntime(projectId: string): Promise<void> {
    await redis.set(`preview:${projectId}:active`, Date.now().toString(), 'EX', 3600);
  }

  static async clearPreview(projectId: string): Promise<void> {
    await redis.del(`preview:${projectId}:port`);
    await redis.del(`preview:${projectId}:active`);
  }
}
