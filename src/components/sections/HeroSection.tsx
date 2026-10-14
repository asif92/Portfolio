'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { CyberButton } from '@/components/ui/CyberButton';
import { HudTag, NodeLabel } from '@/components/ui/HudElements';
import { SiteLoader } from '@/components/ui/SiteLoader';
import { fadeUpVariants, containerVariants, viewportOnce } from '@/lib/motion-variants';

// Dynamically import the 3D canvas — SSR disabled
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

/**
 * HeroSection — Section 01: "The Awakening"
 *
 * Layout:
 * - Full-viewport height
 * - 3D canvas on the right (desktop) / centered behind (mobile)
 * - Typographic identity on the left
 * - System telemetry HUD
 * - Social links and CTA
 */
export function HeroSection() {
  // Becomes true once the robot scene has rendered; the loader covers the page
  // until then, and the hero text animates in only after the loader exits.
  const [sceneReady, setSceneReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const handleReady = useCallback(() => setSceneReady(true), []);
  const handleRevealed = useCallback(() => setRevealed(true), []);

  return (
    <>
    <SiteLoader ready={sceneReady} onDone={handleRevealed} />
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      aria-label="Introduction"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid-40 opacity-100"
        aria-hidden="true"
      />

      {/* Hero gradient glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-hero-gradient"
        aria-hidden="true"
      />

      {/* ── 3D Scene (right side / background) ──────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-auto"
      >
        <HeroScene onReady={handleReady} />
      </div>

      {/* ── Content Layer ───────────────────────────────── */}
      <div className="content-layer section-wrapper w-full pointer-events-none">
        <div className="content-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={revealed ? 'visible' : 'hidden'}
            className="max-w-xl pointer-events-auto"
          >
            {/* System status tag */}
            <motion.div variants={fadeUpVariants} className="mb-8 flex items-center gap-3">
              <HudTag dot variant="cyan">
                SYS // {siteConfig.character.name} {siteConfig.character.version}
              </HudTag>
              <HudTag dot variant="green">
                {siteConfig.character.status}
              </HudTag>
            </motion.div>

            {/* Node label */}
            <motion.div variants={fadeUpVariants}>
              <NodeLabel index="01" className="mb-3 block" />
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeUpVariants}
              className="mb-4 text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="text-gradient-white block">{siteConfig.name}</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              variants={fadeUpVariants}
              className="mb-6 font-mono text-sm tracking-[0.15em] text-cyan-core/80 uppercase"
            >
              {"//"} {siteConfig.title}
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={fadeUpVariants}
              className="mb-10 max-w-md text-base leading-relaxed text-ceramic-muted"
            >
              {siteConfig.tagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-3 mb-12">
              <CyberButton href="#projects" variant="primary" size="md">
                <span>View Systems</span>
                <ExternalLink size={13} />
              </CyberButton>
              <CyberButton href="#contact" variant="secondary" size="md">
                <Mail size={13} />
                <span>Open Uplink</span>
              </CyberButton>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUpVariants} className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-ceramic-muted/50 tracking-widest">CONNECT //</span>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-ceramic-muted hover:text-cyan-core transition-colors duration-200"
                aria-label="GitHub profile"
              >
                <Github size={16} />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-ceramic-muted hover:text-cyan-core transition-colors duration-200"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="p-2 text-ceramic-muted hover:text-cyan-core transition-colors duration-200"
                aria-label="Send email"
              >
                <Mail size={16} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Telemetry HUD — bottom-right corner ─────────── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="content-layer absolute bottom-8 right-6 hidden lg:flex flex-col items-end gap-2"
        aria-hidden="true"
      >
        {[
          { label: 'STATUS',   value: siteConfig.character.status },
          { label: 'UPTIME',   value: siteConfig.character.uptime },
          { label: 'LOCATION', value: siteConfig.location },
          { label: 'OPEN TO',  value: siteConfig.availability },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center gap-2 font-mono text-[10px]">
            <span className="text-ceramic-muted/40 tracking-widest">{label}</span>
            <span className="text-cyan-core/70 tracking-wider">{value}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Scroll Button (Interactive) ────────────────── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{ x: '-50%' }}
        className="content-layer absolute bottom-8 left-1/2 flex flex-col items-center gap-2 pointer-events-auto cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-core/50 rounded-md p-2 transition-colors"
        aria-label="Scroll to Core Architectures section"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-ceramic-muted/40 uppercase group-hover:text-cyan-core transition-colors duration-200">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-cyan-core/40 group-hover:text-cyan-core transition-colors duration-200"
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
    </>
  );
}
