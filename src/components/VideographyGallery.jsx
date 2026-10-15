import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Eye, Sliders, ChevronLeft, ChevronRight, Compass, Film, Focus } from 'lucide-react';
import { VIDEOGRAPHY_FRAMES } from '../data/portfolioData';
import { playHoverSound, playShutterSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function VideographyGallery() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [activeFrame, setActiveFrame] = useState(VIDEOGRAPHY_FRAMES[0]);
  const [aspectMode, setAspectMode] = useState("2.39:1");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations for cinematography items
      gsap.fromTo(
        '.cine-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cine-header',
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo(
        '.cine-hero-frame',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cine-hero-frame',
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollStrip = (direction) => {
    playShutterSound();
    if (!scrollContainerRef.current) return;
    const scrollAmount = 400;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const getAspectClass = () => {
    switch (aspectMode) {
      case "16:9":
        return "aspect-video max-w-5xl";
      case "4:3":
        return "aspect-[4/3] max-w-4xl";
      default:
        return "aspect-[2.39/1] max-w-6xl";
    }
  };

  return (
    <section
      id="cinematography"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 bg-[#060608] border-t border-white/[0.05] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="cine-header flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-cinema-gold tracking-[0.3em] uppercase mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>CINEMATOGRAPHY // IN-CAMERA COMPOSITION</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
              VIDEOGRAPHY
            </h2>
            <p className="mt-4 max-w-xl text-zinc-400 font-light text-sm md:text-base">
              Capturing light, negative space, and human emotion through anamorphic optics. Every frame composed with deliberate intention and organic texture.
            </p>
          </div>

          {/* Interactive Aspect Ratio Switcher */}
          <div className="mt-8 md:mt-0 flex flex-col items-start md:items-end space-y-2">
            <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
              FRAME MASKING SIMULATOR
            </span>
            <div className="inline-flex rounded-sm p-1 bg-white/[0.04] border border-white/10 font-mono text-xs">
              {["2.39:1", "16:9", "4:3"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    playShutterSound();
                    setAspectMode(mode);
                  }}
                  className={`px-3 py-1 rounded-xs transition-colors ${
                    aspectMode === mode
                      ? 'bg-cinema-gold text-black font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Hero Frame Display */}
        <div className="cine-hero-frame relative w-full flex justify-center mb-16">
          <div className={`relative w-full ${getAspectClass()} transition-all duration-500 bg-black rounded-sm overflow-hidden border border-white/15 shadow-2xl group`}>
            
            {/* Main Cinema Image */}
            <img
              src={activeFrame.image}
              alt={activeFrame.title}
              className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Letterbox Bars for 2.39:1 feeling */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/40" />

            {/* HUD Metadata Overlay on Active Frame */}
            <div className="absolute top-4 left-6 right-6 flex items-center justify-between font-mono text-[10px] md:text-xs text-white/80 pointer-events-none">
              <div className="flex items-center space-x-2">
                <Focus className="w-3.5 h-3.5 text-cinema-gold animate-spin" style={{ animationDuration: '8s' }} />
                <span className="tracking-widest uppercase text-cinema-gold">{activeFrame.camera}</span>
              </div>
              <div className="tracking-wider uppercase">
                {activeFrame.settings}
              </div>
            </div>

            {/* Bottom Caption on Frame */}
            <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between font-mono text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 tracking-widest uppercase">
                  LOCATION // {activeFrame.location}
                </span>
                <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight uppercase mt-0.5">
                  {activeFrame.title}
                </h3>
              </div>

              <div className="mt-2 sm:mt-0 text-[11px] text-zinc-300 font-mono tracking-wider">
                LENS: <span className="text-white">{activeFrame.lens}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Filmstrip Frame Browser */}
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-zinc-500 tracking-widest uppercase flex items-center space-x-2">
              <Film className="w-3.5 h-3.5 text-cinema-gold" />
              <span>SELECT EXPOSURE STILLS ({VIDEOGRAPHY_FRAMES.length} FRAMES)</span>
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleScrollStrip('left')}
                className="p-2 rounded-sm border border-white/10 hover:border-cinema-gold text-zinc-400 hover:text-white transition-colors"
                aria-label="Previous frames"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollStrip('right')}
                className="p-2 rounded-sm border border-white/10 hover:border-cinema-gold text-zinc-400 hover:text-white transition-colors"
                aria-label="Next frames"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filmstrip Strip */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 md:space-x-6 overflow-x-auto no-scrollbar pb-4 pt-1 snap-x"
          >
            {VIDEOGRAPHY_FRAMES.map((frame) => {
              const isSelected = activeFrame.id === frame.id;
              return (
                <div
                  key={frame.id}
                  onClick={() => {
                    playShutterSound();
                    setActiveFrame(frame);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`flex-shrink-0 w-64 md:w-80 cursor-pointer rounded-sm overflow-hidden border transition-all duration-300 snap-start group relative ${
                    isSelected
                      ? 'border-cinema-gold ring-1 ring-cinema-gold shadow-lg shadow-cinema-gold/10'
                      : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/40'
                  }`}
                  data-cursor="FRAME"
                >
                  <div className="relative aspect-[2.39/1] bg-black overflow-hidden">
                    <img
                      src={frame.image}
                      alt={frame.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/70 font-mono text-[9px] text-zinc-300">
                      {frame.aspect}
                    </div>
                  </div>

                  <div className="p-3 bg-[#0d0d12] flex items-center justify-between font-mono text-xs">
                    <div>
                      <div className="text-white font-medium text-[11px] truncate uppercase">{frame.title}</div>
                      <div className="text-zinc-500 text-[9px] truncate">{frame.location}</div>
                    </div>
                    <span className="text-[10px] text-cinema-gold font-semibold">{isSelected ? 'ACTIVE' : 'VIEW'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
