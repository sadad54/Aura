import { motion } from 'motion/react';

/**
 * ParticleBackground Component
 * 
 * HCI Principles:
 * - Depth perception: Floating particles create spatial awareness
 * - Ambient motion: Subtle animation reduces visual stagnation without distraction
 * - Calming rhythm: Slow, organic movement patterns
 */

interface ParticleBackgroundProps {
  mood?: 'calm' | 'anxious' | 'happy' | 'neutral';
}

export function ParticleBackground({ mood = 'calm' }: ParticleBackgroundProps) {
  // Generate particles with varying positions and sizes
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  // Gradient based on mood
  const gradients = {
    calm: 'from-teal-500/10 via-indigo-500/10 to-purple-500/10',
    anxious: 'from-orange-500/10 via-red-500/10 to-pink-500/10',
    happy: 'from-yellow-500/10 via-pink-500/10 to-rose-500/10',
    neutral: 'from-purple-500/10 via-blue-500/10 to-indigo-500/10',
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradients[mood]}`}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20 backdrop-blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(particle.id) * 20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}

      {/* Additional ambient glow spots */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  );
}
