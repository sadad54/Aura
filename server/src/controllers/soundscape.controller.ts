import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const logSoundscape = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { soundscape, duration, volume } = req.body;

    const play = await prisma.soundscapePlay.create({
      data: {
        userId: req.userId!,
        soundscape,
        duration,
        volume: volume || 0.5
      }
    });

    res.status(201).json({
      message: 'Soundscape logged successfully',
      play
    });
  } catch (error) {
    console.error('Log soundscape error:', error);
    res.status(500).json({ error: 'Failed to log soundscape' });
  }
};

export const getSoundscapeHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { days = 30 } = req.query;

    const history = await prisma.soundscapePlay.findMany({
      where: {
        userId: req.userId,
        playedAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - Number(days)))
        }
      },
      orderBy: { playedAt: 'desc' }
    });

    // Calculate favorites
    const favorites = await prisma.soundscapePlay.groupBy({
      by: ['soundscape'],
      where: {
        userId: req.userId,
        playedAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - Number(days)))
        }
      },
      _count: { soundscape: true },
      _sum: { duration: true }
    });

    res.json({
      history,
      favorites: favorites.map((item: any) => ({
        soundscape: item.soundscape,
        playCount: item._count.soundscape,
        totalDuration: item._sum.duration
      }))
    });
  } catch (error) {
    console.error('Get soundscape history error:', error);
    res.status(500).json({ error: 'Failed to fetch soundscape history' });
  }
};
