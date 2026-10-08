'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/**
 * LabEnvironment — the ambient 3D scene:
 * - Reflective dark floor plane with subtle hex grid
 * - Directional key light (cool white)
 * - Cyan rim back-light
 * - Ambient fill
 * - Volumetric fog
 */
export function LabEnvironment() {
  const rimLightRef = useRef<THREE.PointLight>(null);

  // Subtle rim light pulse
  useFrame((state) => {
    if (!rimLightRef.current) return;
    const t = state.clock.elapsedTime;
    rimLightRef.current.intensity = 1.8 + Math.sin(t * 1.2) * 0.3;
  });

  return (
    <>
      {/* ── Lighting ────────────────────────────────────── */}

      {/* Hemisphere fill — soft sky cool white and deep dark ground reflection */}
      <hemisphereLight
        color="#D8E8F8"
        groundColor="#0B1324"
        intensity={0.85}
      />

      {/* Ambient fill */}
      <ambientLight color="#182438" intensity={0.5} />

      {/* Frontal soft key light — brings out clean white ceramic */}
      <directionalLight
        position={[2, 4, 5]}
        color="#FFFFFF"
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Rim light left — cool ice blue */}
      <directionalLight
        position={[-5, 3, 2]}
        color="#88CCFF"
        intensity={0.7}
      />

      {/* Back rim light — pulsing electric cyan */}
      <pointLight
        ref={rimLightRef}
        position={[0, 2.5, -3]}
        color="#00F0FF"
        intensity={2.2}
        distance={8}
        decay={2}
      />

      {/* Under-glow / ground bounce */}
      <pointLight
        position={[0, -1.8, 1.5]}
        color="#0088FF"
        intensity={0.6}
        distance={5}
        decay={2}
      />

      {/* ── Floor Plane ─────────────────────────────────── */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.2, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#050811"
          roughness={0.1}
          metalness={0.8}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* ── Subtle Grid Overlay ──────────────────────────── */}
      <Grid
        position={[0, -2.19, 0]}
        args={[30, 30]}
        cellSize={1}
        cellThickness={0.3}
        cellColor="#00F0FF"
        sectionSize={4}
        sectionThickness={0.6}
        sectionColor="#0088FF"
        fadeDistance={16}
        fadeStrength={1.2}
        infiniteGrid
      />

      {/* ── Soft Ground Contact Shadow ──────────────────── */}
      <ContactShadows
        position={[0, -2.18, 0]}
        opacity={0.65}
        scale={10}
        blur={2}
        far={4.5}
        resolution={512}
        color="#001828"
      />

      {/* ── Fog ────────────────────────────────────────── */}
      <fog attach="fog" args={['#050811', 10, 28]} />
    </>
  );
}
