'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { motion } from 'framer-motion';
import { fadeUpVariants } from '@/lib/motion-variants';
import { skills, skillCategories, type SkillCategory } from '@/data/skills';
import { cn } from '@/lib/utils';

/**
 * SkillsSection — Section 03: "Neural Matrix"
 * Displays the tech stack organized by category.
 */
export function SkillsSection() {
  // Group skills by category
  const grouped = skills.reduce<Record<SkillCategory, typeof skills>>(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<SkillCategory, typeof skills>
  );

  return (
    <section id="skills" className="section-wrapper" aria-label="Skills and technologies">
      <div className="content-container">
        <AnimatedSection className="flex flex-col gap-16">

          <SectionHeading
            nodeId="// 03 — MATRIX"
            title="Neural Matrix"
            subtitle="The technical stack spanning languages, frameworks, AI systems, databases, and cloud infrastructure. Each node represents a core competency in active use."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {(Object.keys(grouped) as SkillCategory[]).map((category) => {
              const { label, color } = skillCategories[category];
              const categorySkills = grouped[category];

              return (
                <GlassPanel key={category} className="p-5 flex flex-col gap-4">
                  {/* Category header */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs tracking-widest text-ceramic-dim uppercase">
                      {label}
                    </span>
                  </div>

                  {/* Skill items */}
                  <div className="flex flex-col gap-2">
                    {categorySkills.map((skill) => (
                      <motion.div
                        key={skill.id}
                        variants={fadeUpVariants}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="text-sm text-ceramic-muted">{skill.label}</span>
                        {/* Level bar */}
                        <div
                          className="flex gap-0.5"
                          role="meter"
                          aria-label={`${skill.label} proficiency: ${skill.level} out of 5`}
                          aria-valuenow={skill.level}
                          aria-valuemin={1}
                          aria-valuemax={5}
                        >
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className="h-1.5 w-3 rounded-full transition-opacity duration-300"
                              style={{
                                opacity: i < skill.level ? 0.8 : 0.15,
                                backgroundColor: i < skill.level ? color : '#1E232F',
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassPanel>
              );
            })}
          </div>

        </AnimatedSection>
      </div>
    </section>
  );
}
