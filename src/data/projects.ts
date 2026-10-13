/**
 * Projects Data
 * TODO: replace these sample projects with your real work (add real
 * demo/github links; add `metrics` only for numbers you can verify).
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  year: string;
  status: 'live' | 'archived' | 'wip';
  featured: boolean;
  links: {
    demo?: string;
    github?: string;
    case_study?: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 'proj-001',
    title: 'Neural Mesh',
    subtitle: 'Distributed AI Inference Grid',
    description:
      'A distributed inference system orchestrating 10,000+ AI model endpoints with sub-10ms p99 latency. Built on custom Kubernetes operators with intelligent load balancing.',
    tags: ['Go', 'Kubernetes', 'gRPC', 'LLM', 'Distributed Systems'],
    year: '2024',
    status: 'live',
    featured: true,
    links: {
    },
  },
  {
    id: 'proj-002',
    title: 'Prism',
    subtitle: 'Real-time Data Visualization Engine',
    description:
      'WebGL-powered analytics dashboard rendering 1M+ data points at 60fps. Custom GLSL shaders for volumetric time-series heatmaps.',
    tags: ['TypeScript', 'WebGL', 'GLSL', 'React', 'D3.js'],
    year: '2024',
    status: 'live',
    featured: true,
    links: {
    },
  },
  {
    id: 'proj-003',
    title: 'Cognition API',
    subtitle: 'LLM Orchestration Framework',
    description:
      'Open-source framework for composing and evaluating multi-agent LLM pipelines with deterministic outputs and built-in observability.',
    tags: ['Python', 'FastAPI', 'LangChain', 'OpenAI', 'Observability'],
    year: '2023',
    status: 'live',
    featured: true,
    links: {
    },
  },
];
