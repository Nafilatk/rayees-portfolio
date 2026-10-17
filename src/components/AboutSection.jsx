
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Camera,
  Clapperboard,
  Film,
  GraduationCap,
  Award,
  ArrowUpRight
} from 'lucide-react';

import { playHoverSound, playShutterSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({ onOpenContact }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-header-anim',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-header-anim',
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.about-card-anim',
        { opacity: 0, y: 45, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-12 bg-black border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="about-header-anim flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-cinema-gold tracking-[0.3em] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-cinema-gold animate-pulse" />
              <span>CREATIVE PROFILE // 01</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
              BEHIND THE FRAME.
            </h2>
          </div>
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

          {/* Main Bio */}
          <div className="about-card-anim lg:col-span-7 bg-black border border-white/[0.08] hover:border-white/20 p-6 sm:p-8 rounded-sm flex flex-col justify-between transition-all duration-300 relative group">

            <div className="absolute top-3 right-3 font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
              CREATIVE STATEMENT // 01
            </div>

            <div className="space-y-5">
              <div>
                <span className="font-mono text-xs text-cinema-gold tracking-widest uppercase block mb-2">
                  VIDEO EDITOR · VIDEOGRAPHER · VISUAL STORYTELLER
                </span>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                  Turning raw footage into stories worth watching.
                </h3>
              </div>

              <div className="space-y-3.5 text-zinc-300 font-light text-xs sm:text-sm leading-relaxed">
                <p>
                  I'm a Video Editor and Videographer passionate about
                  capturing moments, crafting cinematic visuals, and
                  bringing stories to life through video.
                </p>

                <p>
                  My creative focus includes video editing, camera work,
                  visual composition, pacing, transitions, and sound
                  synchronization. I enjoy combining technical precision
                  with creative storytelling to make every frame count.
                </p>

                <p className="text-zinc-400 text-xs">
                  From cinematic sequences and Instagram Reels to
                  promotional videos and behind-the-scenes moments,
                  I aim to transform ideas and raw footage into
                  engaging visual experiences.
                </p>
              </div>
            </div>

            {/* Education and Training */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-white/[0.06] font-mono text-xs">

              <div className="flex items-start space-x-3 p-3 bg-black border border-white/[0.06] rounded-xs">
                <GraduationCap className="w-4 h-4 text-cinema-gold flex-shrink-0 mt-0.5" />

                <div>
                  <span className="text-zinc-500 text-[10px] tracking-wider uppercase block">
                    EDUCATION
                  </span>
                  <span className="text-zinc-200 font-medium block mt-0.5">
                    B.Com (Computer Application)
                  </span>
                  <span className="text-zinc-500 text-[10px] block mt-0.5">
                    Calicut University · 2022–2025
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-black border border-white/[0.06] rounded-xs">
                <Award className="w-4 h-4 text-cinema-gold flex-shrink-0 mt-0.5" />

                <div>
                  <span className="text-zinc-500 text-[10px] tracking-wider uppercase block">
                    PROFESSIONAL TRAINING
                  </span>
                  <span className="text-zinc-200 font-medium block mt-0.5">
                    Digital Marketing & Designing
                  </span>
                  <span className="text-zinc-500 text-[10px] block mt-0.5">
                    Adi Group of Institute · 2026
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Editorial Photo Frame */}
          <div className="about-card-anim lg:col-span-5 bg-black border border-white/[0.08] hover:border-cinema-gold/40 p-5 rounded-sm flex flex-col justify-between transition-all duration-500 relative group overflow-hidden">

            <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full bg-black rounded-xs overflow-hidden border border-white/10 shadow-2xl">

              <img
                src="/images/aboutimage.jpeg"
                alt="Behind the Frame - Videography Portfolio"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/behind_the_frame.jpg';
                }}
                className="w-full h-full object-cover object-top transform transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-110"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

              {/* Viewfinder Corners */}
              <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-white/40 pointer-events-none" />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-white/40 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-white/40 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-white/40 pointer-events-none" />

              <div className="absolute top-4 inset-x-4 flex items-center justify-between font-mono text-[9px] text-zinc-300 tracking-widest uppercase pointer-events-none">
                <span className="px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-cinema-gold">
                  VISUAL DIARY
                </span>
                <span className="text-zinc-400">FRAME // 001</span>
              </div>

              <div className="absolute bottom-4 inset-x-4 font-mono text-[10px] text-zinc-300 tracking-widest uppercase">
                <span className="text-white font-semibold">
                  CAPTURE · CREATE · TELL STORIES
                </span>
              </div>
            </div>

            {/* Photo Footer */}
            <div className="mt-4 p-3.5 bg-black border border-cinema-gold/30 rounded-xs flex items-center justify-between font-mono text-xs">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                  CREATIVE SPECIALIZATION
                </span>
                <span className="text-cinema-gold font-bold text-xs tracking-wider block mt-1">
                  VIDEO · CINEMA · STORY
                </span>
              </div>

              <a
                href="#contact"
                onClick={() => {
                  playShutterSound();
                  if (onOpenContact) onOpenContact();
                }}
                onMouseEnter={playHoverSound}
                className="inline-flex items-center space-x-1 px-3 py-2 bg-cinema-gold text-black text-[11px] font-bold tracking-wider rounded-xs hover:bg-white transition-colors"
                data-cursor="CONTACT"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Discipline 1: Videography */}
          <div className="about-card-anim lg:col-span-4 bg-black border border-white/[0.08] hover:border-cinema-gold/40 p-5 sm:p-6 rounded-sm flex flex-col justify-between transition-all duration-300 group">

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-sm bg-black border border-white/10 flex items-center justify-center text-cinema-gold group-hover:border-cinema-gold transition-colors">
                  <Camera className="w-4 h-4" />
                </div>

                <span className="font-mono text-xs text-cinema-gold font-semibold tracking-widest">
                  01 / CAPTURE
                </span>
              </div>

              <h4 className="font-display font-bold text-xl text-white tracking-tight uppercase mb-3">
                VIDEOGRAPHY
              </h4>

              <p className="text-zinc-400 font-light text-xs sm:text-sm leading-relaxed mb-4">
                Capturing moments with thoughtful framing, camera
                movement, composition, and a focus on visual storytelling.
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-400">
              <span className="px-2 py-1 bg-black border border-white/10 rounded-xs">
                Camera Work
              </span>
              <span className="px-2 py-1 bg-black border border-white/10 rounded-xs">
                Composition
              </span>
              <span className="px-2 py-1 bg-black border border-white/10 rounded-xs">
                Framing
              </span>
            </div>
          </div>

          {/* Discipline 2: Video Editing */}
          <div className="about-card-anim lg:col-span-4 bg-black border border-white/[0.08] hover:border-cinema-gold/40 p-5 sm:p-6 rounded-sm flex flex-col justify-between transition-all duration-300 group">

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-sm bg-black border border-white/10 flex items-center justify-center text-cinema-gold group-hover:border-cinema-gold transition-colors">
                  <Clapperboard className="w-4 h-4" />
                </div>

                <span className="font-mono text-xs text-cinema-gold font-semibold tracking-widest">
                  02 / EDIT
                </span>
              </div>

              <h4 className="font-display font-bold text-xl text-white tracking-tight uppercase mb-3">
                VIDEO EDITING
              </h4>

              <p className="text-zinc-400 font-light text-xs sm:text-sm leading-relaxed mb-4">
                Shaping raw footage into polished videos with engaging
                pacing, clean transitions, audio synchronization, and
                creative storytelling.
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-400">
              <span className="px-2 py-1 bg-black border border-white/10 rounded-xs">
                Editing
              </span>
              <span className="px-2 py-1 bg-black border border-white/10 rounded-xs">
                Transitions
              </span>
              <span className="px-2 py-1 bg-black border border-white/10 rounded-xs">
                Sound Design
              </span>
            </div>
          </div>

          {/* Discipline 3: Cinematic Storytelling */}
          <div className="about-card-anim lg:col-span-4 bg-black border border-white/[0.08] hover:border-cinema-gold/40 p-5 sm:p-6 rounded-sm flex flex-col justify-between transition-all duration-300 group">

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-sm bg-black border border-white/10 flex items-center justify-center text-cinema-gold group-hover:border-cinema-gold transition-colors">
                  <Film className="w-4 h-4" />
                </div>

                <span className="font-mono text-xs text-cinema-gold font-semibold tracking-widest">
                  03 / STORY
                </span>
              </div>

              <h4 className="font-display font-bold text-xl text-white tracking-tight uppercase mb-3">
                VISUAL STORYTELLING
              </h4>

              <p className="text-zinc-400 font-light text-xs sm:text-sm leading-relaxed mb-4">
                Creating visual narratives through shot selection,
                rhythm, atmosphere, color, and carefully crafted sequences.
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-400">
              <span className="px-2 py-1 bg-black border border-white/10 rounded-xs">
                Cinematic
              </span>
              <span className="px-2 py-1 bg-black border border-white/10 rounded-xs">
                Color
              </span>
              <span className="px-2 py-1 bg-black border border-white/10 rounded-xs">
                Storytelling
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
