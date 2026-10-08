'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AmbientLightsProps {
  reducedMotion?: boolean;
}

/**
 * AmbientLights
 * Soft, atmospheric deep-space laboratory lighting.
 * Calibrated to highlight the robot's white ceramic and glowing cyan core
 * with soft shadows, subtle deep-space fog, and occasional white cosmic sweeping light.
 */
export function AmbientLights({ reducedMotion = false }: AmbientLightsProps) {
  const cyanRimLightRef = useRef<THREE.PointLight>(null);
  const cosmicSweepLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;

    // Subtle breathing pulse on the electric cyan rim light
    if (cyanRimLightRef.current) {
      cyanRimLightRef.current.intensity = 2.0 + Math.sin(t * 1.4) * 0.4;
    }

    // Occasional, very slow soft white light sweep across the deep space void
    if (cosmicSweepLightRef.current) {
      // Sweeps slowly every ~12 seconds
      const sweepCycle = Math.sin(t * 0.5);
      cosmicSweepLightRef.current.position.x = sweepCycle * 8;
      cosmicSweepLightRef.current.intensity = 0.4 + Math.max(0, Math.sin(t * 0.4)) * 0.5;
    }
  });

  return (
    <>
      {/* ── 1. Deep Space Fog ───────────────────────────── */}
      {/* Blends distant geometric nodes and particles seamlessly into the void */}
      <fog attach="fog" args={['#040711', 12, 34]} />

      {/* ── 2. Deep Space Hemisphere Fill ───────────────── */}
      {/* Cool white-blue upper sky + deep obsidian slate ground bounce */}
      <hemisphereLight
        color="#D6E4F4"
        groundColor="#060A14"
        intensity={0.9}
      />

      {/* ── 3. Base Ambient Lighting ─────────────────────── */}
      <ambientLight color="#0E1726" intensity={0.5} />

      {/* ── 4. Key Studio Light (Frontal-Left) ───────────── */}
      {/* Soft directional light highlighting clean white ceramic surfaces */}
      <directionalLight
        position={[3, 5, 5]}
        color="#F8FAFC"
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* ── 5. Cool Cyan/Blue Rim Light ──────────────────── */}
      <directionalLight
        position={[-5, 3, 1]}
        color="#00A2FF"
        intensity={0.7}
      />

      {/* ── 6. Pulsing Electric Cyan Back Rim ────────────── */}
      {/* Defines the character silhouette against the dark void */}
      <pointLight
        ref={cyanRimLightRef}
        position={[0, 2.2, -3.2]}
        color="#00F0FF"
        intensity={2.2}
        distance={9}
        decay={2}
      />

      {/* ── 7. Occasional White Light Sweep (Deep Space) ─── */}
      <pointLight
        ref={cosmicSweepLightRef}
        position={[0, 4, -5]}
        color="#E2EEFF"
        intensity={0.5}
        distance={18}
        decay={2}
      />

      {/* ── 8. Under-Glow Bounce (Subtle Electric Blue) ─── */}
      <pointLight
        position={[0, -2, 1.2]}
        color="#0077EE"
        intensity={0.55}
        distance={5}
        decay={2}
      />
    </>
  );
}
