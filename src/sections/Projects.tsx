import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Code2, Film } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { DevForgePreview, PulseMetricsPreview } from '../components/ProjectVisuals';

type Project = (typeof PROJECTS)[number];

const renderVisual = (id: string) => {
  if (id === 'carelink') return <DevForgePreview />;
  if (id === 'tourism-reputation') return <PulseMetricsPreview />;
  return null;
};

const PuzzlePiece: React.FC<{ className: string; delay: number }> = ({ className, delay }) => (
  <motion.div
    aria-hidden="true"
    initial={{ opacity: 0, scale: 0.72 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute border border-[#ff8a50]/25 bg-[#ff8a50]/[0.035] ${className}`}
  />
);

const ProjectShowcase: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.14, 0.82, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.14, 0.82, 1], [100, 0, 0, -100]);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden flex items-center py-16 sm:py-24">
      <motion.div style={{ opacity, y }} className="relative w-full min-h-[78vh] flex items-center overflow-hidden bg-[#070d18]">
        <PuzzlePiece className="top-0 left-0 h-1/2 w-1/4 border-l-0 border-t-0" delay={0.05} />
        <PuzzlePiece className="top-1/2 left-1/4 h-1/2 w-1/4 border-l-0" delay={0.15} />
        <PuzzlePiece className="top-0 right-0 h-2/5 w-1/3 border-r-0 border-t-0" delay={0.25} />
        <PuzzlePiece className="bottom-0 right-1/4 h-2/5 w-1/4 border-b-0" delay={0.35} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,138,80,0.16),transparent_35%),linear-gradient(135deg,rgba(9,19,34,0.1),rgba(4,8,15,0.9))]" />

        <div className={`relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 px-6 sm:px-10 lg:px-16 items-center ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -48 : 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative overflow-hidden border border-white/10 bg-black/30 shadow-[0_24px_80px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:scale-[1.02]">
              {renderVisual(project.id)}
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>PROJECT // {project.number}</span>
              <span>BUILT // {project.builtYear}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? 48 : -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="flex items-center gap-3 text-xs font-mono text-[#ff8a50] tracking-widest"><span className="w-8 h-px bg-[#ff8a50]" />{project.category}</div>
            <h3 className="font-['Chakra_Petch'] text-4xl sm:text-6xl font-semibold tracking-[-0.04em] text-white leading-none">{project.title}</h3>
            <p className="text-base text-slate-200/90 leading-relaxed">{project.whatItIs}</p>
            <p className="text-sm text-slate-400 leading-relaxed">{project.whyIBuiltIt}</p>
            <blockquote className="border-l-2 border-[#ff8a50]/70 pl-4 text-sm font-mono text-orange-100/90">{project.personalNote}</blockquote>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => <span key={tech} className="border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-mono text-slate-200">{tech}</span>)}
            </div>
            <div className="flex items-center gap-6 pt-2">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-mono font-semibold text-white hover:text-[#ff8a50] transition-colors"><span>Explore Project</span><ArrowUpRight className="w-4 h-4" /></a>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-mono text-slate-300 hover:text-white transition-colors"><Code2 className="w-4 h-4" /><span>Source</span></a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export const Projects: React.FC = () => (
  <section id="projects" className="relative bg-[#04080f] py-12 sm:py-16 z-20">
    <header className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center gap-3 pb-6 border-b border-white/[0.08]">
      <div className="w-7 h-7 rounded bg-[#ff8a50]/20 border border-[#ff8a50]/40 flex items-center justify-center text-[#ff8a50]"><Film className="w-4 h-4" /></div>
      <span className="text-xs font-mono text-white font-semibold tracking-wider">PROJECT REEL / FULL VIEW</span>
    </header>
    {PROJECTS.map((project, index) => <ProjectShowcase key={project.id} project={project} index={index} />)}
  </section>
);
