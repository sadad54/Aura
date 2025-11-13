import { motion, HTMLMotionProps } from 'motion/react';
import { ReactNode } from 'react';

/**
 * GlassCard - Reusable glassmorphism card component
 * Core UI element for AURA design system
 */

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'subtle' | 'strong';
  hover?: boolean;
  gradient?: string;
}

export function GlassCard({ 
  children, 
  variant = 'default', 
  hover = true,
  gradient,
  className = '',
  ...props 
}: GlassCardProps) {
  const variants = {
    default: 'bg-white/5 border-white/10',
    subtle: 'bg-white/[0.03] border-white/5',
    strong: 'bg-white/10 border-white/20',
  };

  return (
    <motion.div
      className={`
        rounded-2xl backdrop-blur-xl border
        ${variants[variant]}
        ${gradient ? gradient : ''}
        ${className}
      `}
      whileHover={hover ? { scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' } : undefined}
      transition={{ type: 'spring', damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
