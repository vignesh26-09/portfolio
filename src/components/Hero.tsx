import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SocialLinks } from './SocialLinks';

interface HeroProps {
  onExploreWork: () => void;
  onAboutClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onAboutClick }) => {
  const { scrollY } = useScroll();

  // Cinematic Zoom-In & Fade Out on scroll (User request: zoom in on scroll down)
  const heroSlideY = useTransform(scrollY, [0, 480], [0, -40]);
  const heroScale = useTransform(scrollY, [0, 500], [1.0, 1.18]);
  const heroOpacity = useTransform(scrollY, [0, 360], [1, 0]);
  const indicatorOpacity = useTransform(scrollY, [0, 180], [1, 0]);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-end px-6 sm:px-10 md:px-12 lg:px-16 pb-12 sm:pb-16 pt-24 z-20 pointer-events-none">
      <motion.div
        style={{ y: heroSlideY, scale: heroScale, opacity: heroOpacity }}
        className="w-full max-w-xl md:max-w-2xl pointer-events-auto md:ml-[22vw] lg:ml-[20vw] origin-bottom-left"
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6"
        >
          <span className="w-1.5 h-1.5 bg-[#ff8a50] rounded-none inline-block shadow-[0_0_6px_#ff8a50]" />
          <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase">
            BUILDING DIGITAL WORLDS
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Chakra_Petch'] text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] text-white leading-[0.98] mb-6"
        >
          Designing <br />
          for a{' '}
          <span className="bg-gradient-to-r from-[#ff9a7b] via-[#ff886c] to-[#f87171] bg-clip-text text-transparent">
            brighter
          </span>{' '}
          <br className="hidden sm:inline" />
          tomorrow.
        </motion.h1>

        {/* Human Personal Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Chakra_Petch'] text-base sm:text-lg text-slate-200/90 leading-relaxed font-medium max-w-[520px] mb-8"
        >
          I'm <strong className="text-white font-medium">Vignesh S</strong>. I build things to understand how they work — experimenting with software, interfaces, and systems with care for how they feel.
        </motion.p>

        {/* Quiet CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3.5 mb-8"
        >
          <button
            onClick={onExploreWork}
            className="quiet-button-primary inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide cursor-pointer group"
          >
            <span>Explore Work</span>
            <ArrowDown className="w-3.5 h-3.5 text-slate-900 group-hover:translate-y-0.5 transition-transform duration-300" />
          </button>

          <button
            onClick={onAboutClick}
            className="quiet-button-secondary inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide cursor-pointer group"
          >
            <span>A Little About Me</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </button>
        </motion.div>

        {/* Quiet Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          <SocialLinks />
        </motion.div>
      </motion.div>

      {/* Subtle Scroll Hint */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-6 right-6 sm:right-12 hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400/60 pointer-events-none select-none"
      >
        <span className="w-1 h-1 bg-[#ff8a50]/70 rounded-none inline-block animate-pulse" />
        <span>scroll to enter cinema ↓</span>
      </motion.div>
    </div>
  );
};
