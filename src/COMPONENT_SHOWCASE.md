# AURA Component Library Showcase

## 🎨 Visual Components Reference

### Core Reusable Components

---

## 1. GlassCard Component

**Location:** `/components/ui-library/GlassCard.tsx`

**Purpose:** Primary container for all UI elements with glassmorphism effect

**Variants:**
```tsx
// Subtle - Barely visible, for backgrounds
<GlassCard variant="subtle">...</GlassCard>

// Default - Standard cards
<GlassCard variant="default">...</GlassCard>

// Strong - High contrast, primary content
<GlassCard variant="strong">...</GlassCard>
```

**Visual Properties:**
- Backdrop blur (20px)
- Semi-transparent background
- Subtle border
- Rounded corners (16px)
- Optional hover scale effect

**Use Cases:**
- Content containers
- Card layouts
- Modal overlays
- Information panels

---

## 2. MoodOrb Component

**Location:** `/components/MoodOrb.tsx`

**Purpose:** Dynamic emotional state visualization

**Features:**
- 3-layer pulsing rings
- 6 floating particles
- Mood-reactive colors
- Breathing animation

**Sizes:**
```tsx
<MoodOrb mood="calm" size="small" />   // 128px
<MoodOrb mood="happy" size="medium" />  // 192px
<MoodOrb mood="anxious" size="large" /> // 256px
```

**Mood Colors:**
- Calm: Teal → Blue → Indigo
- Anxious: Orange → Red → Pink  
- Happy: Yellow → Pink → Rose
- Neutral: Purple → Indigo → Blue

**Animation:**
- Outer ring: 4s pulse (scale 1 → 1.2)
- Middle ring: 3s pulse (scale 1.1 → 0.9)
- Core: 2s pulse (scale 1 → 1.05)
- Particles: 3-8s floating drift

---

## 3. MoodSelector Component

**Location:** `/components/ui-library/MoodSelector.tsx`

**Purpose:** Interactive 8-mood selection grid

**Moods:**
1. Joyful 😊 (Yellow-Orange)
2. Calm 😌 (Teal-Blue)
3. Energized ⚡ (Purple-Pink)
4. Neutral 😐 (Gray-Slate)
5. Anxious 😰 (Orange-Red)
6. Sad 😢 (Blue-Indigo)
7. Grateful 🙏 (Pink-Rose)
8. Peaceful 🌙 (Indigo-Purple)

**Behavior:**
- Grid: 4 columns × 2 rows
- Unselected: Emoji display
- Selected: Icon + gradient background
- Hover: Scale 1.1
- Tap: Scale 0.95

---

## 4. ParticleBackground Component

**Location:** `/components/ParticleBackground.tsx`

**Purpose:** Ambient floating particle system

**Elements:**
- 20 floating particles (varying sizes)
- 2 large ambient glow spots
- Mood-reactive gradient overlay

**Motion:**
- Vertical drift: -30px over 10-20s
- Horizontal sway: ±20px
- Opacity pulse: 0.2 → 0.5
- Scale pulse: 1 → 1.2

**Customization:**
```tsx
<ParticleBackground mood="calm" />
// Generates teal/indigo/purple particles
```

---

## 5. AnimatedButton Component

**Location:** `/components/ui-library/AnimatedButton.tsx`

**Variants:**

```tsx
// Primary - Gradient fill
<AnimatedButton variant="primary" gradient="from-purple-500 to-pink-500">
  Save
</AnimatedButton>

// Ghost - Transparent with border
<AnimatedButton variant="ghost">
  Cancel
</AnimatedButton>

// Floating - Elevated with shadow
<AnimatedButton variant="floating" gradient="from-teal-400 to-blue-500">
  Start
</AnimatedButton>
```

**Interactions:**
- Hover: Scale 1.02 + shadow bloom
- Tap: Scale 0.98
- Icon support with auto-spacing

---

## 6. ExtendedNavigation Component

**Location:** `/components/ExtendedNavigation.tsx`

**Structure:**

**Bottom Bar (Always Visible):**
- Home
- Journal
- Sounds
- Insights
- Profile
- More (opens menu)

**Extended Menu (Slide-up Panel):**
- Habits
- Wellness Toolkit
- Reflection

**Features:**
- Layout animation for active state glow
- Spring physics transitions
- Backdrop blur overlay
- Icon rotation on menu toggle

---

## Layout Patterns

### Screen Template
```tsx
<motion.div className="relative min-h-screen">
  <ParticleBackground mood={currentMood} />
  
  <div className="relative z-10 px-6 py-8 max-w-2xl mx-auto space-y-6">
    {/* Header */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-white/90">Screen Title</h2>
      <p className="text-white/60">Description</p>
    </motion.div>

    {/* Content Cards */}
    <GlassCard variant="strong" className="p-6">
      {/* Card content */}
    </GlassCard>
  </div>
</motion.div>
```

### Progress Bar Pattern
```tsx
<div className="h-2 bg-white/10 rounded-full overflow-hidden">
  <motion.div
    className="h-full bg-gradient-to-r from-purple-400 to-pink-500"
    initial={{ width: 0 }}
    animate={{ width: `${value}%` }}
    transition={{ delay: 0.3, duration: 1 }}
  />
</div>
```

