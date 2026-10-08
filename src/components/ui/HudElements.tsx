'use client';

import { cn } from '@/lib/utils';

interface HudTagProps {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
  /** Color variant for the tag */
  variant?: 'cyan' | 'green' | 'amber' | 'muted';
}

const variantStyles = {
  cyan:   'border-cyan-core/20 bg-cyan-core/5 text-cyan-core',
  green:  'border-emerald-400/20 bg-emerald-400/5 text-emerald-400',
  amber:  'border-amber-signal/20 bg-amber-signal/5 text-amber-signal',
  muted:  'border-white/10 bg-white/5 text-ceramic-muted',
};

const dotStyles = {
  cyan:   'bg-cyan-core',
  green:  'bg-emerald-400',
  amber:  'bg-amber-signal',
  muted:  'bg-ceramic-muted',
};

/**
 * HudTag — a small monospaced status tag resembling a terminal/HUD element.
 */
export function HudTag({
  children,
  className,
  dot = false,
  variant = 'cyan',
}: HudTagProps) {
  return (
    <span
      className={cn(
        'hud-tag',
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'inline-block h-1.5 w-1.5 rounded-full animate-pulse-slow',
            dotStyles[variant]
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

/**
 * NodeLabel — section index prefix like "[01]"
 */
interface NodeLabelProps {
  index: string | number;
  className?: string;
}

export function NodeLabel({ index, className }: NodeLabelProps) {
  const label = typeof index === 'number'
    ? `[${String(index).padStart(2, '0')}]`
    : index;

  return (
    <span
      className={cn(
        'font-mono text-xs tracking-widest text-cyan-core/60 select-none',
        className
      )}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}
