'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createRng } from '@/lib/seeded-random';

interface NeuralConnectionsProps {
  count?: number;
  maxDistance?: number;
  spread?: [number, number, number];
  color?: string;
  reducedMotion?: boolean;
}

/**
 * NeuralConnections
 * Renders glowing neural network synapses connecting nearby spatial nodes.
 *
 * Performance:
 * - 1 draw call using THREE.LineSegments
 * - Vertex pairs precomputed in useMemo
 * - Smooth wave pulse in useFrame via material opacity modulation
 */
export function NeuralConnections({
  count = 45,
  maxDistance = 4.2,
  spread = [20, 10, 12],
  color = '#00F0FF',
  reducedMotion = false,
}: NeuralConnectionsProps) {
  const [sx, sy, sz] = spread;
  const lineMeshRef = useRef<THREE.LineSegments>(null);

  // Generate node cluster and connect neighbors
  const { lineGeometry, material } = useMemo(() => {
    const rand = createRng(23);
    // Generate cluster points
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      let x = (rand() - 0.5) * sx;
      let y = (rand() - 0.5) * sy + 0.5;
      let z = (rand() - 0.5) * sz - 2;

      // Keep clearance around the central robot
      if (Math.hypot(x - 1.2, y) < 2.0) {
        x += (x > 1.2 ? 1 : -1) * 2.0;
      }

      points.push(new THREE.Vector3(x, y, z));
    }

    // Connect pairs within maxDistance
    const lineVertices: number[] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const d = points[i].distanceTo(points[j]);
        if (d < maxDistance) {
          lineVertices.push(
            points[i].x, points[i].y, points[i].z,
            points[j].x, points[j].y, points[j].z
          );
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(lineVertices, 3)
    );

    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return { lineGeometry: geo, material: mat };
  }, [count, maxDistance, sx, sy, sz, color]);

  // Subtle neural pulse animation
  useFrame((state) => {
    if (reducedMotion || !lineMeshRef.current) return;
    const t = state.clock.elapsedTime;
    const mat = lineMeshRef.current.material as THREE.LineBasicMaterial;
    if (mat) {
      mat.opacity = 0.18 + Math.sin(t * 1.6) * 0.08;
    }
  });

  return (
    <lineSegments
      ref={lineMeshRef}
      geometry={lineGeometry}
      material={material}
    />
  );
}
