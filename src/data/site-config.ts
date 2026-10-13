/**
 * Site Configuration
 * Central source of truth for all portfolio metadata.
 * Edit this file to personalize the portfolio.
 */

export const siteConfig = {
  // ── Personal Info ──────────────────────────────────────────
  name: 'Asif Sharif Shahid',
  title: 'Full-stack AI Engineer',
  tagline: 'Building intelligent systems at the frontier of AI & engineering.',
  bio: 'Full-stack AI engineer with 8+ years of experience building scalable MERN, Python and cloud applications — from real-time ERP systems and HIPAA-compliant healthcare platforms to LLM, RAG and AI-agent solutions.',
  location: 'Lahore, Pakistan',
  availability: 'Open to opportunities',
  email: 'asifsharif190@gmail.com',

  // ── Social Links ───────────────────────────────────────────
  links: {
    github: 'https://github.com/asif92',
    linkedin: 'https://linkedin.com/in/asifsharifshahid/',
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
  keywords: ['Asif Sharif Shahid', 'full-stack AI engineer', 'MERN stack', 'Python', 'Django', 'LLM', 'RAG', 'AI agents', 'portfolio'] as string[],
} as const;

export type SiteConfig = typeof siteConfig;
