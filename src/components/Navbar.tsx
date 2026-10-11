import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  mousePos: { x: number; y: number };
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection, mousePos }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'Work', id: 'projects' },
    { name: 'Tools', id: 'tools' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  // User requirement: Remove header from front page, show on scroll down past front page
  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 160);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const headerTiltX = mousePos.x * 3;
  const headerTiltY = mousePos.y * 2;

  return (
    <>
      <AnimatePresence>
        {showNavbar && (
          <header className="fixed top-4 sm:top-5 left-0 right-0 z-40 flex justify-center px-4 sm:px-8 pointer-events-none">
            <motion.nav
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: `translate3d(${headerTiltX}px, ${headerTiltY}px, 0)`,
              }}
              className="pointer-events-auto w-full max-w-4xl glass-acrylic rounded-2xl sm:rounded-full px-5 sm:px-7 py-2.5 sm:py-3 flex items-center justify-between bg-[#060a14]/85 border-white/20 backdrop-blur-xl shadow-2xl"
            >
              {/* Left: Brand */}
              <div
                onClick={() => handleNavClick('hero')}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#ff8a50] to-[#f43f5e] flex items-center justify-center text-slate-950 font-black text-xs shadow-sm group-hover:scale-105 transition-transform duration-200">
                  V.
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-xs sm:text-sm tracking-wider text-white group-hover:text-orange-300 transition-colors">
                    VIGNESH S
                  </span>
                  <span className="text-[10px] tracking-wider text-slate-400 font-mono">
                    the learner
                  </span>
                </div>
              </div>

              {/* Center: Quiet Nav Links with subtle dot active indicator */}
              <div className="hidden md:flex items-center gap-7">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.id)}
                      className={`relative text-xs tracking-wide transition-colors duration-200 py-1 cursor-pointer flex flex-col items-center ${
                        isActive ? 'text-white font-medium' : 'text-slate-300/80 hover:text-white'
                      }`}
                    >
                      <span>{item.name}</span>
                      {isActive && (
                        <motion.span
                          layoutId="activeNavDot"
                          className="w-1 h-1 rounded-full bg-[#ff8a50] mt-1 shadow-[0_0_6px_#ff8a50]"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right: Clean Let's Talk CTA & Mobile Menu Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-200 hover:text-[#ff8a50] transition-colors duration-200 group cursor-pointer"
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ff8a50] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </button>

                {/* Mobile Hamburger Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>
            </motion.nav>
          </header>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden glass-acrylic rounded-2xl p-5 border border-white/20 bg-[#060a14]/95 backdrop-blur-2xl shadow-2xl"
          >
            <div className="space-y-3 font-mono text-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                    activeSection === item.id
                      ? 'bg-white/10 text-orange-300 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.name}</span>
                  {activeSection === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff8a50]" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
