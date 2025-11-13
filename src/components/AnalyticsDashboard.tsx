import { motion } from 'motion/react';
import { ParticleBackground } from './ParticleBackground';
import { GlassCard } from './ui-library/GlassCard';
import { 
  Brain, Heart, Moon as MoonIcon, TrendingUp, Activity,
  Zap, Sparkles, Calendar
} from 'lucide-react';

/**
 * Analytics Dashboard - Life Insights & Patterns
 * Apple Health x Notion aesthetics
 */

interface AnalyticsDashboardProps {
  userName: string;
}

export function AnalyticsDashboard({ userName }: AnalyticsDashboardProps) {
  // Mock data for charts
  const moodData = [
    { day: 'Mon', value: 7, mood: 'calm' },
    { day: 'Tue', value: 6, mood: 'calm' },
    { day: 'Wed', value: 4, mood: 'anxious' },
    { day: 'Thu', value: 8, mood: 'happy' },
    { day: 'Fri', value: 9, mood: 'happy' },
    { day: 'Sat', value: 8, mood: 'calm' },
    { day: 'Sun', value: 7, mood: 'calm' },
  ];

  const sleepData = [65, 72, 68, 85, 90, 78, 82];
  const focusData = [45, 60, 55, 70, 80, 75, 65];
  const stressData = [60, 45, 70, 40, 35, 38, 32];

  const maxValue = Math.max(...moodData.map(d => d.value));

  const insights = [
    {
      icon: Heart,
      color: 'from-pink-400 to-rose-500',
      title: 'Emotional Pattern',
      description: 'You are most calm on weekends after journaling + evening walks',
      metric: '+23%',
      trend: 'positive'
    },
    {
      icon: MoonIcon,
      color: 'from-indigo-400 to-purple-500',
      title: 'Sleep Quality',
      description: 'Your sleep improved 15% when you meditate before bed',
      metric: '7.8 hrs',
      trend: 'positive'
    },
    {
      icon: Brain,
      color: 'from-purple-400 to-pink-500',
      title: 'Focus Peak',
      description: 'Deep work sessions most effective 9-11 AM',
      metric: '85%',
      trend: 'neutral'
    },
    {
      icon: Zap,
      color: 'from-orange-400 to-yellow-500',
      title: 'Stress Reduction',
      description: 'Breathwork reduced anxiety by 40% this week',
      metric: '-40%',
      trend: 'positive'
    },
  ];

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
          <h2 className="text-white/90 mb-2">Life Analytics</h2>
          <p className="text-white/60">Patterns, insights, and your journey visualized</p>
        </motion.div>

        {/* AI Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30">
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-purple-300" />
              </motion.div>
              <div>
                <h3 className="text-white/90 mb-2">AI Life Summary</h3>
                <p className="text-white/80 mb-4">
                  {userName}, your wellness score increased by <span className="text-green-300">18%</span> this week. 
                  You've been consistently journaling and maintaining healthy sleep patterns. 
                  Your stress levels are at an all-time low. Keep this momentum! 🌟
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <p className="text-white/50">Wellness Score</p>
                    <p className="text-white/90 text-xl">82/100</p>
                  </div>
                  <div>
                    <p className="text-white/50">Streak</p>
                    <p className="text-white/90 text-xl">14 days</p>
                  </div>
                  <div>
                    <p className="text-white/50">Total Sessions</p>
                    <p className="text-white/90 text-xl">147</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Mood Over Time Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white/90">Mood Over Time</h3>
              <Calendar className="w-5 h-5 text-white/50" />
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between h-48 gap-2">
              {moodData.map((data, index) => {
                const height = (data.value / maxValue) * 100;
                const colorMap = {
                  calm: 'from-teal-400 to-blue-500',
                  anxious: 'from-orange-400 to-red-500',
                  happy: 'from-yellow-400 to-pink-500',
                  neutral: 'from-purple-400 to-indigo-500',
                };
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      className={`w-full rounded-t-lg bg-gradient-to-t ${colorMap[data.mood as keyof typeof colorMap]}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                    />
                    <span className="text-white/50 text-xs">{data.day}</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4"
        >
          <GlassCard variant="subtle" className="p-4 text-center">
            <Activity className="w-6 h-6 text-teal-300 mx-auto mb-2" />
            <p className="text-white/90 text-xl mb-1">92%</p>
            <p className="text-white/50 text-xs">Activity</p>
          </GlassCard>

          <GlassCard variant="subtle" className="p-4 text-center">
            <Heart className="w-6 h-6 text-pink-300 mx-auto mb-2" />
            <p className="text-white/90 text-xl mb-1">8.2</p>
            <p className="text-white/50 text-xs">Mood Avg</p>
          </GlassCard>

          <GlassCard variant="subtle" className="p-4 text-center">
            <MoonIcon className="w-6 h-6 text-indigo-300 mx-auto mb-2" />
            <p className="text-white/90 text-xl mb-1">7.8h</p>
            <p className="text-white/50 text-xs">Sleep</p>
          </GlassCard>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-white/70 mb-4 text-sm uppercase tracking-wide">AI Insights</h3>
          <div className="space-y-3">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + index * 0.05 }}
                >
                  <GlassCard className="p-5" hover>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${insight.color} flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-white/90">{insight.title}</h4>
                          <span className={`
                            text-sm px-2 py-1 rounded-lg
                            ${insight.trend === 'positive' ? 'text-green-300 bg-green-500/20' : 'text-white/60 bg-white/10'}
                          `}>
                            {insight.metric}
                          </span>
                        </div>
                        <p className="text-white/60 text-sm">{insight.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Detailed Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard variant="strong" className="p-6">
            <h3 className="text-white/90 mb-6">Weekly Breakdown</h3>
            
            <div className="space-y-4">
              {/* Sleep Quality */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/70 text-sm">Sleep Quality</span>
                  <span className="text-white/90 text-sm">82%</span>
                </div>
                <div className="flex gap-1 h-8">
                  {sleepData.map((value, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-indigo-400 to-purple-500 rounded"
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ delay: 0.7 + i * 0.05 }}
                    />
                  ))}
                </div>
              </div>

              {/* Focus Score */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/70 text-sm">Focus Score</span>
                  <span className="text-white/90 text-sm">68%</span>
                </div>
                <div className="flex gap-1 h-8">
                  {focusData.map((value, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-purple-400 to-pink-500 rounded"
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ delay: 0.8 + i * 0.05 }}
                    />
                  ))}
                </div>
              </div>

              {/* Stress Index */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/70 text-sm">Stress Index</span>
                  <span className="text-green-300 text-sm">32% (Low)</span>
                </div>
                <div className="flex gap-1 h-8">
                  {stressData.map((value, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-green-400 to-emerald-500 rounded"
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ delay: 0.9 + i * 0.05 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Export Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white/90 transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="w-5 h-5" />
            Export Full Report
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
