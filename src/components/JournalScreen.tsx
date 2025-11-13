import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ParticleBackground } from './ParticleBackground';
import { Mic, Pencil, Type, Sparkles, Send } from 'lucide-react';

/**
 * JournalScreen Component
 * 
 * HCI Principles:
 * - Emotion-driven design: Background shifts based on detected sentiment
 * - Low cognitive friction: Single-field input, minimal UI
 * - Ambient feedback: AI suggestions appear non-intrusively
 * - Flow facilitation: Mode switching without losing context
 */

interface JournalScreenProps {
  onMoodChange: (mood: 'calm' | 'anxious' | 'happy' | 'neutral') => void;
}

type JournalMode = 'write' | 'voice' | 'draw';

export function JournalScreen({ onMoodChange }: JournalScreenProps) {
  const [mode, setMode] = useState<JournalMode>('write');
  const [journalText, setJournalText] = useState('');
  const [detectedMood, setDetectedMood] = useState<'calm' | 'anxious' | 'happy' | 'neutral'>('neutral');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);

  // Mock sentiment detection - analyzes text for emotional keywords
  useEffect(() => {
    const text = journalText.toLowerCase();
    
    const calmWords = ['peace', 'calm', 'relax', 'grateful', 'content', 'serene', 'breathe'];
    const anxiousWords = ['stress', 'worry', 'anxious', 'overwhelm', 'nervous', 'fear', 'panic'];
    const happyWords = ['happy', 'joy', 'excited', 'love', 'wonderful', 'great', 'amazing'];
    
    const calmScore = calmWords.filter(word => text.includes(word)).length;
    const anxiousScore = anxiousWords.filter(word => text.includes(word)).length;
    const happyScore = happyWords.filter(word => text.includes(word)).length;
    
    let newMood: 'calm' | 'anxious' | 'happy' | 'neutral' = 'neutral';
    
    if (anxiousScore > calmScore && anxiousScore > happyScore) {
      newMood = 'anxious';
    } else if (happyScore > calmScore && happyScore > anxiousScore) {
      newMood = 'happy';
    } else if (calmScore > 0) {
      newMood = 'calm';
    }
    
    if (newMood !== detectedMood) {
      setDetectedMood(newMood);
      onMoodChange(newMood);
    }

    // Show AI suggestion after user has written a bit
    if (journalText.length > 50 && !showSuggestion) {
      setShowSuggestion(true);
      generateAISuggestion(newMood);
    }
  }, [journalText, detectedMood, onMoodChange, showSuggestion]);

  const generateAISuggestion = (mood: string) => {
    const suggestions = {
      calm: "You seem at peace. What brought you this sense of calm today?",
      anxious: "I notice some tension. Would it help to explore what's weighing on your mind?",
      happy: "Your joy is beautiful. What moment made you smile today?",
      neutral: "What's one thing you're curious about right now?",
    };
    setAiSuggestion(suggestions[mood as keyof typeof suggestions]);
  };

  const modes = [
    { id: 'write' as JournalMode, icon: Type, label: 'Write' },
    { id: 'voice' as JournalMode, icon: Mic, label: 'Voice' },
    { id: 'draw' as JournalMode, icon: Pencil, label: 'Draw' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen"
    >
      {/* Dynamic background based on sentiment */}
      <ParticleBackground mood={detectedMood} />

      <div className="relative z-10 px-6 py-12 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-white/90 mb-2">Your Journal</h2>
          <p className="text-white/60">Express yourself freely. I'm here to listen.</p>
        </motion.div>

        {/* Mode selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-8"
        >
          {modes.map((m) => {
            const Icon = m.icon;
            const isActive = mode === m.id;
            return (
              <motion.button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/10 border border-white/20'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-300' : 'text-white/60'}`} />
                <span className={isActive ? 'text-white/90' : 'text-white/60'}>{m.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Journal input area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <AnimatePresence mode="wait">
            {mode === 'write' && (
              <motion.div
                key="write"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <textarea
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="What's on your mind today?"
                  className="w-full h-64 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white/90 placeholder-white/30 resize-none focus:outline-none focus:border-white/20 transition-colors"
                />
              </motion.div>
            )}

            {mode === 'voice' && (
              <motion.div
                key="voice"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center h-64 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
              >
                <motion.button
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(168, 85, 247, 0.4)',
                      '0 0 0 20px rgba(168, 85, 247, 0)',
                      '0 0 0 0 rgba(168, 85, 247, 0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mic className="w-8 h-8 text-white" />
                </motion.button>
                <p className="text-white/70">Tap to start recording</p>
                <p className="text-white/40 text-sm mt-2">Voice journaling coming soon</p>
              </motion.div>
            )}

            {mode === 'draw' && (
              <motion.div
                key="draw"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center h-64 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
              >
                <Pencil className="w-12 h-12 text-white/40 mb-4" />
                <p className="text-white/70">Visual journaling canvas</p>
                <p className="text-white/40 text-sm mt-2">Draw your emotions - coming soon</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* AI Suggestion chip */}
        <AnimatePresence>
          {showSuggestion && mode === 'write' && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="mb-6 p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-purple-300 flex-shrink-0 mt-0.5" />
                </motion.div>
                <div className="flex-1">
                  <p className="text-purple-200 text-sm mb-1">AI Reflection</p>
                  <p className="text-white/80">{aiSuggestion}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            // Save logic would go here
            alert('Journal entry saved! 💫');
            setJournalText('');
            setShowSuggestion(false);
          }}
        >
          <Send className="w-5 h-5" />
          Save Entry
        </motion.button>

        {/* Mood indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-white/40 text-sm">
            Detected mood:{' '}
            <span className="text-white/70">
              {detectedMood === 'calm' && '🌊 Calm'}
              {detectedMood === 'anxious' && '⚡ Anxious'}
              {detectedMood === 'happy' && '✨ Happy'}
              {detectedMood === 'neutral' && '💭 Neutral'}
            </span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
