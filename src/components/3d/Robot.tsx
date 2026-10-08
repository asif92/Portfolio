'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

import { RobotHead } from './robot/RobotHead';
import { RobotEyes } from './robot/RobotEyes';
import { RobotBody } from './robot/RobotBody';
import { RobotCore } from './robot/RobotCore';
import { RobotArm } from './robot/RobotArm';
import { RobotHand } from './robot/RobotHand';
import { RobotLeg } from './robot/RobotLeg';
import { RobotFoot } from './robot/RobotFoot';
import { RobotAntenna } from './robot/RobotAntenna';

// Re-export all subcomponents for direct usage
export {
  RobotHead,
  RobotEyes,
  RobotBody,
  RobotCore,
  RobotArm,
  RobotHand,
  RobotLeg,
  RobotFoot,
  RobotAntenna,
};

export type RobotState = 'idle' | 'floating' | 'hover' | 'thinking' | 'talking';

export interface RobotProps {
  /** Operational state of the robot */
  state?: RobotState;
  /** Enable mouse tracking and interactive hover states */
  interactive?: boolean;
  /** Scale multiplier */
  scale?: number;
  /** Position in 3D space */
  position?: [number, number, number];
  /** Base rotation in radians */
  rotation?: [number, number, number];
  /** Hover event callback */
  onHover?: (hovered: boolean) => void;
  /** Click event callback */
  onClick?: () => void;
  /** Enable floating levitation mode */
  floating?: boolean;
}

/**
 * Robot
 * The central procedural 3D assistant (A.R.I.A.) inspired by the concept design.
 * Features:
 * - Ceramic white armor shell + dark mechanical inner joints
 * - Glowing electric cyan eyes, chest reactor, ear dials, and foot energy strips
 * - Idle breathing & floating hovering kinematics
 * - Cursor gaze tracking with damped slerp
 * - Autonomous blinking, thinking, talking, and hover reactions
 */
export function Robot({
  state = 'floating',
  interactive = true,
  scale = 1.0,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onHover,
  onClick,
  floating = true,
}: RobotProps) {
  const rootRef = useRef<THREE.Group>(null);
  const floatGroupRef = useRef<THREE.Group>(null);
  const mousePosition = useMousePosition(0.06);

  const [isPointerOver, setIsPointerOver] = useState(false);

  // Derive active states
  const isHovered = isPointerOver || state === 'hover';
  const isThinking = state === 'thinking';
  const isTalking = state === 'talking';
  const isFloating = floating || state === 'floating';

  useFrame((stateCtx) => {
    const t = stateCtx.clock.elapsedTime;

    if (floatGroupRef.current) {
      // ── 1. Floating & Breathing Motion ───────────────────
      let floatY = 0;
      let rollZ = 0;
      let pitchX = 0;

      if (isFloating) {
        // High-tech floating oscillation: dual sine waves for organic drift
        const floatSpeed = isHovered ? 2.4 : isThinking ? 1.6 : 1.8;
        const floatAmp = isHovered ? 0.08 : 0.06;
        floatY = Math.sin(t * floatSpeed) * floatAmp + Math.sin(t * (floatSpeed * 0.5)) * 0.02;

        // Subtle banking roll and pitch
        rollZ = Math.sin(t * (floatSpeed * 0.8)) * 0.02;
        pitchX = Math.cos(t * (floatSpeed * 0.7)) * 0.015;

        // Hover perks up the robot slightly
        if (isHovered) {
          floatY += 0.05;
        }
      } else {
        // Grounded idle breathing
        floatY = Math.sin(t * 1.4) * 0.018;
      }

      floatGroupRef.current.position.y = THREE.MathUtils.lerp(
        floatGroupRef.current.position.y,
        floatY,
        0.1
      );
      floatGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        floatGroupRef.current.rotation.z,
        rollZ,
        0.08
      );
      floatGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        floatGroupRef.current.rotation.x,
        pitchX,
        0.08
      );
    }
  });

  const handlePointerOver = (e?: { stopPropagation?: () => void }) => {
    if (!interactive) return;
    e?.stopPropagation?.();
    setIsPointerOver(true);
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'pointer';
    }
    onHover?.(true);
  };

  const handlePointerOut = (e?: { stopPropagation?: () => void }) => {
    if (!interactive) return;
    e?.stopPropagation?.();
    setIsPointerOver(false);
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'auto';
    }
    onHover?.(false);
  };

  // Cursor coordinates for head/eye IK
  const cursorTarget = interactive
    ? { x: mousePosition.current.x, y: mousePosition.current.y }
    : { x: 0, y: 0 };

  return (
    <group
      ref={rootRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={onClick}
    >
      {/* ── Levitation & Floating Kinematics Group ──────── */}
      <group ref={floatGroupRef}>

        {/* ── Invisible Hitbox for seamless, gap-free raycasting ── */}
        <mesh
          position={[0, 0.1, 0]}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={onClick}
        >
          <capsuleGeometry args={[0.58, 1.9, 8, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* ── HEAD & VISOR (Tracks Cursor) ───────────────── */}
        <RobotHead
          cursorTarget={cursorTarget}
          isHovered={isHovered}
          isThinking={isThinking}
          isTalking={isTalking}
        />

        {/* ── TORSO & CHEST REACTOR ──────────────────────── */}
        <RobotBody
          isHovered={isHovered}
          isThinking={isThinking}
          isTalking={isTalking}
        />

        {/* ── LEFT ARM ───────────────────────────────────── */}
        <RobotArm
          side="left"
          isHovered={isHovered}
          isTalking={isTalking}
          isThinking={isThinking}
        />

        {/* ── RIGHT ARM ──────────────────────────────────── */}
        <RobotArm
          side="right"
          isHovered={isHovered}
          isTalking={isTalking}
          isThinking={isThinking}
        />

        {/* ── LEFT LEG & FOOT ────────────────────────────── */}
        <RobotLeg
          side="left"
          isFloating={isFloating}
          isHovered={isHovered}
        />

        {/* ── RIGHT LEG & FOOT ───────────────────────────── */}
        <RobotLeg
          side="right"
          isFloating={isFloating}
          isHovered={isHovered}
        />

      </group>
    </group>
  );
}
