'use client';

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['rgba(255, 138, 80, 0.35)', 'rgba(6, 12, 24, 0.92)'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className = '',
  logoUrl,
  menuButtonColor = '#ffffff',
  openMenuButtonColor = '#050811',
  changeMenuColorOnOpen = true,
  accentColor = '#ff8a50',
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const textWrapRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });

      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    const tl = gsap.timeline({ paused: true });

    const all = [...layers, panel];
    tl.set(all, { opacity: 1 });

    const totalLayers = layers.length;
    layers.forEach((layer, i) => {
      tl.fromTo(
        layer,
        { xPercent: position === 'left' ? -100 : 100 },
        {
          xPercent: 0,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto'
        },
        i * 0.08
      );
    });

    const panelInsertTime = totalLayers * 0.08;
    tl.fromTo(
      panel,
      { xPercent: position === 'left' ? -100 : 100 },
      {
        xPercent: 0,
        duration: 0.65,
        ease: 'power4.out',
        overwrite: 'auto'
      },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + 0.12;
      tl.fromTo(
        itemEls,
        { yPercent: 140, rotate: 10 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.07
        },
        itemsStart
      );
    }

    if (numberEls.length) {
      const numStart = panelInsertTime + 0.22;
      tl.fromTo(
        numberEls,
        { ['--sm-num-opacity' as any]: 0 },
        {
          ['--sm-num-opacity' as any]: 1,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.07
        },
        numStart
      );
    }

    if (socialTitle) {
      const socialsStart = panelInsertTime + 0.25;
      tl.fromTo(
        socialTitle,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out'
        },
        socialsStart
      );
    }

    if (socialLinks.length) {
      const socialsStart = panelInsertTime + 0.3;
      tl.fromTo(
        socialLinks,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power3.out',
          stagger: 0.04
        },
        socialsStart
      );
    }

    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[];
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });

        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;

    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [animateColor, animateIcon, animateText, onMenuClose, onMenuOpen, playClose, playOpen]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [animateColor, animateIcon, animateText, onMenuClose, playClose]);

  // Click away and escape key handler
  React.useEffect(() => {
    if (!closeOnClickAway) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeOnClickAway, open, closeMenu]);

  // Smart section scrolling on item click
  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    const map: Record<string, string> = {
      '/': '#hero',
      '/about': '#about',
      '/services': '#projects',
      '/work': '#projects',
      '/contact': '#contact',
    };
    const targetId = map[link] || (link.startsWith('#') ? link : null);
    if (targetId) {
      e.preventDefault();
      closeMenu();
      const elem = document.querySelector(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      closeMenu();
    }
  };

  return (
    <div className={`sm-scope relative ${className}`}>
      {/* Menu Trigger Button */}
      <button
        ref={toggleBtnRef}
        className={`sm-toggle relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
          open
            ? 'bg-[#ff8a50] text-slate-950 font-bold shadow-[0_0_25px_rgba(255,138,80,0.5)] border border-[#ff8a50] z-[105]'
            : 'bg-white/[0.06] backdrop-blur-md text-slate-100 hover:text-white border border-white/14 hover:border-[#ff8a50]/50 hover:bg-white/[0.1] shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
        }`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="staggered-menu-panel"
        onClick={toggleMenu}
        type="button"
      >
        <span
          ref={textWrapRef}
          className="sm-toggle-textWrap relative inline-block h-[1.1em] overflow-hidden whitespace-nowrap tracking-wider uppercase font-semibold"
          aria-hidden="true"
        >
          <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
            {textLines.map((l, i) => (
              <span className="sm-toggle-line block h-[1.1em] leading-none" key={i}>
                {l}
              </span>
            ))}
          </span>
        </span>

        <span
          ref={iconRef}
          className="sm-icon relative w-[12px] h-[12px] shrink-0 inline-flex items-center justify-center [will-change:transform]"
          aria-hidden="true"
        >
          <span
            ref={plusHRef}
            className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
          />
          <span
            ref={plusVRef}
            className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
          />
        </span>
      </button>

      {/* Dim backdrop when open */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 z-[80] ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Sliding Acrylic Prelayers */}
      <div
        ref={preLayersRef}
        className={`sm-prelayers fixed top-0 bottom-0 pointer-events-none z-[85] ${
          position === 'left' ? 'left-0' : 'right-0'
        }`}
        aria-hidden="true"
      >
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ['rgba(255, 138, 80, 0.35)', 'rgba(6, 12, 24, 0.92)'];
          let arr = [...raw];
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }
          return arr.map((c, i) => (
            <div
              key={i}
              className={`sm-prelayer absolute top-0 h-full w-full translate-x-0 backdrop-blur-2xl ${
                position === 'left' ? 'left-0' : 'right-0'
              }`}
              style={{ background: c }}
            />
          ));
        })()}
      </div>

      {/* Full-Height Slide-Over Acrylic Glass Panel */}
      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className={`staggered-menu-panel fixed top-0 h-screen text-white flex flex-col p-[5.5em_2.5em_2.5em_2.5em] sm:p-[6.5em_3.5em_3.5em_3.5em] overflow-y-auto z-[90] pointer-events-auto transition-all ${
          position === 'left' ? 'left-0' : 'right-0'
        }`}
        style={{
          background: 'rgba(6, 12, 24, 0.84)',
          backdropFilter: 'blur(36px) saturate(190%)',
          WebkitBackdropFilter: 'blur(36px) saturate(190%)',
          borderLeft: position === 'left' ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
          borderRight: position === 'left' ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
          boxShadow:
            position === 'left'
              ? '15px 0 60px rgba(0, 0, 0, 0.75), inset -1px 0 0 rgba(255, 255, 255, 0.14)'
              : '-15px 0 60px rgba(0, 0, 0, 0.75), inset 1px 0 0 rgba(255, 255, 255, 0.14)',
        }}
        aria-hidden={!open}
      >
        <div className="sm-panel-inner flex-1 flex flex-col gap-8 relative z-10">
          {logoUrl && (
            <div className="sm-logo mb-2 flex items-center select-none" aria-label="Logo">
              <img
                src={logoUrl}
                alt="Logo"
                className="sm-logo-img block h-8 w-auto object-contain"
                draggable={false}
              />
            </div>
          )}

          {/* Staggered Item List */}
          <ul
            className="sm-panel-list list-none m-0 p-0 flex flex-col gap-3 font-['Chakra_Petch']"
            role="list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                  <a
                    className="sm-panel-item relative text-white hover:text-[#ff8a50] font-bold text-4xl sm:text-5xl cursor-pointer leading-tight tracking-tight uppercase transition-all duration-200 inline-block no-underline pr-8 group"
                    href={it.link}
                    aria-label={it.ariaLabel}
                    onClick={(e) => handleItemClick(e, it.link)}
                    data-index={idx + 1}
                  >
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform group-hover:translate-x-1.5 transition-transform duration-200">
                      {it.label}
                    </span>
                  </a>
                </li>
              ))
            ) : null}
          </ul>

          {/* Staggered Social Links */}
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials mt-auto pt-8 border-t border-white/10 flex flex-col gap-3.5" aria-label="Social links">
              <h3 className="sm-socials-title m-0 text-xs font-mono font-bold uppercase tracking-widest text-[#ff8a50]">
                Connect // Socials
              </h3>
              <ul className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-5 flex-wrap" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link text-xs font-mono font-medium text-slate-300 hover:text-[#ff8a50] no-underline px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#ff8a50]/40 transition-all duration-200"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>

      <style>{`
.sm-scope {
  --sm-accent: ${accentColor || '#ff8a50'};
}
.sm-scope .staggered-menu-panel {
  width: clamp(280px, 40vw, 460px);
}
.sm-scope [data-position='left'] .staggered-menu-panel {
  right: auto;
  left: 0;
}
.sm-scope .sm-prelayers {
  width: clamp(280px, 40vw, 460px);
}
.sm-scope [data-position='left'] .sm-prelayers {
  right: auto;
  left: 0;
}
.sm-scope .sm-panel-list[data-numbering] {
  counter-reset: smItem;
}
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
  counter-increment: smItem;
  content: counter(smItem, decimal-leading-zero);
  position: absolute;
  top: 0.15em;
  right: 0.2em;
  font-size: 14px;
  font-family: monospace;
  font-weight: 600;
  color: var(--sm-accent, #ff8a50);
  letter-spacing: 0;
  pointer-events: none;
  user-select: none;
  opacity: var(--sm-num-opacity, 0);
  text-shadow: 0 0 10px rgba(255, 138, 80, 0.4);
}
@media (max-width: 768px) {
  .sm-scope .staggered-menu-panel,
  .sm-scope .sm-prelayers {
    width: 100vw;
  }
}
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
