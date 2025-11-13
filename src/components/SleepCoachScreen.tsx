import { useState } from 'react';
import { motion } from 'motion/react';
import { ParticleBackground } from './ParticleBackground';
import { GlassCard } from './ui-library/GlassCard';
import { 
  Moon, Sun, Cloud, Star, Clock, Bell, Sparkles,
  TrendingUp, Volume2, Coffee, Smartphone, Book
} from 'lucide-react';

/**
 * Sleep Coach Screen - Intelligent sleep optimization
 */

export function SleepCoachScreen() {
  const [bedtime, setBedtime] = useState('22:00');
  const [wakeTime, setWakeTime] = useState('06:00');

  // Mock sleep data
  const sleepQuality = 78;
  const sleepScore = 8.2;
  const deepSleep = 35; // percentage
  const remSleep = 25;
  const lightSleep = 40;

  const sleepSoundscapes = [
    { id: 1, name: 'Rain on Leaves', icon: Cloud, duration: '8 hours', color: 'from-blue-400 to-cyan-500' },
    { id: 2, name: 'Ocean Waves', icon: Moon, duration: '8 hours', color: 'from-indigo-400 to-blue-500' },
    { id: 3, name: 'White Noise', icon: Star, duration: '8 hours', color: 'from-purple-400 to-indigo-500' },
    { id: 4, name: 'Forest Night', icon: Star, duration: '8 hours', color: 'from-green-400 to-teal-500' },
  ];

  const windDownRoutine = [
    { id: 1, activity: 'Dim lights', icon: Sun, time: '21:00', active: true },
    { id: 2, activity: 'No screens', icon: Smartphone, time: '21:30', active: false },
    { id: 3, activity: 'Light reading', icon: Book, time: '21:45', active: false },
    { id: 4, activity: 'Meditation', icon: Sparkles, time: '22:00', active: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-gradient-to-b from-indigo-950 to-gray-950"
    >
      {/* Darker, warmer background for sleep */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-gray-900/20" />
      
      <div className="relative z-10 px-6 py-8 max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Moon className="w-8 h-8 text-indigo-300" />
            <h2 className="text-white/90">Sleep Coach</h2>
          </div>
          <p className="text-white/60">Optimize your rest for peak wellness</p>
        </motion.div>

        {/* Sleep Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard variant="strong" className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-400/30">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white/60 text-sm mb-1">Last Night</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-white/90 text-4xl">{sleepScore}</span>
                  <span className="text-white/60">/10</span>
                </div>
              </div>
              
              {/* Circular sleep quality */}
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="6"
                    fill="none"
                  />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="url(#sleepGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 251" }}
                    animate={{ 
                      strokeDasharray: `${(sleepQuality / 100) * 251} 251`
                    }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                  <defs>
                    <linearGradient id="sleepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/90">{sleepQuality}%</span>
                </div>
              </div>
            </div>

            {/* Sleep Phases */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">Deep Sleep</span>
                  <span className="text-indigo-300">{deepSleep}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${deepSleep}%` }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">REM Sleep</span>
                  <span className="text-purple-300">{remSleep}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${remSleep}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">Light Sleep</span>
                  <span className="text-blue-300">{lightSleep}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${lightSleep}%` }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Sleep Advisor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/20">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-white/90 mb-1">AI Sleep Advisor</h4>
                <p className="text-white/70 text-sm mb-3">
                  Your body is slightly overstimulated. Try a 10-minute wind-down ritual starting at 9 PM. 
                  Avoid blue light 90 minutes before bed.
                </p>
                <motion.button
                  className="text-purple-300 text-sm flex items-center gap-1"
                  whileHover={{ x: 5 }}
                >
                  Start Wind-Down
                  <TrendingUp className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Sleep Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard variant="strong" className="p-6">
            <h3 className="text-white/90 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Sleep Schedule
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Bedtime</label>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                  <Moon className="w-5 h-5 text-indigo-300" />
                  <input
                    type="time"
                    value={bedtime}
                    onChange={(e) => setBedtime(e.target.value)}
                    className="bg-transparent text-white/90 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 block">Wake Time</label>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-yellow-300" />
                  <input
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="bg-transparent text-white/90 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-indigo-500/10 border border-indigo-400/20">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Bell className="w-4 h-4" />
                <span>Recommended: 7-9 hours of sleep</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Wind-Down Routine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-white/70 mb-3 text-sm uppercase tracking-wide">Wind-Down Routine</h3>
          <div className="space-y-2">
            {windDownRoutine.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.05 }}
                >
                  <GlassCard className={`p-4 ${item.active ? 'bg-white/10' : 'bg-white/5'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        item.active 
                          ? 'bg-gradient-to-br from-indigo-400 to-purple-500' 
                          : 'bg-white/10'
                      }`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white/90">{item.activity}</p>
                        <p className="text-white/50 text-sm">{item.time}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full ${
                        item.active ? 'bg-green-400' : 'bg-white/20'
                      }`} />
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Sleep Soundscapes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-white/70 mb-3 text-sm uppercase tracking-wide">Sleep Soundscapes</h3>
          <div className="grid grid-cols-2 gap-3">
            {sleepSoundscapes.map((soundscape, i) => {
              const Icon = soundscape.icon;
              return (
                <motion.button
                  key={soundscape.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.05 }}
                  className="text-left"
                >
                  <GlassCard className="p-4 hover:bg-white/10 transition-all">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${soundscape.color} mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white/90 text-sm mb-1">{soundscape.name}</p>
                    <p className="text-white/50 text-xs">{soundscape.duration}</p>
                  </GlassCard>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Smart Wake */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard variant="subtle" className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-yellow-300" />
                <div>
                  <p className="text-white/90">Smart Wake</p>
                  <p className="text-white/50 text-sm">Wake during light sleep</p>
                </div>
              </div>
              <div className="w-12 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 p-1">
                <motion.div
                  className="w-4 h-4 rounded-full bg-white"
                  animate={{ x: 24 }}
                />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
