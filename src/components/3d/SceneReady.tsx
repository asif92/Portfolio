'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

interface SceneReadyProps {
  onReady: () => void;
  /** Frames to wait after mount so shaders are compiled and first frames drawn */
  frames?: number;
}

/**
 * SceneReady — rendered inside <Canvas>/<Suspense>. Because it only mounts once
 * Suspense has resolved and then waits for a few real rendered frames, onReady
 * fires when the robot is genuinely on screen (not just when JS has downloaded).
 */
export function SceneReady({ onReady, frames = 6 }: SceneReadyProps) {
  const count = useRef(0);
  const fired = useRef(false);
  const cb = useRef(onReady);
  useEffect(() => {
    cb.current = onReady;
  }, [onReady]);

  // With frameloop="demand" (reduced motion) nothing renders on its own, so
  // request frames until we've counted enough.
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const id = setInterval(() => {
      if (fired.current) clearInterval(id);
      else invalidate();
    }, 50);
    return () => clearInterval(id);
  }, [invalidate]);

  useFrame(() => {
    if (fired.current) return;
    count.current += 1;
    if (count.current >= frames) {
      fired.current = true;
      cb.current();
    }
  });

  return null;
}
