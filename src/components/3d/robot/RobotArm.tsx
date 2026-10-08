'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import {
  ceramicWhiteMaterial,
  darkMechanicalMaterial,
  darkTrimMaterial,
} from './materials';
import { RobotHand } from './RobotHand';

interface RobotArmProps {
  side: 'left' | 'right';
  isHovered?: boolean;
  isTalking?: boolean;
  isThinking?: boolean;
}

/**
 * RobotArm
 * Full articulated arm:
 * - Shoulder ball socket & armor cap
 * - White bicep casing
 * - Dark mechanical elbow hinge
 * - Sculpted white forearm
 * - 4-finger hand
 */
export function RobotArm({
  side,
  isHovered = false,
  isTalking = false,
  isThinking = false,
}: RobotArmProps) {
  const armGroupRef = useRef<THREE.Group>(null);
  const forearmRef = useRef<THREE.Group>(null);
  const isLeft = side === 'left';
  const sideSign = isLeft ? -1 : 1;

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (armGroupRef.current) {
      // ── Shoulder & Upper Arm Sway ───────────────────────
      let targetRotX = Math.sin(t * 1.2 + (isLeft ? 0 : Math.PI)) * 0.05;
      let targetRotZ = sideSign * (0.08 + Math.sin(t * 1.0) * 0.02);

      if (isThinking) {
        // Thinking pose: one hand raises slightly toward chin
        if (!isLeft) {
          targetRotX = -0.55;
          targetRotZ = 0.22;
        }
      } else if (isTalking) {
        // Gentle conversational hand gesturing
        targetRotX += Math.sin(t * 3.5 + (isLeft ? 0 : 1.5)) * 0.12;
        targetRotZ += sideSign * (Math.cos(t * 2.8) * 0.06);
      } else if (isHovered) {
        // Welcoming slight outward arm posture
        targetRotZ += sideSign * 0.1;
      }

      armGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        armGroupRef.current.rotation.x,
        targetRotX,
        0.08
      );
      armGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        armGroupRef.current.rotation.z,
        targetRotZ,
        0.08
      );
    }

    if (forearmRef.current) {
      // ── Elbow Flexion ───────────────────────────────────
      let targetElbowX = 0.12; // Natural resting bend
      if (isThinking && !isLeft) {
        targetElbowX = 1.1; // Hand close to chin
      } else if (isTalking) {
        targetElbowX = 0.25 + Math.sin(t * 4 + (isLeft ? 0 : 1)) * 0.15;
      }

      forearmRef.current.rotation.x = THREE.MathUtils.lerp(
        forearmRef.current.rotation.x,
        targetElbowX,
        0.1
      );
    }
  });

  return (
    <group
      position={[sideSign * 0.44, 0.42, 0]}
      ref={armGroupRef}
    >
      {/* ── 1. SHOULDER SOCKET & ARMOR ──────────────────── */}
      {/* Dark mechanical inner ball socket */}
      <mesh material={darkMechanicalMaterial}>
        <sphereGeometry args={[0.13, 20, 20]} />
      </mesh>

      {/* White outer shoulder armor cap */}
      <group position={[sideSign * 0.03, 0.04, 0]} rotation={[0, 0, sideSign * 0.2]}>
        <mesh material={ceramicWhiteMaterial} castShadow>
          <sphereGeometry args={[0.145, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        </mesh>
      </group>

      {/* ── 2. UPPER ARM (BICEP) ────────────────────────── */}
      <group position={[sideSign * 0.04, -0.22, 0]}>
        {/* Inner mechanical rod */}
        <mesh material={darkTrimMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 0.22, 16]} />
        </mesh>
        {/* White ceramic bicep armor shell */}
        <mesh material={ceramicWhiteMaterial} castShadow>
          <capsuleGeometry args={[0.085, 0.16, 16, 20]} />
        </mesh>
      </group>

      {/* ── 3. ELBOW JOINT ──────────────────────────────── */}
      <group position={[sideSign * 0.04, -0.38, 0]}>
        {/* Dark articulated joint sphere */}
        <mesh material={darkMechanicalMaterial} castShadow>
          <sphereGeometry args={[0.08, 18, 18]} />
        </mesh>
        {/* Side pivot hinge disk */}
        <mesh material={darkTrimMaterial} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.14, 16]} />
        </mesh>

        {/* ── 4. FOREARM & HAND (PIVOTS AT ELBOW) ───────── */}
        <group ref={forearmRef} position={[0, -0.04, 0]}>
          {/* Forearm white sculpted armor */}
          <group position={[0, -0.16, 0]}>
            <mesh material={ceramicWhiteMaterial} castShadow>
              <capsuleGeometry args={[0.082, 0.18, 16, 20]} />
            </mesh>
            {/* Dark mechanical forearm inner seam */}
            <mesh material={darkTrimMaterial} position={[0, 0, 0.04]}>
              <boxGeometry args={[0.03, 0.2, 0.02]} />
            </mesh>
          </group>

          {/* ── 5. HAND ─────────────────────────────────── */}
          <group position={[0, -0.28, 0]}>
            <RobotHand side={side} isHovered={isHovered} />
          </group>
        </group>
      </group>
    </group>
  );
}
