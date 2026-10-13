/**
 * Experience Data — fill in with your real roles (newest first).
 * The "Log" section and its nav link stay hidden while this array is empty.
 *
 * Template:
 * {
 *   id: 'exp-001',
 *   role: 'Senior Full-stack Engineer',
 *   company: 'Company Name',
 *   period: '2021 — Present',
 *   location: 'Remote',
 *   summary: 'One sentence on what you owned.',
 *   highlights: ['Built X that did Y', 'Led Z'],
 *   tags: ['Node.js', 'AWS'],
 * },
 */
export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

export const experience: Experience[] = [];
