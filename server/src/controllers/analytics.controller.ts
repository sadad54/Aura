import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getDashboardAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { days = 7 } = req.query;
    const startDate = new Date(new Date().setDate(new Date().getDate() - Number(days)));

    // Fetch all relevant data in parallel
    const [
      journals,
      habits,
      habitCompletions,
      moods,
      sleepSessions,
      soundscapes
    ] = await Promise.all([
      prisma.journal.count({ where: { userId: req.userId, createdAt: { gte: startDate } } }),
      prisma.habit.count({ where: { userId: req.userId, isActive: true } }),
      prisma.habitCompletion.findMany({
        where: { userId: req.userId, completedAt: { gte: startDate } }
      }),
      prisma.mood.findMany({
        where: { userId: req.userId, createdAt: { gte: startDate } }
      }),
      prisma.sleepSession.findMany({
        where: { userId: req.userId, bedTime: { gte: startDate } }
      }),
      prisma.soundscapePlay.count({
        where: { userId: req.userId, playedAt: { gte: startDate } }
      })
    ]);

    // Calculate wellness score (0-100)
    const wellnessScore = calculateWellnessScore({
      journals,
      habitCompletions: habitCompletions.length,
      activeHabits: habits,
      moods,
      sleepSessions
    });

    // Calculate current streak
    const currentStreak = calculateCurrentStreak(habitCompletions);

    // Calculate mood trends
    const avgMoodIntensity = moods.length > 0
      ? moods.reduce((sum: number, m: any) => sum + m.intensity, 0) / moods.length
      : 5;

    // Sleep quality average
    const avgSleepQuality = sleepSessions.length > 0
      ? sleepSessions.reduce((sum: number, s: any) => sum + s.quality, 0) / sleepSessions.length
      : 0;

    res.json({
      analytics: {
        wellnessScore: Math.round(wellnessScore),
        currentStreak,
        totalSessions: journals + habitCompletions.length + soundscapes,
        journalEntries: journals,
        habitCompletions: habitCompletions.length,
        averageMood: Math.round(avgMoodIntensity * 10) / 10,
        averageSleepQuality: Math.round(avgSleepQuality * 10) / 10,
        moodTrend: moods.map((m: any) => ({
          date: m.createdAt,
          mood: m.mood,
          intensity: m.intensity
        })),
        sleepTrend: sleepSessions.map((s: any) => ({
          date: s.bedTime,
          quality: s.quality,
          duration: s.duration
        }))
      }
    });
  } catch (error) {
    console.error('Get dashboard analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};

export const getDetailedAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date(new Date().setDate(new Date().getDate() - Number(days)));

    const [
      moodStats,
      sleepStats,
      habitStats,
      journalStats
    ] = await Promise.all([
      // Mood analytics
      prisma.mood.groupBy({
        by: ['mood'],
        where: { userId: req.userId, createdAt: { gte: startDate } },
        _count: { mood: true },
        _avg: { intensity: true }
      }),
      // Sleep analytics
      prisma.sleepSession.findMany({
        where: { userId: req.userId, bedTime: { gte: startDate } },
        select: { quality: true, duration: true, deepSleep: true, remSleep: true }
      }),
      // Habit completion rate
      prisma.habitCompletion.groupBy({
        by: ['habitId'],
        where: { userId: req.userId, completedAt: { gte: startDate } },
        _count: { habitId: true }
      }),
      // Journal insights
      prisma.journal.groupBy({
        by: ['mood'],
        where: { userId: req.userId, createdAt: { gte: startDate } },
        _count: { mood: true },
        _avg: { wordCount: true }
      })
    ]);

    // Process data for insights
    const insights = generateInsights({
      moodStats,
      sleepStats,
      habitStats,
      journalStats
    });

    res.json({
      detailedAnalytics: {
        moodPatterns: moodStats.map((item: any) => ({
          mood: item.mood,
          count: item._count.mood,
          avgIntensity: item._avg.intensity
        })),
        sleepAnalysis: {
          avgQuality: sleepStats.length > 0
            ? sleepStats.reduce((sum: number, s: any) => sum + s.quality, 0) / sleepStats.length
            : 0,
          avgDuration: sleepStats.length > 0
            ? sleepStats.reduce((sum: number, s: any) => sum + s.duration, 0) / sleepStats.length
            : 0,
          avgDeepSleep: sleepStats.length > 0
            ? sleepStats.reduce((sum: number, s: any) => sum + s.deepSleep, 0) / sleepStats.length
            : 0
        },
        habitPerformance: habitStats.length,
        journalInsights: journalStats.map((item: any) => ({
          mood: item.mood,
          count: item._count.mood,
          avgWordCount: item._avg.wordCount
        })),
        insights
      }
    });
  } catch (error) {
    console.error('Get detailed analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch detailed analytics' });
  }
};

// Helper functions
function calculateWellnessScore(data: any): number {
  let score = 50; // Base score

  // Journal activity (up to +15)
  score += Math.min(data.journals * 2, 15);

  // Habit completion rate (up to +25)
  if (data.activeHabits > 0) {
    const completionRate = data.habitCompletions / (data.activeHabits * 7);
    score += Math.min(completionRate * 25, 25);
  }

  // Mood positivity (up to +20)
  if (data.moods.length > 0) {
    const positiveMoods = data.moods.filter((m: any) => 
      ['happy', 'calm', 'peaceful', 'excited'].includes(m.mood)
    ).length;
    const moodScore = (positiveMoods / data.moods.length) * 20;
    score += moodScore;
  }

  // Sleep quality (up to +10)
  if (data.sleepSessions.length > 0) {
    const avgSleepQuality = data.sleepSessions.reduce((sum: number, s: any) => 
      sum + s.quality, 0
    ) / data.sleepSessions.length;
    score += (avgSleepQuality / 10) * 10;
  }

  return Math.min(Math.max(score, 0), 100);
}

function calculateCurrentStreak(completions: any[]): number {
  if (completions.length === 0) return 0;

  const sortedDates = completions
    .map(c => new Date(c.completedAt))
    .map(d => {
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })
    .sort((a, b) => b - a);

  const uniqueDates = [...new Set(sortedDates)];
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const date of uniqueDates) {
    if (date === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (date < currentDate.getTime()) {
      break;
    }
  }

  return streak;
}

function generateInsights(data: any): string[] {
  const insights: string[] = [];

  // Mood insights
  if (data.moodStats.length > 0) {
    const dominantMood = data.moodStats.reduce((prev: any, current: any) =>
      current._count.mood > prev._count.mood ? current : prev
    );
    insights.push(`Your dominant mood this period was ${dominantMood.mood}.`);
  }

  // Sleep insights
  if (data.sleepStats.length > 0) {
    const avgQuality = data.sleepStats.reduce((sum: number, s: any) => 
      sum + s.quality, 0
    ) / data.sleepStats.length;
    
    if (avgQuality >= 8) {
      insights.push("Your sleep quality has been excellent!");
    } else if (avgQuality < 6) {
      insights.push("Consider improving your sleep routine for better wellness.");
    }
  }

  // Habit insights
  if (data.habitStats.length > 0) {
    insights.push(`You've been actively working on ${data.habitStats.length} habits.`);
  }

  return insights;
}
