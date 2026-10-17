'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface SiteLoaderProps {
  /** True once the 3D scene (robot) has rendered. */
  ready: boolean;
  /** Called after the exit animation, when the page is fully revealed. */
  onDone?: () => void;
}

const MIN_VISIBLE_MS = 900; // avoid a distracting flash on fast connections
const MAX_WAIT_MS = 10000; // never trap the visitor (e.g. WebGL unavailable)

const BOOT_LINES = [
  'INITIALIZING NEURAL CORE',
  'CALIBRATING OPTICS',
  'SYNCING PARTICLE FIELD',
  'ASSEMBLING ASIF-01',
];

/**
 * SiteLoader — full-screen boot overlay shown until the hero scene is ready.
 * The progress bar eases toward ~90% while loading and completes when `ready`.
 */
export function SiteLoader({ ready, onDone }: SiteLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [minElapsed, setMinElapsed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [visible, setVisible] = useState(true);

  // Timers
  useEffect(() => {
    const a = setTimeout(() => setMinElapsed(true), MIN_VISIBLE_MS);
    const b = setTimeout(() => setTimedOut(true), MAX_WAIT_MS);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  const done = (ready && minElapsed) || timedOut;

  // Progress easing
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (done) return Math.min(100, p + 8);
        // ease toward 90 and stall there until the scene is ready
        return p + (90 - p) * 0.06;
      });
    }, 60);
    return () => clearInterval(id);
  }, [done]);

  // Lock scroll while loading
  useEffect(() => {
    if (!visible) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prev;
    };
  }, [visible]);

  // Reveal once the bar is full
  useEffect(() => {
    if (done && progress >= 100) setVisible(false);
  }, [done, progress]);

  const lineIndex = Math.min(BOOT_LINES.length - 1, Math.floor((progress / 100) * BOOT_LINES.length));

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="site-loader"
          data-lenis-prevent
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* faint grid + glow */}
          <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid-40 opacity-60" aria-hidden="true" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.16) 0%, transparent 65%)' }}
            aria-hidden="true"
          />

          {/* spinning reactor ring */}
          <div className="relative mb-10 h-24 w-24" aria-hidden="true">
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-core/20 border-t-cyan-core"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-3 rounded-full border border-cyan-core/10 border-b-cyan-core/70"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-[34px] rounded-full bg-cyan-core"
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.1, 0.85] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{ boxShadow: '0 0 24px rgba(0,240,255,0.8)' }}
            />
          </div>

          <p className="mb-4 font-mono text-xs tracking-[0.35em] text-cyan-core">ASIF-01 // BOOT</p>

          {/* progress bar */}
          <div className="h-[3px] w-64 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-cyan-core transition-[width] duration-150 ease-out"
              style={{ width: `${Math.round(progress)}%`, boxShadow: '0 0 10px rgba(0,240,255,0.8)' }}
            />
          </div>

          <div className="mt-4 flex w-64 items-center justify-between font-mono text-[10px] tracking-widest text-ceramic-muted/60">
            <span>{BOOT_LINES[lineIndex]}</span>
            <span className="tabular-nums text-cyan-core/80">{Math.round(progress)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
