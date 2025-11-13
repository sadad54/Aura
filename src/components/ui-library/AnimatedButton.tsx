import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

/**
 * AnimatedButton - Premium button component with micro-interactions
 */

interface AnimatedButtonProps {
  children: ReactNode;
  icon?: LucideIcon;
  variant?: 'primary' | 'ghost' | 'floating';
  gradient?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function AnimatedButton({
  children,
  icon: Icon,
  variant = 'primary',
  gradient = 'from-purple-500 to-pink-500',
  onClick,
  className = '',
  disabled = false,
}: AnimatedButtonProps) {
  const variants = {
    primary: `bg-gradient-to-r ${gradient} text-white shadow-lg`,
    ghost: 'bg-white/5 border border-white/10 text-white/90 hover:bg-white/10',
    floating: `bg-gradient-to-br ${gradient} text-white shadow-2xl`,
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-xl flex items-center justify-center gap-2
        transition-all duration-200
        ${variants[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      whileHover={!disabled ? { scale: 1.02, boxShadow: '0 10px 40px rgba(168, 85, 247, 0.3)' } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
}
