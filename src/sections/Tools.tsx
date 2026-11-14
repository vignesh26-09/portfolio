import React from 'react';
import { motion } from 'framer-motion';
import { TOOL_GROUPS } from '../data/portfolioData';

const hexClip = 'polygon(25% 3%, 75% 3%, 98% 50%, 75% 97%, 25% 97%, 2% 50%)';

export const Tools: React.FC = () => (
  <section id="tools" className="relative py-28 sm:py-36 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto z-20 overflow-hidden">
    {/* Ambient Orangish Spray */}
    <div className="absolute inset-x-0 top-1/4 h-96 bg-[radial-gradient(ellipse_at_center,rgba(255,138,80,0.11),transparent_70%)] blur-[110px] pointer-events-none" aria-hidden="true" />
    <div className="absolute right-0 top-1/3 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(255,150,70,0.08),transparent_70%)] blur-[140px] pointer-events-none" aria-hidden="true" />
    <div className="absolute inset-x-0 top-1/4 h-96 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.06),transparent_70%)] pointer-events-none" />

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
