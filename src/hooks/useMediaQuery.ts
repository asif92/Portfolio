'use client';

import { useEffect, useState } from 'react';

interface MediaQueryResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
}

/**
 * useMediaQuery — SSR-safe responsive breakpoint and accessibility preference detection.
 */
export function useMediaQuery(): MediaQueryResult {
  const [state, setState] = useState<MediaQueryResult>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    prefersReducedMotion: false,
    prefersHighContrast: false,
  });

  useEffect(() => {
    const queries = {
      isMobile: window.matchMedia('(max-width: 767px)'),
      isTablet: window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
      isDesktop: window.matchMedia('(min-width: 1024px)'),
      isLargeDesktop: window.matchMedia('(min-width: 1440px)'),
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      prefersHighContrast: window.matchMedia('(prefers-contrast: high)'),
    };

    function update() {
      setState({
        isMobile: queries.isMobile.matches,
        isTablet: queries.isTablet.matches,
        isDesktop: queries.isDesktop.matches,
        isLargeDesktop: queries.isLargeDesktop.matches,
        prefersReducedMotion: queries.prefersReducedMotion.matches,
        prefersHighContrast: queries.prefersHighContrast.matches,
      });
    }

    update();

    Object.values(queries).forEach((q) => q.addEventListener('change', update));
    return () => {
      Object.values(queries).forEach((q) => q.removeEventListener('change', update));
    };
  }, []);

  return state;
}
