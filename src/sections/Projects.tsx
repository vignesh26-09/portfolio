import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code2 } from 'lucide-react';
import DepthCard from '../components/DepthCard';

interface ProjectItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  glowLeft: string;
  glowRight: string;
  glowCenter: string;
}

const projectItems: ProjectItem[] = [
  {
    id: 'carelink',
    src: '/projects/carelink.jpg',
    alt: 'CareLink - Healthcare Management Platform',
    title: 'CareLink',
    subtitle: 'Healthcare Management',
    description: 'A centralized healthcare management system for organizing clinical operations, practitioner roles, and patient records in a maintainable, high-security backend architecture.',
    techStack: ['Java', 'Spring Boot', 'Maven', 'PostgreSQL'],
    githubUrl: 'https://github.com/vignesh26-09/Carelink',
    liveUrl: 'https://github.com/vignesh26-09/Carelink',
    glowLeft: '#38bdf8',
    glowRight: '#ff8a50',
    glowCenter: '#0284c7'
  },
  {
    id: 'trip',
    src: '/projects/trip.jpg',
    alt: 'TRIP - Tourism Reputation Intelligence System',
    title: 'TRIP',
    subtitle: 'Tourism AI Platform',
    description: 'An AI-powered intelligence platform that analyzes thousands of hospitality reviews to generate real-time sentiment, aspect extraction, competitor benchmarks, and forecasting reports.',
    techStack: ['Python', 'FastAPI', 'React', 'Spring Boot', 'PostgreSQL'],
    githubUrl: 'https://github.com/sanmuga13/tourism-reputation-intelligence-system',
    liveUrl: 'https://github.com/sanmuga13/tourism-reputation-intelligence-system',
    glowLeft: '#c084fc',
    glowRight: '#ff8a50',
    glowCenter: '#9333ea'
  },
  {
    id: 'devforge',
    src: '/projects/devforge.jpg',
    alt: 'DevForge - Developer Workbench & Regex Studio',
    title: 'DevForge',
    subtitle: 'Developer Workbench',
    description: 'A high-speed developer tooling suite featuring real-time regular expression testing, AST tree visualization, and instantaneous sandbox buffer evaluation.',
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/vignesh26-09/portfolio',
    liveUrl: 'https://github.com/vignesh26-09/portfolio',
    glowLeft: '#fb7185',
    glowRight: '#ff8a50',
    glowCenter: '#e11d48'
  },
  {
    id: 'algovisualizer',
    src: '/projects/algovisualizer.jpg',
    alt: 'AlgoVisualizer - Graph Traversal & Heuristics Simulator',
    title: 'AlgoVisualizer',
    subtitle: 'Graph Algorithms & Heuristics',
    description: 'An interactive 2D pathfinding and graph traversal simulator with step-by-step visualizations of Dijkstra, A*, and cycle detection algorithms.',
    techStack: ['Graph Theory', 'Canvas', 'Dijkstra', 'TypeScript'],
    githubUrl: 'https://github.com/vignesh26-09/portfolio',
    liveUrl: 'https://github.com/vignesh26-09/portfolio',
    glowLeft: '#34d399',
    glowRight: '#ff8a50',
    glowCenter: '#059669'
  },
  {
    id: 'pulsemetrics',
    src: '/projects/pulsemetrics.jpg',
    alt: 'PulseMetrics - Real-Time Streaming Telemetry',
    title: 'PulseMetrics',
    subtitle: 'Streaming Telemetry',
    description: 'High-throughput real-time telemetry monitoring engine with sub-millisecond WebSocket pipelines, Pub/Sub queuing, and live system latency diagnostics.',
    techStack: ['WebSockets', 'Redis', 'Node.js', 'Realtime Stream'],
    githubUrl: 'https://github.com/vignesh26-09/portfolio',
    liveUrl: 'https://github.com/vignesh26-09/portfolio',
    glowLeft: '#f59e0b',
    glowRight: '#ff8a50',
    glowCenter: '#d97706'
  },
  {
    id: 'kernelstudio',
    src: '/projects/kernelstudio.jpg',
    alt: 'KernelStudio - System Architecture & DevOps',
    title: 'KernelStudio',
    subtitle: 'System Architecture',
    description: 'An infrastructure and systems engineering sandbox exploring multi-container orchestration, microservice isolation, and automated cloud deployments.',
    techStack: ['Linux', 'Docker', 'System Design', 'DevOps'],
    githubUrl: 'https://github.com/vignesh26-09/portfolio',
    liveUrl: 'https://github.com/vignesh26-09/portfolio',
    glowLeft: '#06b6d4',
    glowRight: '#ff8a50',
    glowCenter: '#0891b2'
  }
];

