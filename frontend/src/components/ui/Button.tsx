import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'pixel' | 'pink';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  pixelAccent?: boolean;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      pixelAccent = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-full backdrop-blur-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer shadow-sm';

    const sizeStyles = {
      sm: 'px-4 py-1.5 text-xs gap-1.5',
      md: 'px-6 py-2.5 text-sm gap-2',
      lg: 'px-8 py-3.5 text-base gap-2.5 font-semibold',
    };

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-purple-300 via-pink-200 to-purple-200 text-purple-950 hover:shadow-[0_10px_25px_-5px_rgba(216,180,248,0.5)] border border-purple-200/80',
      pink:
        'bg-gradient-to-r from-pink-300 via-rose-200 to-pink-200 text-pink-950 hover:shadow-[0_10px_25px_-5px_rgba(254,205,211,0.6)] border border-pink-200/80',
      secondary:
        'glass-pill text-slate-800 hover:bg-white/90 hover:shadow-[0_10px_25px_-5px_rgba(230,230,250,0.5)] border border-white/80',
      outline:
        'bg-white/40 text-purple-950 border border-purple-300/60 hover:bg-purple-50/60 hover:border-purple-300',
      ghost:
        'bg-transparent text-slate-700 hover:bg-white/50 border border-transparent shadow-none',
      pixel:
        'bg-slate-900 text-pink-200 hover:bg-slate-800 border border-slate-700 shadow-md pixel-font',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={disabled || isLoading ? undefined : { scale: 1.02, y: -2 }}
        whileTap={disabled || isLoading ? undefined : { scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          <>
            {pixelAccent && <span className="text-amber-400 text-xs">✦</span>}
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
