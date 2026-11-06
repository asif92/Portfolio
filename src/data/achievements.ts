/**
 * Achievements Data
 * Key results shown in the "Impact Telemetry" section.
 * `metric` is the headline figure; keep it short (≤ 6 chars reads best).
 */

import { GitBranch, Zap, Network, ShieldCheck, MessagesSquare, type LucideIcon } from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  icon: LucideIcon;
}

export const achievements: Achievement[] = [
  {
    id: 'productivity',
    title: 'Increased Productivity',
    metric: '+30%',
    metricLabel: 'Productivity',
    description: 'Boosted productivity by 30% with automated CI/CD pipelines.',
    icon: GitBranch,
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    metric: '25%',
    metricLabel: 'Faster load times',
    description: 'Enhanced applications with 25% faster load times using React hooks.',
    icon: Zap,
  },
  {
    id: 'api',
    title: 'API Development',
    metric: '15+',
    metricLabel: 'REST APIs shipped',
    description: 'Developed over 15 scalable REST APIs for global clients.',
    icon: Network,
  },
  {
    id: 'hipaa',
    title: 'Healthcare Compliance',
    metric: '<2 mo',
    metricLabel: 'To HIPAA compliance',
    description: 'Achieved HIPAA compliance for healthcare apps in under two months.',
    icon: ShieldCheck,
  },
  {
    id: 'erp',
    title: 'ERP System Development',
    metric: '+35%',
    metricLabel: 'Communication',
    description: 'Built real-time notification and chat functionalities, enhancing communication by 35%.',
    icon: MessagesSquare,
  },
];
