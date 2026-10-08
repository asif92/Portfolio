'use client';

import { Canvas } from '@react-three/fiber';
import { Preload, AdaptiveDpr } from '@react-three/drei';
import { Suspense } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface SceneCanvasProps {
  children: React.ReactNode;
  /** className for the outer wrapper div */
  className?: string;
  /** Camera configuration */
  cameraPosition?: [number, number, number];
  cameraFov?: number;
}

/**
 * SceneCanvas — base Three.js canvas wrapper.
 *
 * Features:
 * - AdaptiveDpr for performance scaling on low-end devices
 * - Suspense boundary with null fallback (load indicators handled by sections)
 * - Reduced quality on mobile for 60fps
 * - Proper gl settings for post-processing compatibility
 */
export function SceneCanvas({
  children,
  className = '',
  cameraPosition = [0, 0, 5],
  cameraFov = 45,
}: SceneCanvasProps) {
  const { isMobile, prefersReducedMotion } = useMediaQuery();

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{
          position: cameraPosition,
          fov: cameraFov,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: true,
          // Required for post-processing
          preserveDrawingBuffer: false,
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        shadows={!isMobile && !prefersReducedMotion}
        frameloop={prefersReducedMotion ? 'demand' : 'always'}
      >
        {/* Adaptive pixel ratio based on performance */}
        <AdaptiveDpr pixelated />

        {/* Preload all drei assets */}
        <Preload all />

        {/* Scene content */}
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
