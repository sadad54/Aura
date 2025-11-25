import { Router } from 'express';
import {
  createReflection,
  getReflections,
  getReflectionTimeline
} from '../controllers/reflection.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', createReflection);
router.get('/', getReflections);
router.get('/timeline', getReflectionTimeline);

export default router;
