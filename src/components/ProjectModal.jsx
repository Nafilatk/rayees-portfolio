import React, { useEffect, useRef } from 'react';
import { X, Play, Sliders, Calendar, Film, Layers, ArrowUpRight, Palette } from 'lucide-react';
import { playShutterSound } from '../utils/audio';

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/95 backdrop-blur-2xl overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-black border border-white/15 rounded-sm shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.9)]"
      >
        {/* Top Bar with Cinema Header & Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#050505]">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-caribbean animate-pulse shadow-[0_0_6px_#acee01]" />
            <span className="font-mono text-xs text-caribbean tracking-widest uppercase font-semibold">
              CASE STUDY // {project.category}
            </span>
          </div>

          <button
            onClick={() => {
              playShutterSound();
              onClose();
            }}
            className="p-2 text-zinc-400 hover:text-white rounded-full border border-white/10 hover:border-caribbean transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-8 bg-black">
          
          {/* Main Media Preview */}
          <div className="relative w-full aspect-video md:aspect-[2.39/1] bg-black rounded-sm overflow-hidden border border-white/10">
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                poster={project.thumbnail}
                controls
                autoPlay
                loop
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}

            <div className="absolute bottom-3 left-4 px-3 py-1 bg-black/85 backdrop-blur-md border border-white/15 font-mono text-[10px] text-beige tracking-widest uppercase font-medium">
              {project.aspectRatio || "2.39:1 CINEMASCOPE"}
            </div>
          </div>

          {/* Title and Metadata Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-b border-white/10 pb-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-3 text-caribbean font-mono text-xs tracking-widest uppercase font-semibold">
                <span>{project.subCategory}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-beige">{project.year}</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
                {project.title}
              </h2>
              <p className="text-zinc-200 font-light leading-relaxed text-base md:text-lg">
                {project.fullDesc || project.shortDesc}
              </p>
            </div>

            {/* Quick Specs Column */}
            <div className="bg-[#070707] p-6 rounded-sm border border-white/10 space-y-4 font-mono text-xs shadow-xl">
              <div className="border-b border-white/10 pb-3">
                <div className="text-beige text-[10px] tracking-widest uppercase font-medium">MY ROLE</div>
                <div className="text-white font-medium mt-1">{project.role}</div>
              </div>

              <div className="border-b border-white/10 pb-3">
                <div className="text-beige text-[10px] tracking-widest uppercase font-medium">COMMISSION / CLIENT</div>
                <div className="text-white font-medium mt-1">{project.client}</div>
              </div>

              <div className="border-b border-white/10 pb-3">
                <div className="text-beige text-[10px] tracking-widest uppercase font-medium">PRIMARY TOOLS</div>
                <div className="text-caribbean font-medium mt-1">
                  {project.tools.join(" · ")}
                </div>
              </div>

              {project.duration && (
                <div>
                  <div className="text-beige text-[10px] tracking-widest uppercase font-medium">RUNTIME / SPEC</div>
                  <div className="text-white font-medium mt-1">{project.duration}</div>
                </div>
              )}
            </div>
          </div>

          {/* Color Grading Palette Palette */}
          {project.colorPalette && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 font-mono text-xs text-beige tracking-widest uppercase font-medium">
                <Palette className="w-3.5 h-3.5 text-caribbean" />
                <span>COLOR TEMPERATURE & LOOK GRADE</span>
              </div>
              <div className="flex items-center space-x-3">
                {project.colorPalette.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center space-y-1.5">
                    <div
                      className="w-12 h-10 sm:w-16 sm:h-12 rounded-sm border border-white/20 shadow-lg"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-mono text-[10px] text-zinc-400">{color}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Production Stills / Visual Gallery */}
          {project.stills && project.stills.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="font-mono text-xs text-beige tracking-widest uppercase flex items-center space-x-2 font-medium">
                <Film className="w-3.5 h-3.5 text-caribbean" />
                <span>PRODUCTION STILLS & FRAMES</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.stills.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-video bg-black overflow-hidden rounded-sm border border-white/10 group"
                  >
                    <img
                      src={img}
                      alt={`${project.title} still ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 font-mono text-[9px] text-beige border border-white/10">
                      FRAME 0{i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
