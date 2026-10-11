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
    id: 'algovisualizer',
    number: '01',
    title: 'AlgoVisualizer',
    category: 'GRAPH TRAVERSAL & HEURISTICS',
    builtYear: '2026',
    whatItIs: 'A browser-based algorithm visualizer for understanding how graph traversal and shortest-path trees actually behave step by step.',
    whyIBuiltIt: "Reading BFS, DFS, and Dijkstra from textbooks felt abstract; seeing state transitions visually made the mechanics click.",
    personalNote: '/* note: getting canvas node drag physics to stay locked at 60 FPS took 3 rewrites of the render loop */',
    techStack: ['TypeScript', 'Canvas API', 'Graph Heuristics', 'Framer Motion'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.dev',
  },
  {
    id: 'devforge',
    number: '02',
    title: 'DevForge Studio',
    category: 'LOCAL-FIRST DEVELOPER WORKBENCH',
    builtYear: '2026',
    whatItIs: 'A minimalist developer workbench for organizing code snippets, testing regex patterns, and staging scratch notes without leaving the browser.',
    whyIBuiltIt: 'I was tired of opening heavy IDE windows just to test a single regular expression or stash a curl command.',
    personalNote: '/* built because I wanted a scratchpad that feels like physical paper rather than an Electron monster */',
    techStack: ['React', 'TypeScript', 'TailwindCSS', 'Zustand', 'Vite'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.dev',
  },
  {
    id: 'pulsemetrics',
    number: '03',
    title: 'PulseMetrics',
    category: 'STREAMING TELEMETRY & HEALTH MONITOR',
    builtYear: '2025–2026',
    whatItIs: 'A lightweight telemetry monitor streaming server latency, packet health, and endpoint uptimes over WebSockets.',
    whyIBuiltIt: 'Built to understand real-time socket renegotiation under packet drops rather than trusting black-box library magic.',
    personalNote: '/* this one took far too many browser tabs and Wireshark captures */',
    techStack: ['Node.js', 'WebSockets', 'React', 'PostgreSQL', 'TailwindCSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.dev',
  },
  {
    id: 'aetheria',
    number: '04',
    title: 'Aetheria Canvas',
    category: 'INTERACTIVE ATMOSPHERIC SHADER',
    builtYear: '2026',
    whatItIs: 'An artistic 60FPS canvas environment exploring particle drift, color grading, and parallax layers.',
    whyIBuiltIt: 'An evening experiment exploring how pixel landscapes evoke nostalgia when subtle movement and lighting are introduced.',
    personalNote: '/* started as a weekend experiment, probably rebuilding this again someday */',
    techStack: ['HTML5 Canvas', 'Framer Motion', 'TypeScript', 'Color Physics'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.dev',
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
