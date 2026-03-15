import { Router } from 'express';
import { PreviewController } from '../controllers/preview.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = Router();

router.post('/:projectId/start', authMiddleware, PreviewController.start);
router.post('/:projectId/stop', authMiddleware, PreviewController.stop);
router.get('/:projectId/status', authMiddleware, PreviewController.getStatus);

export default router;
