import { Router } from 'express';
import { logSoundscape, getSoundscapeHistory } from '../controllers/soundscape.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', logSoundscape);
router.get('/history', getSoundscapeHistory);

export default router;
