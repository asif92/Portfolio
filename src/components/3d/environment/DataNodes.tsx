'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface DataNodeData {
  position: [number, number, number];
  baseScale: number;
  rotationSpeed: [number, number, number];
  floatPhase: number;
  floatSpeed: number;
  color: THREE.Color;
}

interface DataNodesProps {
  count?: number;
  spread?: [number, number, number];
  reducedMotion?: boolean;
  onNodesReady?: (positions: Float32Array) => void;
}

/**
 * DataNodes
 * Abstract floating geometric data points rendered via a single InstancedMesh.
 * 
 * Performance:
 * - 1 draw call for all nodes
 * - Zero React re-renders in the animation loop
 * - Skips per-frame matrix recalculations when reduced motion is requested
 */
export function DataNodes({
  count = 75,
  spread = [20, 12, 14],
  reducedMotion = false,
  onNodesReady,
}: DataNodesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Precompute static node attributes once
  const nodes = useMemo<DataNodeData[]>(() => {
    const data: DataNodeData[] = [];
    const colors = [
      new THREE.Color('#00F0FF'), // Bright cyan
      new THREE.Color('#00B4D8'), // Deep cyan
      new THREE.Color('#64D2FF'), // Ice blue
      new THREE.Color('#E0F2FE'), // Pale data white
    ];

    for (let i = 0; i < count; i++) {
      // Keep nodes distributed around the scene, avoiding the immediate robot center
      let x = (Math.random() - 0.5) * spread[0];
      let y = (Math.random() - 0.5) * spread[1] + 0.5;
      let z = (Math.random() - 0.5) * spread[2] - 2;

      // Radial clearance around the robot center (x: 1.2, y: 0)
      const distFromRobot = Math.hypot(x - 1.2, y);
      if (distFromRobot < 2.2) {
        x += (x > 1.2 ? 1 : -1) * 2.2;
      }

      data.push({
        position: [x, y, z],
        baseScale: 0.5 + Math.random() * 0.7,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
        ],
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.6 + Math.random() * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    return data;
  }, [count, spread]);

  // Pass initial positions array to parents (for NeuralConnections)
  useEffect(() => {
    if (onNodesReady) {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 0] = nodes[i].position[0];
        arr[i * 3 + 1] = nodes[i].position[1];
        arr[i * 3 + 2] = nodes[i].position[2];
      }
      onNodesReady(arr);
    }
  }, [count, nodes, onNodesReady]);

  // Initialize instances and colors on mount
  useEffect(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const node = nodes[i];
      dummy.position.set(...node.position);
      dummy.scale.setScalar(node.baseScale * 0.12);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, node.color);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [count, nodes, dummy]);

  // Subtle floating and tumbling in frame loop
  useFrame((state) => {
    if (reducedMotion || !meshRef.current) return;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const node = nodes[i];
      const floatY = node.position[1] + Math.sin(t * node.floatSpeed + node.floatPhase) * 0.15;
      const floatX = node.position[0] + Math.cos(t * (node.floatSpeed * 0.7) + node.floatPhase) * 0.08;

      dummy.position.set(floatX, floatY, node.position[2]);
      dummy.rotation.x = t * node.rotationSpeed[0];
      dummy.rotation.y = t * node.rotationSpeed[1];
      dummy.rotation.z = t * node.rotationSpeed[2];
      dummy.scale.setScalar(node.baseScale * 0.12);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Abstract geometric geometry — clean beveled octahedron
  const geometry = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#E2E8F0',
        roughness: 0.15,
        metalness: 0.85,
        emissive: '#00E5FF',
        emissiveIntensity: 0.8,
        toneMapped: false,
      }),
    []
  );

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      castShadow={false}
      receiveShadow={false}
    />
  );
}
