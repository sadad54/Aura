import { motion } from 'motion/react';
import { MoodOrb } from './MoodOrb';
import { ParticleBackground } from './ParticleBackground';
import { Sparkles, Heart, Zap } from 'lucide-react';

/**
 * HomeScreen Component
 * 
 * HCI Principles:
 * - Personalization: Greets user by name with time-appropriate message
 * - Emotional engagement: MoodOrb provides immediate emotional context
 * - Progressive disclosure: Quick actions revealed on home for easy access
 */

interface HomeScreenProps {
  userName: string;
  currentMood: 'calm' | 'anxious' | 'happy' | 'neutral';
}

export function HomeScreen({ userName, currentMood }: HomeScreenProps) {
  // Get time-appropriate greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const quickActions = [
    { icon: Sparkles, label: 'Quick Journal', color: 'from-purple-400 to-pink-400' },
    { icon: Heart, label: 'Breathing', color: 'from-teal-400 to-blue-400' },
    { icon: Zap, label: 'Energy Boost', color: 'from-orange-400 to-yellow-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen"
    >
      {/* Animated background */}
      <ParticleBackground mood={currentMood} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-white/90 mb-2"
            animate={{
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {getGreeting()}, {userName}
          </motion.h1>
          <p className="text-white/60">How are you feeling today?</p>
        </motion.div>

        {/* Mood Orb */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', damping: 12 }}
          className="mb-8"
        >
          <MoodOrb mood={currentMood} size="large" />
        </motion.div>

        {/* Current state message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/70 text-center mb-12 max-w-sm"
        >
          {currentMood === 'calm' && "You're in a peaceful state. Perfect time for reflection."}
          {currentMood === 'anxious' && "Feeling overwhelmed? Let's find your center together."}
          {currentMood === 'happy' && "Your positive energy is radiant! Capture this moment."}
          {currentMood === 'neutral' && "Take a moment to check in with yourself."}
        </motion.p>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-3 gap-4 w-full max-w-md"
        >
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/80 text-sm text-center">{action.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Daily affirmation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 max-w-md"
        >
          <p className="text-white/50 text-sm mb-2">Today's affirmation</p>
          <p className="text-white/80 italic">
            "You are exactly where you need to be. Breathe, and trust the journey."
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
