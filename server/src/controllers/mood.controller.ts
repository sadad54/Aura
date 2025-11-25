import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const logMood = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { mood, intensity, note, triggers } = req.body;

    const moodEntry = await prisma.mood.create({
      data: {
        userId: req.userId!,
        mood,
        intensity,
        note,
        triggers: triggers || []
      }
    });

    res.status(201).json({
      message: 'Mood logged successfully',
      mood: moodEntry
    });
  } catch (error) {
    console.error('Log mood error:', error);
    res.status(500).json({ error: 'Failed to log mood' });
  }
};

export const getMoods = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { days = 7 } = req.query;

    const moods = await prisma.mood.findMany({
      where: {
        userId: req.userId,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - Number(days)))
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ moods });
  } catch (error) {
    console.error('Get moods error:', error);
    res.status(500).json({ error: 'Failed to fetch moods' });
  }
};

export const getMoodStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date(new Date().setDate(new Date().getDate() - Number(days)));

    const [moods, avgIntensity, moodBreakdown] = await Promise.all([
      prisma.mood.findMany({
        where: {
          userId: req.userId,
          createdAt: { gte: startDate }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.mood.aggregate({
        where: {
          userId: req.userId,
          createdAt: { gte: startDate }
        },
        _avg: { intensity: true }
      }),
      prisma.mood.groupBy({
        by: ['mood'],
        where: {
          userId: req.userId,
          createdAt: { gte: startDate }
        },
        _count: { mood: true },
        _avg: { intensity: true }
      })
    ]);

    // Calculate dominant mood
    const dominantMood = moodBreakdown.reduce((prev, current) => 
      (current._count.mood > prev._count.mood) ? current : prev
    , moodBreakdown[0] || { mood: 'neutral', _count: { mood: 0 } });

    res.json({
      stats: {
        totalEntries: moods.length,
        averageIntensity: avgIntensity._avg.intensity || 5,
        dominantMood: dominantMood.mood,
        moodBreakdown: moodBreakdown.map(item => ({
          mood: item.mood,
          count: item._count.mood,
          avgIntensity: item._avg.intensity
        })),
        recentMoods: moods.slice(0, 10)
      }
    });
  } catch (error) {
    console.error('Get mood stats error:', error);
    res.status(500).json({ error: 'Failed to fetch mood statistics' });
  }
};
