import { useState } from 'react';
import { motion } from 'motion/react';
import { ParticleBackground } from './ParticleBackground';
import { GlassCard } from './ui-library/GlassCard';
import { 
  Flame, Droplets, Book, Dumbbell, Moon, Sun, Coffee, Heart,
  Plus, TrendingUp, Award, Calendar, CheckCircle2
} from 'lucide-react';

/**
 * Habit Tracker Screen - Fabulous + Notion Hybrid
 * Build routines, track streaks, gain insights
 */

interface Habit {
  id: string;
  name: string;
  icon: any;
  color: string;
  streak: number;
  completed: boolean;
  time: string;
  category: 'morning' | 'evening' | 'anytime';
}

const mockHabits: Habit[] = [
  { id: '1', name: 'Morning Meditation', icon: Sun, color: 'from-yellow-400 to-orange-500', streak: 7, completed: true, time: '7:00 AM', category: 'morning' },
  { id: '2', name: 'Gratitude Journal', icon: Book, color: 'from-pink-400 to-rose-500', streak: 12, completed: true, time: '7:30 AM', category: 'morning' },
  { id: '3', name: 'Hydration', icon: Droplets, color: 'from-cyan-400 to-blue-500', streak: 21, completed: false, time: 'All day', category: 'anytime' },
  { id: '4', name: 'Exercise', icon: Dumbbell, color: 'from-green-400 to-emerald-500', streak: 5, completed: false, time: '6:00 PM', category: 'anytime' },
  { id: '5', name: 'Evening Reflection', icon: Moon, color: 'from-indigo-400 to-purple-500', streak: 14, completed: false, time: '9:00 PM', category: 'evening' },
];

export function HabitTrackerScreen() {
  const [habits, setHabits] = useState(mockHabits);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'morning' | 'evening' | 'anytime'>('all');

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed, streak: !h.completed ? h.streak + 1 : h.streak } : h
    ));
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = Math.round((completedToday / totalHabits) * 100);

  const filteredHabits = selectedCategory === 'all' 
    ? habits 
    : habits.filter(h => h.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen"
    >
      <ParticleBackground mood="calm" />

      <div className="relative z-10 px-6 py-8 max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-white/90 mb-2">Daily Habits</h2>
          <p className="text-white/60">Building your best self, one day at a time</p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/90">Today's Progress</h3>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-white/70">{completedToday}/{totalHabits}</span>
              </div>
            </div>

            {/* Progress Ring */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 352" }}
                  animate={{ 
                    strokeDasharray: `${(completionRate / 100) * 352} 352`
                  }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/90 text-2xl">{completionRate}%</span>
              </div>
            </div>

            <p className="text-center text-white/60 text-sm">
              {completionRate === 100 
                ? "Perfect day! 🎉" 
                : `${totalHabits - completedToday} habit${totalHabits - completedToday > 1 ? 's' : ''} remaining`
              }
            </p>
          </GlassCard>
        </motion.div>

        {/* AI Habit Suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/20">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white/90 mb-1">AI Recommends</h4>
                <p className="text-white/70 text-sm mb-3">
                  Based on your stress levels and sleep quality, try adding "Evening Reflection" to your routine.
                </p>
                <motion.button
                  className="text-purple-300 text-sm flex items-center gap-1"
                  whileHover={{ x: 5 }}
                >
                  Add Habit
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2"
        >
          {['all', 'morning', 'evening', 'anytime'].map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`
                px-4 py-2 rounded-xl text-sm capitalize transition-all
                ${selectedCategory === cat 
                  ? 'bg-white/10 text-white/90 border border-white/20' 
                  : 'bg-white/5 text-white/60 border border-white/10'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Habit Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          {filteredHabits.map((habit, index) => {
            const Icon = habit.icon;
            return (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + index * 0.05 }}
              >
                <GlassCard 
                  className={`p-5 cursor-pointer transition-all ${
                    habit.completed ? 'bg-white/10' : 'bg-white/5'
                  }`}
                  onClick={() => toggleHabit(habit.id)}
                  hover
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${habit.color} shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Habit Info */}
                    <div className="flex-1">
                      <h4 className={`mb-1 ${habit.completed ? 'text-white/90 line-through' : 'text-white/90'}`}>
                        {habit.name}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-white/50">
                        <span>{habit.time}</span>
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-400" />
                          <span className="text-orange-300">{habit.streak} day streak</span>
                        </div>
                      </div>
                    </div>

                    {/* Check indicator */}
                    <motion.div
                      animate={{ scale: habit.completed ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle2 
                        className={`w-6 h-6 ${
                          habit.completed ? 'text-green-400 fill-green-400' : 'text-white/20'
                        }`}
                      />
                    </motion.div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Add New Habit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="w-full p-5 rounded-2xl border-2 border-dashed border-white/20 text-white/60 hover:border-white/40 hover:text-white/80 transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            Add New Habit
          </motion.button>
        </motion.div>

        {/* Weekly Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <GlassCard variant="subtle" className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-purple-300" />
              <h4 className="text-white/90">This Week</h4>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                const completed = i < 5; // Mock data
                return (
                  <div key={i} className="text-center">
                    <p className="text-white/40 text-xs mb-2">{day}</p>
                    <div className={`
                      w-full h-2 rounded-full
                      ${completed ? 'bg-gradient-to-r from-purple-400 to-pink-500' : 'bg-white/10'}
                    `} />
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
