import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StaggeredMenu from './StaggeredMenu';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  mousePos: { x: number; y: number };
}

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com/vignesh26-09' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

const sectionMap: Record<string, { name: string; number: string; phrase: string }> = {
  hero: { name: 'HOME', number: '01', phrase: '' },
  projects: { name: 'PROJECTS', number: '02', phrase: 'Some of my works' },
  tools: { name: 'TOOLS', number: '03', phrase: 'Tools in my stack' },
  about: { name: 'ABOUT', number: '04', phrase: 'A little about how I work' },
  contact: { name: 'CONTACT', number: '05', phrase: 'Have something interesting in mind?' },
};

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [showNavbar, setShowNavbar] = useState(false);

  // User requirement: top bar appears on scroll down past front page
  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 160);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentSection = sectionMap[activeSection] || { name: 'PROJECTS', number: '02', phrase: 'Some of my works' };

  return (
    <>
      {/* Front Page Floating Trigger (Show on Left Side when on first page) */}
      {!showNavbar && (
        <div className="fixed top-6 left-6 sm:left-12 z-40">
          <StaggeredMenu
            position="left"
            items={menuItems}
            socialItems={socialItems}
            displaySocials
            displayItemNumbering={true}
            menuButtonColor="#ffffff"
            openMenuButtonColor="#050811"
            changeMenuColorOnOpen={true}
            colors={['rgba(255, 138, 80, 0.35)', 'rgba(6, 12, 24, 0.92)']}
            accentColor="#ff8a50"
            onMenuOpen={() => console.log('Menu opened')}
            onMenuClose={() => console.log('Menu closed')}
          />
        </div>
      )}

      {/* Scrolled-Down Header: ONLY the active part name on the left, and the menu on the right */}
      <AnimatePresence>
        {showNavbar && (
          <header className="fixed top-0 left-0 right-0 w-full z-40 pointer-events-none">
            <motion.nav
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full rounded-none px-6 sm:px-12 lg:px-16 py-3.5 sm:py-4 flex items-center justify-between bg-[#040812]/50 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300"
            >
              {/* Left: Active Section Indicator & Phrase */}
              <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm select-none">
                <span className="w-2 h-2 rounded-full bg-[#ff8a50] shadow-[0_0_8px_#ff8a50] inline-block flex-shrink-0" />
                <span className="text-[#ff8a50] font-semibold tracking-widest">{currentSection.number}</span>
                <span className="text-slate-500">//</span>
                <span className="font-['Chakra_Petch'] font-bold text-sm sm:text-base tracking-widest text-white uppercase">
                  {currentSection.name}
                </span>
                {currentSection.phrase && (
                  <>
                    <span className="hidden sm:inline text-slate-600 font-mono text-xs">//</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeSection}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2 }}
                        className="font-['Chakra_Petch'] text-xs sm:text-sm md:text-base font-bold tracking-wide bg-gradient-to-r from-[#ff8a50] via-[#ffaa66] to-[#38bdf8] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,138,80,0.3)] truncate max-w-[200px] sm:max-w-none"
                      >
                        {currentSection.phrase}
                      </motion.span>
                    </AnimatePresence>
                  </>
                )}
              </div>

              {/* Right: Menu */}
              <div className="flex items-center">
                <StaggeredMenu
                  position="right"
                  items={menuItems}
                  socialItems={socialItems}
                  displaySocials
                  displayItemNumbering={true}
                  menuButtonColor="#ffffff"
                  openMenuButtonColor="#050811"
                  changeMenuColorOnOpen={true}
                  colors={['rgba(255, 138, 80, 0.35)', 'rgba(6, 12, 24, 0.92)']}
                  accentColor="#ff8a50"
                  onMenuOpen={() => console.log('Menu opened')}
                  onMenuClose={() => console.log('Menu closed')}
                />
              </div>
            </motion.nav>
          </header>
        )}
      </AnimatePresence>
    </>
  );
};
