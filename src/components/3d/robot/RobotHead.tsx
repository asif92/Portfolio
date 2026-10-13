'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import {
  ceramicWhiteMaterial,
  darkMechanicalMaterial,
  visorGlassMaterial,
  cyanEmissiveMaterial,
  darkTrimMaterial,
} from './materials';
import { RobotEyes } from './RobotEyes';
import { RobotAntenna } from './RobotAntenna';

interface RobotHeadProps {
  cursorTarget?: { x: number; y: number };
  isHovered?: boolean;
  isThinking?: boolean;
  isTalking?: boolean;
  isBlinking?: boolean;
}

/**
 * RobotHead
 * Rounded white helmet shell with recessed dark visor screen,
 * ear headphones with glowing cyan concentric rings, and left-side antenna.
 * Proportioned to match the friendly, approachable aesthetic of the concept image.
 */
export function RobotHead({
  cursorTarget = { x: 0, y: 0 },
  isHovered = false,
  isThinking = false,
  isTalking = false,
  isBlinking = false,
}: RobotHeadProps) {
  const headGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!headGroupRef.current) return;
    const t = state.clock.elapsedTime;

    // ── Clamped Natural Head Tracking ─────────────────────
    const maxPitch = 0.32;
    const maxYaw = 0.55;

    let targetRotY = -cursorTarget.x * maxYaw;
    let targetRotX = cursorTarget.y * maxPitch;
    let targetRotZ = 0;

    if (isThinking) {
      // Inquisitive head tilt
      targetRotZ = 0.14 + Math.sin(t * 1.5) * 0.03;
      targetRotX += -0.06;
      targetRotY += 0.12;
    } else if (isHovered) {
      // Attentive slight forward pitch
      targetRotX += 0.06;
      targetRotZ = -Math.sin(t * 2) * 0.02;
    } else if (isTalking) {
      // Conversational subtle nods
      targetRotX += Math.sin(t * 8) * 0.03;
    } else {
      // Idle organic micro-drift
      targetRotY += Math.sin(t * 0.6) * 0.025;
      targetRotX += Math.cos(t * 0.8) * 0.02;
    }

    headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      headGroupRef.current.rotation.y,
      targetRotY,
      0.08
    );
    headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      headGroupRef.current.rotation.x,
      targetRotX,
      0.08
    );
    headGroupRef.current.rotation.z = THREE.MathUtils.lerp(
      headGroupRef.current.rotation.z,
      targetRotZ,
      0.08
    );
  });

  return (
    <group ref={headGroupRef} position={[0, 1.2, 0]}>
      {/* ── 1. MAIN ROUNDED HELMET SHELL ────────────────── */}
      <RoundedBox
        args={[0.88, 0.72, 0.64]}
        radius={0.26}
        smoothness={10}
        material={ceramicWhiteMaterial}
        castShadow
        receiveShadow
      />

      {/* ── 2. RECESSED DARK VISOR BEZEL ────────────────── */}
      {/* Rounded (not boxy) so the corners never poke outside the curved helmet */}
      <RoundedBox
        args={[0.68, 0.5, 0.1]}
        radius={0.16}
        smoothness={8}
        material={darkMechanicalMaterial}
        position={[0, 0.02, 0.27]}
      />

      {/* ── 3. DARK GLOSSY GLASS SCREEN ─────────────────── */}
      <RoundedBox
        args={[0.64, 0.46, 0.04]}
        radius={0.14}
        smoothness={8}
        material={visorGlassMaterial}
        position={[0, 0.02, 0.32]}
      />

      {/* ── 4. EYES & CURVED SMILE (FRONT OF SCREEN) ────── */}
      <RobotEyes
        lookAtOffset={cursorTarget}
        isBlinking={isBlinking}
        isHovered={isHovered}
        isThinking={isThinking}
        isTalking={isTalking}
      />

      {/* ── 5. LEFT EAR HEADPHONE POD WITH CYAN RING ────── */}
      <group position={[-0.46, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* White outer beveled ring */}
        <mesh material={ceramicWhiteMaterial} castShadow>
          <cylinderGeometry args={[0.18, 0.2, 0.08, 32]} />
        </mesh>
        {/* Dark inner recess */}
        <mesh material={darkMechanicalMaterial} position={[0, -0.045, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.02, 32]} />
        </mesh>
        {/* Glowing cyan concentric ring */}
        <mesh
          material={cyanEmissiveMaterial}
          position={[0, -0.048, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.09, 0.014, 16, 32]} />
        </mesh>
        {/* Ear dial point light */}
        <pointLight
          position={[0, -0.08, 0]}
          color="#00F0FF"
          intensity={0.4}
          distance={0.8}
          decay={2}
        />
      </group>

      {/* ── 6. RIGHT EAR HEADPHONE POD WITH CYAN RING ───── */}
      <group position={[0.46, 0.02, 0]} rotation={[0, 0, -Math.PI / 2]}>
        {/* White outer beveled ring */}
        <mesh material={ceramicWhiteMaterial} castShadow>
          <cylinderGeometry args={[0.18, 0.2, 0.08, 32]} />
        </mesh>
        {/* Dark inner recess */}
        <mesh material={darkMechanicalMaterial} position={[0, -0.045, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.02, 32]} />
        </mesh>
        {/* Glowing cyan concentric ring */}
        <mesh
          material={cyanEmissiveMaterial}
          position={[0, -0.048, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.09, 0.014, 16, 32]} />
        </mesh>
        {/* Ear dial point light */}
        <pointLight
          position={[0, -0.08, 0]}
          color="#00F0FF"
          intensity={0.4}
          distance={0.8}
          decay={2}
        />
      </group>

      {/* ── 7. LEFT-SIDE ANTENNA ────────────────────────── */}
      <group position={[-0.04, 0.04, 0]}>
        <RobotAntenna isThinking={isThinking} isHovered={isHovered} />
      </group>

      {/* ── 8. ARTICULATED DARK NECK COLLAR ─────────────── */}
      <group position={[0, -0.4, 0]}>
        <mesh material={darkMechanicalMaterial} castShadow>
          <cylinderGeometry args={[0.11, 0.13, 0.14, 24]} />
        </mesh>
        <mesh material={darkTrimMaterial} position={[0, 0.04, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}
