'use client';

import { useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

interface CameraRigProps {
  /** Horizontal / vertical camera travel in world units */
  amount?: [number, number];
  disabled?: boolean;
}

/**
 * CameraRig — eases the camera a little toward the cursor so every depth layer
 * (particles, nodes, robot, floor) shifts at a different rate (parallax).
 */
export function CameraRig({ amount = [0.45, 0.25], disabled = false }: CameraRigProps) {
  const camera = useThree((s) => s.camera);
  const mouse = useMousePosition(0.08);
  // Resting camera position captured once (stable across renders)
  const base = useMemo(() => camera.position.clone(), [camera]);

  useFrame((_, delta) => {
    if (disabled) return;
    const { x, y } = mouse.current;
    const dt = Math.min(delta, 0.05);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, base.x + x * amount[0], 2.5, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, base.y + y * amount[1], 2.5, dt);
    // Keep looking at the scene centre while the camera drifts
    camera.lookAt(0, base.y, 0);
  });

  return null;
}
