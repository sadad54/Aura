import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ParticleBackground } from './ParticleBackground';
import { GlassCard } from './ui-library/GlassCard';
import { MoodSelector } from './ui-library/MoodSelector';
import { 
  Mic, Image as ImageIcon, Type, Sparkles, Send, Lightbulb,
  RefreshCw, Camera, Tag, Calendar, ChevronRight
} from 'lucide-react';

/**
 * Advanced Journal Screen - Rich journaling with AI assistance
 */

interface AdvancedJournalScreenProps {
  onMoodChange: (mood: 'calm' | 'anxious' | 'happy' | 'neutral') => void;
}

type JournalMode = 'write' | 'voice' | 'photo';
type AIAction = 'clarify' | 'summarize' | 'rewrite' | 'prompt';

export function AdvancedJournalScreen({ onMoodChange }: AdvancedJournalScreenProps) {
  const [mode, setMode] = useState<JournalMode>('write');
  const [journalText, setJournalText] = useState('');
  const [selectedMood, setSelectedMood] = useState('calm');
  const [moodIntensity, setMoodIntensity] = useState(5);
  const [showAIAssist, setShowAIAssist] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const modes = [
    { id: 'write' as JournalMode, icon: Type, label: 'Write' },
    { id: 'voice' as JournalMode, icon: Mic, label: 'Voice' },
    { id: 'photo' as JournalMode, icon: Camera, label: 'Photo' },
  ];

  const aiActions = [
    { id: 'clarify' as AIAction, icon: Lightbulb, label: 'Clarify thoughts', color: 'from-yellow-400 to-orange-500' },
    { id: 'summarize' as AIAction, icon: Sparkles, label: 'Summarize', color: 'from-purple-400 to-pink-500' },
    { id: 'rewrite' as AIAction, icon: RefreshCw, label: 'Rewrite positively', color: 'from-green-400 to-emerald-500' },
    { id: 'prompt' as AIAction, icon: ChevronRight, label: 'Get prompts', color: 'from-blue-400 to-cyan-500' },
  ];

  const suggestedTags = ['gratitude', 'growth', 'relationships', 'work', 'health', 'dreams'];

  const guidedPrompts = [
    { category: 'Gratitude', prompt: "What are three things you're grateful for today?" },
    { category: 'Growth', prompt: "What's one thing you learned about yourself this week?" },
    { category: 'Reflection', prompt: 'How did you show up for yourself today?' },
    { category: 'Purpose', prompt: 'What made you feel most alive recently?' },
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
          <h2 className="text-white/90 mb-2">Journal Entry</h2>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </motion.div>

        {/* Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2"
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

        {/* Mood Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard variant="strong" className="p-5">
            <h3 className="text-white/90 mb-4">How are you feeling?</h3>
            <MoodSelector selected={selectedMood} onSelect={setSelectedMood} size="small" />
            
            {/* Mood Intensity Slider */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>Intensity</span>
                <span>{moodIntensity}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={moodIntensity}
                onChange={(e) => setMoodIntensity(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-400 [&::-webkit-slider-thumb]:to-pink-500"
              />
            </div>
          </GlassCard>
        </motion.div>

        {/* Writing Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard variant="default" className="p-6">
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="What's on your mind today?"
              className="w-full h-64 bg-transparent text-white/90 placeholder-white/30 resize-none focus:outline-none"
            />

            {/* Word Count */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
              <span className="text-white/40 text-sm">
                {journalText.split(' ').filter(w => w).length} words
              </span>
              <motion.button
                className="text-purple-300 text-sm flex items-center gap-1"
                whileHover={{ x: 3 }}
                onClick={() => setShowAIAssist(!showAIAssist)}
              >
                <Sparkles className="w-4 h-4" />
                AI Assist
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Assistant */}
        <AnimatePresence>
          {showAIAssist && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <GlassCard className="p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/20">
                <h4 className="text-white/90 mb-4">AI Writing Assistant</h4>
                <div className="grid grid-cols-2 gap-3">
                  {aiActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={action.id}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color} inline-block mb-2`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-white/80 text-sm">{action.label}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard variant="subtle" className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-white/60" />
              <h4 className="text-white/80 text-sm">Add Tags</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => {
                const isSelected = tags.includes(tag);
                return (
                  <motion.button
                    key={tag}
                    onClick={() => {
                      if (isSelected) {
                        setTags(tags.filter(t => t !== tag));
                      } else {
                        setTags([...tags, tag]);
                      }
                    }}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${
                      isSelected
                        ? 'bg-purple-500/30 text-purple-200 border border-purple-400/40'
                        : 'bg-white/5 text-white/60 border border-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    #{tag}
                  </motion.button>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Guided Prompts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-white/70 mb-3 text-sm uppercase tracking-wide">Guided Prompts</h3>
          <div className="space-y-2">
            {guidedPrompts.map((prompt, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.05 }}
                onClick={() => setJournalText(prompt.prompt)}
                className="w-full text-left"
              >
                <GlassCard className="p-4 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="px-2 py-1 rounded bg-purple-500/20 text-purple-200 text-xs">
                      {prompt.category}
                    </div>
                    <p className="text-white/70 text-sm flex-1">{prompt.prompt}</p>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </div>
                </GlassCard>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
            whileHover={{ scale: 1.02, boxShadow: '0 20px 50px rgba(168, 85, 247, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => alert('Entry saved! 💫')}
          >
            <Send className="w-5 h-5" />
            Save Entry
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}