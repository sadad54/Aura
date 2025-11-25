import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const createHabit = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, icon, gradient, category, timeOfDay } = req.body;

    const habit = await prisma.habit.create({
      data: {
        userId: req.userId!,
        title,
        description,
        icon: icon || '🎯',
        gradient: gradient || 'from-purple-400 to-pink-400',
        category,
        timeOfDay
      }
    });

    res.status(201).json({
      message: 'Habit created successfully',
      habit
    });
  } catch (error) {
    console.error('Create habit error:', error);
    res.status(500).json({ error: 'Failed to create habit' });
  }
};

export const getHabits = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    
    const where: any = { userId: req.userId, isActive: true };
    if (category && category !== 'all') {
      where.category = category;
    }

    const habits = await prisma.habit.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        completions: {
          where: {
            completedAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 7))
            }
          },
          orderBy: { completedAt: 'desc' }
        }
      }
    });

    // Calculate streaks for each habit
    const habitsWithStreaks = habits.map(habit => {
      const streak = calculateStreak(habit.completions);
      const todayCompleted = habit.completions.some(c => 
        new Date(c.completedAt).toDateString() === new Date().toDateString()
      );

      return {
        ...habit,
        currentStreak: streak,
        completedToday: todayCompleted
      };
    });

    res.json({ habits: habitsWithStreaks });
  } catch (error) {
    console.error('Get habits error:', error);
    res.status(500).json({ error: 'Failed to fetch habits' });
  }
};

export const updateHabit = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, icon, gradient, category, timeOfDay, isActive } = req.body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (icon !== undefined) updateData.icon = icon;
    if (gradient !== undefined) updateData.gradient = gradient;
    if (category !== undefined) updateData.category = category;
    if (timeOfDay !== undefined) updateData.timeOfDay = timeOfDay;
    if (isActive !== undefined) updateData.isActive = isActive;

    const habit = await prisma.habit.updateMany({
      where: { id, userId: req.userId },
      data: updateData
    });

    if (habit.count === 0) {
      res.status(404).json({ error: 'Habit not found' });
      return;
    }

    res.json({ message: 'Habit updated successfully' });
  } catch (error) {
    console.error('Update habit error:', error);
    res.status(500).json({ error: 'Failed to update habit' });
  }
};

export const deleteHabit = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const habit = await prisma.habit.updateMany({
      where: { id, userId: req.userId },
      data: { isActive: false }
    });

    if (habit.count === 0) {
      res.status(404).json({ error: 'Habit not found' });
      return;
    }

    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    console.error('Delete habit error:', error);
    res.status(500).json({ error: 'Failed to delete habit' });
  }
};

export const completeHabit = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    // Check if already completed today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingCompletion = await prisma.habitCompletion.findFirst({
      where: {
        habitId: id,
        userId: req.userId,
        completedAt: { gte: today }
      }
    });

    if (existingCompletion) {
      res.status(400).json({ error: 'Habit already completed today' });
      return;
    }

    const completion = await prisma.habitCompletion.create({
      data: {
        userId: req.userId!,
        habitId: id,
        note
      }
    });

    res.status(201).json({
      message: 'Habit completed successfully',
      completion
    });
  } catch (error) {
    console.error('Complete habit error:', error);
    res.status(500).json({ error: 'Failed to complete habit' });
  }
};

export const getHabitCompletions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { days = 30 } = req.query;

    const completions = await prisma.habitCompletion.findMany({
      where: {
        habitId: id,
        userId: req.userId,
        completedAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - Number(days)))
        }
      },
      orderBy: { completedAt: 'desc' }
    });

    res.json({ completions });
  } catch (error) {
    console.error('Get habit completions error:', error);
    res.status(500).json({ error: 'Failed to fetch habit completions' });
  }
};

export const getHabitStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [totalHabits, completionsThisWeek, allCompletions] = await Promise.all([
      prisma.habit.count({ where: { userId: req.userId, isActive: true } }),
      prisma.habitCompletion.count({
        where: {
          userId: req.userId,
          completedAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 7))
          }
        }
      }),
      prisma.habitCompletion.findMany({
        where: { userId: req.userId },
        orderBy: { completedAt: 'desc' },
        take: 100
      })
    ]);

    const longestStreak = calculateLongestStreak(allCompletions);

    res.json({
      stats: {
        totalHabits,
        completionsThisWeek,
        longestStreak
      }
    });
  } catch (error) {
    console.error('Get habit stats error:', error);
    res.status(500).json({ error: 'Failed to fetch habit statistics' });
  }
};

// Helper functions
function calculateStreak(completions: any[]): number {
  if (completions.length === 0) return 0;

  let streak = 0;
  const sortedCompletions = completions.sort((a, b) => 
    new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );

  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const completion of sortedCompletions) {
    const completionDate = new Date(completion.completedAt);
    completionDate.setHours(0, 0, 0, 0);

    if (completionDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (completionDate.getTime() < currentDate.getTime()) {
      break;
    }
  }

  return streak;
}

function calculateLongestStreak(completions: any[]): number {
  if (completions.length === 0) return 0;

  const dates = completions
    .map(c => new Date(c.completedAt))
    .map(d => {
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })
    .sort((a, b) => b - a);

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const dayDiff = (dates[i - 1] - dates[i]) / (1000 * 60 * 60 * 24);
    if (dayDiff === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return maxStreak;
}
