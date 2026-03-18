import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { parseEnv, server2EnvSchema } from '@repo/config';
import { logger } from '@repo/shared-utils';
import { internalRoutes } from './routes/internal.routes';
import { CleanupService } from './services/cleanup.service';

// Parse and validate environment variables
const env = parseEnv(server2EnvSchema);
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// All routes require internal secret
app.use('/api', internalRoutes);

// Health check (no auth — for load balancer)
app.get('/health', (_, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'server2' 
  });
});

// Start idle cleanup loop
CleanupService.start();

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error in Server 2', err, 'server2');
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = env.PORT || 3002;

app.listen(PORT, () => {
  logger.info(`🚀 Server 2 (Runtime Agent) is running on port ${PORT}`, undefined, 'server2');
  logger.info(`🌍 Environment: ${env.NODE_ENV}`, undefined, 'server2');
});
