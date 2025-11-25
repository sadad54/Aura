import { Router } from 'express';
import {
  createSleepSession,
  getSleepSessions,
  getSleepStats,
  updateSleepSession
} from '../controllers/sleep.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', createSleepSession);
router.get('/', getSleepSessions);
router.get('/stats', getSleepStats);
router.put('/:id', updateSleepSession);

export default router;
