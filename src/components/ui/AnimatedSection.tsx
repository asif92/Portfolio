'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { containerVariants, viewportOnce } from '@/lib/motion-variants';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before stagger starts */
  delay?: number;
  /** Custom stagger between children */
  stagger?: number;
  id?: string;
}

/**
 * AnimatedSection — wraps a section with scroll-triggered staggered reveal.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  stagger = 0.1,
  id,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      id={id}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn('relative', className)}
    >
      {children}
    </motion.div>
  );
}

export { containerVariants, viewportOnce };
