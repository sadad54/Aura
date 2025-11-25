import { Router } from 'express';
import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  completeHabit,
  getHabitStats,
  getHabitCompletions
} from '../controllers/habit.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', createHabit);
router.get('/', getHabits);
router.get('/stats', getHabitStats);
router.get('/:id', getHabitCompletions);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);
router.post('/:id/complete', completeHabit);

export default router;
