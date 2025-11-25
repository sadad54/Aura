import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const createReflection = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, content, mood, intensity, tags, peaceScore } = req.body;

    const reflection = await prisma.reflection.create({
      data: {
        userId: req.userId!,
        title,
        content,
        mood,
        intensity,
        tags: tags || [],
        peaceScore: peaceScore || 5.0
      }
    });

    res.status(201).json({
      message: 'Reflection created successfully',
      reflection
    });
  } catch (error) {
    console.error('Create reflection error:', error);
    res.status(500).json({ error: 'Failed to create reflection' });
  }
};

export const getReflections = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { days = 7 } = req.query;

    const reflections = await prisma.reflection.findMany({
      where: {
        userId: req.userId,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - Number(days)))
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ reflections });
  } catch (error) {
    console.error('Get reflections error:', error);
    res.status(500).json({ error: 'Failed to fetch reflections' });
  }
};

export const getReflectionTimeline = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { days = 7 } = req.query;

    const reflections = await prisma.reflection.findMany({
      where: {
        userId: req.userId,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - Number(days)))
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate stats
    const totalEntries = reflections.length;
    const avgPeaceScore = totalEntries > 0
      ? reflections.reduce((sum: number, r: any) => sum + r.peaceScore, 0) / totalEntries
      : 0;

    const moodCounts = reflections.reduce((acc: any, r: any) => {
      acc[r.mood] = (acc[r.mood] || 0) + 1;
      return acc;
    }, {});

    const dominantMood = Object.entries(moodCounts).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || 'neutral';

    res.json({
      timeline: reflections,
      stats: {
        totalEntries,
        averagePeaceScore: Math.round(avgPeaceScore * 10) / 10,
        dominantMood
      }
    });
  } catch (error) {
    console.error('Get reflection timeline error:', error);
    res.status(500).json({ error: 'Failed to fetch reflection timeline' });
  }
};
