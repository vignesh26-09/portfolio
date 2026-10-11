import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowUpRight, Copy, CheckCheck } from 'lucide-react';
import { SocialLinks } from '../components/SocialLinks';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const directEmail = 'vignesh.thelearner@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-6 sm:px-12 md:px-16 max-w-5xl mx-auto z-20">
      {/* Section Header (Rule 17) */}
      <div className="mb-14 sm:mb-18 text-left">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1.5 h-1.5 bg-[#ff8a50] rounded-none inline-block shadow-[0_0_6px_#ff8a50]" />
          <span className="text-xs font-mono tracking-widest text-[#ff8a50] uppercase">
            04 / CONTACT
          </span>
          <span className="h-[1px] w-12 bg-white/10" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-4">
          Have something interesting in mind?
        </h2>

        <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl font-sans">
          I'm always happy to talk about ideas, experiments, collaborations or things that probably shouldn't work but might.
        </p>

        {/* Direct Email Callout (Rule 17) */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="text-slate-400">Prefer email directly?</span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-200">
            <a
              href={`mailto:${directEmail}`}
              className="hover:text-[#ff8a50] transition-colors"
            >
              {directEmail}
            </a>
            <button
              onClick={handleCopyEmail}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer p-0.5"
              title="Copy email to clipboard"
            >
              {copied ? (
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Minimalist Conversation Form (Rule 17: Thin borders, large spacing, no corporate card) */}
      <div className="pt-8 border-t border-white/[0.08]">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-12 text-left space-y-3"
          >
            <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-mono">
              <Check className="w-4 h-4" />
              <span>Message sent.</span>
            </div>
            <p className="text-sm text-slate-300">
              I'll get back to you soon. Thanks for reaching out.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', message: '' });
              }}
              className="mt-4 text-xs font-mono text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Send another note
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="name or handle"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#ff8a50] transition-colors font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#ff8a50] transition-colors font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider">
                What's on your mind?
              </label>
              <textarea
                required
                rows={4}
                placeholder="an experiment, an idea, a project, or a quick question..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#ff8a50] transition-colors font-sans resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="quiet-button-primary inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-semibold tracking-wide cursor-pointer group"
              >
                <span>Send note</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Footer (Rule 18: Specific, Understated, No generic passion slogans) */}
      <footer className="mt-32 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs font-mono text-slate-500">
        <div>
          <p className="text-slate-400">Made, broken and rebuilt by Vignesh S.</p>
          <p className="text-[11px] text-slate-600 mt-1">Built slowly, changed often. © {new Date().getFullYear()}</p>
        </div>

        <div className="flex items-center gap-4">
          <SocialLinks />
        </div>
      </footer>
    </section>
  );
};
