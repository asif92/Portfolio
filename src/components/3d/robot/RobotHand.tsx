'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { darkMechanicalMaterial, darkTrimMaterial } from './materials';

interface RobotHandProps {
  side: 'left' | 'right';
  isHovered?: boolean;
}

/**
 * RobotHand
 * 4-finger articulated robotic hand (thumb + 3 fingers).
 * Rounded, friendly, and approachable styling matching the concept image.
 */
export function RobotHand({ side, isHovered = false }: RobotHandProps) {
  const handGroup = useRef<THREE.Group>(null);
  const fingersRef = useRef<THREE.Group>(null);
  const isLeft = side === 'left';

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Subtle finger curling / breathing
    if (fingersRef.current) {
      const curlAmount = isHovered
        ? 0.15 + Math.sin(t * 3) * 0.08
        : 0.25 + Math.sin(t * 1.5) * 0.04;
      fingersRef.current.rotation.x = curlAmount;
    }

    if (handGroup.current) {
      // Gentle wrist micro-adjustment
      handGroup.current.rotation.z = (isLeft ? 0.05 : -0.05) + Math.sin(t * 1.2) * 0.02;
    }
  });

  return (
    <group ref={handGroup} position={[0, -0.22, 0]}>
      {/* ── Wrist Pivot Joint ───────────────────────────── */}
      <mesh material={darkTrimMaterial} position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.065, 16, 16]} />
      </mesh>
      <mesh material={darkMechanicalMaterial} position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.058, 0.065, 0.04, 16]} />
      </mesh>

      {/* ── Palm Housing ────────────────────────────────── */}
      <RoundedBox
        args={[0.13, 0.13, 0.07]}
        radius={0.03}
        smoothness={4}
        material={darkMechanicalMaterial}
        position={[0, -0.05, 0]}
        castShadow
      />

      {/* ── 3 Main Fingers (Index, Middle, Ring) ───────── */}
      <group ref={fingersRef} position={[0, -0.11, 0]}>
        {/* Finger 1 (Index) */}
        <group position={[-0.038, 0, 0]}>
          <mesh material={darkMechanicalMaterial} position={[0, -0.04, 0]} castShadow>
            <capsuleGeometry args={[0.016, 0.055, 8, 12]} />
          </mesh>
          <mesh material={darkTrimMaterial} position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.018, 8, 8]} />
          </mesh>
        </group>

        {/* Finger 2 (Middle - slightly longer) */}
        <group position={[0, 0, 0]}>
          <mesh material={darkMechanicalMaterial} position={[0, -0.045, 0]} castShadow>
            <capsuleGeometry args={[0.017, 0.065, 8, 12]} />
          </mesh>
          <mesh material={darkTrimMaterial} position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.019, 8, 8]} />
          </mesh>
        </group>

        {/* Finger 3 (Ring) */}
        <group position={[0.038, 0, 0]}>
          <mesh material={darkMechanicalMaterial} position={[0, -0.038, 0]} castShadow>
            <capsuleGeometry args={[0.016, 0.05, 8, 12]} />
          </mesh>
          <mesh material={darkTrimMaterial} position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.018, 8, 8]} />
          </mesh>
        </group>
      </group>

      {/* ── 4th Finger (Thumb) ──────────────────────────── */}
      <group
        position={[isLeft ? 0.065 : -0.065, -0.04, 0.015]}
        rotation={[0.2, 0, isLeft ? -0.5 : 0.5]}
      >
        <mesh material={darkMechanicalMaterial} position={[0, -0.03, 0]} castShadow>
          <capsuleGeometry args={[0.016, 0.04, 8, 12]} />
        </mesh>
        <mesh material={darkTrimMaterial} position={[0, 0, 0]}>
          <sphereGeometry args={[0.018, 8, 8]} />
        </mesh>
      </group>
    </group>
  );
}
