'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { fadeUpVariants } from '@/lib/motion-variants';
import { experience } from '@/data/experience';

/**
 * ExperienceSection — Section 04: "Lab Logs"
 * Renders nothing until src/data/experience.ts has entries.
 */
export function ExperienceSection() {
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="section-wrapper" aria-label="Work experience">
      <div className="content-container">
        <AnimatedSection className="flex flex-col gap-16">
          <SectionHeading
            nodeId="// 04 — LOG"
            title="Mission Log"
            subtitle="A timeline of the systems I've built and the teams I've built them with."
          />

          <ol className="relative flex flex-col gap-6 border-l border-white/10 pl-6 sm:pl-8">
            {experience.map((job) => (
              <motion.li key={job.id} variants={fadeUpVariants} className="relative">
                <span
                  className="absolute -left-[31px] sm:-left-[39px] top-6 h-2.5 w-2.5 rounded-full bg-cyan-core shadow-[0_0_8px_#00E5FF]"
                  aria-hidden="true"
                />
                <GlassPanel className="p-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-bold text-ceramic tracking-tight">
                      {job.role} <span className="text-cyan-core/70">@ {job.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-ceramic-muted/60 tracking-wide">
                      {job.period}
                      {job.location ? ` · ${job.location}` : ''}
                    </span>
                  </div>

                  <p className="text-sm text-ceramic-muted leading-relaxed">{job.summary}</p>

                  {job.highlights.length > 0 && (
                    <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-ceramic-muted marker:text-cyan-core/50">
                      {job.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 font-mono text-[10px] text-ceramic-muted/60 bg-white/5 rounded-sm border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </motion.li>
            ))}
          </ol>
        </AnimatedSection>
      </div>
    </section>
  );
}
