import React from 'react';
import { motion } from 'framer-motion';
import { TOOL_GROUPS } from '../data/portfolioData';

const hexClip = 'polygon(25% 3%, 75% 3%, 98% 50%, 75% 97%, 25% 97%, 2% 50%)';

export const Tools: React.FC = () => (
  <section id="tools" className="relative py-28 sm:py-36 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto z-20 overflow-hidden">
    <div className="absolute inset-x-0 top-1/4 h-96 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.09),transparent_70%)] pointer-events-none" />

    <div className="relative mb-16 sm:mb-20 text-center max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#38bdf8]" />
        <span className="w-1.5 h-1.5 bg-[#ff8a50] shadow-[0_0_8px_#ff8a50]" />
        <span className="text-xs font-mono tracking-widest text-[#ff8a50] uppercase">02 / TOOLKIT</span>
        <span className="w-1.5 h-1.5 bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#38bdf8]" />
      </div>
      <h2 className="font-['Chakra_Petch'] text-4xl sm:text-6xl font-semibold tracking-[-0.04em] text-white leading-none">Tools in my stack.</h2>
      <p className="mt-4 text-sm font-mono text-slate-400">Hover or tap a tile to bring the puzzle to life.</p>
    </div>

    <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-2 gap-y-[-12px] sm:gap-x-4">
      {TOOL_GROUPS.flatMap((group, groupIndex) => group.items.map((item, itemIndex) => {
        const isOrange = (groupIndex + itemIndex) % 2 === 0;
        const offset = (groupIndex * group.items.length + itemIndex) % 2 === 1;
        const accent = isOrange ? '#ff8a50' : '#38bdf8';

        return (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 44, scale: 0.84 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.1, y: -9, rotate: isOrange ? -1.5 : 1.5, zIndex: 20 }}
            whileTap={{ scale: 1.05 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{ duration: 0.45, delay: (groupIndex * 0.08) + (itemIndex * 0.035), ease: [0.16, 1, 0.3, 1] }}
            className={`relative aspect-square -mb-7 sm:-mb-10 cursor-default ${offset ? 'translate-y-7 sm:translate-y-10' : ''}`}
          >
            <div
              style={{ clipPath: hexClip, borderColor: `${accent}88` }}
              className="absolute inset-0 border bg-[#09121f]/95 p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(56,189,248,0.28)]"
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle at 50% 25%, ${accent}35, transparent 56%)` }} />
              <div className="relative flex items-center justify-between text-[8px] sm:text-[9px] font-mono tracking-widest" style={{ color: accent }}>
                <span>0{groupIndex + 1}</span><span>◈</span>
              </div>
              <div className="relative text-center">
                <p className="font-['Chakra_Petch'] text-sm sm:text-base font-semibold leading-tight text-white">{item}</p>
                <p className="mt-1 text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.13em] text-slate-500">{group.label}</p>
              </div>
              <div className="relative h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
            </div>
          </motion.div>
        );
      }))}
    </div>

    <p className="relative mt-24 text-center text-xs font-mono text-slate-500">/* individual tools, connected as one system */</p>
  </section>
);
