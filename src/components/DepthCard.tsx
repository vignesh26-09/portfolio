import React, { useRef, useState, useCallback, useEffect } from 'react';

export interface DepthCardLayer {
  image: string;
  depth: number;
}

export interface DepthCardProps {
  image?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  width?: number | string;
  height?: number | string;
  maxRotation?: number;
  maxTranslation?: number;
  borderRadius?: string;
  className?: string;
  contentClassName?: string;
  onClick?: () => void;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  imageAlt?: string;
  disableOnMobile?: boolean;
  ariaLabel?: string;
  layers?: DepthCardLayer[];
  staggerDelay?: number;
  revealAnimation?: 'slide' | 'fade' | 'scale' | 'none';
  respectReducedMotion?: boolean;
  spotlight?: boolean;
  spotlightColor?: string;
  children?: React.ReactNode;
}

export const DepthCard: React.FC<DepthCardProps> = ({
  image,
  title = '',
  subtitle,
  description,
  width = '100%',
  height = 460,
  maxRotation = 18,
  maxTranslation = 20,
  borderRadius = '20px',
  className = '',
  contentClassName = '',
  onClick,
  href,
  target = '_blank',
  imageAlt,
  disableOnMobile = false,
  ariaLabel,
  layers,
  staggerDelay = 80,
  revealAnimation = 'slide',
  respectReducedMotion = true,
  spotlight = true,
  spotlightColor = 'rgba(255, 255, 255, 0.35)',
  children
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [transX, setTransX] = useState(0);
  const [transY, setTransY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window));
    };
    const checkReducedMotion = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isDisabled = (disableOnMobile && isMobile) || (respectReducedMotion && prefersReducedMotion);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized from -1 to 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setRotX(-normY * maxRotation);
    setRotY(normX * maxRotation);
    setTransX(-normX * maxTranslation);
    setTransY(-normY * maxTranslation);
    setSpotlightPos({ x, y });
  }, [isDisabled, maxRotation, maxTranslation]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
    setTransX(0);
    setTransY(0);
  }, []);

  const cardStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius,
    perspective: 1200,
  };

  const innerStyle: React.CSSProperties = {
    transform: isDisabled
      ? 'none'
      : `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${isHovered ? 1.025 : 1}, ${isHovered ? 1.025 : 1}, 1)`,
    transition: isHovered
      ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
      : 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
    transformStyle: 'preserve-3d',
    borderRadius,
  };

  const getRevealClass = (_elemIndex?: number) => {
    if (revealAnimation === 'none') return '';
    const baseTransition = 'transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)';

    switch (revealAnimation) {
      case 'fade':
        return `${baseTransition} ${isHovered ? 'opacity-100' : 'opacity-85'}`;
      case 'scale':
        return `${baseTransition} ${isHovered ? 'scale-100 opacity-100' : 'scale-95 opacity-85'}`;
      case 'slide':
      default:
        return `${baseTransition} ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-90'}`;
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a, button')) {
      return;
    }
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, target);
    }
  };

  return (
    <div
      ref={cardRef}
      role={href ? 'link' : onClick ? 'button' : 'article'}
      aria-label={ariaLabel || title}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className={`relative select-none isolate cursor-pointer group ${className}`}
    >
      <div
        style={innerStyle}
        className="w-full h-full relative overflow-hidden bg-[#060b16]/80 backdrop-blur-2xl border border-white/14 rounded-[inherit] shadow-[0_15px_45px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.25)] group-hover:border-white/25"
      >
        {/* Layer 0: Background Graphic / Image */}
        {image && (!layers || layers.length === 0) && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out will-change-transform"
            style={{
              backgroundImage: `url(${image})`,
              transform: isDisabled
                ? 'none'
                : `translate3d(${transX * 0.45}px, ${transY * 0.45}px, 0px) scale(${isHovered ? 1.08 : 1.02})`,
            }}
            role={imageAlt ? 'img' : undefined}
            aria-label={imageAlt}
          />
        )}

        {/* Multi-depth parallax layers */}
        {layers && layers.length > 0 && layers.map((layer, idx) => (
          <div
            key={idx}
            className="absolute inset-0 bg-cover bg-center pointer-events-none will-change-transform"
            style={{
              backgroundImage: `url(${layer.image})`,
              transform: isDisabled
                ? 'none'
                : `translate3d(${transX * layer.depth}px, ${transY * layer.depth}px, ${layer.depth * 35}px) scale(${1 + layer.depth * 0.1})`,
              zIndex: Math.round(layer.depth * 10),
            }}
          />
        ))}

        {/* Dark contrast gradient */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#04080f]/95 via-[#04080f]/60 to-transparent transition-opacity duration-300"
          style={{ zIndex: 12 }}
        />

        {/* Dynamic Spotlight Glare Overlay */}
        {spotlight && !isDisabled && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.95 : 0,
              background: `radial-gradient(circle 320px at ${spotlightPos.x}px ${spotlightPos.y}px, ${spotlightColor}, transparent 75%)`,
              mixBlendMode: 'screen',
              zIndex: 20,
            }}
          />
        )}

        {/* Glass specular rim sheen */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] border border-white/10 group-hover:border-white/20 transition-colors duration-300"
          style={{ zIndex: 22 }}
        />

        {/* Floating Content Layer with 3D Pop */}
        <div
          style={{
            transform: isDisabled
              ? 'none'
              : `translate3d(${transX * 0.75}px, ${transY * 0.75}px, 35px)`,
            zIndex: 30,
          }}
          className={`relative h-full flex flex-col justify-end p-6 text-white ${contentClassName}`}
        >
          {subtitle && (
            <div
              className={`text-[11px] font-mono tracking-widest uppercase text-[#ff8a50] mb-1 font-semibold flex items-center gap-2 ${getRevealClass(0)}`}
              style={{ transitionDelay: `${0 * staggerDelay}ms` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8a50] shadow-[0_0_8px_#ff8a50]" />
              <span>{subtitle}</span>
            </div>
          )}

          {title && (
            <h3
              className={`font-['Chakra_Petch'] text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 drop-shadow-lg ${getRevealClass(1)}`}
              style={{ transitionDelay: `${1 * staggerDelay}ms` }}
            >
              {title}
            </h3>
          )}

          {description && (
            <p
              className={`font-['Chakra_Petch'] text-xs sm:text-sm text-slate-300/90 leading-relaxed font-normal mb-4 line-clamp-3 drop-shadow ${getRevealClass(2)}`}
              style={{ transitionDelay: `${2 * staggerDelay}ms` }}
            >
              {description}
            </p>
          )}

          {children && (
            <div
              className={`mt-1 ${getRevealClass(3)}`}
              style={{ transitionDelay: `${3 * staggerDelay}ms` }}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepthCard;
