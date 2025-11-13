import { motion } from 'motion/react';
import { Home, BookOpen, Waves, TrendingUp, User } from 'lucide-react';

/**
 * Navigation Component
 * 
 * HCI Principles:
 * - Clear affordances with icons + labels
 * - Smooth micro-interactions (scale, glow) provide tactile feedback
 * - Low cognitive load: 5 primary actions, spatially consistent
 */

type Screen = 'home' | 'journal' | 'soundscape' | 'reflection' | 'profile';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems = [
  { id: 'home' as Screen, icon: Home, label: 'Home' },
  { id: 'journal' as Screen, icon: BookOpen, label: 'Journal' },
  { id: 'soundscape' as Screen, icon: Waves, label: 'Sounds' },
  { id: 'reflection' as Screen, icon: TrendingUp, label: 'Reflect' },
  { id: 'profile' as Screen, icon: User, label: 'Profile' },
];

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-t border-white/5"
    >
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center gap-1 px-4 py-2"
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow effect for active state */}
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"
                    transition={{ type: 'spring', damping: 20 }}
                  />
                )}

                {/* Icon */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    color: isActive ? 'rgb(216, 180, 254)' : 'rgb(255, 255, 255, 0.5)',
                  }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>

                {/* Label */}
                <motion.span
                  animate={{
                    opacity: isActive ? 1 : 0.5,
                    color: isActive ? 'rgb(216, 180, 254)' : 'rgb(255, 255, 255, 0.5)',
                  }}
                  className="text-xs"
                >
                  {item.label}
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
