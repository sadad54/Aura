import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const createSleepSession = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { bedTime, wakeTime, quality, deepSleep, remSleep, lightSleep, note } = req.body;

    const bedDate = new Date(bedTime);
    const wakeDate = new Date(wakeTime);
    const duration = (wakeDate.getTime() - bedDate.getTime()) / (1000 * 60 * 60);

    const session = await prisma.sleepSession.create({
      data: {
        userId: req.userId!,
        bedTime: bedDate,
        wakeTime: wakeDate,
        duration,
        quality: quality || 7,
        deepSleep: deepSleep || 25,
        remSleep: remSleep || 20,
        lightSleep: lightSleep || 55,
        note
      }
    });

    res.status(201).json({
      message: 'Sleep session created successfully',
      session
    });
  } catch (error) {
    console.error('Create sleep session error:', error);
    res.status(500).json({ error: 'Failed to create sleep session' });
  }
};

export const getSleepSessions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { days = 7 } = req.query;

    const sessions = await prisma.sleepSession.findMany({
      where: {
        userId: req.userId,
        bedTime: {
          gte: new Date(new Date().setDate(new Date().getDate() - Number(days)))
        }
      },
      orderBy: { bedTime: 'desc' }
    });

    res.json({ sessions });
  } catch (error) {
    console.error('Get sleep sessions error:', error);
    res.status(500).json({ error: 'Failed to fetch sleep sessions' });
  }
};

export const updateSleepSession = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { quality, deepSleep, remSleep, lightSleep, note } = req.body;

    const updateData: any = {};
    if (quality !== undefined) updateData.quality = quality;
    if (deepSleep !== undefined) updateData.deepSleep = deepSleep;
    if (remSleep !== undefined) updateData.remSleep = remSleep;
    if (lightSleep !== undefined) updateData.lightSleep = lightSleep;
    if (note !== undefined) updateData.note = note;

    const session = await prisma.sleepSession.updateMany({
      where: { id, userId: req.userId },
      data: updateData
    });

    if (session.count === 0) {
      res.status(404).json({ error: 'Sleep session not found' });
      return;
    }

    res.json({ message: 'Sleep session updated successfully' });
  } catch (error) {
    console.error('Update sleep session error:', error);
    res.status(500).json({ error: 'Failed to update sleep session' });
  }
};

export const getSleepStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date(new Date().setDate(new Date().getDate() - Number(days)));

    const sessions = await prisma.sleepSession.findMany({
      where: {
        userId: req.userId,
        bedTime: { gte: startDate }
      },
      orderBy: { bedTime: 'desc' }
    });

    if (sessions.length === 0) {
      res.json({
        stats: {
          averageDuration: 0,
          averageQuality: 0,
          averageDeepSleep: 0,
          averageRemSleep: 0,
          averageLightSleep: 0,
          totalSessions: 0,
          recentSessions: []
        }
      });
      return;
    }

    const avgDuration = sessions.reduce((sum, s) => sum + s.duration, 0) / sessions.length;
    const avgQuality = sessions.reduce((sum, s) => sum + s.quality, 0) / sessions.length;
    const avgDeepSleep = sessions.reduce((sum, s) => sum + s.deepSleep, 0) / sessions.length;
    const avgRemSleep = sessions.reduce((sum, s) => sum + s.remSleep, 0) / sessions.length;
    const avgLightSleep = sessions.reduce((sum, s) => sum + s.lightSleep, 0) / sessions.length;

    res.json({
      stats: {
        averageDuration: Math.round(avgDuration * 10) / 10,
        averageQuality: Math.round(avgQuality * 10) / 10,
        averageDeepSleep: Math.round(avgDeepSleep),
        averageRemSleep: Math.round(avgRemSleep),
        averageLightSleep: Math.round(avgLightSleep),
        totalSessions: sessions.length,
        recentSessions: sessions.slice(0, 7)
      }
    });
  } catch (error) {
    console.error('Get sleep stats error:', error);
    res.status(500).json({ error: 'Failed to fetch sleep statistics' });
  }
};
