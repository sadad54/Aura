import { Router } from 'express';
import { getDashboardAnalytics, getDetailedAnalytics } from '../controllers/analytics.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/dashboard', getDashboardAnalytics);
router.get('/detailed', getDetailedAnalytics);

export default router;
