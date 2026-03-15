import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '@repo/shared-utils';

export const internalAuth = (req: Request, _res: Response, next: NextFunction) => {
  const secret = req.headers['x-internal-secret'];
  if (secret !== process.env.SERVER2_INTERNAL_SECRET) {
    return next(new UnauthorizedError('Invalid internal secret'));
  }
  next();
};
