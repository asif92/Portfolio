'use client';

import { useEffect, useRef } from 'react';

interface MousePosition {
  x: number; // -1 to 1, normalized from center
  y: number; // -1 to 1, normalized from center
  rawX: number; // 0 to window.innerWidth
  rawY: number; // 0 to window.innerHeight
}

/**
 * useMousePosition — tracks mouse position and returns normalized coordinates
 * centered at (0,0). Used for robot eye/head tracking.
 *
 * @param smoothing — lerp factor per frame (0 = no movement, 1 = instant)
 */
export function useMousePosition(smoothing = 0.08) {
  const positionRef = useRef<MousePosition>({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
  });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      positionRef.current.rawX = e.clientX;
      positionRef.current.rawY = e.clientY;
    }

    function loop() {
      positionRef.current.x +=
        (targetRef.current.x - positionRef.current.x) * smoothing;
      positionRef.current.y +=
        (targetRef.current.y - positionRef.current.y) * smoothing;
      rafRef.current = requestAnimationFrame(loop);
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [smoothing]);

  return positionRef;
}
