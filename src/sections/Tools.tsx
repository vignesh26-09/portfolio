import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TOOL_GROUPS } from '../data/portfolioData';

export const Tools: React.FC = () => {
  const [toolsExpanded, setToolsExpanded] = useState(false);
  return (
    <section id="tools" className="relative py-28 sm:py-36 px-6 sm:px-12 md:px-16 max-w-6xl mx-auto z-20">
      {/* Section Header */}
      <div className="mb-20 sm:mb-24">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1.5 h-1.5 bg-[#ff8a50] rounded-none inline-block shadow-[0_0_6px_#ff8a50]" />
          <span className="text-xs font-mono tracking-widest text-[#ff8a50] uppercase">
            02 / INVENTORY
          </span>
          <span className="h-[1px] w-12 bg-white/10" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
          Tools I reach for.
        </h2>

        <p className="mt-3 text-xs font-mono text-slate-400/80 max-w-md">
          /* a quiet inventory of languages, frameworks, and daily utilities */
        </p>
      </div>

      {/* Typographic Columns / Clean Text Rows (Rule 08: No cards, no scores, no stars) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {TOOL_GROUPS.map((group, gIdx) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: gIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`space-y-4 ${gIdx === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
          >
            {/* Group Label */}
            <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08]">
              <span className="text-[10px] font-mono text-[#ff8a50] font-semibold">
                0{gIdx + 1}
              </span>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-medium">
                {group.label}
              </h3>
            </div>

            {gIdx === 2 ? (
              <button
                type="button"
                onClick={() => setToolsExpanded((expanded) => !expanded)}
                aria-expanded={toolsExpanded}
                className={`group/tools relative w-full overflow-hidden rounded-2xl border text-left transition-all duration-500 ${
                  toolsExpanded
                    ? 'border-[#ff8a50]/70 bg-[#ff8a50]/10 p-5 shadow-[0_0_28px_rgba(255,138,80,0.2)]'
                    : 'border-white/10 bg-white/[0.03] px-4 py-3 hover:border-[#ff8a50]/50 hover:bg-[#ff8a50]/[0.06]'
                }`}
              >
                <motion.span
                  animate={{ x: toolsExpanded ? 0 : [0, 12, 0] }}
                  transition={{ duration: 2.4, repeat: toolsExpanded ? 0 : Infinity, ease: 'easeInOut' }}
                  className="flex items-center justify-between text-xs font-mono text-orange-200"
                >
                  <span>{toolsExpanded ? 'tap to collapse' : 'tap to expand'}</span>
                  <span className="text-[#ff8a50]">{toolsExpanded ? '−' : '+'}</span>
                </motion.span>
                <motion.ul
                  animate={{ height: toolsExpanded ? 'auto' : 0, opacity: toolsExpanded ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-2.5">
                    {group.items.map((item, itemIndex) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -16 }}
                        animate={toolsExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                        transition={{ delay: toolsExpanded ? itemIndex * 0.07 : 0 }}
                        className="flex items-center justify-between text-sm text-slate-200"
                      >
                        <span className="font-sans tracking-wide">{item}</span>
                        <span className="h-px flex-1 mx-3 bg-gradient-to-r from-[#ff8a50]/60 to-transparent" />
                      </motion.li>
                    ))}
                  </div>
                </motion.ul>
              </button>
            ) : (
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="group flex items-center justify-between text-sm text-slate-300 hover:text-white transition-all duration-200 hover:-translate-y-[2px] cursor-default py-1"
                >
                  <span className="font-sans font-normal tracking-wide group-hover:text-orange-200 transition-colors">
                    {item}
                  </span>
                  <span className="w-1 h-1 bg-white/20 group-hover:bg-[#ff8a50] transition-colors rounded-none" />
                </li>
              ))}
            </ul>
            )}
          </motion.div>
        ))}
      </div>

      {/* Small annotation beneath tools (Rule 07 & 10) */}
      <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <p>/* tools are instruments; understanding first principles is what endures */</p>
        <span className="text-slate-500">environment: Linux / macOS · editor: Neovim / VS Code</span>
      </div>
    </section>
  );
};
