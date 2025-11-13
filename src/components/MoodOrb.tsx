import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

/**
 * MoodOrb Component - Dynamic Emotional Visual
 * 
 * HCI Principles:
 * - Emotion-driven design: Color changes reflect user's emotional state
 * - Ambient feedback: Gentle pulsing creates calming rhythm
 * - Visual metaphor: Orb represents user's inner state
 */

interface MoodOrbProps {
  mood: 'calm' | 'anxious' | 'happy' | 'neutral';
  size?: 'small' | 'medium' | 'large';
}

const moodColors = {
  calm: {
    from: 'from-teal-400/40',
    via: 'via-blue-400/40',
    to: 'to-indigo-500/40',
    glow: 'shadow-teal-500/50',
  },
  anxious: {
    from: 'from-orange-400/40',
    via: 'via-red-400/40',
    to: 'to-pink-500/40',
    glow: 'shadow-orange-500/50',
  },
  happy: {
    from: 'from-yellow-400/40',
    via: 'via-pink-400/40',
    to: 'to-rose-500/40',
    glow: 'shadow-pink-500/50',
  },
  neutral: {
    from: 'from-purple-400/40',
    via: 'via-indigo-400/40',
    to: 'to-blue-500/40',
    glow: 'shadow-purple-500/50',
  },
};

const sizeClasses = {
  small: 'w-32 h-32',
  medium: 'w-48 h-48',
  large: 'w-64 h-64',
};

export function MoodOrb({ mood, size = 'large' }: MoodOrbProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const colors = moodColors[mood];

  useEffect(() => {
    setIsAnimating(true);
  }, [mood]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      <motion.div
        className={`absolute ${sizeClasses[size]} rounded-full bg-gradient-to-br ${colors.from} ${colors.via} ${colors.to} blur-3xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Middle ring */}
      <motion.div
        className={`absolute ${sizeClasses[size]} rounded-full bg-gradient-to-br ${colors.from} ${colors.via} ${colors.to} blur-2xl`}
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Core orb */}
      <motion.div
        className={`relative ${sizeClasses[size]} rounded-full bg-gradient-to-br ${colors.from} ${colors.via} ${colors.to} shadow-2xl ${colors.glow}`}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Inner light */}
        <div className="absolute inset-8 rounded-full bg-white/10 blur-xl" />
        
        {/* Floating particles inside orb */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full blur-sm"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 15}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