export const Projects: React.FC = () => {
  // Duplicated 3x for seamless infinite left-to-right drift
  const infiniteTrack = [...projectItems, ...projectItems, ...projectItems];
  const [hoveredGlobalIdx, setHoveredGlobalIdx] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(projectItems[0]);

  return (
    <section id="projects" className="relative bg-[#04080f] py-16 sm:py-24 z-20 overflow-hidden border-t border-white/[0.06]">
      {/* Ambient Orangish Spray for Projects */}
      <div className="absolute top-1/4 -left-36 w-[550px] h-[500px] bg-[radial-gradient(circle,rgba(255,138,80,0.11),transparent_70%)] blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-12 -right-36 w-[550px] h-[500px] bg-[radial-gradient(circle,rgba(255,120,50,0.09),transparent_70%)] blur-[150px] pointer-events-none" aria-hidden="true" />

      {/* Edge-to-Edge Moving Track: from window left corner to right corner */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-visible my-6 py-8">
        <div
          className={`animate-scroll-right flex items-center gap-8 sm:gap-10 px-6 ${
            hoveredGlobalIdx !== null ? 'is-paused' : ''
          }`}
          onMouseLeave={() => setHoveredGlobalIdx(null)}
        >
          {infiniteTrack.map((project, idx) => {
            const isHovered = hoveredGlobalIdx === idx;
            const isAnyHovered = hoveredGlobalIdx !== null;

            return (
              <div
                key={`${project.id}-${idx}`}
                onMouseEnter={() => {
                  setHoveredGlobalIdx(idx);
                  setSelectedProject(project);
                }}
                className="relative flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  width: '380px',
                  zIndex: isHovered ? 40 : 10,
                  transform: isHovered
                    ? 'scale(1.1) translateZ(20px)'
                    : isAnyHovered
                    ? 'scale(0.92) translateZ(0)'
                    : 'scale(1) translateZ(0)',
                  opacity: isHovered ? 1 : isAnyHovered ? 0.55 : 1,
                  filter: !isHovered && isAnyHovered ? 'blur(0.5px)' : 'none',
                }}
              >
                {/* YouTube-Style Ambient Edge Blur (smooth deliberate fade) */}
                <div
                  className="absolute -inset-3 sm:-inset-5 rounded-[26px] pointer-events-none transition-opacity duration-700 ease-out"
                  style={{
                    opacity: isHovered ? 0.95 : 0,
                    background: `radial-gradient(circle, ${project.glowLeft}99 15%, ${project.glowRight || project.glowLeft}44 65%, transparent 100%)`,
                    filter: 'blur(22px)',
                    zIndex: -1,
                  }}
                />

                {/* Depth Card with only Project Name and Tech Stack */}
                <DepthCard
                  image={project.src}
                  imageAlt={project.alt}
                  title={project.title}
                  width={380}
                  height={480}
                  borderRadius="22px"
                  maxRotation={16}
                  maxTranslation={20}
                  spotlight={true}
                  spotlightColor={`${project.glowLeft}55`}
                  revealAnimation="slide"
                  onClick={() => setSelectedProject(project)}
                  className="w-full"
                >
                  {/* Tech stack badges alone in the card */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-white/10 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </DepthCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Project Details Card */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 mt-6 relative z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-2xl bg-[#060b16]/75 border border-white/12 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)]"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/[0.08]">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 text-xs font-mono text-[#ff8a50] tracking-widest uppercase">
                  <span
                    className="w-2 h-2 rounded-full transition-colors duration-500"
                    style={{ backgroundColor: selectedProject.glowLeft }}
                  />
                  <span>// {selectedProject.subtitle}</span>
                </div>
                <h3 className="font-['Chakra_Petch'] text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  {selectedProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quiet-button-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide cursor-pointer group"
                >
                  <span>Explore Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quiet-button-secondary inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium tracking-wide cursor-pointer group"
                >
                  <Code2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  <span>Source</span>
                </a>
              </div>
            </div>

            <p className="font-['Chakra_Petch'] text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal mb-5">
              {selectedProject.description}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-1">Stack:</span>
              {selectedProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="border border-white/10 bg-white/[0.04] px-2.5 py-1 rounded text-[11px] font-mono text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
