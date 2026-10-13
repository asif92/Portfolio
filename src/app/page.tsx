import { NavBar } from '@/components/navigation/NavBar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { siteConfig } from '@/data/site-config';

/**
 * Home Page — Project NEXUS // Autonomous AI Lab
 *
 * Sections:
 *  01 → HeroSection      "The Awakening"
 *  02 → ProjectsSection  "Core Architectures"
 *  03 → SkillsSection    "Neural Matrix"
 *  05 → ContactSection   "Quantum Uplink"
 *
 * Note: Section 04 (Experience / Lab Logs) will be added in the next phase.
 */
export default function HomePage() {
  return (
    <>
      {/* Global floating navigation */}
      <NavBar />

      {/* Main content */}
      <main id="main-content" tabIndex={-1}>
        <HeroSection />

        {/* Cyan divider */}
        <div className="section-wrapper py-0">
          <div className="content-container">
            <div className="cyan-line" aria-hidden="true" />
          </div>
        </div>

        <ProjectsSection />

        <div className="section-wrapper py-0">
          <div className="content-container">
            <div className="cyan-line" aria-hidden="true" />
          </div>
        </div>

        <SkillsSection />

        <div className="section-wrapper py-0">
          <div className="content-container">
            <div className="cyan-line" aria-hidden="true" />
          </div>
        </div>

        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="section-wrapper py-8 border-t border-white/5" role="contentinfo">
        <div className="content-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-[10px] text-ceramic-muted/40 tracking-widest">
              © {new Date().getFullYear()} {siteConfig.name} — Project NEXUS
            </span>
            <div className="flex items-center gap-2 font-mono text-[10px] text-ceramic-muted/40">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-core animate-pulse-slow" aria-hidden="true" />
              <span className="tracking-widest">
                {siteConfig.character.name} {siteConfig.character.version} {"//"} ONLINE
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
