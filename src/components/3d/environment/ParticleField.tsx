'use client';

import { FloatingParticles } from './FloatingParticles';

interface ParticleFieldProps {
  count?: number;
  spread?: [number, number, number] | number;
  size?: number;
  speed?: number;
  color?: string;
  reducedMotion?: boolean;
}

/**
 * ParticleField
 * Multi-layer particulate field wrapper.
 * Combines deep-space stellar dust with glowing electric cyan quantum particles.
 */
export function ParticleField({
  count = 320,
  spread = [24, 14, 16],
  size = 0.016,
  speed = 0.035,
  color = '#00F0FF',
  reducedMotion = false,
}: ParticleFieldProps) {
  const spreadArr: [number, number, number] = Array.isArray(spread)
    ? spread
    : [spread, spread, spread * 0.6];

  // Distribute counts between fine stellar dust and larger glowing cyan particles
  const cyanCount = Math.round(count * 0.7);
  const stellarCount = Math.round(count * 0.3);

  return (
    <group>
      {/* ── Primary Glowing Cyan Particles ─────────────── */}
      <FloatingParticles
        count={cyanCount}
        spread={spreadArr}
        size={size}
        speed={speed}
        color={color}
        reducedMotion={reducedMotion}
      />

      {/* ── Distant Deep-Space Star Dust (Faint Ice Blue) ─ */}
      <FloatingParticles
        count={stellarCount}
        spread={[spreadArr[0] * 1.3, spreadArr[1] * 1.3, spreadArr[2] * 1.4]}
        size={size * 0.75}
        speed={speed * 0.5}
        color="#88CCFF"
        reducedMotion={reducedMotion}
      />
    </group>
  );
}
