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
