'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

/**
 * AriaRobot — procedural 3D robot character (A.R.I.A.)
 *
 * Constructed entirely from Three.js primitives to match the concept image:
 * - Rounded spherical head with visor and cyan glowing eyes
 * - White/dark chassis body with chest core emissive
 * - Animated breathing (idle float)
 * - Head tracks mouse cursor
 * - Antenna with glowing tip
 *
 * NOTE: This is the foundational procedural version.
 * It will be upgraded to a full GLTF model in a later phase.
 */
export function AriaRobot() {
  const mousePosition = useMousePosition(0.05);
  const headRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const antennaTipRef = useRef<THREE.Mesh>(null);

  // Materials
  const chassisMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F0F4F8',
        roughness: 0.15,
        metalness: 0.1,
        envMapIntensity: 1.0,
      }),
    []
  );

  const darkJointMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1A1F2E',
        roughness: 0.3,
        metalness: 0.5,
      }),
    []
  );

  const cyanEmissiveMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00F0FF',
        emissive: '#00F0FF',
        emissiveIntensity: 2.0,
        roughness: 0.1,
        metalness: 0.0,
      }),
    []
  );

  const visorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0A0E1A',
        roughness: 0.0,
        metalness: 0.8,
        envMapIntensity: 2.0,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mouse = mousePosition.current;

    // Body breathing float
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 0.8) * 0.04;
    }

    // Head cursor tracking with damping
    if (headRef.current) {
      const targetRotX = mouse.y * 0.2;
      const targetRotY = mouse.x * 0.3;
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.08);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.08);
    }

    // Core pulse
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(t * 2) * 0.8;
      coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.03);
    }

    // Eye shimmer
    if (eyeLeftRef.current && eyeRightRef.current) {
      const mat = eyeLeftRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.8 + Math.sin(t * 3 + 1) * 0.5;
      (eyeRightRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.8 + Math.sin(t * 3) * 0.5;
    }

    // Antenna tip blink
    if (antennaTipRef.current) {
      const mat = antennaTipRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = Math.sin(t * 4) > 0.9 ? 3 : 1.5;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.3}>
      <group position={[0, 0, 0]} scale={1}>

        {/* ── Full Body Group ────────────────────────────── */}
        <group ref={bodyRef}>

          {/* ── HEAD ──────────────────────────────────────── */}
          <group ref={headRef} position={[0, 1.15, 0]}>
            {/* Main head sphere */}
            <mesh material={chassisMaterial} castShadow>
              <sphereGeometry args={[0.42, 32, 32]} />
            </mesh>

            {/* Visor — flat dark face panel */}
            <mesh position={[0, 0, 0.3]} material={visorMaterial}>
              <boxGeometry args={[0.55, 0.38, 0.08]} />
            </mesh>

            {/* Eye Left */}
            <mesh ref={eyeLeftRef} position={[-0.13, 0.04, 0.36]} castShadow>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial
                color="#00EEFF"
                emissive="#00F0FF"
                emissiveIntensity={2}
                roughness={0.0}
                metalness={0.0}
              />
            </mesh>

            {/* Eye Right */}
            <mesh ref={eyeRightRef} position={[0.13, 0.04, 0.36]} castShadow>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial
                color="#00EEFF"
                emissive="#00F0FF"
                emissiveIntensity={2}
                roughness={0.0}
                metalness={0.0}
              />
            </mesh>

            {/* Antenna base */}
            <mesh position={[-0.18, 0.42, 0]} material={darkJointMaterial}>
              <cylinderGeometry args={[0.018, 0.018, 0.22, 8]} />
            </mesh>

            {/* Antenna tip */}
            <mesh ref={antennaTipRef} position={[-0.18, 0.56, 0]}>
              <sphereGeometry args={[0.038, 12, 12]} />
              <meshStandardMaterial
                color="#00F0FF"
                emissive="#00F0FF"
                emissiveIntensity={2}
                roughness={0.0}
                metalness={0.0}
              />
            </mesh>

            {/* Ear panels (side accents) */}
            <mesh position={[-0.44, 0.0, 0]} material={darkJointMaterial}>
              <boxGeometry args={[0.06, 0.18, 0.14]} />
            </mesh>
            <mesh position={[0.44, 0.0, 0]} material={darkJointMaterial}>
              <boxGeometry args={[0.06, 0.18, 0.14]} />
            </mesh>
          </group>

          {/* ── NECK ──────────────────────────────────────── */}
          <mesh position={[0, 0.78, 0]} material={darkJointMaterial} castShadow>
            <cylinderGeometry args={[0.1, 0.12, 0.22, 12]} />
          </mesh>

          {/* ── TORSO ─────────────────────────────────────── */}
          <mesh position={[0, 0.28, 0]} material={chassisMaterial} castShadow>
            <boxGeometry args={[0.72, 0.72, 0.38]} />
          </mesh>

          {/* Chest Core Light */}
          <mesh ref={coreRef} position={[0, 0.32, 0.22]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#00F0FF"
              emissive="#00F0FF"
              emissiveIntensity={2}
              roughness={0.0}
              metalness={0.0}
            />
          </mesh>

          {/* Chest Core Point Light */}
          <pointLight
            position={[0, 0.32, 0.4]}
            color="#00F0FF"
            intensity={0.8}
            distance={2}
            decay={2}
          />

          {/* Torso back stripe */}
          <mesh position={[0, 0.28, -0.19]} material={darkJointMaterial}>
            <boxGeometry args={[0.12, 0.6, 0.02]} />
          </mesh>

          {/* ── SHOULDERS ─────────────────────────────────── */}
          <mesh position={[-0.46, 0.52, 0]} material={darkJointMaterial} castShadow>
            <sphereGeometry args={[0.14, 16, 16]} />
          </mesh>
          <mesh position={[0.46, 0.52, 0]} material={darkJointMaterial} castShadow>
            <sphereGeometry args={[0.14, 16, 16]} />
          </mesh>

          {/* ── ARMS ──────────────────────────────────────── */}
          {/* Left upper arm */}
          <mesh position={[-0.56, 0.2, 0]} material={chassisMaterial} castShadow>
            <capsuleGeometry args={[0.1, 0.28, 4, 8]} />
          </mesh>
          {/* Left forearm */}
          <mesh position={[-0.56, -0.14, 0]} material={chassisMaterial} castShadow>
            <capsuleGeometry args={[0.085, 0.2, 4, 8]} />
          </mesh>
          {/* Left elbow joint */}
          <mesh position={[-0.56, 0.02, 0]} material={darkJointMaterial}>
            <sphereGeometry args={[0.1, 12, 12]} />
          </mesh>
          {/* Left hand */}
          <mesh position={[-0.56, -0.32, 0]} material={darkJointMaterial} castShadow>
            <sphereGeometry args={[0.09, 12, 12]} />
          </mesh>

          {/* Right upper arm */}
          <mesh position={[0.56, 0.2, 0]} material={chassisMaterial} castShadow>
            <capsuleGeometry args={[0.1, 0.28, 4, 8]} />
          </mesh>
          {/* Right forearm */}
          <mesh position={[0.56, -0.14, 0]} material={chassisMaterial} castShadow>
            <capsuleGeometry args={[0.085, 0.2, 4, 8]} />
          </mesh>
          {/* Right elbow joint */}
          <mesh position={[0.56, 0.02, 0]} material={darkJointMaterial}>
            <sphereGeometry args={[0.1, 12, 12]} />
          </mesh>
          {/* Right hand */}
          <mesh position={[0.56, -0.32, 0]} material={darkJointMaterial} castShadow>
            <sphereGeometry args={[0.09, 12, 12]} />
          </mesh>

          {/* ── PELVIS ────────────────────────────────────── */}
          <mesh position={[0, -0.2, 0]} material={darkJointMaterial} castShadow>
            <boxGeometry args={[0.56, 0.2, 0.32]} />
          </mesh>

          {/* ── LEGS ──────────────────────────────────────── */}
          {/* Left thigh */}
          <mesh position={[-0.2, -0.58, 0]} material={chassisMaterial} castShadow>
            <capsuleGeometry args={[0.13, 0.3, 4, 8]} />
          </mesh>
          {/* Left shin */}
          <mesh position={[-0.2, -0.98, 0]} material={chassisMaterial} castShadow>
            <capsuleGeometry args={[0.11, 0.28, 4, 8]} />
          </mesh>
          {/* Left knee */}
          <mesh position={[-0.2, -0.76, 0]} material={darkJointMaterial}>
            <sphereGeometry args={[0.13, 12, 12]} />
          </mesh>
          {/* Left foot */}
          <mesh position={[-0.2, -1.22, 0.06]} material={chassisMaterial} castShadow>
            <boxGeometry args={[0.22, 0.14, 0.34]} />
          </mesh>

          {/* Right thigh */}
          <mesh position={[0.2, -0.58, 0]} material={chassisMaterial} castShadow>
            <capsuleGeometry args={[0.13, 0.3, 4, 8]} />
          </mesh>
          {/* Right shin */}
          <mesh position={[0.2, -0.98, 0]} material={chassisMaterial} castShadow>
            <capsuleGeometry args={[0.11, 0.28, 4, 8]} />
          </mesh>
          {/* Right knee */}
          <mesh position={[0.2, -0.76, 0]} material={darkJointMaterial}>
            <sphereGeometry args={[0.13, 12, 12]} />
          </mesh>
          {/* Right foot */}
          <mesh position={[0.2, -1.22, 0.06]} material={chassisMaterial} castShadow>
            <boxGeometry args={[0.22, 0.14, 0.34]} />
          </mesh>

          {/* ── FOOT ACCENT GLOWS ─────────────────────────── */}
          <mesh position={[-0.2, -1.24, -0.04]} material={cyanEmissiveMaterial}>
            <boxGeometry args={[0.18, 0.02, 0.06]} />
          </mesh>
          <mesh position={[0.2, -1.24, -0.04]} material={cyanEmissiveMaterial}>
            <boxGeometry args={[0.18, 0.02, 0.06]} />
          </mesh>

          {/* ── PEDESTAL ──────────────────────────────────── */}
          <mesh position={[0, -1.42, 0]} receiveShadow>
            <cylinderGeometry args={[0.5, 0.6, 0.08, 32]} />
            <meshStandardMaterial
              color="#0B111E"
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          {/* Pedestal rim glow */}
          <mesh position={[0, -1.38, 0]}>
            <torusGeometry args={[0.52, 0.012, 8, 64]} />
            <meshStandardMaterial
              color="#00F0FF"
              emissive="#00F0FF"
              emissiveIntensity={2}
            />
          </mesh>
          <pointLight
            position={[0, -1.3, 0]}
            color="#00F0FF"
            intensity={0.6}
            distance={1.5}
            decay={2}
          />
        </group>
      </group>
    </Float>
  );
}
