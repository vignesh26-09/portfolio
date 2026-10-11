import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Code2, Film } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import {
  AlgoVisualizerPreview,
  DevForgePreview,
  PulseMetricsPreview,
  AetheriaPreview,
} from '../components/ProjectVisuals';

type Project = (typeof PROJECTS)[number];

const renderVisual = (id: string) => {
  switch (id) {
    case 'algovisualizer': return <AlgoVisualizerPreview />;
    case 'devforge': return <DevForgePreview />;
    case 'pulsemetrics': return <PulseMetricsPreview />;
    case 'aetheria': return <AetheriaPreview />;
    default: return null;
  }
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.78, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.16, 0.78, 1], [110, 0, 0, -110]);
  const scale = useTransform(scrollYProgress, [0, 0.16, 0.78, 1], [0.96, 1, 1, 0.96]);

  return (
    <div className="min-h-screen flex items-center py-16 sm:py-24">
      <motion.article ref={cardRef} style={{ opacity, y, scale }} className="w-full rounded-3xl glass-surface p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        <div className="absolute top-0 left-0 right-0 h-2 flex justify-between px-4 opacity-25">
          {Array.from({ length: 24 }).map((_, i) => <span key={i} className="w-2 h-1 bg-white" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">{renderVisual(project.id)}</div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
              <span>TAKE // {project.builtYear}</span><span className="text-slate-400">FPS: 60 · STABLE</span>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-3xl sm:text-4xl font-light text-white/20 select-none">{project.number}</span>
                <span className="text-[10px] font-mono tracking-widest text-[#ff8a50] uppercase">■ {project.category}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4">{project.title}</h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                <p><span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-0.5">The Premise</span>{project.whatItIs}</p>
                <p><span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-0.5">Why I Built It</span>{project.whyIBuiltIt}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08]"><p className="text-xs font-mono text-orange-200/90 leading-relaxed">{project.personalNote}</p></div>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => <span key={tech} className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.08]">{tech}</span>)}
            </div>
            <div className="flex items-center gap-6 pt-1">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-white hover:text-[#ff8a50] transition-colors group/link"><span>Explore Project</span><ArrowUpRight className="w-3.5 h-3.5 text-[#ff8a50] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" /></a>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"><Code2 className="w-3.5 h-3.5 text-slate-500" /><span>Source</span></a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 flex justify-between px-4 opacity-25">
          {Array.from({ length: 24 }).map((_, i) => <span key={i} className="w-2 h-1 bg-white" />)}
        </div>
      </motion.article>
    </div>
  );
};

export const Projects: React.FC = () => (
  <section id="projects" className="relative bg-[#04080f] px-4 sm:px-8 lg:px-16 py-16 sm:py-24 z-20">
    <div className="max-w-6xl mx-auto">
      <header className="flex items-center gap-3 pb-5 border-b border-white/[0.08]">
        <div className="w-6 h-6 rounded bg-[#ff8a50]/20 border border-[#ff8a50]/40 flex items-center justify-center text-[#ff8a50]"><Film className="w-3.5 h-3.5" /></div>
        <span className="text-xs font-mono text-white font-semibold tracking-wider">PROJECT REEL</span>
      </header>
      {PROJECTS.map((project) => <ProjectCard key={project.id} project={project} />)}
    </div>
  </section>
);
