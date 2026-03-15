import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { registerSchema, loginSchema } from '@repo/validation';

const router: Router = Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/logout', authMiddleware, AuthController.logout);
router.post('/refresh', AuthController.refresh);

export default router;
