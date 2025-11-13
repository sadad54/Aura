import { motion } from 'motion/react';
import { ParticleBackground } from './ParticleBackground';
import { MoodOrb } from './MoodOrb';
import { GlassCard } from './ui-library/GlassCard';
import { 
  Brain, Waves, BookOpen, Wind, Dumbbell, Moon as MoonIcon,
  TrendingUp, Zap, Heart, Target, Sparkles
} from 'lucide-react';

/**
 * Enhanced Home Screen - Ambient Control Center
 * AI-powered personalized dashboard
 */

interface EnhancedHomeScreenProps {
  userName: string;
  currentMood: 'calm' | 'anxious' | 'happy' | 'neutral';
}

export function EnhancedHomeScreen({ userName, currentMood }: EnhancedHomeScreenProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // AI-generated daily forecast
  const energyLevel = 78;
  const cognitiveScore = 85;
  const stressLevel = 32;

  const quickActions = [
    { icon: Brain, label: 'Meditate', color: 'from-purple-400 to-indigo-500', route: 'soundscape' },
    { icon: BookOpen, label: 'Journal', color: 'from-pink-400 to-rose-500', route: 'journal' },
    { icon: Wind, label: 'Breathe', color: 'from-teal-400 to-cyan-500', route: 'wellness' },
    { icon: TrendingUp, label: 'Reflect', color: 'from-blue-400 to-indigo-500', route: 'reflection' },
    { icon: Dumbbell, label: 'Move', color: 'from-orange-400 to-amber-500', route: 'fitness' },
    { icon: MoonIcon, label: 'Sleep', color: 'from-indigo-400 to-purple-600', route: 'sleep' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen"
    >
      <ParticleBackground mood={currentMood} />

      <div className="relative z-10 px-6 py-8 max-w-2xl mx-auto space-y-6">
        {/* Greeting & Mood Orb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-white/90 mb-6">{getGreeting()}, {userName}</h1>
          
          <div className="flex justify-center mb-4">
            <MoodOrb mood={currentMood} size="medium" />
          </div>
          
          <p className="text-white/60">
            {currentMood === 'calm' && "You're radiating peace today"}
            {currentMood === 'anxious' && "Let's find your center together"}
            {currentMood === 'happy' && "Your energy is beautiful"}
            {currentMood === 'neutral' && "Ready to explore your day"}
          </p>
        </motion.div>

        {/* AI Daily Forecast Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-purple-300" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-white/90 mb-1">Your Energy Today</h3>
                <p className="text-white/60 text-sm">AI-powered daily forecast</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Energy Level */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">Physical Energy</span>
                  <span className="text-teal-300">{energyLevel}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-400 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${energyLevel}%` }}
                    transition={{ delay: 0.3, duration: 1 }}
                  />
                </div>
              </div>

              {/* Cognitive Score */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">Mental Clarity</span>
                  <span className="text-purple-300">{cognitiveScore}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${cognitiveScore}%` }}
                    transition={{ delay: 0.4, duration: 1 }}
                  />
                </div>
              </div>

              {/* Stress Level */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">Stress Level</span>
                  <span className="text-green-300">{stressLevel}% (Low)</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${stressLevel}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Smart Suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/20">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white/90 mb-1">AI Suggests</h4>
                <p className="text-white/70 text-sm mb-3">
                  Your cognitive energy peaks at 10 AM. Perfect time for deep work or journaling.
                </p>
                <motion.button
                  className="text-purple-300 text-sm flex items-center gap-1"
                  whileHover={{ x: 5 }}
                >
                  Start Session
                  <Zap className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white/70 mb-4 text-sm uppercase tracking-wide">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${action.color} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white/80 text-sm">{action.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Daily Affirmation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard variant="subtle" className="p-5">
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-pink-300 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Daily Affirmation</p>
                <p className="text-white/80 italic">
                  "Your peace is your power. Trust your journey, embrace this moment."
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Current Soundscape (if playing) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard className="p-5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-400/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Waves className="w-6 h-6 text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute -inset-1 rounded-xl bg-blue-400/30 blur-md"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <p className="text-white/90 text-sm">Ocean Waves</p>
                  <p className="text-white/50 text-xs">AI Adaptive • 12:34 remaining</p>
                </div>
              </div>
              <motion.button
                className="text-white/60 hover:text-white/90 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Target className="w-5 h-5" />
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
