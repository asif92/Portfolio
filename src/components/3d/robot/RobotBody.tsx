'use client';

import { RoundedBox } from '@react-three/drei';
import {
  ceramicWhiteMaterial,
  darkMechanicalMaterial,
  cyanEmissiveMaterial,
  darkTrimMaterial,
} from './materials';
import { RobotCore } from './RobotCore';

interface RobotBodyProps {
  isHovered?: boolean;
  isThinking?: boolean;
  isTalking?: boolean;
}

/**
 * RobotBody
 * Sculpted torso and pelvis:
 * - Upper white chest armor cuirass
 * - Central glowing cyan chest reactor (RobotCore)
 * - Dark inner spine, lateral waist joints, and mechanical pelvis
 * - Back view: dark spinal groove with vertical glowing cyan power strip
 */
export function RobotBody({
  isHovered = false,
  isThinking = false,
  isTalking = false,
}: RobotBodyProps) {
  return (
    <group position={[0, 0.35, 0]}>
      {/* ── 1. MAIN CHEST ARMOR CUIRASS ─────────────────── */}
      {/* Beveled white upper chest shell */}
      <RoundedBox
        args={[0.74, 0.58, 0.38]}
        radius={0.16}
        smoothness={6}
        material={ceramicWhiteMaterial}
        position={[0, 0.05, 0]}
        castShadow
        receiveShadow
      />

      {/* ── 2. CENTRAL GLOWING CHEST REACTOR ────────────── */}
      <group position={[0, 0, -0.02]}>
        <RobotCore
          isHovered={isHovered}
          isThinking={isThinking}
          isTalking={isTalking}
        />
      </group>

      {/* ── 3. LATERAL WAIST CUTOUTS & MECHANICAL CORE ──── */}
      {/* Dark spine pillar */}
      <mesh material={darkMechanicalMaterial} position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.18, 0.16, 0.32, 24]} />
      </mesh>

      {/* Articulated waist side pistons / rib trims */}
      <mesh material={darkTrimMaterial} position={[-0.26, -0.12, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.22, 16]} />
      </mesh>
      <mesh material={darkTrimMaterial} position={[0.26, -0.12, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.22, 16]} />
      </mesh>

      {/* ── 4. BACK SPINAL GROOVE & CYAN ENERGY STRIP ───── */}
      {/* Dark recessed spine channel */}
      <mesh material={darkMechanicalMaterial} position={[0, 0.06, -0.185]}>
        <boxGeometry args={[0.14, 0.44, 0.04]} />
      </mesh>

      {/* Vertical glowing cyan power strip on back (from reference) */}
      <mesh material={cyanEmissiveMaterial} position={[0, 0.06, -0.202]}>
        <boxGeometry args={[0.035, 0.34, 0.015]} />
      </mesh>

      {/* Back glow light */}
      <pointLight
        position={[0, 0.06, -0.26]}
        color="#00F0FF"
        intensity={0.4}
        distance={1.2}
        decay={2}
      />

      {/* ── 5. MECHANICAL PELVIS / GROIN CHASSIS ────────── */}
      <group position={[0, -0.32, 0]}>
        {/* Dark mechanical chassis core */}
        <RoundedBox
          args={[0.48, 0.18, 0.3]}
          radius={0.06}
          smoothness={4}
          material={darkMechanicalMaterial}
          castShadow
        />

        {/* Front white pelvis armor plate */}
        <mesh material={ceramicWhiteMaterial} position={[0, 0.01, 0.12]} castShadow>
          <boxGeometry args={[0.24, 0.14, 0.06]} />
        </mesh>

        {/* Back white belt plate */}
        <mesh material={ceramicWhiteMaterial} position={[0, 0.01, -0.12]} castShadow>
          <boxGeometry args={[0.28, 0.14, 0.06]} />
        </mesh>
      </group>
    </group>
  );
}
