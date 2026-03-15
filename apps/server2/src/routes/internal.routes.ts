import { Router } from 'express';
import { internalAuth } from '../middleware/internal.middleware';
import { RuntimeController } from '../controllers/runtime.controller';

const router: Router = Router();

// All routes require shared secret
router.use(internalAuth);

router.post('/assign',  RuntimeController.assign);
router.post('/release', RuntimeController.release);
router.get('/status',   RuntimeController.status);
router.get('/pool',     RuntimeController.poolStatus);

export { router as internalRoutes };
