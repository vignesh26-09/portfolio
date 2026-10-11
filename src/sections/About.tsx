import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28 sm:py-36 px-6 sm:px-12 md:px-16 max-w-6xl mx-auto z-20">
      {/* Section Header */}
      <div className="mb-16 sm:mb-20">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1.5 h-1.5 bg-[#ff8a50] rounded-none inline-block shadow-[0_0_6px_#ff8a50]" />
          <span className="text-xs font-mono tracking-widest text-[#ff8a50] uppercase">
            03 / ABOUT
          </span>
          <span className="h-[1px] w-12 bg-white/10" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
          A little about how I work.
        </h2>
      </div>

      {/* Editorial Letter Composition with Controlled Asymmetry (Rule 09 & 11) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Letter Text Column (Rule 09) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6 text-base sm:text-lg text-slate-300 leading-relaxed font-sans"
        >
          <p>
            I like understanding things by building them. Most of my projects begin with a quiet question, a problem that annoys me in my daily workflow, or simply an interface behavior I wanted to see come alive on screen.
          </p>

          <p>
            I care deeply about the technical side — clean type boundaries, predictable render loops, algorithmic clarity, and keeping bundle footprints lean. But I care just as much about how something actually feels when another human touches it: the deliberate easing curve of a scroll transition, the weight of the typography, and the absence of decorative noise.
          </p>

          <p>
            I go by <strong className="text-white font-medium">Vignesh S</strong>, and online often as <strong className="text-orange-300 font-medium">THE Learner</strong>. I spend late nights exploring data structures, breaking complex systems down to first principles, and refining details most people might never explicitly mention, but will subconsciously appreciate.
          </p>

          <p className="text-slate-400 text-sm font-mono pt-2">
            I'm still figuring things out. I expect that part never to stop.
          </p>
        </motion.div>

        {/* Quiet Personal Colophon / Sidebar (Asymmetric, No fake dashboard stats) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative space-y-6 text-xs font-mono text-slate-300"
        >
          {/* Pixel corner markers (Rule 12) */}
          <span className="absolute top-2 left-2 text-[10px] text-white/20">+</span>
          <span className="absolute top-2 right-2 text-[10px] text-white/20">+</span>
          <span className="absolute bottom-2 left-2 text-[10px] text-white/20">+</span>
          <span className="absolute bottom-2 right-2 text-[10px] text-white/20">+</span>

          <div>
            <span className="text-[10px] uppercase text-slate-500 tracking-wider block mb-1">
              [ current exploration ]
            </span>
            <p className="text-slate-200">
              Low-latency canvas render loops, heuristic graph pathfinding, and local-first browser storage.
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.06]">
            <span className="text-[10px] uppercase text-slate-500 tracking-wider block mb-1">
              [ building philosophy ]
            </span>
            <p className="text-orange-200/90 italic">
              "The best ideas usually begin as something unnecessary."
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.06]">
            <span className="text-[10px] uppercase text-slate-500 tracking-wider block mb-1">
              [ base coordinates ]
            </span>
            <p className="text-slate-400">
              13°04'N 80°14'E · Chennai, IN
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500">
            <span>status: open to interesting ideas</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
