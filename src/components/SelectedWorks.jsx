import React, { useState, useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Play, Clapperboard, Sparkles } from 'lucide-react';
import { CATEGORIES, PROJECTS } from '../data/portfolioData';
import { playHoverSound, playShutterSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWorks({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  // Original Selected Works logic preserved
  const filteredProjects = useMemo(() => {
    if (activeCategory === "ALL") {
      const disciplines = ["VIDEO EDITING", "VIDEOGRAPHY", "GRAPHIC DESIGN"];
      return disciplines
        .map(cat => PROJECTS.find(p => p.category === cat))
        .filter(Boolean);
    }
    return PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          }
        }
      );

      // Cards staggered reveal on category change
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out'
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-black border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header & Category Filter Tabs */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-caribbean tracking-[0.3em] uppercase mb-3">
              <Clapperboard className="w-3.5 h-3.5" />
              <span>
                {activeCategory === "ALL" 
                  ? "CURATED SHOWCASE // 1 WORK IN EACH CATEGORY" 
                  : `DISCIPLINE ARCHIVE // ${activeCategory}`}
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
              SELECTED WORKS
            </h2>
          </div>

          {/* Category Filter Buttons:
              ALL WORKS | VIDEO EDITING | VIDEOGRAPHY | GRAPHIC DESIGN */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playShutterSound();
                    setActiveCategory(cat.id);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`px-4 py-2.5 text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-sm border ${
                    isActive
                      ? 'bg-caribbean text-black border-caribbean font-bold shadow-lg shadow-caribbean/25'
                      : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:border-caribbean/60 hover:text-white'
                  }`}
                  data-cursor="FILTER"
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Works Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                playShutterSound();
                onSelectProject(project);
              }}
              onMouseEnter={playHoverSound}
              className="project-card group relative bg-[#070707] border border-white/[0.08] hover:border-caribbean/50 rounded-sm overflow-hidden transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-2xl"
              data-cursor="VIEW"
            >
              {/* Media Container with 16:10 Cinema Aspect */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                  loading="lazy"
                />

                {/* Letterbox subtle shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase z-10">
                  <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-caribbean">
                    {project.category}
                  </span>
                  <span className="px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-beige">
                    {project.year}
                  </span>
                </div>

                {/* Hover Center Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-caribbean text-black flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    {project.videoUrl ? (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    ) : (
                      <ArrowUpRight className="w-6 h-6" />
                    )}
                  </div>
                </div>

                {/* Bottom duration or aspect ratio */}
                <div className="absolute bottom-3 left-4 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                  {project.aspectRatio}
                </div>
              </div>

              {/* Project Details Footer */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-beige tracking-widest uppercase">
                      {project.subCategory}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      {project.duration || project.year}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-white group-hover:text-caribbean transition-colors tracking-tight uppercase">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-zinc-400 text-sm font-light leading-relaxed line-clamp-2">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Tools and View Project interaction link */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center space-x-2 text-zinc-500 text-[11px]">
                    <span>{project.tools.slice(0, 2).join(" · ")}</span>
                  </div>

                  <div className="inline-flex items-center space-x-1.5 text-zinc-300 group-hover:text-caribbean font-medium tracking-widest uppercase transition-colors">
                    <span>VIEW PROJECT</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
