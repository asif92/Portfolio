'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { motion } from 'framer-motion';
import { fadeUpVariants } from '@/lib/motion-variants';
import { achievements } from '@/data/achievements';

/**
 * AchievementsSection — Section 04: "Impact Telemetry"
 * Measurable results, each led by its headline metric.
 */
export function AchievementsSection() {
  return (
    <section id="achievements" className="section-wrapper" aria-label="Achievements">
      <div className="content-container">
        <AnimatedSection className="flex flex-col gap-16">

          <SectionHeading
            nodeId="// 04 — TELEMETRY"
            title="Impact Telemetry"
            subtitle="Measured outcomes from production systems — faster pipelines, quicker apps, and compliance delivered on schedule."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div key={item.id} variants={fadeUpVariants}>
                  <GlassPanel interactive className="h-full p-6 flex flex-col gap-5">
                    {/* Metric */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-3xl font-bold text-cyan-core tracking-tight">
                          {item.metric}
                        </span>
                        <span className="font-mono text-[10px] text-ceramic-muted/50 tracking-wider uppercase">
                          {item.metricLabel}
                        </span>
                      </div>
                      <span className="p-2 rounded-md border border-cyan-core/20 bg-cyan-core/5 text-cyan-core" aria-hidden="true">
                        <Icon size={16} />
                      </span>
                    </div>

                    {/* Title + description */}
                    <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                      <h3 className="text-base font-bold text-ceramic tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-ceramic-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </GlassPanel>
                </motion.div>
              );
            })}
          </div>

        </AnimatedSection>
      </div>
    </section>
  );
}
