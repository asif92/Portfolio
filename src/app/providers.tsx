'use client';

import { useLenis } from '@/hooks/useLenis';

/**
 * RootProviders — client-side global providers.
 *
 * Initializes:
 * - Lenis smooth scroll
 *
 * Add future providers here (e.g. theme, auth, analytics).
 */
export function RootProviders({ children }: { children: React.ReactNode }) {
  // Initialize Lenis smooth scroll globally
  useLenis();

  return <>{children}</>;
}
