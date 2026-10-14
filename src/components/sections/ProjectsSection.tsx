'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { HudTag } from '@/components/ui/HudElements';
import { motion } from 'framer-motion';
import { fadeUpVariants } from '@/lib/motion-variants';
import { projects } from '@/data/projects';
import { ArrowUpRight, Circle } from 'lucide-react';

const statusColor = {
  live:     'green',
  archived: 'muted',
  wip:      'amber',
} as const;

/**
 * ProjectsSection — Section 02: "Core Architectures"
 * Displays featured engineering projects as glassmorphic cards.
 */
export function ProjectsSection() {
  return (
    <section id="projects" className="section-wrapper" aria-label="Projects">
      <div className="content-container">
        <AnimatedSection className="flex flex-col gap-16">

          {/* Heading */}
          <SectionHeading
            nodeId="// 02 — SYSTEMS"
            title="Core Architectures"
            subtitle="AI systems and products built for real-world workflows. Each project tackles a distinct challenge in agentic AI, retrieval-augmented generation, or human-in-the-loop automation."
          />

          {/* Project cards grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <GlassPanel
                key={project.id}
                interactive
                glowing={project.featured}
                className="flex flex-col gap-5 p-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <HudTag variant={statusColor[project.status]} dot>
                      {project.status.toUpperCase()}
                    </HudTag>
                    <span className="font-mono text-[10px] text-ceramic-muted/50 tracking-wider mt-1">
                      {project.year}
                    </span>
                  </div>

                  {/* External link */}
                  {(project.links.demo ?? project.links.case_study) && (
                    <a
                      href={project.links.demo ?? project.links.case_study}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-ceramic-muted/50 hover:text-cyan-core transition-colors"
                      aria-label={`View ${project.title} ${project.links.demo ? 'demo' : 'case study'}`}
                    >
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-bold text-ceramic tracking-tight mb-1">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-cyan-core/60 tracking-wide">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-ceramic-muted leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Metrics */}
                {project.metrics && (
                  <div className="flex gap-4 py-3 border-t border-white/5">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col gap-0.5">
                        <span className="font-mono text-sm font-bold text-cyan-core">
                          {m.value}
                        </span>
                        <span className="font-mono text-[9px] text-ceramic-muted/50 tracking-wider uppercase">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 font-mono text-[10px] text-ceramic-muted/60 bg-white/5 rounded-sm border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassPanel>
            ))}
          </div>

        </AnimatedSection>
      </div>
    </section>
  );
}
