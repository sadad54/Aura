import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ParticleBackground } from './ParticleBackground';
import { Sparkles, Moon, Sun, Heart, Zap } from 'lucide-react';

/**
 * OnboardingFlow Component
 * 
 * HCI Principles:
 * - Progressive disclosure: Information revealed step-by-step
 * - Breathing rhythm: Animation timing mimics calming breath patterns
 * - Personalization: Collects preferences to customize experience
 * - Emotional priming: Sets tone for calm, mindful interaction
 */

interface OnboardingFlowProps {
  onComplete: (name: string, mood: 'calm' | 'anxious' | 'happy' | 'neutral') => void;
}

type OnboardingStep = 'welcome' | 'name' | 'mood' | 'breathing';

const moodOptions = [
  { id: 'calm' as const, icon: Moon, label: 'Calm & Peaceful', color: 'from-teal-400 to-blue-500' },
  { id: 'anxious' as const, icon: Zap, label: 'Anxious & Stressed', color: 'from-orange-400 to-red-500' },
  { id: 'happy' as const, icon: Heart, label: 'Happy & Energized', color: 'from-yellow-400 to-pink-500' },
  { id: 'neutral' as const, icon: Sun, label: 'Neutral & Steady', color: 'from-purple-400 to-indigo-500' },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [name, setName] = useState('');
  const [selectedMood, setSelectedMood] = useState<'calm' | 'anxious' | 'happy' | 'neutral'>('calm');
  const [breathCount, setBreathCount] = useState(0);

  // Auto-complete breathing exercise after 3 cycles (24 seconds)
  useEffect(() => {
    if (step === 'breathing') {
      const breatheTimer = setInterval(() => {
        setBreathCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 3) {
            clearInterval(breatheTimer);
            setTimeout(() => onComplete(name, selectedMood), 1000);
          }
          return newCount;
        });
      }, 8000); // 8 seconds per breath cycle

      return () => clearInterval(breatheTimer);
    }
  }, [step, name, selectedMood, onComplete]);

  const handleComplete = () => {
    if (name.trim()) {
      onComplete(name, selectedMood);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950">
      <ParticleBackground mood={selectedMood} />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <AnimatePresence mode="wait">
          {/* Welcome Step */}
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center max-w-md"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="mb-8"
              >
                <Sparkles className="w-20 h-20 text-purple-300 mx-auto" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/90 mb-4"
              >
                Welcome to AURA
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white/60 mb-8"
              >
                Your personal sanctuary for mindfulness, journaling, and emotional well-being
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setStep('name')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Begin Your Journey
              </motion.button>
            </motion.div>
          )}

          {/* Name Step */}
          {step === 'name' && (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="text-center max-w-md w-full"
            >
              <h2 className="text-white/90 mb-4">What should we call you?</h2>
              <p className="text-white/60 mb-8">
                Your name helps us personalize your experience
              </p>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-6 py-4 mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white/90 placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors text-center"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && name.trim()) {
                    setStep('mood');
                  }
                }}
              />

              <button
                onClick={() => name.trim() && setStep('mood')}
                disabled={!name.trim()}
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* Mood Step */}
          {step === 'mood' && (
            <motion.div
              key="mood"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="text-center max-w-md w-full"
            >
              <h2 className="text-white/90 mb-4">How are you feeling today?</h2>
              <p className="text-white/60 mb-8">
                This helps us understand your starting point
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {moodOptions.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood === mood.id;

                  return (
                    <motion.button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className={`p-6 rounded-2xl backdrop-blur-sm border transition-all ${
                        isSelected
                          ? 'bg-white/10 border-white/30'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${mood.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <p className={isSelected ? 'text-white/90' : 'text-white/60'}>
                        {mood.label}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep('breathing')}
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* Breathing Exercise Step */}
          {step === 'breathing' && (
            <motion.div
              key="breathing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center max-w-md"
            >
              <h2 className="text-white/90 mb-4">Let's take a moment</h2>
              <p className="text-white/60 mb-8">
                Follow the breathing circle to center yourself
              </p>

              {/* Breathing circle */}
              <div className="relative w-64 h-64 mx-auto mb-8">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/40 via-blue-400/40 to-purple-500/40 blur-2xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <motion.div
                  className="absolute inset-8 rounded-full bg-gradient-to-br from-teal-400 via-blue-400 to-purple-500"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="text-white text-xl"
                      animate={{
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {breathCount < 4 ? 'Breathe' : 'Complete'}
                    </motion.span>
                  </div>
                </motion.div>
              </div>

              <p className="text-white/50 text-sm">
                {breathCount < 3 ? `Breath ${breathCount + 1} of 3` : 'Entering AURA...'}
              </p>

              {/* Skip button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => onComplete(name, selectedMood)}
                className="mt-6 px-6 py-2 text-white/50 hover:text-white/80 transition-colors text-sm"
              >
                Skip and Enter
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {['welcome', 'name', 'mood', 'breathing'].map((s, i) => (
          <motion.div
            key={s}
            className={`h-1 rounded-full transition-all ${
              ['welcome', 'name', 'mood', 'breathing'].indexOf(step) >= i
                ? 'w-8 bg-white/60'
                : 'w-4 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}