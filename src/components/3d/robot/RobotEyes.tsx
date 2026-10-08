'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { cyanEyeMaterial, eyeHighlightMaterial, cyanEmissiveMaterial } from './materials';

interface RobotEyesProps {
  lookAtOffset?: { x: number; y: number };
  isBlinking?: boolean;
  isHovered?: boolean;
  isThinking?: boolean;
  isTalking?: boolean;
}

/**
 * RobotEyes
 * Digital facial features rendered crisply on the front of the dark visor screen:
 * - Two large, friendly glowing cyan capsule eyes matching the concept image
 * - Prominent white reflection gleams (pupil highlights)
 * - Friendly curved cyan smile line
 * - Blinking, cursor gaze tracking, and talking animations
 */
export function RobotEyes({
  lookAtOffset = { x: 0, y: 0 },
  isBlinking = false,
  isHovered = false,
  isThinking = false,
  isTalking = false,
}: RobotEyesProps) {
  const leftEyeGroup = useRef<THREE.Group>(null);
  const rightEyeGroup = useRef<THREE.Group>(null);
  const mouthRef = useRef<THREE.Group>(null);

  // Autonomous blinking state
  const blinkProgress = useRef(1.0); // 1 = fully open, 0 = closed
  const blinkTimer = useRef(1.5);
  const nextBlinkInterval = useRef(3.5);

  // Friendly curved smile geometry
  const mouthGeometry = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.09, 0.015, 0),
      new THREE.Vector3(0, -0.035, 0),
      new THREE.Vector3(0.09, 0.015, 0)
    );
    return new THREE.TubeGeometry(curve, 24, 0.009, 8, false);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // ── 1. Autonomous Natural Blinking ────────────────────
    blinkTimer.current += delta;
    if (blinkTimer.current > nextBlinkInterval.current) {
      blinkTimer.current = 0;
      nextBlinkInterval.current = 3.0 + Math.random() * 3.5;
    }

    // Fast, organic eyelid snap (~0.14s)
    let targetBlinkScale = 1.0;
    if (isBlinking || blinkTimer.current < 0.14) {
      const progress = blinkTimer.current / 0.14;
      targetBlinkScale = Math.abs(Math.sin(progress * Math.PI));
    }

    blinkProgress.current = THREE.MathUtils.lerp(
      blinkProgress.current,
      targetBlinkScale,
      0.4
    );

    // Eye scaling (hover perks eyes up, thinking narrows slightly)
    const baseScaleX = isHovered ? 1.1 : isThinking ? 0.95 : 1.0;
    const baseScaleY = (isHovered ? 1.12 : 1.0) * Math.max(0.06, blinkProgress.current);

    // Gaze tracking clamped within visor bounds
    const gazeX = THREE.MathUtils.clamp(lookAtOffset.x * 0.045, -0.04, 0.04);
    const gazeY = THREE.MathUtils.clamp(lookAtOffset.y * 0.035, -0.03, 0.03);

    // Thinking: curious upward-right gaze drift
    const thinkX = isThinking ? 0.03 + Math.sin(t * 3) * 0.01 : 0;
    const thinkY = isThinking ? 0.035 : 0;

    if (leftEyeGroup.current) {
      leftEyeGroup.current.scale.set(baseScaleX, baseScaleY, 1);
      leftEyeGroup.current.position.x = THREE.MathUtils.lerp(
        leftEyeGroup.current.position.x,
        -0.16 + gazeX + thinkX,
        0.18
      );
      leftEyeGroup.current.position.y = THREE.MathUtils.lerp(
        leftEyeGroup.current.position.y,
        0.045 + gazeY + thinkY,
        0.18
      );
    }

    if (rightEyeGroup.current) {
      rightEyeGroup.current.scale.set(baseScaleX, baseScaleY, 1);
      rightEyeGroup.current.position.x = THREE.MathUtils.lerp(
        rightEyeGroup.current.position.x,
        0.16 + gazeX + thinkX,
        0.18
      );
      rightEyeGroup.current.position.y = THREE.MathUtils.lerp(
        rightEyeGroup.current.position.y,
        0.045 + gazeY + thinkY,
        0.18
      );
    }

    // ── 2. Mouth Smile & Speech Animation ─────────────────
    if (mouthRef.current) {
      if (isTalking) {
        // Conversational speech flutter
        const waveY = 1.0 + Math.sin(t * 16) * 0.7;
        const waveX = 1.0 + Math.cos(t * 12) * 0.25;
        mouthRef.current.scale.set(waveX, waveY, 1);
      } else if (isHovered) {
        // Broad happy smile on hover
        mouthRef.current.scale.set(1.25, 1.35, 1);
      } else {
        mouthRef.current.scale.set(1.0, 1.0, 1);
      }
    }
  });

  return (
    <group position={[0, 0, 0.335]}>
      {/* ── LEFT EYE ────────────────────────────────────── */}
      <group ref={leftEyeGroup} position={[-0.16, 0.045, 0]}>
        {/* Main large glowing cyan eye capsule */}
        <mesh material={cyanEyeMaterial}>
          <capsuleGeometry args={[0.08, 0.12, 16, 24]} />
        </mesh>

        {/* Large top-left white gleam / pupil reflection */}
        <mesh material={eyeHighlightMaterial} position={[-0.028, 0.045, 0.015]}>
          <sphereGeometry args={[0.032, 16, 16]} />
        </mesh>

        {/* Soft bottom-right secondary gleam */}
        <mesh material={eyeHighlightMaterial} position={[0.024, -0.032, 0.015]}>
          <sphereGeometry args={[0.018, 12, 12]} />
        </mesh>
      </group>

      {/* ── RIGHT EYE ───────────────────────────────────── */}
      <group ref={rightEyeGroup} position={[0.16, 0.045, 0]}>
        {/* Main large glowing cyan eye capsule */}
        <mesh material={cyanEyeMaterial}>
          <capsuleGeometry args={[0.08, 0.12, 16, 24]} />
        </mesh>

        {/* Large top-left white gleam / pupil reflection */}
        <mesh material={eyeHighlightMaterial} position={[-0.028, 0.045, 0.015]}>
          <sphereGeometry args={[0.032, 16, 16]} />
        </mesh>

        {/* Soft bottom-right secondary gleam */}
        <mesh material={eyeHighlightMaterial} position={[0.024, -0.032, 0.015]}>
          <sphereGeometry args={[0.018, 12, 12]} />
        </mesh>
      </group>

      {/* ── FRIENDLY CURVED CYAN SMILE ─────────────────── */}
      <group ref={mouthRef} position={[0, -0.09, 0]}>
        <mesh geometry={mouthGeometry} material={cyanEmissiveMaterial} />
      </group>

      {/* Facial radiance glow on the visor */}
      <pointLight
        position={[0, 0, 0.12]}
        color="#00F0FF"
        intensity={0.65}
        distance={1.0}
        decay={2}
      />
    </group>
  );
}
