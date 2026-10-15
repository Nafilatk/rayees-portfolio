import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, ArrowUpRight, Layers, Maximize2, X, Compass, FileText } from 'lucide-react';
import { GRAPHIC_DESIGN_ITEMS } from '../data/portfolioData';
import { playHoverSound, playShutterSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function GraphicDesignSection() {
  const sectionRef = useRef(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [filter, setFilter] = useState("ALL");

  const categories = ["ALL", "Film Poster Design", "Editorial Typography", "Album Artwork", "Campaign & Social Creatives", "Branding & Typography"];

  const filteredItems = filter === "ALL"
    ? GRAPHIC_DESIGN_ITEMS
    : GRAPHIC_DESIGN_ITEMS.filter(item => item.type === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gd-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gd-header',
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo(
        '.gd-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gd-grid',
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filter]);

  return (
    <section
      id="graphic-design"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 bg-[#08080a] border-t border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="gd-header flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-cinema-gold tracking-[0.3em] uppercase mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>EDITORIAL & KEY ART // VISUAL SYSTEMS</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
              GRAPHIC DESIGN
            </h2>
            <p className="mt-4 max-w-xl text-zinc-400 font-light text-sm md:text-base">
              Precision typography, brutalist poster layouts, and cross-platform campaign collateral crafted with Swiss grid discipline.
            </p>
          </div>

          {/* Editorial Category Tags */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 max-w-md md:justify-end">
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playShutterSound();
                  setFilter(cat);
                }}
                onMouseEnter={playHoverSound}
                className={`px-3 py-1.5 text-[11px] font-mono tracking-widest uppercase transition-all rounded-xs border ${
                  filter === cat
                    ? 'bg-cinema-gold text-black border-cinema-gold font-semibold'
                    : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat === "ALL" ? "ALL DISCIPLINES" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Gallery Grid */}
        <div className="gd-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                playShutterSound();
                setSelectedDesign(item);
              }}
              onMouseEnter={playHoverSound}
              className="gd-card group relative bg-[#0e0e14] border border-white/[0.08] hover:border-cinema-gold/60 rounded-sm overflow-hidden transition-all duration-500 cursor-pointer flex flex-col justify-between"
              data-cursor="INSPECT"
            >
              {/* Media Preview Box (3:4 Poster or 1:1) */}
              <div className="relative aspect-[3/4] bg-zinc-950 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                  loading="lazy"
                />

                {/* Film/Poster Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                {/* Top Corner Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[9px] tracking-widest uppercase z-10">
                  <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 text-cinema-gold">
                    {item.type}
                  </span>
                  <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 text-zinc-400">
                    {item.year}
                  </span>
                </div>

                {/* Hover Quick Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="px-4 py-2 bg-black/80 border border-cinema-gold backdrop-blur-md text-cinema-gold font-mono text-xs tracking-widest uppercase flex items-center space-x-2 shadow-2xl">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>EXPAND KEY ART</span>
                  </div>
                </div>
              </div>

              {/* Editorial Info Footer */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                  <span>{item.medium}</span>
                  <span>{item.dimensions}</span>
                </div>

                <h3 className="font-display font-bold text-xl md:text-2xl text-white group-hover:text-cinema-gold transition-colors tracking-tight uppercase">
                  {item.title}
                </h3>

                <p className="text-zinc-400 text-xs font-light leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-zinc-400 group-hover:text-cinema-gold transition-colors">
                  <span>VIEW DETAILS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Res Design Lightbox Modal */}
      {selectedDesign && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl animate-fadeIn"
          onClick={() => setSelectedDesign(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#0d0d12] border border-white/15 rounded-sm p-6 md:p-8 flex flex-col md:flex-row gap-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                playShutterSound();
                setSelectedDesign(null);
              }}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full border border-white/10 hover:border-cinema-gold"
              aria-label="Close design lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster Preview */}
            <div className="w-full md:w-1/2 aspect-[3/4] bg-black rounded-sm overflow-hidden border border-white/10 flex-shrink-0">
              <img
                src={selectedDesign.image}
                alt={selectedDesign.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Poster Detailed Specs */}
            <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="font-mono text-xs text-cinema-gold tracking-widest uppercase">
                  KEY ART SPECIFICATION // {selectedDesign.year}
                </div>
                <h3 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight uppercase">
                  {selectedDesign.title}
                </h3>
                <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
                  {selectedDesign.description}
                </p>
              </div>

              <div className="bg-[#14141c] p-5 rounded-sm border border-white/5 space-y-3 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 uppercase tracking-widest text-[10px] block">MEDIUM / EXECUTION</span>
                  <span className="text-zinc-200 mt-1 block">{selectedDesign.medium}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase tracking-widest text-[10px] block">DELIVERY DIMENSIONS</span>
                  <span className="text-zinc-200 mt-1 block">{selectedDesign.dimensions}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase tracking-widest text-[10px] block">DISCIPLINE</span>
                  <span className="text-cinema-gold mt-1 block">{selectedDesign.type}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedDesign(null)}
                className="w-full py-3 bg-cinema-gold text-black font-mono text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
              >
                CLOSE PREVIEW
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
