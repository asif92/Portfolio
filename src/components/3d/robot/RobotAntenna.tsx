'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { darkMechanicalMaterial, cyanEmissiveMaterial, darkTrimMaterial } from './materials';

interface RobotAntennaProps {
  isThinking?: boolean;
  isHovered?: boolean;
}

/**
 * RobotAntenna
 * Left-side antenna mounted on the head.
 * Features a dark metallic rod and a glowing cyan tip that pulses
 * based on robot state (thinking, hovering, idle).
 */
export function RobotAntenna({ isThinking = false, isHovered = false }: RobotAntennaProps) {
  const tipRef = useRef<THREE.Mesh>(null);
  const rodRef = useRef<THREE.Group>(null);
  const pulseLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Subtle elastic sway
    if (rodRef.current) {
      const swaySpeed = isThinking ? 8 : isHovered ? 5 : 2;
      const swayAmplitude = isThinking ? 0.08 : isHovered ? 0.05 : 0.02;
      rodRef.current.rotation.z = -0.15 + Math.sin(t * swaySpeed) * swayAmplitude;
      rodRef.current.rotation.x = Math.cos(t * (swaySpeed * 0.7)) * (swayAmplitude * 0.5);
    }

    // Glow pulsing
    if (tipRef.current) {
      const pulseSpeed = isThinking ? 12 : isHovered ? 6 : 2.5;
      const pulseIntensity = isThinking
        ? 3.5 + Math.sin(t * pulseSpeed) * 1.5
        : isHovered
        ? 3.0 + Math.sin(t * pulseSpeed) * 1.0
        : 2.2 + Math.sin(t * pulseSpeed) * 0.5;

      const mat = tipRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = pulseIntensity;
      }

      if (pulseLightRef.current) {
        pulseLightRef.current.intensity = pulseIntensity * 0.25;
      }
    }
  });

  return (
    <group position={[-0.32, 0.4, 0]} rotation={[0, 0, -0.15]}>
      {/* Base mounting ring */}
      <mesh material={darkTrimMaterial} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.045, 0.04, 16]} />
      </mesh>

      {/* Swaying rod group */}
      <group ref={rodRef} position={[0, 0.02, 0]}>
        {/* Antenna rod */}
        <mesh material={darkMechanicalMaterial} position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.012, 0.02, 0.32, 12]} />
        </mesh>

        {/* Mid-collar ring */}
        <mesh material={darkTrimMaterial} position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.02, 12]} />
        </mesh>

        {/* Cyan glowing bulb tip */}
        <mesh ref={tipRef} material={cyanEmissiveMaterial} position={[0, 0.34, 0]}>
          <sphereGeometry args={[0.042, 24, 24]} />
        </mesh>

        {/* Subtle local point light */}
        <pointLight
          ref={pulseLightRef}
          position={[0, 0.34, 0]}
          color="#00F0FF"
          intensity={0.6}
          distance={1.0}
          decay={2}
        />
      </group>
    </group>
  );
}
