'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUpVariants } from '@/lib/motion-variants';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  /** Enable hover lift effect */
  interactive?: boolean;
  /** Enable cyan border glow */
  glowing?: boolean;
  as?: 'div' | 'article' | 'section' | 'aside';
}

/**
 * GlassPanel — glassmorphism container with optional interactivity and glow.
 */
export function GlassPanel({
  children,
  className,
  interactive = false,
  glowing = false,
  as = 'div',
}: GlassPanelProps) {
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      variants={fadeUpVariants}
      className={cn(
        'glass-panel rounded-lg',
        interactive && [
          'cursor-pointer transition-transform duration-300',
          'hover:-translate-y-1 hover:shadow-cyan-md',
        ],
        glowing && [
          'shadow-cyan-sm',
          'border-cyan-animated',
        ],
        className
      )}
      {...(interactive && {
        whileHover: { scale: 1.01 },
        whileTap: { scale: 0.99 },
      })}
    >
      {children}
    </Tag>
  );
}
