import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, BookOpen, Waves, TrendingUp, User, Menu, X,
  Target, Heart, BarChart3, Brain
} from 'lucide-react';
import { GlassCard } from './ui-library/GlassCard';

/**
 * Extended Navigation with Menu
 * Primary: Home, Journal, Soundscape, Analytics, Profile
 * Extended: Habits, Wellness Toolkit
 */

type Screen = 'home' | 'journal' | 'soundscape' | 'reflection' | 'habits' | 'analytics' | 'wellness' | 'profile';

interface ExtendedNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const primaryNav = [
  { id: 'home' as Screen, icon: Home, label: 'Home' },
  { id: 'journal' as Screen, icon: BookOpen, label: 'Journal' },
  { id: 'soundscape' as Screen, icon: Waves, label: 'Sounds' },
  { id: 'analytics' as Screen, icon: BarChart3, label: 'Insights' },
  { id: 'profile' as Screen, icon: User, label: 'Profile' },
];

const extendedNav = [
  { id: 'habits' as Screen, icon: Target, label: 'Habits', color: 'from-green-400 to-emerald-500' },
  { id: 'wellness' as Screen, icon: Brain, label: 'Wellness', color: 'from-purple-400 to-pink-500' },
  { id: 'reflection' as Screen, icon: Heart, label: 'Reflection', color: 'from-pink-400 to-rose-500' },
];

export function ExtendedNavigation({ currentScreen, onNavigate }: ExtendedNavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (screen: Screen) => {
    onNavigate(screen);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Extended Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-0 left-0 right-0 z-50 pb-24"
            >
              <div className="max-w-md mx-auto px-4">
                <GlassCard variant="strong" className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white/90">More Features</h3>
                    <motion.button
                      onClick={() => setMenuOpen(false)}
                      className="p-2 rounded-lg bg-white/10 text-white/70 hover:text-white/90"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {extendedNav.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = currentScreen === item.id;

                      return (
                        <motion.button
                          key={item.id}
                          onClick={() => handleNavigate(item.id)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className={`p-4 rounded-xl bg-gradient-to-br ${item.color}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className={isActive ? 'text-white/90' : 'text-white/70'}>
                            {item.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Primary Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-t border-white/5"
      >
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="relative flex flex-col items-center gap-1 px-3 py-2"
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"
                      transition={{ type: 'spring', damping: 20 }}
                    />
                  )}

                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      color: isActive ? 'rgb(216, 180, 254)' : 'rgb(255, 255, 255, 0.5)',
                    }}
                    transition={{ type: 'spring', damping: 15 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>

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

            {/* Menu Button */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative flex flex-col items-center gap-1 px-3 py-2"
              whileTap={{ scale: 0.95 }}
            >
              {menuOpen && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"
                  transition={{ type: 'spring', damping: 20 }}
                />
              )}

              <motion.div
                animate={{
                  scale: menuOpen ? 1.1 : 1,
                  color: menuOpen ? 'rgb(216, 180, 254)' : 'rgb(255, 255, 255, 0.5)',
                  rotate: menuOpen ? 90 : 0,
                }}
                transition={{ type: 'spring', damping: 15 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>

              <motion.span
                animate={{
                  opacity: menuOpen ? 1 : 0.5,
                  color: menuOpen ? 'rgb(216, 180, 254)' : 'rgb(255, 255, 255, 0.5)',
                }}
                className="text-xs"
              >
                More
              </motion.span>
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
