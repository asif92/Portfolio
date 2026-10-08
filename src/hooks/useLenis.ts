'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * useLenis — initializes and manages Lenis smooth scroll.
 *
 * Returns the lenis instance so consumers can add scroll callbacks.
 * The scroll loop is driven by requestAnimationFrame.
 */
export function useLenis() {
  const lenisRef = useRef<InstanceType<typeof import('lenis').default> | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let rafId: number;

    async function init() {
      const Lenis = (await import('lenis')).default;

      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;
      setIsReady(true);

      // RAF loop
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }

    init();

    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
    };
  }, []);

  return { lenis: lenisRef.current, isReady };
}
