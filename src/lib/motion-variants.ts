/**
 * Framer Motion shared variants.
 * Use these as the `variants` prop for consistent motion across the site.
 */
import type { Variants } from 'framer-motion';

// ── Container — staggers children ─────────────────────────────────────────
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// ── Fade Up Item ───────────────────────────────────────────────────────────
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ── Fade In (no movement) ─────────────────────────────────────────────────
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// ── Scale In ──────────────────────────────────────────────────────────────
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ── Slide In Left ─────────────────────────────────────────────────────────
export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Slide In Right ────────────────────────────────────────────────────────
export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Glass Panel Reveal ────────────────────────────────────────────────────
export const glassPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.97,
    backdropFilter: 'blur(0px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    backdropFilter: 'blur(12px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ── HUD Line Draw ─────────────────────────────────────────────────────────
export const hudLineVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
};

// ── Viewport trigger defaults ─────────────────────────────────────────────
export const viewportOnce = { once: true, margin: '-80px' } as const;
