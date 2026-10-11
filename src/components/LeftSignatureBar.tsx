import { motion, useScroll, useTransform } from 'framer-motion';
import { TypewriterText } from './TypewriterText';

export const LeftSignatureBar = () => {
  const { scrollY } = useScroll();

  // Fade the name away as the visitor scrolls into the site.
  const barOpacity = useTransform(scrollY, [0, 320], [1, 0]);

  return (
    <motion.aside
      style={{ opacity: barOpacity }}
      className="fixed top-6 right-6 z-30 pointer-events-none hidden md:block"
    >
      <TypewriterText
        phrases={['VIGNESH S', 'THE VIBE CODER', 'PANTOMATH', 'TECH NERD']}
        typingSpeed={110}
        pauseDuration={3200}
        deletingSpeed={45}
        className="font-['Press_Start_2P'] text-white text-xl sm:text-3xl leading-relaxed"
      />
    </motion.aside>
  );
};
