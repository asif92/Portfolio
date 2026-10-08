/**
 * Site Configuration
 * Central source of truth for all portfolio metadata.
 * Edit this file to personalize the portfolio.
 */

export const siteConfig = {
  // ── Personal Info ──────────────────────────────────────────
  name: 'Your Name',
  title: 'Senior Software Engineer',
  tagline: 'Building intelligent systems at the frontier of AI & engineering.',
  bio: 'I architect and engineer full-stack systems with deep expertise in AI, distributed infrastructure, and real-time interfaces. Currently building the next generation of intelligent software.',
  location: 'Earth, Sol System',
  availability: 'Open to opportunities',
  email: 'hello@yourdomain.com',

  // ── Social Links ───────────────────────────────────────────
  links: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    resume: '/resume.pdf',
  },

  // ── Lab / Robot Character ──────────────────────────────────
  character: {
    name: 'A.R.I.A.',
    fullName: 'Autonomous Research & Intelligence Assistant',
    version: 'v2.4.1',
    status: 'OPTIMAL',
    uptime: '99.98%',
  },

  // ── Navigation ─────────────────────────────────────────────
  navigation: [
    { id: '01', label: 'Awakening', href: '#hero' },
    { id: '02', label: 'Systems',   href: '#projects' },
    { id: '03', label: 'Matrix',    href: '#skills' },
    { id: '04', label: 'Log',       href: '#experience' },
    { id: '05', label: 'Uplink',    href: '#contact' },
  ],

  // ── SEO & Meta ─────────────────────────────────────────────
  url: 'https://yourdomain.com',
  ogImage: '/images/og.png',
  keywords: ['software engineer', 'AI engineer', 'full-stack developer', 'portfolio'] as string[],
} as const;

export type SiteConfig = typeof siteConfig;
