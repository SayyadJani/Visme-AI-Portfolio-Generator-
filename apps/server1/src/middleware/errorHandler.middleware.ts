import { Request, Response, NextFunction } from 'express';
import { AppError, sendError, logger } from '@repo/shared-utils';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.warn(err.message, { code: err.code, details: err.details });
    return sendError(res, err.statusCode, err.message, err.code, err.details);
  }

  // Handle JSON parsing errors (from express.json())
  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    logger.warn('JSON parsing failed', { error: err.message });
    return sendError(res, 400, 'Invalid JSON format', 'BAD_REQUEST');
  }

  // Handle Multer errors
  if (err.name === 'MulterError') {
    logger.warn('File upload error', { error: err.message });
    return sendError(res, 400, `File upload error: ${err.message}`, 'BAD_REQUEST');
  }

  logger.error('Unhandled error', err);
  return sendError(res, 500, 'Internal server error', 'INTERNAL_ERROR');
};