### Circular Progress Pattern
```tsx
<svg className="w-32 h-32 transform -rotate-90">
  <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
  <motion.circle
    cx="64" cy="64" r="56"
    stroke="url(#gradient)"
    strokeWidth="8"
    fill="none"
    strokeLinecap="round"
    initial={{ strokeDasharray: "0 352" }}
    animate={{ strokeDasharray: `${(percent / 100) * 352} 352` }}
  />
</svg>
```

---

## Animation Recipes

### Entrance Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
```

### Stagger Children
```tsx
{items.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 + i * 0.05 }}
  >
))}
```

### Infinite Pulse
```tsx
<motion.div
  animate={{
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.6, 0.3],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>
```

### Hover Lift
```tsx
whileHover={{ scale: 1.05, y: -5 }}
whileTap={{ scale: 0.95 }}
```

---

## Color Gradient Library

### Mood Gradients
```css
/* Calm */
from-teal-400 via-blue-400 to-indigo-500

/* Anxious */
from-orange-400 via-red-400 to-pink-500

/* Happy */
from-yellow-400 via-pink-400 to-rose-500

/* Neutral */
from-purple-400 via-indigo-400 to-blue-500
```

### Feature Gradients
```css
/* Meditation */
from-purple-400 to-indigo-500

/* Journal */
from-pink-400 to-rose-500

/* Breathwork */
from-teal-400 to-cyan-500

/* Analytics */
from-blue-400 to-indigo-500

/* Fitness */
from-orange-400 to-amber-500

/* Sleep */
from-indigo-400 to-purple-600
```

---

## Icon Usage Guidelines

**Primary Actions:** 20-24px
**Secondary Actions:** 16-18px
**Decorative:** 12-14px

**Icon Library:** Lucide React

**Common Icons:**
- Navigation: `Home`, `BookOpen`, `Waves`, `BarChart3`, `User`
- Actions: `Plus`, `Send`, `Play`, `Pause`, `RefreshCw`
- Moods: `Heart`, `Zap`, `Moon`, `Sun`, `Brain`
- Tools: `Mic`, `Camera`, `Tag`, `Calendar`, `Sparkles`

---

## Glassmorphism Recipe

```css
/* Perfect Glass Effect */
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
```

**Variants:**
- Subtle: `bg-white/[0.03]` + `border-white/5`
- Default: `bg-white/5` + `border-white/10`
- Strong: `bg-white/10` + `border-white/20`

---

## Shadow Glow Effects

```css
/* Colored Shadow Glow */
box-shadow: 0 10px 40px rgba(168, 85, 247, 0.3);

/* Button Hover Glow */
hover:shadow-lg hover:shadow-purple-500/50

/* Multi-layer Glow */
shadow-2xl shadow-teal-500/50
```

---

## Typography Scale (Semantic)

Using natural HTML elements with opacity for hierarchy:

```tsx
<h1>  // Main title (large, /90 opacity)
<h2>  // Screen title (medium, /90 opacity)
<h3>  // Section title (base, /90 or /80 opacity)
<h4>  // Card title (base, /90 opacity)
<p>   // Body text (/70 to /80 opacity)
<span className="text-sm">  // Small text (/60 opacity)
<span className="text-xs">  // Tiny text (/50 opacity)
```

**Opacity Hierarchy:**
- Primary text: `/90`
- Secondary text: `/70` or `/80`
- Tertiary text: `/60`
- Placeholder/Disabled: `/40` or `/50`

---

## Spacing System

**Screen Level:**
- Padding: `px-6 py-8`
- Max width: `max-w-2xl mx-auto`
- Vertical spacing: `space-y-6`

**Component Level:**
- Card padding: `p-5` or `p-6`
- Button padding: `px-6 py-3` or `px-4 py-2`
- Icon gaps: `gap-2` or `gap-3`

**Grid Layouts:**
- 2 columns: `grid grid-cols-2 gap-4`
- 3 columns: `grid grid-cols-3 gap-3` or `gap-4`
- 4 columns: `grid grid-cols-4 gap-3`

---

## State Indicators

### Active State
```tsx
{isActive && (
  <motion.div
    layoutId="activeGlow"
    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"
  />
)}
```

### Loading State
```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
>
  <Loader className="w-6 h-6 text-white/60" />
</motion.div>
```

### Success State
```tsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: 'spring', damping: 10 }}
>
  <CheckCircle className="w-12 h-12 text-green-400" />
</motion.div>
```

---

## Accessibility Notes

- All interactive elements have min 44px touch target
- Color contrast meets WCAG AA
- Motion respects `prefers-reduced-motion`
- Focus states visible on all controls
- Semantic HTML structure
- ARIA labels on icon-only buttons

---

## Performance Optimizations

- AnimatePresence with mode="wait" prevents layout shifts
- layoutId for shared element transitions
- Spring animations use GPU acceleration
- SVG gradients defined once, referenced via url()
- Lazy loading for heavy components

---

**Component Library Version:** 1.0
**Last Updated:** November 2024
**Design System Status:** Production Ready ✅
