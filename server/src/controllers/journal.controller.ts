import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const createJournal = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, content, mood, moodIntensity, tags, isVoice, hasPhoto } = req.body;

    const wordCount = content.trim().split(/\s+/).length;

    const journal = await prisma.journal.create({
      data: {
        userId: req.userId!,
        title,
        content,
        mood,
        moodIntensity: moodIntensity || 5,
        tags: tags || [],
        wordCount,
        isVoice: isVoice || false,
        hasPhoto: hasPhoto || false
      }
    });

    // Also create a mood entry
    await prisma.mood.create({
      data: {
        userId: req.userId!,
        mood,
        intensity: moodIntensity || 5,
        note: `From journal: ${title || 'Untitled'}`
      }
    });

    res.status(201).json({
      message: 'Journal entry created successfully',
      journal
    });
  } catch (error) {
    console.error('Create journal error:', error);
    res.status(500).json({ error: 'Failed to create journal entry' });
  }
};

export const getJournals = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 20, mood, tags } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = { userId: req.userId };
    if (mood) where.mood = mood;
    if (tags) {
      where.tags = { hasSome: Array.isArray(tags) ? tags : [tags] };
    }

    const [journals, total] = await Promise.all([
      prisma.journal.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit)
      }),
      prisma.journal.count({ where })
    ]);

    res.json({
      journals,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get journals error:', error);
    res.status(500).json({ error: 'Failed to fetch journals' });
  }
};

export const getJournalById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const journal = await prisma.journal.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!journal) {
      res.status(404).json({ error: 'Journal entry not found' });
      return;
    }

    res.json({ journal });
  } catch (error) {
    console.error('Get journal error:', error);
    res.status(500).json({ error: 'Failed to fetch journal entry' });
  }
};

export const updateJournal = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, mood, moodIntensity, tags } = req.body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) {
      updateData.content = content;
      updateData.wordCount = content.trim().split(/\s+/).length;
    }
    if (mood !== undefined) updateData.mood = mood;
    if (moodIntensity !== undefined) updateData.moodIntensity = moodIntensity;
    if (tags !== undefined) updateData.tags = tags;

    const journal = await prisma.journal.updateMany({
      where: {
        id,
        userId: req.userId
      },
      data: updateData
    });

    if (journal.count === 0) {
      res.status(404).json({ error: 'Journal entry not found' });
      return;
    }

    res.json({ message: 'Journal entry updated successfully' });
  } catch (error) {
    console.error('Update journal error:', error);
    res.status(500).json({ error: 'Failed to update journal entry' });
  }
};

export const deleteJournal = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const journal = await prisma.journal.deleteMany({
      where: {
        id,
        userId: req.userId
      }
    });

    if (journal.count === 0) {
      res.status(404).json({ error: 'Journal entry not found' });
      return;
    }

    res.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    console.error('Delete journal error:', error);
    res.status(500).json({ error: 'Failed to delete journal entry' });
  }
};

export const getJournalStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [totalEntries, totalWords, moodBreakdown] = await Promise.all([
      prisma.journal.count({ where: { userId: req.userId } }),
      prisma.journal.aggregate({
        where: { userId: req.userId },
        _sum: { wordCount: true }
      }),
      prisma.journal.groupBy({
        by: ['mood'],
        where: { userId: req.userId },
        _count: { mood: true }
      })
    ]);

    res.json({
      stats: {
        totalEntries,
        totalWords: totalWords._sum.wordCount || 0,
        moodBreakdown: moodBreakdown.map(item => ({
          mood: item.mood,
          count: item._count.mood
        }))
      }
    });
  } catch (error) {
    console.error('Get journal stats error:', error);
    res.status(500).json({ error: 'Failed to fetch journal statistics' });
  }
};
