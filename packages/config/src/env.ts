import { z } from 'zod';
 
// Server1 environment schema
export const server1EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_TTL: z.string().default('15m'),
  JWT_REFRESH_TTL: z.string().default('7d'),
  SERVER2_URL: z.string().url().default('http://localhost:3000'),
  SERVER2_INTERNAL_SECRET: z.string().min(16),
  CLAUDE_API_KEY: z.string().min(1),
  GEMINI_API_KEY: z.string().min(1).optional(),
  OLLAMA_URL: z.string().url().default('http://localhost:11434'),
  OLLAMA_MODEL: z.string().default('llama3.2'),
  CDN_BUCKET: z.string().min(1),
  CDN_REGION: z.string().default('us-east-1'),
  INSTANCES_PATH: z.string().default('/data/instances'),
  TEMPLATES_PATH: z.string().default('/data/templates'),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  ADMIN_API_KEY: z.string().min(8),
});
 
// Server2 environment schema
export const server2EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  REDIS_URL: z.string().min(1),
  SERVER2_INTERNAL_SECRET: z.string().min(16),
  INSTANCES_PATH: z.string().default('/data/instances'),
  RUNTIME_PORT_START: z.coerce.number().default(4001),
  RUNTIME_COUNT: z.coerce.number().default(10),
  IDLE_TIMEOUT_MS: z.coerce.number().default(600000),
  NGINX_CONF_PATH: z.string().default('/etc/nginx/conf.d/previews.conf'),
});
 
export type Server1Env = z.infer<typeof server1EnvSchema>;
export type Server2Env = z.infer<typeof server2EnvSchema>;
 
export function parseEnv<T>(schema: z.ZodSchema<T>): T {
  const result = schema.safeParse(process.env);
  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.error(result.error.flatten().fieldErrors);
    process.exit(1);
  }
  return result.data;
}
