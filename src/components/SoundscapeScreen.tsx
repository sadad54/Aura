import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ParticleBackground } from './ParticleBackground';
import { Play, Pause, Volume2, Droplets, Waves, Cloud, Flame } from 'lucide-react';

/**
 * SoundscapeScreen Component
 * 
 * HCI Principles:
 * - Synesthetic design: Visual waveforms sync with audio concept
 * - Ambient control: Non-intrusive playback with environmental themes
 * - Spatial audio metaphor: Scene selection changes visual environment
 */

type Scene = 'rainforest' | 'ocean' | 'space' | 'fireplace';

const scenes = [
  {
    id: 'rainforest' as Scene,
    label: 'Rainforest',
    icon: Droplets,
    color: 'from-green-400 to-teal-500',
    particles: 'from-green-500/20 via-teal-500/20 to-emerald-500/20',
  },
  {
    id: 'ocean' as Scene,
    label: 'Ocean Waves',
    icon: Waves,
    color: 'from-blue-400 to-cyan-500',
    particles: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
  },
  {
    id: 'space' as Scene,
    label: 'Deep Space',
    icon: Cloud,
    color: 'from-indigo-400 to-purple-500',
    particles: 'from-indigo-500/20 via-purple-500/20 to-violet-500/20',
  },
  {
    id: 'fireplace' as Scene,
    label: 'Fireplace',
    icon: Flame,
    color: 'from-orange-400 to-red-500',
    particles: 'from-orange-500/20 via-red-500/20 to-amber-500/20',
  },
];

export function SoundscapeScreen() {
  const [selectedScene, setSelectedScene] = useState<Scene>('ocean');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);

  const currentScene = scenes.find(s => s.id === selectedScene)!;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen"
    >
      {/* Dynamic background based on scene */}
      <div className="absolute inset-0">
        <motion.div
          key={selectedScene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${currentScene.particles}`}
        >
          <ParticleBackground mood="calm" />
        </motion.div>
      </div>

      <div className="relative z-10 px-6 py-12 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-white/90 mb-2">Soundscapes</h2>
          <p className="text-white/60">Immerse yourself in calming environments</p>
        </motion.div>

        {/* Central waveform visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-12"
        >
          {/* Circular player */}
          <div className="relative w-64 h-64 mx-auto">
            {/* Outer rotating ring */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${currentScene.color} opacity-20`}
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* Middle pulsing ring */}
            <motion.div
              className={`absolute inset-4 rounded-full bg-gradient-to-br ${currentScene.color} opacity-30`}
              animate={{
                scale: isPlaying ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Inner circle - play button */}
            <motion.button
              className={`absolute inset-8 rounded-full bg-gradient-to-br ${currentScene.color} flex items-center justify-center shadow-2xl`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <Pause className="w-12 h-12 text-white fill-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <Play className="w-12 h-12 text-white fill-white ml-1" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Waveform bars around circle */}
            {isPlaying &&
              [...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 bg-gradient-to-t ${currentScene.color} rounded-full`}
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'center',
                    transform: `rotate(${i * 30}deg) translateY(-140px)`,
                  }}
                  animate={{
                    height: [20, 40, 20],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.1,
                  }}
                />
              ))}
          </div>

          {/* Scene label */}
          <motion.p
            key={selectedScene}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white/90 mt-6"
          >
            {currentScene.label}
          </motion.p>
        </motion.div>

        {/* Scene selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {scenes.map((scene) => {
            const Icon = scene.icon;
            const isSelected = selectedScene === scene.id;
            return (
              <motion.button
                key={scene.id}
                onClick={() => setSelectedScene(scene.id)}
                className={`p-4 rounded-2xl backdrop-blur-sm border transition-all ${
                  isSelected
                    ? 'bg-white/10 border-white/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${scene.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={isSelected ? 'text-white/90' : 'text-white/60'}>
                    {scene.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Volume control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <div className="flex items-center gap-4">
            <Volume2 className="w-5 h-5 text-white/60" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
            <span className="text-white/60 text-sm w-12 text-right">{volume}%</span>
          </div>
        </motion.div>

        {/* AR Toggle (placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80">AR Mode</p>
              <p className="text-white/40 text-sm">Overlay ambient visuals</p>
            </div>
            <div className="px-4 py-2 rounded-lg bg-white/10 text-white/60 text-sm">
              Coming Soon
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
