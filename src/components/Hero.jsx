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
  const marqueeContainerRef = useRef(null);
  const marqueeTrack1Ref = useRef(null);
  const marqueeTrack2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const introRef = useRef(null);
  const ctaGroupRef = useRef(null);

  const heroImageSrc = PERSONAL_INFO.heroImage || '/images/hero_cutout.png';
  const marqueePhrase = "MUHAMMED RAYEES · VIDEO EDITOR & PHOTOGRAPHER · ";
  // 4 repetitions gives abundant seamless width across all screen sizes
  const marqueeTextHalf = marqueePhrase.repeat(4);

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

      // 3. Marquee enters subtly behind portrait
      if (marqueeContainerRef.current) {
        tl.fromTo(
          marqueeContainerRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
          0.4
        );
      }

      // 4. Portrait fades/slides into position
      if (portraitRef.current) {
        tl.fromTo(
          portraitRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'power3.out' },
          0.6
        );
      }

      // 5. Role text appears (if present)
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, letterSpacing: '0.35em', y: 15 },
          { opacity: 1, letterSpacing: '0.22em', y: 0, duration: 1.1 },
          0.8
        );
      }

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

      // 8. Continuous Infinite Marquee Animations (via GSAP)
      if (!prefersReducedMotion) {
        // Track 1: Moving Right to Left (seamless -50% loop)
        if (marqueeTrack1Ref.current) {
          gsap.fromTo(
            marqueeTrack1Ref.current,
            { xPercent: 0 },
            {
              xPercent: -50,
              ease: 'none',
              duration: 38,
              repeat: -1
            }
          );
        }

        // Track 2: Moving Left to Right (seamless -50% to 0% loop)
        if (marqueeTrack2Ref.current) {
          gsap.fromTo(
            marqueeTrack2Ref.current,
            { xPercent: -50 },
            {
              xPercent: 0,
              ease: 'none',
              duration: 44,
              repeat: -1
            }
          );
        }
      }

      // 9. Subtle Mouse Parallax on Background & Portrait
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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-28 pb-16 px-6 md:px-12 select-none"
    >
      {/* ============================================================
          LAYER 1: BACKGROUND (z-0)
          ============================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          ref={bgImageRef}
          src="/images/hero_cinematic.jpg"
          alt="Cinematic Background Atmosphere"
          className="w-full h-full object-cover object-center will-change-transform opacity-25 select-none scale-105"
        />
        {/* Gradients and subtle film vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        <div className="absolute inset-0 film-grain" />
      </div>

      {/* ============================================================
          LAYER 2: INFINITE HORIZONTAL MARQUEE BEHIND PORTRAIT (z-10)
          ============================================================ */}
      <div
        ref={marqueeContainerRef}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-10 overflow-hidden flex flex-col justify-center space-y-4 md:space-y-8 lg:space-y-10 opacity-0"
      >
        {/* Soft Cinema Vignette Fades on left and right for seamless edge feathering */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-36 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-36 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />
        {/* Track 1: Solid Upper Stream (Scrolls Left) */}
        <div className="w-full overflow-hidden flex">
          <div
            ref={marqueeTrack1Ref}
            className="flex flex-shrink-0 w-max whitespace-nowrap will-change-transform font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight uppercase leading-none text-white/[0.14]"
          >
            <span className="inline-block flex-shrink-0">{marqueeTextHalf}</span>
            <span className="inline-block flex-shrink-0">{marqueeTextHalf}</span>
          </div>
        </div>

        {/* Track 2: Stylized Lower Stream (Scrolls Right in Opposite Direction - No Refresh Hitch) */}
        <div className="w-full overflow-hidden flex">
          <div
            ref={marqueeTrack2Ref}
            style={{ transform: 'translateX(-50%)' }}
            className="flex flex-shrink-0 w-max whitespace-nowrap will-change-transform font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight uppercase leading-none text-stroke-cinema opacity-25"
          >
            <span className="inline-block flex-shrink-0">{marqueeTextHalf}</span>
            <span className="inline-block flex-shrink-0">{marqueeTextHalf}</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          LAYER 3: CENTER FOREGROUND HERO PORTRAIT (WITHOUT BG) (z-20)
          ============================================================ */}
      <div className="relative z-20 max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center my-auto pointer-events-none">
        {/* Center Foreground Portrait with Dynamic Depth */}
        <div
          ref={portraitRef}
          className="relative group perspective-1000 flex items-center justify-center pointer-events-auto select-none"
        >
          {/* Ambient Caribbean Green + Soft Warm Radial Backlight */}
          <div className="absolute inset-0 -inset-x-8 bg-gradient-to-t from-caribbean/20 via-caribbean/5 to-transparent rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-110" />

          {/* Transparent Cutout Image - No Background */}
          <div className="relative overflow-visible [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]">
            <img
              src={heroImageSrc}
              alt={`${PERSONAL_INFO.name} - Hero Portrait`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/hero_no_bg.png';
              }}
              className="w-64 sm:w-80 md:w-96 lg:w-[420px] xl:w-[460px] h-auto max-h-[62vh] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_0_20px_rgba(0,255,163,0.18)] will-change-transform transform transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
