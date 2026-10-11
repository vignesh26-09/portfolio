import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface BackgroundSceneProps {
  mousePos: { x: number; y: number };
}

export const BackgroundScene: React.FC<BackgroundSceneProps> = ({ mousePos }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Cinematic Zoom-In on Scroll Down (as requested by user)
  // Scale zooms from 1.0 up to 1.52, creating a camera fly-in into the sunset citadel
  const sceneScale = useTransform(scrollY, [0, 750], [1.0, 1.52]);
  const sceneOpacity = useTransform(scrollY, [0, 650], [1, 0.08]);
  const slideY = useTransform(scrollY, [0, 750], [0, -60]);

  // Particle drift & atmospheric lanterns
  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: -Math.random() * 0.45 - 0.15,
      speedY: Math.random() * 0.35 + 0.15,
      alpha: Math.random() * 0.45 + 0.15,
      flickerSpeed: Math.random() * 0.015 + 0.005,
      isPetal: Math.random() > 0.5,
      color: Math.random() > 0.5 ? '#f472b6' : Math.random() > 0.5 ? '#fda4af' : '#fb923c',
    }));

    const lights = Array.from({ length: 8 }, () => ({
      x: width * 0.65 + Math.random() * (width * 0.3),
      y: height * 0.32 + Math.random() * (height * 0.3),
      radius: Math.random() * 7 + 3,
      intensity: Math.random(),
      speed: Math.random() * 0.02 + 0.008,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      lights.forEach((light) => {
        light.intensity += light.speed;
        const glow = Math.sin(light.intensity) * 0.25 + 0.35;
        const gradient = ctx.createRadialGradient(
          light.x,
          light.y,
          0,
          light.x,
          light.y,
          light.radius
        );
        gradient.addColorStop(0, `rgba(255, 185, 130, ${glow * 0.35})`);
        gradient.addColorStop(1, 'rgba(255, 185, 130, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += Math.sin(Date.now() * p.flickerSpeed) * 0.01;

        if (p.y > height + 10) p.y = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.65, p.alpha));
        ctx.beginPath();
        if (p.isPetal) {
          ctx.ellipse(p.x, p.y, p.size * 1.3, p.size * 0.7, Math.PI / 4, 0, Math.PI * 2);
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  const parallaxX = shouldReduceMotion ? 0 : mousePos.x * 8;
  const parallaxY = shouldReduceMotion ? 0 : mousePos.y * 5;

  return (
    <motion.div
      style={{ opacity: sceneOpacity }}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
    >
      {/* Cinematic pixel-art background with dramatic scroll zoom-in */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat will-change-transform origin-center"
        style={{
          backgroundImage: `url('/developer-studio-hero.png')`,
          x: parallaxX,
          y: slideY,
          scale: sceneScale,
        }}
      />

      {/* Atmospheric Fog / Warm Sunset Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-950/20 via-transparent to-orange-950/20 opacity-35 mix-blend-screen"
        style={{
          scale: sceneScale,
          transform: `translate3d(${parallaxX * 1.2}px, ${parallaxY * 0.5}px, 0)`,
        }}
      />

      {/* Dark lower-left readability gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, rgba(4,8,15,0.85) 0%, rgba(4,8,15,0.52) 38%, rgba(4,8,15,0.06) 68%, transparent 100%)`,
        }}
      />

      {/* Bottom transition gradient into dark foundation */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, #04080f 0%, rgba(4,8,15,0.88) 18%, rgba(4,8,15,0.2) 42%, transparent 75%)`,
        }}
      />

      {/* Subtle particles canvas */}
      {!shouldReduceMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-10"
        />
      )}
    </motion.div>
  );
};
