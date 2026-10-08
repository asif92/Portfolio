'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HolographicRingProps {
  radius?: number;
  thickness?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  speed?: number;
  hasTicks?: boolean;
  hasInnerRing?: boolean;
  reducedMotion?: boolean;
}

/**
 * HolographicRing
 * Abstract holographic orientation & stabilization ring.
 * Features thin glowing concentric cyan torus arcs, counter-rotating inner ring,
 * and high-tech cardinal tick marks.
 */
export function HolographicRing({
  radius = 1.4,
  thickness = 0.008,
  position = [0, 0, 0],
  rotation = [-Math.PI / 2, 0, 0],
  color = '#00F0FF',
  speed = 0.3,
  hasTicks = true,
  hasInnerRing = true,
  reducedMotion = false,
}: HolographicRingProps) {
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);

  // Shared additive glowing materials
  const ringMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color]
  );

  const faintRingMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color]
  );

  const tickMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#FFFFFF'),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  // Precompute tick positions around the ring
  const ticks = useMemo(() => {
    if (!hasTicks) return [];
    const count = 12;
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      items.push({ x, y, angle });
    }
    return items;
  }, [hasTicks, radius]);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * speed * 0.4;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * speed * 0.6;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* ── Outer Primary Ring ──────────────────────────── */}
      <group ref={outerRingRef}>
        <mesh material={ringMaterial}>
          <torusGeometry args={[radius, thickness, 16, 64]} />
        </mesh>

        {/* Cardinal calibration tick marks */}
        {ticks.map((tick, i) => (
          <mesh
            key={i}
            material={tickMaterial}
            position={[tick.x, tick.y, 0]}
            rotation={[0, 0, tick.angle + Math.PI / 2]}
          >
            <boxGeometry args={[0.012, 0.05, 0.005]} />
          </mesh>
        ))}
      </group>

      {/* ── Inner Counter-Rotating Faint Ring ───────────── */}
      {hasInnerRing && (
        <group ref={innerRingRef}>
          <mesh material={faintRingMaterial}>
            <torusGeometry args={[radius * 0.78, thickness * 0.75, 16, 64]} />
          </mesh>
        </group>
      )}

      {/* ── Faint Outer Orbital Dust Ring ───────────────── */}
      <mesh material={faintRingMaterial}>
        <torusGeometry args={[radius * 1.15, thickness * 0.5, 16, 64]} />
      </mesh>
    </group>
  );
}
