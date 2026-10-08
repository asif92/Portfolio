/**
 * GSAP helpers and preset animation configurations.
 * Import these to keep animation values consistent across the project.
 */

// ── Easing Presets ─────────────────────────────────────────────────────────
export const EASE = {
  outExpo: 'expo.out',
  inOutExpo: 'expo.inOut',
  outQuart: 'power4.out',
  outSine: 'sine.out',
  inOutSine: 'sine.inOut',
  elastic: 'elastic.out(1, 0.5)',
  cinematic: 'power3.inOut',
} as const;

// ── Duration Presets ───────────────────────────────────────────────────────
export const DURATION = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  cinematic: 1.4,
  pageTransition: 1.8,
} as const;

// ── Scroll Animation Defaults ──────────────────────────────────────────────
export const SCROLL_TRIGGER_DEFAULTS = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
} as const;

// ── Stagger Presets ────────────────────────────────────────────────────────
export const STAGGER = {
  fast: 0.06,
  normal: 0.12,
  slow: 0.2,
} as const;

// ── Fade Up (common entry animation) ──────────────────────────────────────
export const fadeUpVariant = {
  from: { y: 32, opacity: 0, filter: 'blur(4px)' },
  to: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    duration: DURATION.slow,
    ease: EASE.outExpo,
  },
};

// ── Scale In (for cards and panels) ───────────────────────────────────────
export const scaleInVariant = {
  from: { scale: 0.94, opacity: 0 },
  to: {
    scale: 1,
    opacity: 1,
    duration: DURATION.normal,
    ease: EASE.outQuart,
  },
};
