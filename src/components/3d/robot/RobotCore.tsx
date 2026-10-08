'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { cyanEmissiveMaterial, darkMechanicalMaterial, darkTrimMaterial } from './materials';

interface RobotCoreProps {
  isHovered?: boolean;
  isThinking?: boolean;
  isTalking?: boolean;
}

/**
 * RobotCore
 * Circular glowing cyan chest reactor centered on the torso.
 * Features an arc-reactor housing, pulsing inner core, and subtle point light.
 */
export function RobotCore({
  isHovered = false,
  isThinking = false,
  isTalking = false,
}: RobotCoreProps) {
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Pulse frequency based on activity
    const pulseSpeed = isHovered ? 4.5 : isThinking ? 3.5 : isTalking ? 5.0 : 2.0;

    // Dual-wave breathing pulse for natural organic rhythm
    const pulseWave = Math.sin(t * pulseSpeed) * 0.6 + Math.sin(t * (pulseSpeed * 0.5)) * 0.4;
    const baseIntensity = isHovered ? 3.2 : isThinking ? 2.8 : 2.4;
    const currentIntensity = baseIntensity + pulseWave * 0.8;

    if (coreMeshRef.current) {
      const mat = coreMeshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = currentIntensity;
      }
      // Subtle physical core expansion
      const scale = 1 + pulseWave * 0.04;
      coreMeshRef.current.scale.set(scale, scale, scale);
    }

    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = currentIntensity * 0.75;
      }
    }

    if (coreLightRef.current) {
      coreLightRef.current.intensity = currentIntensity * 0.45;
    }
  });

  return (
    <group position={[0, 0.06, 0.22]}>
      {/* ── Outer Recessed Bezel Housing ────────────────── */}
      <mesh material={darkMechanicalMaterial} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.14, 0.04, 32]} />
      </mesh>

      {/* Dark inner collar */}
      <mesh material={darkTrimMaterial} position={[0, 0, 0.015]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.105, 0.115, 0.02, 32]} />
      </mesh>

      {/* ── Concentric Cyan Accent Ring ─────────────────── */}
      <mesh ref={ringRef} material={cyanEmissiveMaterial} position={[0, 0, 0.022]}>
        <torusGeometry args={[0.09, 0.007, 16, 32]} />
      </mesh>

      {/* ── Central Cyan Core Sphere / Lens ─────────────── */}
      <mesh ref={coreMeshRef} material={cyanEmissiveMaterial} position={[0, 0, 0.02]}>
        <sphereGeometry args={[0.065, 24, 24]} />
      </mesh>

      {/* ── Radiance Point Light (Subtle local glow) ───── */}
      <pointLight
        ref={coreLightRef}
        position={[0, 0, 0.1]}
        color="#00F0FF"
        intensity={0.35}
        distance={1.2}
        decay={2}
      />
    </group>
  );
}
