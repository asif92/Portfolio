/**
 * Skills & Tech Stack Data
 * Sourced from the Full-Stack and Python resumes.
 * `level` (1–5) is an estimate of depth/recency — adjust freely.
 */

export interface SkillNode {
  id: string;
  label: string;
  category: SkillCategory;
  level: number; // 1–5
  description?: string;
}

export type SkillCategory =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'architecture'
  | 'ai-ml'
  | 'data'
  | 'infra'
  | 'domain';

export const skillCategories: Record<SkillCategory, { label: string; color: string }> = {
  languages:    { label: 'Languages',           color: '#00F0FF' },
  frontend:     { label: 'Frontend',            color: '#0088FF' },
  backend:      { label: 'Backend Frameworks',  color: '#00CCAA' },
  architecture: { label: 'APIs & Architecture', color: '#33DD88' },
  'ai-ml':      { label: 'AI / ML',             color: '#7755FF' },
  data:         { label: 'Databases',           color: '#FFCC33' },
  infra:        { label: 'Cloud & DevOps',      color: '#FF8800' },
  domain:       { label: 'Domain Expertise',    color: '#FF3366' },
};

export const skills: SkillNode[] = [
  // Languages
  { id: 'python',      label: 'Python',            category: 'languages',    level: 5 },
  { id: 'javascript',  label: 'JavaScript',        category: 'languages',    level: 5 },
  { id: 'php',         label: 'PHP',               category: 'languages',    level: 3 },

  // Frontend
  { id: 'react',       label: 'React.js',          category: 'frontend',     level: 5 },
  { id: 'nextjs',      label: 'Next.js',           category: 'frontend',     level: 4 },
  { id: 'vue',         label: 'Vue.js',            category: 'frontend',     level: 3 },
  { id: 'nuxt',        label: 'Nuxt.js',           category: 'frontend',     level: 3 },
  { id: 'angular',     label: 'Angular',           category: 'frontend',     level: 3 },
  { id: 'redux',       label: 'Redux',             category: 'frontend',     level: 4 },

  // Backend frameworks
  { id: 'nodejs',      label: 'Node.js',           category: 'backend',      level: 5 },
  { id: 'express',     label: 'Express.js',        category: 'backend',      level: 5 },
  { id: 'nestjs',      label: 'NestJS',            category: 'backend',      level: 4 },
  { id: 'django',      label: 'Django',            category: 'backend',      level: 5 },
  { id: 'fastapi',     label: 'FastAPI',           category: 'backend',      level: 4 },
  { id: 'flask',       label: 'Flask',             category: 'backend',      level: 4 },
  { id: 'laravel',     label: 'Laravel',           category: 'backend',      level: 4 },

  // APIs & Architecture
  { id: 'rest',        label: 'REST APIs',         category: 'architecture', level: 5 },
  { id: 'graphql',     label: 'GraphQL',           category: 'architecture', level: 4 },
  { id: 'realtime',    label: 'Socket.IO / WebSockets', category: 'architecture', level: 5 },
  { id: 'microservices', label: 'Microservices',   category: 'architecture', level: 4 },
  { id: 'jwt',         label: 'JWT Authentication', category: 'architecture', level: 4 },
  { id: 'payments',    label: 'Payment Integration', category: 'architecture', level: 4 },

  // AI / ML
  { id: 'llm',         label: 'LLMs',              category: 'ai-ml',        level: 4 },
  { id: 'rag',         label: 'RAG Applications',  category: 'ai-ml',        level: 4 },
  { id: 'agents',      label: 'AI Agents',         category: 'ai-ml',        level: 4 },
  { id: 'chatbots',    label: 'Chatbots',          category: 'ai-ml',        level: 4 },
  { id: 'ml',          label: 'Machine Learning',  category: 'ai-ml',        level: 3 },
  { id: 'scraping',    label: 'Data Scraping',     category: 'ai-ml',        level: 4 },

  // Databases
  { id: 'mongodb',     label: 'MongoDB',           category: 'data',         level: 5 },
  { id: 'postgres',    label: 'PostgreSQL',        category: 'data',         level: 4 },
  { id: 'mysql',       label: 'MySQL',             category: 'data',         level: 4 },
  { id: 'dynamodb',    label: 'DynamoDB',          category: 'data',         level: 4 },
  { id: 'supabase',    label: 'Supabase',          category: 'data',         level: 3 },

  // Cloud & DevOps
  { id: 'aws',         label: 'AWS (Lambda, EC2)', category: 'infra',        level: 5 },
  { id: 'azure',       label: 'Azure',             category: 'infra',        level: 3 },
  { id: 'gcp',         label: 'GCP',               category: 'infra',        level: 3 },
  { id: 'docker',      label: 'Docker',            category: 'infra',        level: 4 },
  { id: 'k8s',         label: 'Kubernetes',        category: 'infra',        level: 3 },
  { id: 'cicd',        label: 'CI/CD Pipelines',   category: 'infra',        level: 4 },
  { id: 'git',         label: 'GitHub / GitLab',   category: 'infra',        level: 5 },

  // Domain expertise
  { id: 'hipaa',       label: 'HIPAA Compliance',  category: 'domain',       level: 4 },
  { id: 'erp',         label: 'ERP Systems',       category: 'domain',       level: 5 },
  { id: 'healthtech',  label: 'Healthcare Tech',   category: 'domain',       level: 4 },
  { id: 'sysdesign',   label: 'System Architecture', category: 'domain',     level: 4 },
];
