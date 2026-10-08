'use client';

import { RoundedBox } from '@react-three/drei';
import {
  ceramicWhiteMaterial,
  darkMechanicalMaterial,
  cyanEmissiveMaterial,
  darkTrimMaterial,
} from './materials';

interface RobotFootProps {
  side: 'left' | 'right';
}

/**
 * RobotFoot
 * Large futuristic boot with rounded white armor shell,
 * dark mechanical sole, and electric cyan glowing sole/heel energy strip.
 */
export function RobotFoot({ side }: RobotFootProps) {
  const isLeft = side === 'left';
  const sideSign = isLeft ? -1 : 1;

  return (
    <group position={[0, -0.06, 0.06]}>
      {/* ── 1. ANKLE BALL JOINT ─────────────────────────── */}
      <mesh material={darkTrimMaterial} position={[0, 0.08, -0.05]}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>

      {/* ── 2. UPPER WHITE ARMOR SHELL ──────────────────── */}
      {/* Main beveled foot body */}
      <RoundedBox
        args={[0.26, 0.16, 0.42]}
        radius={0.07}
        smoothness={6}
        material={ceramicWhiteMaterial}
        position={[0, 0.02, 0.02]}
        castShadow
        receiveShadow
      />

      {/* Front toe cap curve */}
      <group position={[0, -0.01, 0.16]}>
        <mesh material={ceramicWhiteMaterial} castShadow>
          <sphereGeometry args={[0.11, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        </mesh>
      </group>

      {/* ── 3. DARK MECHANICAL TREAD SOLE ───────────────── */}
      <RoundedBox
        args={[0.27, 0.05, 0.44]}
        radius={0.02}
        smoothness={3}
        material={darkMechanicalMaterial}
        position={[0, -0.065, 0.02]}
        receiveShadow
      />

      {/* ── 4. ELECTRIC CYAN GLOWING SOLE/HEEL STRIP ────── */}
      {/* Outer side glowing contour strip */}
      <mesh
        material={cyanEmissiveMaterial}
        position={[sideSign * 0.136, -0.055, 0.02]}
      >
        <boxGeometry args={[0.015, 0.025, 0.28]} />
      </mesh>

      {/* Back heel glowing strip */}
      <mesh
        material={cyanEmissiveMaterial}
        position={[0, -0.055, -0.185]}
      >
        <boxGeometry args={[0.18, 0.025, 0.015]} />
      </mesh>

      {/* Subtle floor contact glow */}
      <pointLight
        position={[0, -0.08, 0]}
        color="#00F0FF"
        intensity={0.4}
        distance={0.8}
        decay={2}
      />
    </group>
  );
}
