import React from 'react';

export const SocialLinks: React.FC = () => {
  const socials = [
    {
      name: 'GitHub',
      handle: 'vignesh26-09',
      href: 'https://github.com/vignesh26-09',
      hoverStyle: 'hover:border-white/60 hover:text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]',
      iconHover: 'group-hover:text-white',
      svg: (
        <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'LeetCode',
      handle: 'R_S_VIGNESH_26',
      href: 'https://leetcode.com/u/R_S_VIGNESH_26/',
      hoverStyle: 'hover:border-[#ffa116]/70 hover:text-[#ffa116] hover:bg-[#ffa116]/10 hover:shadow-[0_0_20px_rgba(255,161,22,0.3)]',
      iconHover: 'group-hover:text-[#ffa116]',
      svg: (
        <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.314c.2-.213.398-.43.59-.652l4.723-5.35a1.385 1.385 0 0 0-.96-2.312zm4.887 7.221a1.37 1.37 0 0 0-.97 2.34l3.076 3.075H8.64a1.37 1.37 0 0 0 0 2.74h11.836l-3.076 3.076a1.374 1.374 0 0 0 .97 2.34 1.36 1.36 0 0 0 .97-.402l5.44-5.439a1.37 1.37 0 0 0 0-1.942l-5.44-5.44a1.36 1.36 0 0 0-.97-.402z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      handle: 'Vignesh S',
      href: 'https://www.linkedin.com/in/vignesh-s-05a919328',
      hoverStyle: 'hover:border-[#0a66c2]/70 hover:text-[#0a66c2] hover:bg-[#0a66c2]/10 hover:shadow-[0_0_20px_rgba(10,102,194,0.3)]',
      iconHover: 'group-hover:text-[#0a66c2]',
      svg: (
        <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      handle: '@vignesh',
      href: 'https://x.com',
      hoverStyle: 'hover:border-white/60 hover:text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]',
      iconHover: 'group-hover:text-white',
      svg: (
        <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className={`group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-slate-200 text-xs sm:text-sm font-mono font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer select-none ${social.hoverStyle}`}
        >
          <span className={`transition-colors ${social.iconHover}`}>{social.svg}</span>
          <span className="font-semibold tracking-wide">{social.name}</span>
        </a>
      ))}
    </div>
  );
};
