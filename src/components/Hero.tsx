import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import TechText from './TechText';

interface HeroProps {
  onExploreWork: () => void;
  onAboutClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork }) => {
  const { scrollY } = useScroll();

  // Cinematic Zoom-In & Fade Out on scroll
  const heroSlideY = useTransform(scrollY, [0, 480], [0, -30]);
  const heroScale = useTransform(scrollY, [0, 500], [1.0, 1.15]);
  const heroOpacity = useTransform(scrollY, [0, 360], [1, 0]);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 pt-8 pb-10 sm:pt-12 sm:pb-14 z-20 pointer-events-none">
      <motion.div
        style={{ y: heroSlideY, scale: heroScale, opacity: heroOpacity }}
        className="w-full max-w-4xl pointer-events-auto flex flex-col items-start justify-center origin-center"
      >
        {/* Hello Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Chakra_Petch'] text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-none mb-2"
        >
          Hello
        </motion.h1>

        {/* I'm + Roles column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-6 sm:gap-9 mb-2.5"
        >
          <span className="font-['Chakra_Petch'] text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-none">
            I'm
          </span>
          <div className="flex flex-col justify-center text-slate-300 font-['Chakra_Petch'] leading-tight border-l-3 sm:border-l-4 border-[#ff8a50] pl-4 sm:pl-5 py-0.5">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide">
              Software Engineer
            </span>
            <span className="text-sm sm:text-base lg:text-lg font-medium text-slate-400 font-mono tracking-wider mt-0.5">
              Fullstack Developer
            </span>
          </div>
        </motion.div>

        {/* Name with TechText Geometric Blueprint Animation on Hover (Hint removed) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="relative group/name cursor-pointer mb-3"
        >
          <div className="h-[80px] sm:h-[105px] w-[350px] sm:w-[500px] relative select-none">
            <TechText
              text="Vignesh S"
              fontFamily="'Chakra Petch', sans-serif"
              fontWeight={700}
              fontSize={92}
              letterSpacing={-0.03}
              color="#ffffff"
              accentColor="#ff8a50"
              align="left"
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={14}
              intro="none"
              clickKick
              guides={false}
              reach={130}
              softness={0.7}
              lineStyle="dashed"
              strokeWidth={2}
              speed={1}
              bounce={0.4}
              selection
              labels
              draggable
              sweep={false}
            />
          </div>
        </motion.div>

        {/* Clean Human Personal Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Chakra_Petch'] text-lg sm:text-xl lg:text-2xl text-slate-200/95 leading-relaxed font-normal max-w-2xl mb-5"
        >
          I build things to understand how they work — experimenting with software, interfaces, and systems with care for how they feel.
        </motion.p>

        {/* Primary CTA Action */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5"
        >
          <button
            onClick={onExploreWork}
            className="quiet-button-primary inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold tracking-wide cursor-pointer group shadow-lg hover:shadow-[#ff8a50]/20 transition-all"
          >
            <span>Explore Projects</span>
            <ArrowDown className="w-4 h-4 text-slate-900 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* Prominent Social Links - Lifted up and fully visible */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.62 }}
          className="w-full"
        >
          <SocialLinks />
        </motion.div>
      </motion.div>
    </div>
  );
};
