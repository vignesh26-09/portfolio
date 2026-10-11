import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Terminal, BookOpen } from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import { SocialLinks } from './SocialLinks';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavClick: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavClick,
}) => {
  const navItems = [
    { label: '01 // Home', id: 'hero' },
    { label: '02 // Featured Projects', id: 'projects' },
    { label: '03 // About Developer', id: 'about' },
    { label: '04 // Get In Touch', id: 'contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Right-side slideout panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] z-50 bg-[#070b14]/95 border-l border-white/15 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto backdrop-blur-2xl shadow-2xl"
          >
            {/* Header with Typewriter Animation */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block">
                      Profile Tag
                    </span>
                    <span className="text-lg font-bold text-white tracking-wide">
                      <TypewriterText text="THE Learner" className="text-orange-400 font-mono text-base" />
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Developer info */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white tracking-wide">Vignesh S</span>
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Available to Build
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Passionate coder and continuous learner crafting clean, human-made web applications and solving problems with care.
                </p>
              </div>

              {/* Navigation Menu */}
              <div className="space-y-2 mb-8">
                <span className="text-[11px] font-mono tracking-widest text-slate-500 uppercase block mb-3 px-1">
                  Quick Navigation
                </span>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavClick(item.id);
                      onClose();
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-mono transition-all flex items-center justify-between group cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-orange-500/15 text-orange-300 border border-orange-500/30'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </button>
                ))}
              </div>

              {/* Learning Roadmap / Highlights */}
              <div className="space-y-3 p-4 rounded-2xl bg-orange-500/5 border border-orange-500/15 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Current Learning Focus</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 font-mono pl-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                    <span>Data Structures & LeetCode</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <span>Modern React & High-Performance UI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Full-Stack Web Architectures</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer / Social in Sidebar */}
            <div className="pt-6 border-t border-white/10">
              <span className="text-[11px] font-mono tracking-widest text-slate-500 uppercase block mb-3">
                Connect With Vignesh
              </span>
              <SocialLinks />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
