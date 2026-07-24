import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'lavender' | 'pink' | 'mint' | 'sky' | 'peach' | 'pixel';
  className?: string;
  icon?: React.ReactNode;
  pixelStar?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'lavender',
  className,
  icon,
  pixelStar = false,
}) => {
  const variantStyles = {
    lavender: 'bg-purple-100/90 text-purple-950 border-purple-200/80 shadow-purple-500/10',
    pink: 'bg-pink-100/90 text-pink-950 border-pink-200/80 shadow-pink-500/10',
    mint: 'bg-emerald-100/90 text-emerald-950 border-emerald-200/80 shadow-emerald-500/10',
    sky: 'bg-sky-100/90 text-sky-950 border-sky-200/80 shadow-sky-500/10',
    peach: 'bg-orange-100/90 text-orange-950 border-orange-200/80 shadow-orange-500/10',
    pixel: 'bg-slate-900 text-pink-300 border-slate-700 shadow-purple-900/30 pixel-font tracking-wider',
  };

  return (
    <motion.span
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05, y: -1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md shadow-sm select-none',
        variantStyles[variant],
        className
      )}
    >
      {pixelStar && (
        <span className="text-[10px] animate-pulse text-amber-400 select-none">
          ✦
        </span>
      )}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.span>
  );
};
