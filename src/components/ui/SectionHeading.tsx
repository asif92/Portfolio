'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUpVariants } from '@/lib/motion-variants';

interface SectionHeadingProps {
  nodeId: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * SectionHeading — consistent heading block for all portfolio sections.
 * Includes node ID, title with gradient, optional subtitle, and decorative cyan line.
 */
export function SectionHeading({
  nodeId,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {/* Node Label */}
      <motion.span
        variants={fadeUpVariants}
        className="font-mono text-xs tracking-[0.2em] text-cyan-core/60 uppercase"
      >
        {nodeId}
      </motion.span>

      {/* Title */}
      <motion.h2
        variants={fadeUpVariants}
        className="text-3xl font-bold tracking-tight text-gradient-white sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={fadeUpVariants}
          className="max-w-2xl text-base text-ceramic-muted leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative cyan line */}
      <motion.div
        variants={{
          hidden: { scaleX: 0, originX: align === 'center' ? 0.5 : 0 },
          visible: {
            scaleX: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
          },
        }}
        className={cn(
          'h-px w-16 bg-gradient-to-r from-cyan-core to-cyan-soft',
          align === 'center' && 'mx-auto'
        )}
        aria-hidden="true"
      />
    </div>
  );
}
