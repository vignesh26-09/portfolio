export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  builtYear: string;
  whatItIs: string;
  whyIBuiltIt: string;
  personalNote: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'carelink',
    number: '01',
    title: 'CareLink',
    category: 'HEALTHCARE MANAGEMENT PLATFORM',
    builtYear: '2026',
    whatItIs: 'A centralized healthcare management system for organizing healthcare operations, users, and data in one maintainable application.',
    whyIBuiltIt: 'Built to explore how structured backend design can make sensitive healthcare workflows easier to manage and maintain.',
    personalNote: '/* secure configuration, modular structure, and practical healthcare workflows */',
    techStack: ['Java', 'Spring Boot', 'Maven', 'PostgreSQL'],
    githubUrl: 'https://github.com/vignesh26-09/Carelink',
    liveUrl: 'https://github.com/vignesh26-09/Carelink',
  },
  {
    id: 'tourism-reputation',
    number: '02',
    title: 'TRIP',
    category: 'TOURISM REPUTATION INTELLIGENCE',
    builtYear: '2026',
    whatItIs: 'An AI platform that turns travel and hotel reviews into sentiment, aspect, competitor, and forecasting intelligence.',
    whyIBuiltIt: 'Created to turn thousands of scattered reviews into concrete, timely actions for hospitality teams.',
    personalNote: '/* built with a full-stack pipeline for analysis, forecasting, and management-ready reports */',
    techStack: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'React', 'PostgreSQL'],
    githubUrl: 'https://github.com/sanmuga13/tourism-reputation-intelligence-system',
    liveUrl: 'https://github.com/sanmuga13/tourism-reputation-intelligence-system',
  },
];

export interface ToolGroup {
  label: string;
  items: string[];
}

export const TOOL_GROUPS: ToolGroup[] = [
  {
    label: 'Languages',
    items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'C++'],
  },
  {
    label: 'Libraries & Frameworks',
    items: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  },
  {
    label: 'Tools & Systems',
    items: ['Git', 'Docker', 'Linux', 'PostgreSQL', 'Redis', 'WebSockets'],
  },
  {
    label: 'Areas of Curiosity',
    items: ['Algorithmic Problem Solving', 'Interactive Canvas', 'Distributed Systems', 'Interface Craft'],
  },
];
