import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExtendedNavigation } from './components/ExtendedNavigation';
import { EnhancedHomeScreen } from './components/EnhancedHomeScreen';
import { AdvancedJournalScreen } from './components/AdvancedJournalScreen';
import { SoundscapeScreen } from './components/SoundscapeScreen';
import { ReflectionScreen } from './components/ReflectionScreen';
import { HabitTrackerScreen } from './components/HabitTrackerScreen';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { MentalWellnessToolkit } from './components/MentalWellnessToolkit';
import { OnboardingFlow } from './components/OnboardingFlow';

/**
 * AURA - AI Wellness & Meditation App
 * 
 * HCI Principles:
 * - Emotion-driven design: UI responds to user state and time of day
 * - Progressive disclosure: Content revealed contextually
 * - Flow-state facilitation: Smooth transitions reduce cognitive friction
 * - Ambient feedback: Visual and motion cues provide calm reassurance
 */

type Screen = 'home' | 'journal' | 'soundscape' | 'reflection' | 'habits' | 'analytics' | 'wellness' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [userName, setUserName] = useState<string>('');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentMood, setCurrentMood] = useState<'calm' | 'anxious' | 'happy' | 'neutral'>('calm');

  // Check if user has completed onboarding
  useEffect(() => {
    const savedName = localStorage.getItem('aura_user_name');
    const onboardingComplete = localStorage.getItem('aura_onboarding_complete');
    
    if (savedName && onboardingComplete) {
      setUserName(savedName);
      setHasCompletedOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = (name: string, mood: 'calm' | 'anxious' | 'happy' | 'neutral') => {
    setUserName(name);
    setCurrentMood(mood);
    setHasCompletedOnboarding(true);
    localStorage.setItem('aura_user_name', name);
    localStorage.setItem('aura_onboarding_complete', 'true');
  };

  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950">
      {/* Screen Content */}
      <main className="relative z-10 pb-24">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <EnhancedHomeScreen key="home" userName={userName} currentMood={currentMood} />
          )}
          {currentScreen === 'journal' && (
            <AdvancedJournalScreen key="journal" onMoodChange={setCurrentMood} />
          )}
          {currentScreen === 'soundscape' && (
            <SoundscapeScreen key="soundscape" />
          )}
          {currentScreen === 'reflection' && (
            <ReflectionScreen key="reflection" userName={userName} />
          )}
          {currentScreen === 'habits' && (
            <HabitTrackerScreen key="habits" />
          )}
          {currentScreen === 'analytics' && (
            <AnalyticsDashboard key="analytics" userName={userName} />
          )}
          {currentScreen === 'wellness' && (
            <MentalWellnessToolkit key="wellness" />
          )}
          {currentScreen === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="min-h-screen flex items-center justify-center"
            >
              <div className="text-center space-y-4 px-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 mx-auto flex items-center justify-center mb-6">
                  <span className="text-4xl">{userName.charAt(0).toUpperCase()}</span>
                </div>
                <h2 className="text-white/90">Welcome, {userName}</h2>
                <p className="text-white/60">Your profile and settings</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <ExtendedNavigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
}