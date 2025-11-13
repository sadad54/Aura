import { motion } from 'motion/react';
import { Smile, Meh, Frown, Zap, Heart, Moon, Sun, Cloud } from 'lucide-react';

/**
 * MoodSelector - Interactive mood selection component
 */

interface MoodSelectorProps {
  selected: string;
  onSelect: (mood: string) => void;
  size?: 'small' | 'medium' | 'large';
}

const moods = [
  { id: 'joyful', emoji: '😊', icon: Smile, color: 'from-yellow-400 to-orange-400', label: 'Joyful' },
  { id: 'calm', emoji: '😌', icon: Moon, color: 'from-teal-400 to-blue-400', label: 'Calm' },
  { id: 'energized', emoji: '⚡', icon: Zap, color: 'from-purple-400 to-pink-400', label: 'Energized' },
  { id: 'neutral', emoji: '😐', icon: Meh, color: 'from-gray-400 to-slate-400', label: 'Neutral' },
  { id: 'anxious', emoji: '😰', icon: Cloud, color: 'from-orange-400 to-red-400', label: 'Anxious' },
  { id: 'sad', emoji: '😢', icon: Frown, color: 'from-blue-400 to-indigo-400', label: 'Sad' },
  { id: 'grateful', emoji: '🙏', icon: Heart, color: 'from-pink-400 to-rose-400', label: 'Grateful' },
  { id: 'peaceful', emoji: '🌙', icon: Sun, color: 'from-indigo-400 to-purple-400', label: 'Peaceful' },
];

export function MoodSelector({ selected, onSelect, size = 'medium' }: MoodSelectorProps) {
  const sizeClasses = {
    small: 'w-10 h-10 text-sm',
    medium: 'w-12 h-12 text-base',
    large: 'w-16 h-16 text-lg',
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {moods.map((mood) => {
        const isSelected = selected === mood.id;
        const Icon = mood.icon;

        return (
          <motion.button
            key={mood.id}
            onClick={() => onSelect(mood.id)}
            className={`
              ${sizeClasses[size]} rounded-2xl
              ${isSelected 
                ? `bg-gradient-to-br ${mood.color} border-2 border-white/40` 
                : 'bg-white/5 border border-white/10'
              }
              flex items-center justify-center
              transition-all
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={mood.label}
          >
            {isSelected ? (
              <Icon className="w-5 h-5 text-white" />
            ) : (
              <span className="text-xl">{mood.emoji}</span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
