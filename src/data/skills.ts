/**
 * Skills & Tech Stack Data
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
  | 'ai-ml'
  | 'infra'
  | 'graphics';

export const skillCategories: Record<SkillCategory, { label: string; color: string }> = {
  languages:  { label: 'Languages',       color: '#00F0FF' },
  frontend:   { label: 'Frontend',        color: '#0088FF' },
  backend:    { label: 'Backend & APIs',  color: '#00CCAA' },
  'ai-ml':    { label: 'AI / ML',         color: '#7755FF' },
  infra:      { label: 'Infrastructure',  color: '#FF8800' },
  graphics:   { label: '3D & Graphics',   color: '#FF3366' },
};

export const skills: SkillNode[] = [
  // Languages
  { id: 'typescript', label: 'TypeScript',  category: 'languages',  level: 5 },
  { id: 'python',     label: 'Python',      category: 'languages',  level: 5 },
  { id: 'go',         label: 'Go',          category: 'languages',  level: 4 },
  { id: 'rust',       label: 'Rust',        category: 'languages',  level: 3 },
  // Frontend
  { id: 'react',      label: 'React',       category: 'frontend',   level: 5 },
  { id: 'nextjs',     label: 'Next.js',     category: 'frontend',   level: 5 },
  { id: 'threejs',    label: 'Three.js',    category: 'frontend',   level: 4 },
  // Backend
  { id: 'nodejs',     label: 'Node.js',     category: 'backend',    level: 5 },
  { id: 'fastapi',    label: 'FastAPI',     category: 'backend',    level: 4 },
  { id: 'grpc',       label: 'gRPC',        category: 'backend',    level: 4 },
  // AI/ML
  { id: 'pytorch',    label: 'PyTorch',     category: 'ai-ml',      level: 4 },
  { id: 'langchain',  label: 'LangChain',   category: 'ai-ml',      level: 5 },
  { id: 'openai',     label: 'OpenAI API',  category: 'ai-ml',      level: 5 },
  // Infra
  { id: 'k8s',        label: 'Kubernetes',  category: 'infra',      level: 4 },
  { id: 'aws',        label: 'AWS',         category: 'infra',      level: 4 },
  { id: 'docker',     label: 'Docker',      category: 'infra',      level: 5 },
  // Graphics
  { id: 'glsl',       label: 'GLSL',        category: 'graphics',   level: 3 },
  { id: 'webgl',      label: 'WebGL',       category: 'graphics',   level: 3 },
  { id: 'blender',    label: 'Blender',     category: 'graphics',   level: 2 },
];
