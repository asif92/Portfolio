'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count?: number;
  spread?: [number, number, number];
  size?: number;
  speed?: number;
  color?: string;
  reducedMotion?: boolean;
}

/**
 * FloatingParticles
 * Ambient deep-space particulate field with smooth boundary wrapping physics.
 *
 * Performance:
 * - 1 draw call using THREE.Points
 * - Additive blending with depthWrite disabled for fast alpha blending
 * - Direct Float32Array updates in useFrame with zero object allocation
 */
export function FloatingParticles({
  count = 280,
  spread = [24, 14, 16],
  size = 0.018,
  speed = 0.035,
  color = '#00F0FF',
  reducedMotion = false,
}: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  // Preallocate typed arrays for positions, velocities, and phase offsets
  const { positions, velocities, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const pha = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3 + 0] = (Math.random() - 0.5) * spread[0];
      pos[i3 + 1] = (Math.random() - 0.5) * spread[1] + 0.5;
      pos[i3 + 2] = (Math.random() - 0.5) * spread[2] - 2;

      vel[i3 + 0] = (Math.random() - 0.5) * speed;
      vel[i3 + 1] = (Math.random() - 0.5) * speed * 0.7;
      vel[i3 + 2] = (Math.random() - 0.5) * speed * 0.4;

      pha[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, velocities: vel, phases: pha };
  }, [count, spread, speed]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color(color),
        size,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [color, size]
  );

  useFrame((_, delta) => {
    if (reducedMotion || !pointsRef.current) return;
    timeRef.current += delta;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    const halfX = spread[0] / 2;
    const halfY = spread[1] / 2;
    const halfZ = spread[2] / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phase = phases[i];

      // Subtle organic drift
      arr[i3 + 0] += velocities[i3 + 0] + Math.sin(timeRef.current * 0.25 + phase) * 0.001;
      arr[i3 + 1] += velocities[i3 + 1] + Math.cos(timeRef.current * 0.2 + phase) * 0.001;
      arr[i3 + 2] += velocities[i3 + 2];

      // Seamless boundary wrap
      if (arr[i3 + 0] > halfX) arr[i3 + 0] = -halfX;
      if (arr[i3 + 0] < -halfX) arr[i3 + 0] = halfX;
      if (arr[i3 + 1] > halfY + 0.5) arr[i3 + 1] = -halfY + 0.5;
      if (arr[i3 + 1] < -halfY + 0.5) arr[i3 + 1] = halfY + 0.5;
      if (arr[i3 + 2] > halfZ - 2) arr[i3 + 2] = -halfZ - 2;
      if (arr[i3 + 2] < -halfZ - 2) arr[i3 + 2] = halfZ - 2;
    }

    posAttr.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
