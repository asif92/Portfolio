'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Radio } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { useScrollMetrics } from '@/hooks/useScrollMetrics';
import { cn } from '@/lib/utils';

/**
 * NavBar — floating HUD navigation pill.
 *
 * - Hides on scroll down, reveals on scroll up
 * - Glassmorphism pill with system status indicator
 * - Mobile: full-screen overlay drawer
 */
export function NavBar() {
  const { direction, scrollY } = useScrollMetrics();
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    if (scrollY < 80) {
      setIsVisible(true);
    } else {
      setIsVisible(direction !== 'down');
    }
  }, [direction, scrollY]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = siteConfig.navigation.map((n) => n.href.replace('#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function handleNavClick(href: string) {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  }

  return (
    <>
      {/* Desktop Nav — floating pill */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -80, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
        role="banner"
      >
        <nav
          className="pointer-events-auto flex items-center gap-1 glass-panel rounded-full px-3 py-2 border-white/10"
          aria-label="Primary navigation"
        >
          {/* Status dot */}
          <div className="flex items-center gap-1.5 pr-3 border-r border-white/10 mr-1">
            <Radio size={10} className="text-cyan-core animate-pulse-slow" aria-hidden="true" />
            <span className="font-mono text-[10px] text-cyan-core/70 tracking-widest hidden sm:inline">
              {siteConfig.character.name}
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1" role="list">
            {siteConfig.navigation.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.id}
                  role="listitem"
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'relative px-3 py-1.5 font-mono text-[11px] tracking-wider rounded-full transition-all duration-200',
                    isActive
                      ? 'text-cyan-core bg-cyan-core/10'
                      : 'text-ceramic-muted hover:text-ceramic-dim hover:bg-white/5'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="text-cyan-core/50 mr-1">{item.id}</span>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-cyan-core/10 border border-cyan-core/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-1.5 text-ceramic-muted hover:text-ceramic-dim transition-colors"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <Menu size={16} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-void/80 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-72 glass-panel border-l border-white/10 flex flex-col p-8"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Close button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="self-end mb-12 p-2 text-ceramic-muted hover:text-ceramic-dim"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>

              {/* Nav items */}
              <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                {siteConfig.navigation.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-md text-left transition-all',
                      activeSection === item.href.replace('#', '')
                        ? 'bg-cyan-core/10 text-cyan-core'
                        : 'text-ceramic-muted hover:bg-white/5 hover:text-ceramic-dim'
                    )}
                  >
                    <span className="font-mono text-xs text-cyan-core/50">{item.id}</span>
                    <span className="font-mono text-sm tracking-wide">{item.label}</span>
                  </motion.button>
                ))}
              </nav>

              {/* Footer status */}
              <div className="mt-auto pt-8 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-core animate-pulse-slow" />
                  <span className="font-mono text-[10px] text-ceramic-muted tracking-widest">
                    SYSTEM {siteConfig.character.status}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
