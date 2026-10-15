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

  const heroImageSrc = PERSONAL_INFO.heroImage || '/images/hero_portrait.jpg';
  const marqueePhrase = "NIKKAH · BRIDE TO BE · GROOM TO BE · AUTOMOTIVE · TRAVELING · FOOD · PRESENTATION · ENGAGEMENT · BIRTHDAY · ";
  // 3 repetitions gives abundant width across all screens
  const marqueeTextHalf = marqueePhrase.repeat(3);

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

      // 2. Camera metadata viewfinder HUD reveal
      tl.fromTo(
        metaOverlayRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.2
      );

      // 3. Marquee enters subtly behind portrait
      tl.fromTo(
        marqueeContainerRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
        0.4
      );

      // 4. Portrait fades/slides into position
      tl.fromTo(
        portraitRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'power3.out' },
        0.6
      );

      // 5. Role text appears
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, letterSpacing: '0.35em', y: 15 },
        { opacity: 1, letterSpacing: '0.22em', y: 0, duration: 1.1 },
        0.8
      );

      // 6. Supporting intro line appears
      if (introRef.current) {
        tl.fromTo(
          introRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1 },
          0.9
        );
      }

      // 7. CTA appears
      tl.fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        1.0
      );

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
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-10 overflow-hidden flex flex-col justify-center space-y-4 md:space-y-10 opacity-0"
      >
        {/* Track 1: Solid Upper Stream (Scrolls Left) */}
        <div className="w-full overflow-hidden flex">
          <div
            ref={marqueeTrack1Ref}
            className="flex whitespace-nowrap will-change-transform font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight uppercase leading-none text-white/[0.14]"
          >
            <span className="inline-block px-2">{marqueeTextHalf}</span>
            <span className="inline-block px-2">{marqueeTextHalf}</span>
          </div>
        </div>

        {/* Track 2: Stylized Lower Stream (Scrolls Right with Caribbean green outline) */}
        <div className="w-full overflow-hidden flex">
          <div
            ref={marqueeTrack2Ref}
            className="flex whitespace-nowrap will-change-transform font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight uppercase leading-none text-stroke-cinema opacity-25"
          >
            <span className="inline-block px-2">{marqueeTextHalf}</span>
            <span className="inline-block px-2">{marqueeTextHalf}</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          LAYER 3 & 4: CENTER FOREGROUND PORTRAIT + ROLE + CTA (z-20 / z-30)
          ============================================================ */}
      <div className="relative z-20 max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center my-auto">
        
        {/* Center Foreground Portrait with Cinematic Framing */}
        <div
          ref={portraitRef}
          className="relative group perspective-1000 mb-6 md:mb-8"
        >
          {/* Ambient Caribbean Green Glow Rim behind portrait */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-caribbean/25 via-transparent to-beige/20 rounded-sm blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Portrait Container: Solid background completely occludes marquee */}
          <div className="relative w-48 sm:w-56 md:w-64 lg:w-72 aspect-[3/4] bg-black border border-white/20 rounded-sm overflow-hidden shadow-2xl shadow-black ring-1 ring-white/10 group-hover:border-caribbean/70 transition-all duration-500">
            
            {/* The Personal Portrait Image */}
            <img
              src={heroImageSrc}
              alt={`${PERSONAL_INFO.name} - Portrait`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/behind_the_frame.jpg';
              }}
              className="w-full h-full object-cover object-top will-change-transform transform transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-110 brightness-95"
            />

            {/* Subtle Vignette & Letterbox Shadow inside portrait */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

            {/* In-Frame Corner Viewfinder Ticks */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/50 pointer-events-none" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/50 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/50 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/50 pointer-events-none" />

            {/* In-Frame Header Badge */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between font-mono text-[8px] text-zinc-300 tracking-widest uppercase pointer-events-none">
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-caribbean animate-pulse" />
                <span className="text-caribbean font-semibold">REC ● LIVE</span>
              </span>
              <span className="text-beige font-medium">RAEES · EYE</span>
            </div>

            {/* In-Frame Bottom Caption */}
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between font-mono text-[9px] text-zinc-300 tracking-widest uppercase pointer-events-none">
              <span className="text-caribbean font-semibold">4K CINEMA MASTER</span>
              <span className="text-beige">DIR / DP</span>
            </div>
          </div>
        </div>

        {/* Role Text (Below Portrait) */}
        <div
          ref={subtitleRef}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/80 border border-white/[0.15] backdrop-blur-md text-[11px] md:text-xs font-mono text-white tracking-[0.22em] uppercase mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-caribbean animate-ping" />
          <span>{PERSONAL_INFO.role}</span>
        </div>

        {/* Short Supporting Line in Beige */}
        <p
          ref={introRef}
          className="text-xs sm:text-sm text-beige font-light max-w-xl mx-auto tracking-wide leading-relaxed mb-6 px-4"
        >
          Bridal & Groom Moments · Sacred Nikkah & Engagements · Automotive Cinema · Travel · Culinary Food · Keynote Presentations
        </p>

        {/* Action CTAs */}
        <div
          ref={ctaGroupRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md px-4"
        >
          {/* Primary View Work CTA in Caribbean Green */}
          <a
            href="#work"
            onClick={playShutterSound}
            onMouseEnter={playHoverSound}
            className="w-full sm:w-auto px-7 py-3.5 bg-caribbean hover:bg-white text-black font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-caribbean/20 flex items-center justify-center space-x-2.5 group rounded-sm"
            data-cursor="EXPLORE"
          >
            <span>EXPLORE WORKS</span>
            <ArrowDown className="w-3.5 h-3.5 transform group-hover:translate-y-1 transition-transform" />
          </a>

          {/* Showreel Button */}
          <a
            href="#showreel"
            onClick={playShutterSound}
            onMouseEnter={playHoverSound}
            className="w-full sm:w-auto px-6 py-3.5 rounded-sm border border-white/20 hover:border-caribbean text-zinc-100 hover:text-caribbean font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center space-x-2.5 glass-panel group"
            data-cursor="PLAY"
          >
            <Play className="w-3.5 h-3.5 fill-current transform group-hover:scale-110 transition-transform text-caribbean" />
            <span>WATCH REEL ({PERSONAL_INFO.reelDuration})</span>
          </a>
        </div>
      </div>

      {/* ============================================================
          LAYER 5: HUD OVERLAYS & CORNER VIEWFINDER DETAILS (z-40)
          ============================================================ */}
      <div
        ref={metaOverlayRef}
        className="absolute inset-x-6 md:inset-x-12 top-24 md:top-28 flex justify-between items-center pointer-events-none border-t border-b border-white/[0.08] py-2 font-mono text-[10px] md:text-xs text-zinc-400 tracking-widest uppercase z-40"
      >
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-caribbean font-semibold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-caribbean inline-block shadow-[0_0_8px_#acee01]"></span>
            <span>LIVE ARCHIVE ●</span>
          </span>
          <span className="hidden sm:inline text-beige">00:01:24:18</span>
          <span className="hidden md:inline text-zinc-600">|</span>
          <span className="hidden md:inline text-zinc-300">2.39:1 CINEMASCOPE</span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-zinc-300">4K DCI · 24.00 FPS</span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="hidden sm:inline text-beige">ISO 800 · 180° SHUTTER</span>
          <span className="hidden lg:inline text-caribbean font-semibold">[ACEScc GAMUT]</span>
        </div>
      </div>

      {/* Viewfinder Crosshairs in 4 corners */}
      <div className="absolute inset-8 md:inset-16 pointer-events-none z-40 hidden sm:block">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20" />
      </div>
    </section>
  );
}
