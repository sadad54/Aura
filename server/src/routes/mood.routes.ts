import { Router } from 'express';
import { logMood, getMoods, getMoodStats } from '../controllers/mood.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', logMood);
router.get('/', getMoods);
router.get('/stats', getMoodStats);

export default router;
