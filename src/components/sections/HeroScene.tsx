'use client';

import { useState } from 'react';
import { SceneCanvas } from '@/components/3d/SceneCanvas';
import { Robot, type RobotState } from '@/components/3d/Robot';
import { AIEnvironment } from '@/components/3d/AIEnvironment';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * HeroScene — the full 3D laboratory scene for the Hero section.
 * Renders the abstract AI laboratory environment in deep space
 * with the procedural Robot (A.R.I.A.) as the visual focal point.
 */
export default function HeroScene() {
  const { isMobile, isTablet } = useMediaQuery();
  const [robotState, setRobotState] = useState<RobotState>('floating');

  // Responsive 3D layout coordinates
  const robotPosition: [number, number, number] = isMobile
    ? [0, -0.25, -1.0]
    : isTablet
    ? [0.85, -0.15, -0.4]
    : [1.4, -0.05, 0];

  const robotScale = isMobile ? 0.8 : isTablet ? 0.92 : 1.05;

  // Cycle states on click for fun interactivity
  const handleClick = () => {
    setRobotState((prev) => {
      if (prev === 'floating' || prev === 'hover') return 'thinking';
      if (prev === 'thinking') return 'talking';
      return 'floating';
    });
  };

  return (
    <SceneCanvas
      className="h-full w-full"
      cameraPosition={[0, 0.2, 5.2]}
      cameraFov={40}
    >
      {/* ── Abstract AI Laboratory Deep Space Environment ── */}
      <AIEnvironment />

      {/* ── The Central Robot Character ── */}
      <Robot
        position={robotPosition}
        scale={robotScale}
        state={robotState}
        interactive={true}
        floating={true}
        onClick={handleClick}
        onHover={(hovered) => {
          if (robotState === 'floating' || robotState === 'hover') {
            setRobotState(hovered ? 'hover' : 'floating');
          }
        }}
      />
    </SceneCanvas>
  );
}
