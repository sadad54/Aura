import { useState } from 'react';
import { motion } from 'motion/react';
import { ParticleBackground } from './ParticleBackground';
import { TrendingUp, Heart, Zap, Moon } from 'lucide-react';

/**
 * ReflectionScreen Component
 * 
 * HCI Principles:
 * - Data visualization: Emotional patterns shown through intuitive graphs
 * - Temporal context: Timeline shows progression and patterns
 * - Positive reinforcement: AI insights celebrate growth
 * - Self-awareness: Helps users understand their emotional rhythms
 */

interface ReflectionScreenProps {
  userName: string;
}

// Mock data for mood entries
const mockMoodData = [
  { date: '2025-11-07', mood: 'happy', intensity: 8, note: 'Great day at work!' },
  { date: '2025-11-08', mood: 'calm', intensity: 7, note: 'Meditation session' },
  { date: '2025-11-09', mood: 'anxious', intensity: 6, note: 'Big presentation' },
  { date: '2025-11-10', mood: 'calm', intensity: 9, note: 'Peaceful weekend' },
  { date: '2025-11-11', mood: 'happy', intensity: 8, note: 'Caught up with friends' },
  { date: '2025-11-12', mood: 'calm', intensity: 7, note: 'Morning yoga' },
  { date: '2025-11-13', mood: 'calm', intensity: 8, note: 'Feeling centered' },
];

const moodIcons = {
  calm: { icon: Moon, color: 'from-teal-400 to-blue-500', label: 'Calm' },
  anxious: { icon: Zap, color: 'from-orange-400 to-red-500', label: 'Anxious' },
  happy: { icon: Heart, color: 'from-yellow-400 to-pink-500', label: 'Happy' },
  neutral: { icon: TrendingUp, color: 'from-purple-400 to-indigo-500', label: 'Neutral' },
};

export function ReflectionScreen({ userName }: ReflectionScreenProps) {
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);

  // Calculate mood statistics
  const calmDays = mockMoodData.filter(d => d.mood === 'calm').length;
  const dominantMood = 'calm'; // Would calculate from data
  const avgIntensity = Math.round(
    mockMoodData.reduce((sum, d) => sum + d.intensity, 0) / mockMoodData.length
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen"
    >
      <ParticleBackground mood="calm" />

      <div className="relative z-10 px-6 py-12 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-white/90 mb-2">Your Journey</h2>
          <p className="text-white/60">Patterns and insights from your reflections</p>
        </motion.div>

        {/* AI Insight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-sm"
        >
          <div className="flex items-start gap-4">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart className="w-8 h-8 text-pink-300" />
            </motion.div>
            <div>
              <p className="text-white/90 mb-2">Weekly Reflection</p>
              <p className="text-white/70">
                You were calm <span className="text-teal-300">{calmDays} days</span> this week
                — keep your rhythm steady, {userName}. Your consistency is building real peace.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Emotional Weather Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-white/80 mb-6">Emotional Weather</h3>
          
          {/* Simple bar chart */}
          <div className="space-y-3">
            {mockMoodData.map((entry, index) => {
              const moodConfig = moodIcons[entry.mood as keyof typeof moodIcons];
              const Icon = moodConfig.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="relative"
                >
                  <div className="flex items-center gap-3">
                    {/* Date */}
                    <span className="text-white/40 text-sm w-16">
                      {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>

                    {/* Intensity bar */}
                    <div className="flex-1 h-12 bg-white/5 rounded-lg overflow-hidden relative">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${moodConfig.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(entry.intensity / 10) * 100}%` }}
                        transition={{ delay: 0.5 + index * 0.05, duration: 0.6 }}
                      />
                      
                      {/* Mood icon */}
                      <div className="absolute inset-0 flex items-center px-3">
                        <Icon className="w-4 h-4 text-white/90 mr-2" />
                        <span className="text-white/80 text-sm">{moodConfig.label}</span>
                      </div>
                    </div>

                    {/* Intensity score */}
                    <span className="text-white/60 text-sm w-8">{entry.intensity}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline of mood nodes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-white/80 mb-6">Your Timeline</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-white/10" />

            {/* Timeline nodes */}
            <div className="space-y-4">
              {mockMoodData.map((entry, index) => {
                const moodConfig = moodIcons[entry.mood as keyof typeof moodIcons];
                const Icon = moodConfig.icon;
                
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    onClick={() => setSelectedEntry(index === selectedEntry ? null : index)}
                    className="relative flex items-start gap-4 w-full text-left group"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Node */}
                    <div className={`relative z-10 w-12 h-12 rounded-full bg-gradient-to-br ${moodConfig.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-white/90">{moodConfig.label}</span>
                        <span className="text-white/40 text-sm">
                          {new Date(entry.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      {selectedEntry === index && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-white/60 text-sm"
                        >
                          {entry.note}
                        </motion.p>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Statistics summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
            <p className="text-white/90 mb-1">{mockMoodData.length}</p>
            <p className="text-white/50 text-sm">Entries</p>
          </div>
          
          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
            <p className="text-white/90 mb-1">{avgIntensity}/10</p>
            <p className="text-white/50 text-sm">Avg Peace</p>
          </div>
          
          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
            <p className="text-white/90 mb-1 capitalize">{dominantMood}</p>
            <p className="text-white/50 text-sm">Top Mood</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
