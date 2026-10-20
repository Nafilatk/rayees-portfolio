import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Play, Film, Focus } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playHoverSound, playShutterSound } from '../utils/audio';

const HERO_MARQUEE_ROWS = [
  {
    text: 'VIDEO EDITOR',
    directionClass: 'animate-hero-marquee-1',
    textStyle: 'text-white/40 font-extrabold tracking-[0.18em]',
    starColor: 'text-caribbean',
    repeatCount: 8,
  },
  {
    text: 'VIDEOGRAPHER',
    directionClass: 'animate-hero-marquee-2',
    textStyle: 'text-zinc-400/35 font-bold tracking-[0.22em]',
    starColor: 'text-caribbean',
    repeatCount: 8,
  },
  {
    text: 'VISUAL STORYTELLER',
    directionClass: 'animate-hero-marquee-3',
    textStyle: 'text-white/40 font-extrabold tracking-[0.18em]',
    starColor: 'text-caribbean',
    repeatCount: 8,
  },
  {
    text: 'SHOTSBYRYS',
    directionClass: 'animate-hero-marquee-4',
    textStyle: 'text-caribbean/70 font-black tracking-[0.25em]',
    starColor: 'text-white/40',
    repeatCount: 8,
  },
];

export default function Hero({ onOpenShowreel }) {
  const containerRef = useRef(null);
  const bgImageRef = useRef(null);
  const marqueeRef = useRef(null);
  const metaOverlayRef = useRef(null);
  const portraitRef = useRef(null);
  const imageRef = useRef(null);
  const subtitleRef = useRef(null);
  const introRef = useRef(null);
  const ctaGroupRef = useRef(null);

  const heroImageSrc = PERSONAL_INFO.heroImage || '/images/hero_cutout.png';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.4 } });

      // 1. Cinematic Background reveal & scale
      tl.fromTo(
        bgImageRef.current,
        { scale: 1.15, filter: 'blur(10px) brightness(0.15)' },
        { scale: 1, filter: 'blur(0px) brightness(0.3)', duration: 2.2, ease: 'power2.out' },
        0
      );

      // 2. Horizontal Marquee reveal
      if (marqueeRef.current) {
        tl.fromTo(
          marqueeRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 0.9, scale: 1, duration: 1.5, ease: 'power2.out' },
          0.15
        );
      }

      // 3. Camera metadata viewfinder HUD reveal (if present)
      if (metaOverlayRef.current) {
        tl.fromTo(
          metaOverlayRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 1.2 },
          0.2
        );
      }

      // 4. Cinematic portrait emergence rising up from the bottom of the page
      if (portraitRef.current) {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
        tl.fromTo(
          portraitRef.current,
          {
            opacity: 0,
            y: isMobile ? 80 : 280,
            scale: 0.9,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: isMobile ? 1.3 : 1.8,
            ease: 'power4.out',
          },
          0.1
        );
      }

      // 4. Subtle continuous cinema floating / breathing motion once settled
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -10,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.9,
        });
      }

      // 5. Flank names fade in smoothly in the negative black space
      tl.fromTo(
        '.hero-flank-name',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12 },
        0.8
      );

      // 6. Supporting intro line appears (if present)
      if (introRef.current) {
        tl.fromTo(
          introRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1 },
          0.9
        );
      }

      // 7. CTA appears (if present)
      if (ctaGroupRef.current) {
        tl.fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          1.0
        );
      }

      // 8. Subtle Mouse Parallax on Background & Portrait
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5);
        const yPos = (clientY / window.innerHeight - 0.5);

        // Background subtle drift
        gsap.to(bgImageRef.current, {
          x: xPos * 20,
          y: yPos * 15,
          duration: 1.8,
          ease: 'power1.out'
        });

        // Portrait multi-plane optical depth
        if (portraitRef.current) {
          gsap.to(portraitRef.current, {
            x: xPos * 12,
            y: yPos * 10,
            rotationY: xPos * 4,
            rotationX: -yPos * 4,
            duration: 1.5,
            ease: 'power2.out'
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-0 sm:min-h-[88vh] md:min-h-[92vh] w-full flex flex-col justify-start sm:justify-end items-center overflow-hidden bg-black mt-0 sm:mt-16 md:mt-20 pt-16 sm:pt-20 pb-8 sm:pb-0 px-4 sm:px-6 md:px-12 select-none"
    >
      {/* ============================================================
          LAYER 1: BACKGROUND (z-0)
          ============================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-black">
        <img
          ref={bgImageRef}
          src="/images/hero_cinematic.jpg"
          alt="Cinematic Background Atmosphere"
          className="w-full h-full object-cover object-center will-change-transform opacity-20 select-none scale-105"
        />
        {/* Pure Black Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        <div className="absolute inset-0 film-grain" />
      </div>

      {/* ============================================================
          LAYER 2: 4-ROW HORIZONTAL AUTO-MOVING TEXT MARQUEE (z-10)
          ============================================================ */}
      <div
        ref={marqueeRef}
        className="absolute inset-x-0 top-[28%] sm:top-[34%] md:top-[38%] -translate-y-1/2 z-10 pointer-events-none flex flex-col justify-center space-y-1.5 sm:space-y-2 md:space-y-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] select-none opacity-90"
        aria-hidden="true"
      >
        {HERO_MARQUEE_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex overflow-hidden py-0.5">
            <div className={`${row.directionClass} flex shrink-0 items-center`}>
              {Array.from({ length: row.repeatCount }).map((_, i) => (
                <span
                  key={`copy1-${rowIdx}-${i}`}
                  className={`inline-flex items-center text-lg sm:text-2xl md:text-4xl lg:text-5xl ${row.textStyle} whitespace-nowrap`}
                >
                  <span>{row.text}</span>
                  <span className={`${row.starColor} mx-3 sm:mx-6 md:mx-8 text-xs sm:text-lg md:text-xl font-bold`}>
                    ✳
                  </span>
                </span>
              ))}
              {Array.from({ length: row.repeatCount }).map((_, i) => (
                <span
                  key={`copy2-${rowIdx}-${i}`}
                  className={`inline-flex items-center text-lg sm:text-2xl md:text-4xl lg:text-5xl ${row.textStyle} whitespace-nowrap`}
                  aria-hidden="true"
                >
                  <span>{row.text}</span>
                  <span className={`${row.starColor} mx-3 sm:mx-6 md:mx-8 text-xs sm:text-lg md:text-xl font-bold`}>
                    ✳
                  </span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ============================================================
          LAYER 3: FOREGROUND HERO PORTRAIT (z-20)
          ============================================================ */}
      <div className="relative z-20 max-w-5xl mx-auto w-full flex flex-col items-center justify-start sm:justify-end text-center mt-0 sm:mt-auto pointer-events-none">
        {/* Foreground Portrait Anchored to Baseline */}
        <div
          ref={portraitRef}
          className="relative group perspective-1000 flex items-end justify-center pointer-events-auto select-none"
        >
          {/* Ambient Caribbean Green + Soft Warm Radial Backlight */}
          <div className="absolute inset-0 -inset-x-8 bg-gradient-to-t from-caribbean/20 via-caribbean/5 to-transparent rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-110" />

          {/* Transparent Cutout Image - Resting Flush on the Bottom Edge */}
          <div className="relative z-20 overflow-visible flex items-end justify-center">
            <img
              ref={imageRef}
              src={heroImageSrc}
              alt={`${PERSONAL_INFO.name} - Hero Portrait`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/hero_no_bg.png';
              }}
              className="w-72 sm:w-88 md:w-[440px] lg:w-[500px] xl:w-[540px] h-auto max-h-[68vh] sm:max-h-[78vh] object-contain object-bottom block drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_0_20px_rgba(0,255,163,0.18)] will-change-transform transform transition-transform duration-700 group-hover:scale-105"
            />
          </div>


        </div>
      </div>
    </section>
  );
}
