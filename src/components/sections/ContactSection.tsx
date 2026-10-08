'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { CyberButton } from '@/components/ui/CyberButton';
import { motion } from 'framer-motion';
import { fadeUpVariants } from '@/lib/motion-variants';
import { siteConfig } from '@/data/site-config';
import { Mail, Github, Linkedin, FileText, Terminal } from 'lucide-react';

/**
 * ContactSection — Section 05: "Quantum Uplink"
 * Terminal-style contact interface.
 */
export function ContactSection() {
  return (
    <section id="contact" className="section-wrapper" aria-label="Contact">
      <div className="content-container">
        <AnimatedSection className="flex flex-col gap-16">

          <SectionHeading
            nodeId="// 05 — UPLINK"
            title="Quantum Uplink"
            subtitle="Open a direct communication channel. Response time within 24 hours."
            align="center"
          />

          <div className="max-w-2xl mx-auto w-full">
            <GlassPanel className="p-8">

              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                <Terminal size={14} className="text-cyan-core" />
                <span className="font-mono text-xs text-ceramic-muted/60 tracking-wider">
                  {siteConfig.character.name} // UPLINK TERMINAL
                </span>
                <div className="ml-auto flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-red-500/60" />
                  <span className="h-2 w-2 rounded-full bg-amber-signal/60" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
                </div>
              </div>

              {/* Terminal output */}
              <motion.div
                variants={fadeUpVariants}
                className="font-mono text-sm space-y-2 mb-8"
              >
                <p className="text-ceramic-muted/40">$ aria --connect --mode=async</p>
                <p className="text-cyan-core/70">
                  <span className="text-ceramic-muted/40">{'>'} </span>
                  Uplink established. Ready for transmission.
                </p>
                <p className="text-ceramic-muted/40 mt-4">
                  $ ping {siteConfig.email}
                </p>
                <p className="text-emerald-400/70">
                  <span className="text-ceramic-muted/40">{'>'} </span>
                  Connection available. Awaiting payload.
                </p>
              </motion.div>

              {/* Contact options */}
              <motion.div variants={fadeUpVariants} className="flex flex-col gap-3">
                <CyberButton
                  href={`mailto:${siteConfig.email}`}
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                >
                  <Mail size={15} />
                  Send Transmission
                </CyberButton>

                <div className="grid grid-cols-3 gap-3">
                  <CyberButton
                    href={siteConfig.links.github}
                    variant="secondary"
                    size="sm"
                    external
                    className="justify-center"
                    aria-label="Visit GitHub"
                  >
                    <Github size={13} />
                    <span>GitHub</span>
                  </CyberButton>
                  <CyberButton
                    href={siteConfig.links.linkedin}
                    variant="secondary"
                    size="sm"
                    external
                    className="justify-center"
                    aria-label="Visit LinkedIn"
                  >
                    <Linkedin size={13} />
                    <span>LinkedIn</span>
                  </CyberButton>
                  <CyberButton
                    href={siteConfig.links.resume}
                    variant="secondary"
                    size="sm"
                    external
                    className="justify-center"
                    aria-label="Download resume"
                  >
                    <FileText size={13} />
                    <span>Résumé</span>
                  </CyberButton>
                </div>
              </motion.div>

            </GlassPanel>
          </div>

        </AnimatedSection>
      </div>
    </section>
  );
}
