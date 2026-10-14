/**
 * Projects Data
 * Case studies hosted on tecxra.com. Metrics are system characteristics
 * stated on each case study, not measured client outcomes.
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
    title: 'AI Content Generation Platform',
    subtitle: 'LLM Workflows for Healthcare Marketing',
    description:
      'LLM-powered platform that drafts patient-education articles, provider bios, social posts and email campaigns in a consistent brand and compliance voice. Agent-selected prompt guardrails, fact and claim flagging, mandatory human review and a full prompt/edit history.',
    tags: ['LLMs', 'AI Agents', 'Prompt Engineering', 'Next.js', 'Node.js', 'Python', 'PostgreSQL'],
    year: '2026',
    status: 'live',
    featured: true,
    links: {
      case_study: 'https://tecxra.com/case-studies/ai-content-platform/',
    },
    metrics: [
      { label: 'Content Types', value: '5' },
      { label: 'Human Reviewed', value: '100%' },
      { label: 'To First Draft', value: 'Minutes' },
    ],
  },
  {
    id: 'proj-002',
    title: 'Healthcare AI Agent',
    subtitle: 'Conversational Patient Scheduling',
    description:
      'Conversational agent on web chat and SMS for a multi-location outpatient clinic group. Handles booking, rescheduling, insurance FAQs and provider lookup through the practice-management API, with context-rich human handoff and audit logging for PHI compliance.',
    tags: ['AI Agents', 'LLMs', 'RAG', 'Python', 'FastAPI', 'PostgreSQL'],
    year: '2026',
    status: 'live',
    featured: true,
    links: {
      case_study: 'https://tecxra.com/case-studies/healthcare-ai-agent/',
    },
    metrics: [
      { label: 'Availability', value: '24/7' },
      { label: 'Response Time', value: '<2s' },
      { label: 'Audit Logged', value: '100%' },
    ],
  },
  {
    id: 'proj-003',
    title: 'Pharmacy & Wellness Support Bot',
    subtitle: 'Commerce AI Customer Support',
    description:
      'AI chatbot for an online pharmacy handling order tracking, refill reminders, returns and catalog-grounded product recommendations via RAG over live order and product APIs. Clinical questions are detected and routed to a licensed pharmacist.',
    tags: ['AI Chatbot', 'RAG', 'LLMs', 'Next.js', 'Node.js', 'PostgreSQL'],
    year: '2026',
    status: 'live',
    featured: true,
    links: {
      case_study: 'https://tecxra.com/case-studies/ecommerce-ai-bot/',
    },
    metrics: [
      { label: 'Flows Automated', value: '4' },
      { label: 'Clinical Handoff', value: '100%' },
      { label: 'Response Time', value: '<2s' },
    ],
  },
  {
    id: 'proj-004',
    title: 'AI Product Comparison Engine',
    subtitle: 'Collaborative AI Product Discovery',
    description:
      'Search any product and an AI agent retrieves listings, extracts specs, pricing and review signals, and builds an editable comparison table. Teams set feature weights and scores together in real time, and products re-rank on every change.',
    tags: ['OpenAI API', 'RAG', 'LLM Agents', 'Vector Store', 'Next.js', 'Node.js'],
    year: '2026',
    status: 'live',
    featured: false,
    links: {
      case_study: 'https://tecxra.com/case-studies/product-comparison/',
    },
    metrics: [
      { label: 'Categories', value: 'Any' },
      { label: 'Search to Table', value: 'Seconds' },
      { label: 'Editing', value: 'Live' },
    ],
  },
];
