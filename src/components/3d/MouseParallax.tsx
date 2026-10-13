'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

interface MouseParallaxProps {
  children: React.ReactNode;
  /** How far the layer drifts with the cursor (world units). */
  strength?: number;
  /** How much the layer rotates with the cursor (radians). */
  tilt?: number;
  /** Move opposite to the cursor (use for far layers) */
  invert?: boolean;
  disabled?: boolean;
}

/**
 * MouseParallax — wraps a layer of scene objects and makes it drift/tilt
 * with the cursor, giving depth. Reads the shared mouse ref inside useFrame
 * (never during render), so it costs no React re-renders.
 */
export function MouseParallax({
  children,
  strength = 0.6,
  tilt = 0.06,
  invert = false,
  disabled = false,
}: MouseParallaxProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMousePosition(0.08);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g || disabled) return;
    const dt = Math.min(delta, 0.05); // clamp so a tab-switch can't cause a jump
    const dir = invert ? -1 : 1;
    const { x, y } = mouse.current;
    g.position.x = THREE.MathUtils.damp(g.position.x, x * strength * dir, 3, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, y * strength * 0.6 * dir, 3, dt);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, x * tilt * dir, 2.5, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -y * tilt * 0.6 * dir, 2.5, dt);
  });

  return <group ref={groupRef}>{children}</group>;
}
