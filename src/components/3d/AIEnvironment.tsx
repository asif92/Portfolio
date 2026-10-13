'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { Grid, ContactShadows } from '@react-three/drei';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import { AmbientLights } from './environment/AmbientLights';
import { HolographicRing } from './environment/HolographicRing';
import { DataNodes } from './environment/DataNodes';
import { NeuralConnections } from './environment/NeuralConnections';
import { FloatingParticles } from './environment/FloatingParticles';
import { ParticleField } from './environment/ParticleField';
import { MouseParallax } from './MouseParallax';

// Re-export all environment subcomponents for clean modular usage
export {
  AmbientLights,
  HolographicRing,
  DataNodes,
  NeuralConnections,
  FloatingParticles,
  ParticleField,
};

export interface AIEnvironmentProps {
  /** Display ethereal floor grid and reflective ground plane */
  showGrid?: boolean;
  /** Display neural network synapse connections */
  showNeural?: boolean;
  /** Display floating instanced geometric data points */
  showNodes?: boolean;
  /** Display holographic calibration & orbital rings */
  showRings?: boolean;
  /** Display ambient floating particles */
  showParticles?: boolean;
  /** Manual reduced motion override */
  reducedMotion?: boolean;
}

/**
 * AIEnvironment
 * Abstract AI research laboratory in deep space surrounding the robot.
 *
 * Visual Features:
 * - Dark infinite void with subtle atmospheric depth fog
 * - Holographic ground levitation ring & distant orbital calibration rings
 * - Instanced geometric data nodes (single draw call)
 * - Neural network synapse connections (single LineSegments draw call)
 * - Ambient floating star dust & quantum data specks
 * - Soft studio 3-point lighting + pulsing electric cyan back rim + white cosmic sweeps
 * - Ground plane with infinite laser grid and soft contact shadows
 *
 * Performance:
 * - 0 DOM re-renders inside the animation loop
 * - Automatically throttles instance counts on mobile devices
 * - Respects prefers-reduced-motion accessibility preference
 */
export function AIEnvironment({
  showGrid = true,
  showNeural = true,
  showNodes = true,
  showRings = true,
  showParticles = true,
  reducedMotion,
}: AIEnvironmentProps) {
  const mediaQuery = useMediaQuery();

  const isReducedMotion = reducedMotion ?? mediaQuery.prefersReducedMotion;
  const isMobile = mediaQuery.isMobile;

  // Responsive instance counts for maximum 60fps performance
  const nodeCount = useMemo(() => (isMobile ? 28 : 70), [isMobile]);
  const neuralCount = useMemo(() => (isMobile ? 18 : 42), [isMobile]);
  const particleCount = useMemo(() => (isMobile ? 120 : 280), [isMobile]);

  // Radial alpha mask so the dark floor melts into the page background
  // instead of ending in a hard black horizon line.
  const floorAlpha = useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(0.25, '#9a9a9a');
    g.addColorStop(0.5, '#262626');
    g.addColorStop(0.75, '#000000');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.NoColorSpace;
    return tex;
  }, []);

  return (
    <group>
      {/* ── 1. Atmospheric Studio & Deep Space Lighting ── */}
      <AmbientLights reducedMotion={isReducedMotion} />

      {/* ── 2. Reflective Void Ground Plane & Grid ──────── */}
      {showGrid && (
        <group>
          {/* Dark reflective floor plane */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -2.2, 0]}
            receiveShadow
          >
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial
              color="#04060E"
              roughness={0.12}
              metalness={0.88}
              envMapIntensity={0.6}
              transparent
              alphaMap={floorAlpha}
              depthWrite={false}
            />
          </mesh>

          {/* Infinite cyan laser micro-grid */}
          <Grid
            position={[0, -2.19, 0]}
            args={[36, 36]}
            cellSize={0.8}
            cellThickness={0.25}
            cellColor="#00F0FF"
            sectionSize={3.2}
            sectionThickness={0.5}
            sectionColor="#0088FF"
            fadeDistance={18}
            fadeStrength={1.4}
            infiniteGrid
          />

          {/* Soft contact shadow puddle beneath the robot */}
          <ContactShadows
            position={[0, -2.18, 0]}
            opacity={0.65}
            scale={12}
            blur={2.2}
            far={5}
            resolution={512}
            color="#001424"
          />
        </group>
      )}

      {/* ── 3. Holographic Calibration Rings ───────────── */}
      {showRings && (
        <group>
          {/* Ground levitation pedestal ring */}
          <HolographicRing
            radius={1.3}
            thickness={0.009}
            position={[0, -2.17, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            color="#00F0FF"
            speed={0.25}
            hasTicks={true}
            hasInnerRing={true}
            reducedMotion={isReducedMotion}
          />

          {/* Distant orbital halo ring in deep space */}
          <HolographicRing
            radius={2.6}
            thickness={0.006}
            position={[2.4, 1.2, -4.5]}
            rotation={[-0.4, 0.5, 0.2]}
            color="#00C8FF"
            speed={0.12}
            hasTicks={false}
            hasInnerRing={false}
            reducedMotion={isReducedMotion}
          />
        </group>
      )}

      {/* ── 4. Abstract Geometric Data Nodes (Instanced) ── */}
      {showNodes && (
        <MouseParallax strength={0.9} tilt={0.05}>
        <DataNodes
          count={nodeCount}
          spread={[22, 12, 14]}
          reducedMotion={isReducedMotion}
        />
        </MouseParallax>
      )}

      {/* ── 5. Neural Network Synapse Connections ──────── */}
      {showNeural && (
        <MouseParallax strength={0.7} tilt={0.04}>
        <NeuralConnections
          count={neuralCount}
          maxDistance={3.8}
          spread={[22, 11, 13]}
          color="#00F0FF"
          reducedMotion={isReducedMotion}
        />
        </MouseParallax>
      )}

      {/* ── 6. Floating Particulate Field ──────────────── */}
      {showParticles && (
        <MouseParallax strength={1.4} tilt={0.09}>
        <ParticleField
          count={particleCount}
          spread={[26, 15, 18]}
          size={0.016}
          speed={0.03}
          color="#00F0FF"
          reducedMotion={isReducedMotion}
        />
        </MouseParallax>
      )}
    </group>
  );
}
