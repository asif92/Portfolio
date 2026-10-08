'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollMetrics {
  scrollY: number;
  scrollProgress: number; // 0–1 across full page
  direction: 'up' | 'down' | null;
  isScrolling: boolean;
}

/**
 * useScrollMetrics — tracks scroll position, direction, and global progress.
 * Designed to work alongside Lenis for accurate values.
 */
export function useScrollMetrics(): ScrollMetrics {
  const [metrics, setMetrics] = useState<ScrollMetrics>({
    scrollY: 0,
    scrollProgress: 0,
    direction: null,
    isScrolling: false,
  });

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? currentY / maxScroll : 0;
      const direction = currentY > lastScrollY.current ? 'down' : 'up';

      lastScrollY.current = currentY;

      setMetrics({
        scrollY: currentY,
        scrollProgress: Math.min(1, Math.max(0, progress)),
        direction,
        isScrolling: true,
      });

      // Debounce isScrolling reset
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setMetrics((prev) => ({ ...prev, isScrolling: false }));
      }, 150);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return metrics;
}
