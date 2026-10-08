'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  external?: boolean;
  'aria-label'?: string;
}

const sizeStyles = {
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
};

const variantStyles = {
  primary: [
    'bg-cyan-core/10 border border-cyan-core/40 text-cyan-core',
    'hover:bg-cyan-core/20 hover:border-cyan-core/70 hover:shadow-cyan-sm',
    'active:bg-cyan-core/30',
  ],
  secondary: [
    'bg-white/5 border border-white/10 text-ceramic-dim',
    'hover:bg-white/10 hover:border-white/20',
    'active:bg-white/15',
  ],
  ghost: [
    'bg-transparent border border-transparent text-ceramic-muted',
    'hover:text-ceramic-dim hover:border-white/10',
  ],
};

/**
 * CyberButton — cinematic action button with pulse scan effect on hover.
 */
export function CyberButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  type = 'button',
  external = false,
  'aria-label': ariaLabel,
}: CyberButtonProps) {
  const classes = cn(
    'relative inline-flex items-center justify-center font-mono tracking-wider',
    'rounded-sm transition-all duration-200 overflow-hidden select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-core',
    sizeStyles[size],
    variantStyles[variant],
    disabled && 'opacity-40 pointer-events-none',
    className
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.15 },
  };

  // Scan-line overlay on hover
  const ScanLine = () => (
    <motion.span
      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-cyan-core/10 to-transparent"
      initial={{ y: '-100%' }}
      whileHover={{ y: '100%' }}
      transition={{ duration: 0.5, ease: 'linear' }}
      aria-hidden="true"
    />
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
        aria-label={ariaLabel}
        {...motionProps}
      >
        <ScanLine />
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      {...motionProps}
    >
      <ScanLine />
      {children}
    </motion.button>
  );
}
