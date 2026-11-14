import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { LeftSignatureBar } from './components/LeftSignatureBar';
import { BackgroundScene } from './components/BackgroundScene';
import { Hero } from './components/Hero';
import { Projects } from './sections/Projects';
import { Tools } from './sections/Tools';
import { About } from './sections/About';
import { Contact } from './sections/Contact';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  // Performant mouse position tracking via requestAnimationFrame
  useEffect(() => {
    let latestX = 0;
    let latestY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      latestX = (e.clientX / innerWidth) * 2 - 1;
      latestY = (e.clientY / innerHeight) * 2 - 1;

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          setMousePos({ x: latestX, y: latestY });
          rafId.current = null;
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Active section tracking with IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'projects', 'tools', 'about', 'contact'];
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#04080f] text-slate-100 overflow-x-hidden selection:bg-[#ff8a50]/30 selection:text-white">
      {/* Subtle Analog Texture Grain Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Ambient Orangish Essence: Soft spray of fully-blurred warm shades across the whole viewport */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
        {/* Top-Left Soft Amber Spray (Hero area) */}
        <div className="absolute -top-32 -left-32 w-[620px] h-[620px] rounded-full bg-gradient-to-br from-[#ff8a50]/14 to-[#ff6600]/04 blur-[140px] will-change-transform" />

        {/* Top-Right Warm Light Shade */}
        <div className="absolute top-[12vh] -right-28 w-[520px] h-[520px] rounded-full bg-gradient-to-bl from-[#ffa35c]/10 to-transparent blur-[160px] will-change-transform" />

        {/* Center Midfield Ambient Glow (Projects & Carousel area) */}
        <div className="absolute top-[45vh] left-[10vw] w-[680px] h-[560px] rounded-full bg-gradient-to-r from-[#ff8a50]/08 via-[#ff7830]/06 to-transparent blur-[180px] will-change-transform" />

        {/* Lower Left Subtle Spray (Tools / About area) */}
        <div className="absolute bottom-[25vh] -left-28 w-[580px] h-[580px] rounded-full bg-gradient-to-tr from-[#ff8a50]/10 to-transparent blur-[160px] will-change-transform" />

        {/* Bottom Right Warm Glow (Contact area) */}
        <div className="absolute -bottom-28 -right-24 w-[640px] h-[640px] rounded-full bg-gradient-to-tl from-[#ff8a50]/14 via-[#ff7020]/05 to-transparent blur-[170px] will-change-transform" />
      </div>

      {/* Front Page: minimal top-right typewriter */}
      <LeftSignatureBar />

      {/* Floating Header: Hidden on front page, reveals gracefully on scroll down */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mousePos={mousePos}
      />

      {/* Cinematic First Page Hero with Camera Zoom-In on Scroll Down */}
      <section id="hero" className="relative h-screen w-full overflow-hidden">
        <BackgroundScene mousePos={mousePos} />
        <Hero
          onExploreWork={() => scrollToSection('projects')}
          onAboutClick={() => scrollToSection('about')}
        />
      </section>

      {/* Movie-Like Horizontal Swipe-Left Project Flow + Continuous Narrative Sections */}
      <main className="relative z-20">
        <Projects />
        <Tools />
        <About />
        <Contact />
      </main>
    </div>
  );
}

export default App;
