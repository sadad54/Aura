import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ParticleBackground } from './ParticleBackground';
import { GlassCard } from './ui-library/GlassCard';
import { 
  Brain, Heart, Wind, Shield, Lightbulb, MessageCircle,
  AlertCircle, CheckCircle, Eye, Ear, Hand, Zap, Sparkles
} from 'lucide-react';

/**
 * Mental Wellness Toolkit - Therapist-Inspired Tools
 * CBT, anxiety management, grounding exercises
 */

type Tool = 'grounding' | 'breathwork' | 'cbt' | 'emotion' | 'affirmation' | 'inner-child';

export function MentalWellnessToolkit() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [groundingStep, setGroundingStep] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const tools = [
    { 
      id: 'grounding' as Tool, 
      icon: Shield, 
      color: 'from-teal-400 to-cyan-500',
      title: 'Panic SOS',
      description: '5-4-3-2-1 Grounding Technique'
    },
    { 
      id: 'breathwork' as Tool, 
      icon: Wind, 
      color: 'from-blue-400 to-indigo-500',
      title: 'Breath Training',
      description: 'Calm your nervous system'
    },
    { 
      id: 'cbt' as Tool, 
      icon: Brain, 
      color: 'from-purple-400 to-pink-500',
      title: 'Thought Reframe',
      description: 'CBT negative thought tracker'
    },
    { 
      id: 'emotion' as Tool, 
      icon: Heart, 
      color: 'from-pink-400 to-rose-500',
      title: 'Emotion Wheel',
      description: 'Identify what you truly feel'
    },
    { 
      id: 'affirmation' as Tool, 
      icon: Sparkles, 
      color: 'from-yellow-400 to-orange-500',
      title: 'Affirmations',
      description: 'Daily empowerment cards'
    },
    { 
      id: 'inner-child' as Tool, 
      icon: MessageCircle, 
      color: 'from-indigo-400 to-purple-500',
      title: 'Inner Child',
      description: 'Guided healing dialog'
    },
  ];

  const groundingSteps = [
    { sense: 'See', icon: Eye, prompt: 'Name 5 things you can see', items: 5 },
    { sense: 'Touch', icon: Hand, prompt: 'Name 4 things you can touch', items: 4 },
    { sense: 'Hear', icon: Ear, prompt: 'Name 3 things you can hear', items: 3 },
    { sense: 'Smell', icon: Wind, prompt: 'Name 2 things you can smell', items: 2 },
    { sense: 'Taste', icon: Heart, prompt: 'Name 1 thing you can taste', items: 1 },
  ];

  const affirmations = [
    "I am worthy of love and peace",
    "My feelings are valid and important",
    "I choose to let go of what I cannot control",
    "I am growing stronger every day",
    "This too shall pass",
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
          <h2 className="text-white/90 mb-2">Wellness Toolkit</h2>
          <p className="text-white/60">Evidence-based mental health tools</p>
        </motion.div>

        {/* Emergency SOS Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-5 bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-400/30">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-300" />
              <div className="flex-1">
                <h4 className="text-white/90 mb-1">Feeling overwhelmed?</h4>
                <p className="text-white/70 text-sm">Quick grounding exercise available below</p>
              </div>
              <motion.button
                className="px-4 py-2 rounded-lg bg-red-400/30 text-white text-sm"
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveTool('grounding')}
              >
                Start
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Tools Grid */}
        {!activeTool && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={() => setActiveTool(tool.id)}
                  className="text-left"
                >
                  <GlassCard className="p-6 h-full" hover>
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${tool.color} mb-4 inline-block`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white/90 mb-2">{tool.title}</h3>
                    <p className="text-white/60 text-sm">{tool.description}</p>
                  </GlassCard>
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* Active Tool Views */}
        <AnimatePresence mode="wait">
          {/* 5-4-3-2-1 Grounding */}
          {activeTool === 'grounding' && (
            <motion.div
              key="grounding"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <GlassCard variant="strong" className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-white/90 mb-2">5-4-3-2-1 Grounding</h3>
                  <p className="text-white/60 text-sm">Focus on your senses to calm anxiety</p>
                </div>

                {groundingStep < groundingSteps.length ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <motion.div
                        key={groundingStep}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-block p-6 rounded-full bg-gradient-to-br from-teal-400/20 to-cyan-500/20 mb-4"
                      >
                        {(() => {
                          const Icon = groundingSteps[groundingStep].icon;
                          return <Icon className="w-12 h-12 text-teal-300" />;
                        })()}
                      </motion.div>
                      <h4 className="text-white/90 text-xl mb-2">
                        {groundingSteps[groundingStep].prompt}
                      </h4>
                      <p className="text-white/50 text-sm">Step {groundingStep + 1} of 5</p>
                    </div>

                    <div className="space-y-2">
                      {[...Array(groundingSteps[groundingStep].items)].map((_, i) => (
                        <div 
                          key={i}
                          className="p-3 rounded-lg bg-white/5 border border-white/10 text-white/70"
                        >
                          {i + 1}. Think of something...
                        </div>
                      ))}
                    </div>

                    <motion.button
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-white"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setGroundingStep(groundingStep + 1)}
                    >
                      Next
                    </motion.button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                  >
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                    <h4 className="text-white/90 text-xl">Exercise Complete</h4>
                    <p className="text-white/60">
                      How are you feeling now? Take a moment to notice your breath.
                    </p>
                    <motion.button
                      className="px-6 py-3 rounded-xl bg-white/10 text-white/90"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => {
                        setActiveTool(null);
                        setGroundingStep(0);
                      }}
                    >
                      Return to Toolkit
                    </motion.button>
                  </motion.div>
                )}
              </GlassCard>
            </motion.div>
          )}

          {/* Breathwork */}
          {activeTool === 'breathwork' && (
            <motion.div
              key="breathwork"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <GlassCard variant="strong" className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-white/90 mb-2">Box Breathing</h3>
                  <p className="text-white/60 text-sm">4-4-4-4 breathing pattern</p>
                </div>

                <div className="relative w-64 h-64 mx-auto mb-8">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/40 to-indigo-500/40 blur-3xl"
                    animate={{
                      scale: breathPhase === 'inhale' ? [1, 1.3] : breathPhase === 'exhale' ? [1.3, 1] : 1.3,
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  <motion.div
                    className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center"
                    animate={{
                      scale: breathPhase === 'inhale' ? [1, 1.2] : breathPhase === 'exhale' ? [1.2, 1] : 1.2,
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <span className="text-white text-xl capitalize">{breathPhase}</span>
                  </motion.div>
                </div>

                <motion.button
                  className="w-full py-4 rounded-xl bg-white/10 text-white/90"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveTool(null)}
                >
                  Close
                </motion.button>
              </GlassCard>
            </motion.div>
          )}

          {/* Affirmations */}
          {activeTool === 'affirmation' && (
            <motion.div
              key="affirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <GlassCard variant="strong" className="p-8">
                <div className="text-center mb-8">
                  <Sparkles className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                  <h3 className="text-white/90 mb-2">Daily Affirmations</h3>
                  <p className="text-white/60 text-sm">Positive beliefs to empower your day</p>
                </div>

                <div className="space-y-4 mb-6">
                  {affirmations.map((affirmation, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <GlassCard className="p-5 text-center">
                        <p className="text-white/90 italic">"{affirmation}"</p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveTool(null)}
                >
                  Save to Favorites
                </motion.button>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Button */}
        {activeTool && activeTool !== 'grounding' && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full py-3 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 transition-all"
            onClick={() => setActiveTool(null)}
          >
            ← Back to Toolkit
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
