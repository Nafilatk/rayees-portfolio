import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Play, Film, Focus } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playHoverSound, playShutterSound } from '../utils/audio';

export default function Hero({ onOpenShowreel }) {
  const containerRef = useRef(null);
  const bgImageRef = useRef(null);
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

      // 2. Camera metadata viewfinder HUD reveal (if present)
      if (metaOverlayRef.current) {
        tl.fromTo(
          metaOverlayRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 1.2 },
          0.2
        );
      }

      // 3. Cinematic portrait emergence rising up from the bottom of the page
      if (portraitRef.current) {
        tl.fromTo(
          portraitRef.current,
          {
            opacity: 0,
            y: 280,
            scale: 0.9,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.8,
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
      className="relative min-h-[85vh] sm:min-h-[92vh] w-full flex flex-col justify-end items-center overflow-hidden bg-black mt-16 sm:mt-20 md:mt-24 pt-16 sm:pt-20 pb-0 px-4 sm:px-6 md:px-12 select-none"
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
          LAYER 3: FOREGROUND HERO PORTRAIT ANCHORED TO BOTTOM (z-20)
          ============================================================ */}
      <div className="relative z-20 max-w-5xl mx-auto w-full flex flex-col items-center justify-end text-center mt-auto pointer-events-none">
        {/* Foreground Portrait Anchored to Baseline */}
        <div
          ref={portraitRef}
          className="relative group perspective-1000 flex items-end justify-center pointer-events-auto select-none"
        >
          {/* Ambient Caribbean Green + Soft Warm Radial Backlight */}
          <div className="absolute inset-0 -inset-x-8 bg-gradient-to-t from-caribbean/20 via-caribbean/5 to-transparent rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-110" />

          {/* Animated Circular Silhouette Text Ring */}
          <div
            className="absolute top-[38%] sm:top-[40%] md:top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[510px] md:h-[510px] lg:w-[590px] lg:h-[590px] xl:w-[640px] xl:h-[640px] pointer-events-none z-10 flex items-center justify-center"
            aria-label="VIDEO EDITOR ✳ VIDEOGRAPHER ✳ VISUAL STORYTELLER ✳ FRAME BY FRAME"
          >
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full animate-spin-slow select-none overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="heroCircleTextPath"
                  d="M 250, 250 m -216, 0 a 216,216 0 1,1 432,0 a 216,216 0 1,1 -432,0"
                />
              </defs>

              {/* Thin subtle concentric calibration rings */}
              <circle
                cx="250"
                cy="250"
                r="234"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="0.75"
                strokeDasharray="4 8"
              />
              <circle
                cx="250"
                cy="250"
                r="216"
                fill="none"
                stroke="rgba(172, 238, 1, 0.12)"
                strokeWidth="0.5"
              />
              <circle
                cx="250"
                cy="250"
                r="198"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />

              {/* Precision Cardinal Marks (North, East, South, West) */}
              <circle cx="250" cy="16" r="1.5" fill="#acee01" opacity="0.8" />
              <circle cx="484" cy="250" r="1.5" fill="#acee01" opacity="0.8" />
              <circle cx="250" cy="484" r="1.5" fill="#acee01" opacity="0.8" />
              <circle cx="16" cy="250" r="1.5" fill="#acee01" opacity="0.8" />

              {/* Continuous Circular Typography Loop */}
              <text
                className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-[0.22em] font-medium"
              >
                <textPath
                  href="#heroCircleTextPath"
                  startOffset="0%"
                  textLength="1355"
                  lengthAdjust="spacing"
                >
                  <tspan fill="#ffffff" fillOpacity="0.85">VIDEO EDITOR </tspan>
                  <tspan fill="#acee01" fontWeight="bold">✳ </tspan>
                  <tspan fill="#ffffff" fillOpacity="0.85">VIDEOGRAPHER </tspan>
                  <tspan fill="#acee01" fontWeight="bold">✳ </tspan>
                  <tspan fill="#ffffff" fillOpacity="0.95">VISUAL STORYTELLER </tspan>
                  <tspan fill="#acee01" fontWeight="bold">✳ </tspan>
                  <tspan fill="#acee01" fontWeight="bold">FRAME BY FRAME </tspan>
                  <tspan fill="#acee01" fontWeight="bold">✳ </tspan>
                  <tspan fill="#ffffff" fillOpacity="0.85">VIDEO EDITOR </tspan>
                  <tspan fill="#acee01" fontWeight="bold">✳ </tspan>
                  <tspan fill="#ffffff" fillOpacity="0.85">VIDEOGRAPHER </tspan>
                  <tspan fill="#acee01" fontWeight="bold">✳ </tspan>
                  <tspan fill="#ffffff" fillOpacity="0.95">VISUAL STORYTELLER </tspan>
                  <tspan fill="#acee01" fontWeight="bold">✳ </tspan>
                  <tspan fill="#acee01" fontWeight="bold">FRAME BY FRAME </tspan>
                  <tspan fill="#acee01" fontWeight="bold">✳ </tspan>
                </textPath>
              </text>
            </svg>
          </div>

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
              className="w-72 sm:w-88 md:w-[440px] lg:w-[500px] xl:w-[540px] h-auto max-h-[78vh] object-contain object-bottom block drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_0_20px_rgba(0,255,163,0.18)] will-change-transform transform transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Left Flank Name: MUHAMMED (in empty black space on the left) */}
          <div
            className="hero-flank-name hidden sm:flex absolute right-[calc(100%+1.5rem)] md:right-[calc(100%+2.5rem)] lg:right-[calc(100%+4rem)] bottom-[24%] md:bottom-[28%] items-center space-x-2.5 z-20 pointer-events-none select-none whitespace-nowrap"
            aria-label="First Name: MUHAMMED"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-caribbean shadow-[0_0_8px_#acee01] flex-shrink-0 animate-pulse" />
            <span className="font-mono text-xs md:text-sm lg:text-[15px] font-bold text-white tracking-[0.3em] uppercase">
              MUHAMMED
            </span>
          </div>

          {/* Right Flank Name: RAYEES (in empty black space on the right) */}
          <div
            className="hero-flank-name hidden sm:flex absolute left-[calc(100%+1.5rem)] md:left-[calc(100%+2.5rem)] lg:left-[calc(100%+4rem)] bottom-[24%] md:bottom-[28%] items-center space-x-2.5 z-20 pointer-events-none select-none whitespace-nowrap"
            aria-label="Last Name: RAYEES"
          >
            <span className="font-mono text-xs md:text-sm lg:text-[15px] font-bold text-white tracking-[0.3em] uppercase">
              RAYEES
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-caribbean shadow-[0_0_8px_#acee01] flex-shrink-0 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
