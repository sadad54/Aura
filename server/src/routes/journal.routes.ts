import { Router } from 'express';
import {
  createJournal,
  getJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
  getJournalStats
} from '../controllers/journal.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post('/', createJournal);
router.get('/', getJournals);
router.get('/stats', getJournalStats);
router.get('/:id', getJournalById);
router.put('/:id', updateJournal);
router.delete('/:id', deleteJournal);

export default router;
