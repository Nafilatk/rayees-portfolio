
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PERSONAL_INFO } from '../data/portfolioData';

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
  const portraitRef = useRef(null);
  const imageRef = useRef(null);

  const heroImageSrc =
    PERSONAL_INFO.heroImage || '/images/hero_cutout.png';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 639px)').matches;

      const tl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 1.4 },
      });

      // Cinematic background reveal
      tl.fromTo(
        bgImageRef.current,
        {
          scale: 1.15,
          filter: 'blur(10px) brightness(0.15)',
        },
        {
          scale: 1,
          filter: 'blur(0px) brightness(0.3)',
          duration: 2.2,
          ease: 'power2.out',
        },
        0
      );

      // Animated marquee reveal
      if (marqueeRef.current) {
        tl.fromTo(
          marqueeRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 0.9,
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
          },
          0.15
        );
      }

      // Portrait entrance
      if (portraitRef.current) {
        tl.fromTo(
          portraitRef.current,
          {
            opacity: 0,
            y: isMobile ? 50 : 280,
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

      // Subtle continuous portrait floating
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

      // Name reveal
      tl.fromTo(
        '.hero-flank-name',
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12,
        },
        0.8
      );

      // Desktop mouse parallax only
      const handleMouseMove = (e) => {
        if (window.innerWidth < 640) return;

        const xPos = e.clientX / window.innerWidth - 0.5;
        const yPos = e.clientY / window.innerHeight - 0.5;

        gsap.to(bgImageRef.current, {
          x: xPos * 20,
          y: yPos * 15,
          duration: 1.8,
          ease: 'power1.out',
          overwrite: 'auto',
        });

        if (portraitRef.current) {
          gsap.to(portraitRef.current, {
            x: xPos * 12,
            y: yPos * 10,
            rotationY: xPos * 4,
            rotationX: -yPos * 4,
            duration: 1.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="
        relative w-full overflow-hidden bg-black select-none
        flex flex-col items-center justify-center
        min-h-[100svh] h-[100svh]
        px-0 pt-14 pb-4 mt-0
        sm:min-h-[88vh] sm:h-auto
        sm:justify-end sm:pt-20 sm:pb-0
        sm:mt-16 sm:px-6
        md:min-h-[92vh] md:mt-20 md:px-12
      "
    >
      {/* LAYER 1: CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none">
        <img
          ref={bgImageRef}
          src="/images/hero_cinematic.jpg"
          alt="Cinematic Background Atmosphere"
          className="
            w-full h-full object-cover object-center
            will-change-transform opacity-20
            select-none scale-105
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        <div className="absolute inset-0 film-grain" />
      </div>

      {/* LAYER 2: MOVING TEXT BEHIND THE PORTRAIT */}
      <div
        ref={marqueeRef}
        aria-hidden="true"
        className="
          absolute inset-x-0 top-1/2 -translate-y-1/2
          z-10 pointer-events-none
          flex flex-col justify-center
          space-y-3 overflow-hidden
          [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]
          select-none opacity-90
          sm:top-[34%] sm:space-y-2
          md:top-[38%] md:space-y-3
        "
      >
        {HERO_MARQUEE_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex overflow-hidden py-0.5">
            <div
              className={`${row.directionClass} flex shrink-0 items-center`}
            >
              {[0, 1].map((copy) =>
                Array.from({ length: row.repeatCount }).map((_, i) => (
                  <span
                    key={`${copy}-${rowIdx}-${i}`}
                    className={`
                      inline-flex items-center whitespace-nowrap
                      text-base
                      ${row.textStyle}
                      sm:text-2xl md:text-4xl lg:text-5xl
                    `}
                  >
                    <span>{row.text}</span>
                    <span
                      className={`
                        ${row.starColor}
                        mx-3 text-xs font-bold
                        sm:mx-6 sm:text-lg
                        md:mx-8 md:text-xl
                      `}
                    >
                      ✳
                    </span>
                  </span>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* LAYER 3: FOREGROUND PORTRAIT & NAME */}
      <div
        className="
          relative z-20 w-full
          flex flex-col items-center justify-center
          pointer-events-none
          sm:relative sm:inset-auto sm:translate-y-0
          sm:mt-auto sm:mx-auto sm:max-w-5xl
          sm:w-full sm:justify-end sm:text-center
        "
      >
        <div
          ref={portraitRef}
          className="
            relative group perspective-1000
            flex items-end justify-center
            pointer-events-auto select-none
          "
        >
          {/* Ambient glow */}
          <div
            className="
              absolute inset-0 -inset-x-8
              bg-gradient-to-t from-caribbean/20
              via-caribbean/5 to-transparent
              rounded-full blur-3xl opacity-75
              group-hover:opacity-100
              transition-opacity duration-700
              pointer-events-none scale-110
            "
          />

          {/* Portrait image */}
          <div className="relative z-20 overflow-visible flex items-end justify-center">
            <img
              ref={imageRef}
              src={heroImageSrc}
              alt={`${PERSONAL_INFO.name} - Hero Portrait`}
              draggable="false"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/hero_no_bg.png';
              }}
              className="
                w-[min(82vw,360px)]
                max-h-[52svh]
                h-auto object-contain object-bottom block
                drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]
                drop-shadow-[0_0_20px_rgba(0,255,163,0.18)]
                will-change-transform
                transform transition-transform duration-700
                group-hover:scale-105
                sm:w-72 sm:max-h-[68vh]
                sm:max-h-[78vh]
                md:w-[440px]
                lg:w-[500px]
                xl:w-[540px]
              "
            />
          </div>
        </div>

        {/* MOBILE-ONLY NAME DIRECTLY BENEATH PORTRAIT */}
        <div
          className="
            hero-flank-name mt-3.5 sm:mt-0
            z-30 flex justify-center px-4
            pointer-events-none
            sm:hidden
          "
        >
          <h1
            className="
              text-white font-black uppercase text-center
              text-[clamp(1.25rem,6vw,1.9rem)]
              tracking-[0.06em] leading-tight
              whitespace-nowrap
            "
          >
            MUHAMMED RAYEES
          </h1>
        </div>
      </div>
    </section>
  );
}