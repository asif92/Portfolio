'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  ceramicWhiteMaterial,
  darkMechanicalMaterial,
  darkTrimMaterial,
} from './materials';
import { RobotFoot } from './RobotFoot';

interface RobotLegProps {
  side: 'left' | 'right';
  isFloating?: boolean;
  isHovered?: boolean;
}

/**
 * RobotLeg
 * Articulated robotic leg:
 * - Hip mechanical ball socket
 * - Sculpted white thigh armor
 * - Articulated knee joint
 * - Gently flared white shin/calf armor
 * - Mounts RobotFoot
 */
export function RobotLeg({
  side,
  isFloating = false,
  isHovered = false,
}: RobotLegProps) {
  const legGroupRef = useRef<THREE.Group>(null);
  const kneeGroupRef = useRef<THREE.Group>(null);
  const isLeft = side === 'left';
  const sideSign = isLeft ? -1 : 1;

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (legGroupRef.current) {
      // Hip micro-sway while floating
      let targetRotX = isFloating ? 0.08 + Math.sin(t * 1.2 + (isLeft ? 0 : 0.4)) * 0.03 : 0;
      let targetRotZ = sideSign * (0.04 + (isFloating ? 0.03 : 0));

      if (isHovered) {
        targetRotX -= 0.04;
      }

      legGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        legGroupRef.current.rotation.x,
        targetRotX,
        0.08
      );
      legGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        legGroupRef.current.rotation.z,
        targetRotZ,
        0.08
      );
    }

    if (kneeGroupRef.current) {
      // Knee gentle flex when floating
      const targetKneeBend = isFloating ? -0.15 + Math.sin(t * 1.2) * 0.04 : 0;
      kneeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        kneeGroupRef.current.rotation.x,
        targetKneeBend,
        0.08
      );
    }
  });

  return (
    <group
      ref={legGroupRef}
      position={[sideSign * 0.22, -0.42, 0]}
    >
      {/* ── 1. HIP BALL JOINT ───────────────────────────── */}
      <mesh material={darkMechanicalMaterial} position={[0, 0, 0]}>
        <sphereGeometry args={[0.11, 18, 18]} />
      </mesh>

      {/* ── 2. UPPER LEG (THIGH) ────────────────────────── */}
      <group position={[0, -0.22, 0.01]}>
        {/* Inner structural rod */}
        <mesh material={darkTrimMaterial}>
          <cylinderGeometry args={[0.05, 0.05, 0.24, 16]} />
        </mesh>
        {/* Sculpted white thigh armor */}
        <mesh material={ceramicWhiteMaterial} castShadow>
          <capsuleGeometry args={[0.115, 0.22, 16, 20]} />
        </mesh>
      </group>

      {/* ── 3. KNEE JOINT ───────────────────────────────── */}
      <group ref={kneeGroupRef} position={[0, -0.44, 0]}>
        {/* Dark mechanical knee sphere */}
        <mesh material={darkMechanicalMaterial} castShadow>
          <sphereGeometry args={[0.095, 18, 18]} />
        </mesh>
        {/* Knee front guard trim */}
        <mesh material={darkTrimMaterial} position={[0, 0, 0.07]}>
          <boxGeometry args={[0.08, 0.08, 0.04]} />
        </mesh>
        {/* Side hinge caps */}
        <mesh material={darkTrimMaterial} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.075, 0.075, 0.18, 16]} />
        </mesh>

        {/* ── 4. SHIN / LOWER LEG (FLARED CALF) ─────────── */}
        <group position={[0, -0.28, 0]}>
          {/* Main flared white calf armor */}
          <mesh material={ceramicWhiteMaterial} position={[0, 0, 0.01]} castShadow>
            <cylinderGeometry args={[0.105, 0.145, 0.32, 24]} />
          </mesh>

          {/* Front shin ridge */}
          <mesh material={ceramicWhiteMaterial} position={[0, 0, 0.09]} castShadow>
            <boxGeometry args={[0.06, 0.26, 0.04]} />
          </mesh>

          {/* Back calf dark groove */}
          <mesh material={darkTrimMaterial} position={[0, 0, -0.08]}>
            <boxGeometry args={[0.04, 0.22, 0.02]} />
          </mesh>

          {/* ── 5. FOOT ─────────────────────────────────── */}
          <group position={[0, -0.22, 0]}>
            <RobotFoot side={side} />
          </group>
        </group>
      </group>
    </group>
  );
}
