import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { playHoverSound, playShutterSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

const FILTERS = [
  { id: 'all', label: 'ALL WORKS' },
  { id: 'video-editing', label: 'VIDEO EDITING' },
  { id: 'videography', label: 'VIDEOGRAPHY' },
  { id: 'graphic-design', label: 'GRAPHIC DESIGN' },
];

const WORKS = [
  {
    id: 1, category: 'videography', index: '01',
    title: 'CINEMATIC WEDDING FILMS',
    subtitle: 'Nikkah · Engagement · Bride to Be',
    company: 'Rayees Visual Productions', period: '2024 â€” PRESENT',
    tags: ['4K DCI', 'CinemaScope 2.39:1', 'Sony FX6'],
    description: 'Full ceremony coverage and emotional highlight films crafted with cinematic precision â€” capturing sacred moments across Nikkah, Engagement, and pre-wedding celebrations.',
    deliverables: ['Master cinematic delivery across 4K DCI & 9:16 vertical reels', 'Full ceremony coverage with emotional narrative highlight films', 'Car-to-car rolling shots and precision automotive commercials'],
  },
  {
    id: 2, category: 'video-editing', index: '02',
    title: 'HIGH-RETENTION REELS',
    subtitle: 'Short-Form · Beat-Matched · Hook Engineering',
    company: 'Creative Visual Media', period: '2022 â€” 2024',
    tags: ['CapCut', 'Adobe Premiere', '9:16 Vertical'],
    description: 'Engineered short-form content optimised for algorithmic performance â€” kinetic cuts, subtitle architecture, and 3-second retention hooks that keep viewers locked in.',
    deliverables: ['Produced destination travel films with 4K drone aerials', 'Shot macro culinary cinematography â€” steam, textures & plating', 'Captured 50+ milestone events with dynamic lighting & gimbal rigs'],
  },
  {
    id: 3, category: 'video-editing', index: '03',
    title: 'CORPORATE & KEYNOTE EDITS',
    subtitle: 'Presentations · Teasers · Sound Design',
    company: 'Digital Motion Studio', period: '2020 â€” 2022',
    tags: ['Multi-Cam Sync', 'After Effects', 'Audio Stem Mix'],
    description: 'Polished executive presentation videos, wedding teaser reels, and social campaigns delivered with rapid turnaround and broadcast-grade visual standards.',
    deliverables: ['Edited high-impact executive presentation videos with kinetic graphics', 'Crafted romantic teaser reels with beat-matched editing', 'Handled multi-camera sync, dialogue cleanup & audio stem mixing'],
  },
  {
    id: 4, category: 'graphic-design', index: '04',
    title: 'THUMBNAILS & SOCIAL ASSETS',
    subtitle: 'High-CTR · Brand Identity · Typography',
    company: 'Rayees Visual Productions', period: '2022 â€” PRESENT',
    tags: ['Canva', 'Adobe Photoshop', 'Swiss Typography'],
    description: 'Engineered to maximise click-through rates â€” strong typography, facial expression isolation, and high-contrast colour palettes that command attention in crowded feeds.',
    deliverables: ['YouTube & Reel thumbnails optimised for maximum CTR', 'Cohesive social media creatives, carousel templates & banners', 'Event posters, digital promotional material & minimalist brand marks'],
  },
  {
    id: 5, category: 'videography', index: '05',
    title: 'AUTOMOTIVE FILMS',
    subtitle: 'High-Speed · Precision · Commercial',
    company: 'Rayees Visual Productions', period: '2023 â€” PRESENT',
    tags: ['Car-to-Car Rigs', 'Sony FX3', 'Exhaust Sync'],
    description: 'Precision car-to-car rolling shots and exhaust-synced automotive commercials delivering visceral speed and cinematic drama for vehicle brands and private clients.',
    deliverables: ['High-speed rolling shots with car-mounted suction rigs', 'Exhaust pop & burble synchronised with cut rhythm', 'Colour-graded in DaVinci Resolve with S-curve contrast'],
  },
  {
    id: 6, category: 'video-editing', index: '06',
    title: 'DIGITAL MARKETING CONTENT',
    subtitle: 'Growth · SEO · Content Calendars',
    company: 'Creative Visual Media', period: '2022 â€” 2024',
    tags: ['Content Planning', 'Instagram Growth', 'Basic SEO'],
    description: 'Aligning video cuts, hook design, and thumbnail strategy with marketing release schedules â€” creating a unified pipeline that drives organic reach and algorithmic momentum.',
    deliverables: ['Structured content calendars with weekly thematic planning', 'Hashtag architecture & trend research for organic discovery', 'Audience engagement strategies and community management'],
  },
];



export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredWork, setHoveredWork] = useState(null);

  const filteredWorks = activeFilter === 'all' ? WORKS : WORKS.filter((w) => w.category === activeFilter);

  // GSAP scroll reveals
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.sw-label-anim', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.fromTo('.sw-headline-anim', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power4.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.fromTo('.sw-filter-anim', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate cards in when filter changes
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const cards = document.querySelectorAll('.sw-card');
    if (!cards.length) return;
    gsap.fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out' });
  }, [activeFilter]);

  const handleFilterChange = (filterId) => {
    if (filterId === activeFilter) return;
    playShutterSound();
    setActiveFilter(filterId);
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-12 bg-black border-t border-white/[0.07] overflow-hidden select-none w-full"
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER ROW */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="sw-label-anim flex items-center gap-2 font-mono text-[11px] text-[#acee01] tracking-[0.25em] uppercase mb-3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="12" height="12" rx="1" stroke="#acee01" strokeWidth="1.2" />
                <path d="M4 4h6M4 7h6M4 10h3" stroke="#acee01" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span>CURATED SHOWCASE // 1 WORK IN EACH CATEGORY</span>
            </div>
            <div className="overflow-hidden">
              <h2 className="sw-headline-anim font-display font-black text-[clamp(2.2rem,6vw,5.5rem)] text-white tracking-tighter uppercase" style={{ lineHeight: 0.88 }}>
                EXPERIENCE
              </h2>
            </div>
            <div className="overflow-hidden">
              
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end lg:gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => handleFilterChange(f.id)}
                onMouseEnter={playHoverSound}
                className={`sw-filter-anim font-mono font-bold text-[10px] sm:text-xs tracking-[0.16em] uppercase px-3.5 py-1.5 sm:px-4 sm:py-2 border transition-all duration-200 cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-[#acee01] text-black border-[#acee01]'
                    : 'bg-black text-zinc-300 border-white/20 hover:border-white/50 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-white/[0.08] mb-6 sm:mb-8" />

        {/* WORKS LIST */}
        <div className="space-y-0">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              className={`sw-card group relative border-b border-white/[0.08] transition-all duration-500 cursor-default ${
                hoveredWork === work.id ? 'bg-white/[0.02]' : 'bg-black'
              }`}
              onMouseEnter={() => { setHoveredWork(work.id); playHoverSound(); }}
              onMouseLeave={() => setHoveredWork(null)}
            >
              {/* Lime left bar on hover */}
              <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#acee01] transition-all duration-300 ${hoveredWork === work.id ? 'opacity-100' : 'opacity-0'}`} />

              <div className="py-5 sm:py-6 pl-4 sm:pl-6 pr-4 grid grid-cols-12 gap-3 sm:gap-5 items-start">
                {/* Index */}
                <div className="col-span-2 sm:col-span-1">
                  <span className="font-mono text-xs sm:text-sm text-zinc-600 font-semibold">{work.index}</span>
                </div>

                {/* Title + meta */}
                <div className="col-span-10 sm:col-span-5 lg:col-span-4">
                  <span className="font-mono text-[10px] text-[#acee01] tracking-widest uppercase font-semibold block mb-1.5">
                    {FILTERS.find(f => f.id === work.category)?.label || work.category.toUpperCase()}
                  </span>
                  <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl text-white uppercase tracking-tight leading-tight group-hover:text-[#acee01] transition-colors duration-300">
                    {work.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-zinc-500">{work.subtitle}</p>
                </div>

                {/* Description + tags */}
                <div className="col-span-12 sm:col-span-5 lg:col-span-5">
                  <p className="text-zinc-400 font-light text-sm leading-relaxed">{work.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {work.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-2 py-0.5 border border-white/10 text-zinc-500 uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Period + Arrow */}
                <div className="col-span-12 lg:col-span-2 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4 lg:gap-3 pt-1">
                  <div className="hidden lg:block text-right">
                    <span className="font-mono text-[10px] text-zinc-600 block uppercase tracking-widest">{work.period}</span>
                    <span className="font-mono text-[10px] text-zinc-500 block mt-0.5 uppercase tracking-wide">{work.company}</span>
                  </div>
                  <div className="lg:hidden font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                    {work.period} · {work.company}
                  </div>
                  <div className={`w-8 h-8 border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                    hoveredWork === work.id ? 'bg-[#acee01] border-[#acee01]' : 'border-white/10'
                  }`}>
                    <ArrowUpRight className={`w-4 h-4 transition-colors duration-300 ${
                      hoveredWork === work.id ? 'text-black' : 'text-zinc-500'
                    }`} />
                  </div>
                </div>
              </div>

              {/* Deliverables â€” slide-reveal on hover */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                hoveredWork === work.id ? 'max-h-48 opacity-100 pb-6 sm:pb-8' : 'max-h-0 opacity-0'
              }`}>
                <div className="pl-6 sm:pl-8 pr-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {work.deliverables.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 font-mono text-xs text-zinc-500 leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-[#acee01] mt-1.5 flex-shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER CTA */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
            {filteredWorks.length} WORK{filteredWorks.length !== 1 ? 'S' : ''} SHOWN
            {activeFilter !== 'all' && ` // ${FILTERS.find(f => f.id === activeFilter)?.label}`}
          </div>
          <a
            href="#contact"
            onClick={playShutterSound}
            onMouseEnter={playHoverSound}
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#acee01] text-black font-bold text-sm uppercase tracking-tight hover:bg-white transition-colors duration-200"
          >
            <span>INITIATE COLLABORATION</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
