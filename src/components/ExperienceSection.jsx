import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Film,
  TrendingUp,
  Palette,
  ArrowUpRight,
  MapPin
} from 'lucide-react';
import { EXPERIENCE } from '../data/portfolioData';
import { playHoverSound, playShutterSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

// Tab Configuration: Video Editing is the primary default, Digital Marketing is secondary, Graphic Design is supporting
const TABS = [
  {
    id: 'video-editing',
    label: 'VIDEO EDITING',
    subtitle: 'Reels, Pacing & Commercial Cinema',
    badge: 'PRIMARY FOCUS',
    icon: Film
  },
  {
    id: 'digital-marketing',
    label: 'DIGITAL MARKETING',
    subtitle: 'Content Planning, Growth & SEO',
    badge: 'STRATEGY & REACH',
    icon: TrendingUp
  },
  {
    id: 'graphic-design',
    label: 'GRAPHIC DESIGN',
    subtitle: 'High-CTR Thumbnails & Social Assets',
    badge: 'SUPPORTING ASSETS',
    icon: Palette
  }
];

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const contentContainerRef = useRef(null);
  const progressBarRef = useRef(null);

  // Default state: VIDEO EDITING must be selected automatically on load without requiring any click
  const [activeTab, setActiveTab] = useState('video-editing');
  const [timecode, setTimecode] = useState('02:14:28:19');

  // 24.00 FPS Cinematic Timecode Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const f = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 1000 / 24);
    return () => clearInterval(interval);
  }, []);

  // GSAP Initial ScrollTrigger Setup
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      gsap.fromTo(
        '.exp-hero-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );

      // Scroll-linked progress line
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 35%',
              end: 'bottom 90%',
              scrub: 0.2,
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth Tab Transition Handler
  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    playShutterSound();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !contentContainerRef.current) {
      setActiveTab(tabId);
      return;
    }

    // Smooth exit & entrance crossfade
    gsap.to(contentContainerRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTab(tabId);
        gsap.fromTo(
          contentContainerRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
        );
      }
    });
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-black border-t border-white/[0.08] overflow-hidden select-none w-full"
    >
      {/* Cinematic Ambient Atmosphere */}
      <div className="absolute top-1/4 right-0 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-caribbean/[0.025] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-60 sm:w-[480px] h-60 sm:h-[480px] bg-caribbean/[0.02] rounded-full blur-[90px] sm:blur-[130px] pointer-events-none" />

      {/* Sticky Top Scroll Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-white/[0.04]">
        <div
          ref={progressBarRef}
          className="h-full bg-caribbean shadow-[0_0_12px_#acee01] origin-left will-change-transform"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">

        {/* ============================================================
            01. CINEMATIC HERO COMPOSITION
            ============================================================ */}
        <div className="mb-10 sm:mb-14 md:mb-18">
          {/* Technical Telemetry Bar */}
          <div className="exp-hero-anim flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-white/[0.08] font-mono text-[10px] sm:text-[11px] text-zinc-400">
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping flex-shrink-0" />
              <span className="text-white font-bold tracking-widest uppercase">REC ● LIVE</span>
              <span className="text-zinc-600">|</span>
              <span className="text-caribbean font-semibold">{timecode}</span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-beige hidden sm:inline tracking-wider">FPS: 24.00 DCI</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] tracking-widest uppercase">
              <span className="px-2 py-0.5 rounded-xs bg-white/[0.03] border border-white/10 text-zinc-300">
                PORTFOLIO ARCHIVE // 03 TRACKS
              </span>
              <span className="px-2 py-0.5 rounded-xs bg-caribbean/10 text-caribbean border border-caribbean/30">
                INTERACTIVE EXPERIENCE MATRIX
              </span>
            </div>
          </div>

          {/* Typographic Composition */}
          <div className="pt-4 sm:pt-6 md:pt-8 relative overflow-hidden">
            {/* Background Ghost Wireframe Word */}
            <div
              className="absolute -top-1 sm:-top-3 left-0 right-0 font-display font-black text-4xl sm:text-7xl md:text-8xl text-stroke-cinema select-none pointer-events-none opacity-15 tracking-tighter leading-none overflow-hidden max-w-full truncate"
              aria-hidden="true"
            >
              EXPERIENCE
            </div>

            <div className="relative z-10">
              <div className="exp-hero-anim flex items-center space-x-2 font-mono text-[10px] sm:text-xs text-caribbean tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-2.5 font-semibold">
                <Film className="w-3.5 h-3.5 flex-shrink-0" />
                <span>INTERACTIVE DISCIPLINE SELECTOR</span>
              </div>

              <h2 className="exp-hero-anim font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
                EXPERIENCE
              </h2>

              <div className="exp-hero-anim mt-3 sm:mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
                <div>
                  <p className="font-mono text-xs sm:text-sm md:text-base text-beige font-medium tracking-tight leading-snug">
                    CRAFTING THE CUT. DRIVING THE REACH.
                  </p>
                  <p className="mt-1.5 text-zinc-400 font-light text-xs sm:text-sm max-w-2xl leading-relaxed">
                    Interactive chronicle across video editing, high-retention Reels production, and digital marketing strategies. Select an option below to inspect each dedicated discipline.
                  </p>
                </div>

                {/* Director Summary Card */}
                <div className="w-full md:w-auto md:min-w-[280px] p-3.5 sm:p-4 bg-[#08080c] border border-white/[0.08] rounded-xs font-mono text-[10px] sm:text-[11px] space-y-1.5 self-start md:self-auto">
                  <div className="flex justify-between text-zinc-400">
                    <span className="text-zinc-600">DIRECTOR / EDITOR:</span>
                    <span className="text-white font-semibold">MUHAMMED RAYEES V</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span className="text-zinc-600">PRIMARY FOCUS:</span>
                    <span className="text-caribbean">VIDEO EDITING & MARKETING</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span className="text-zinc-600">STATUS:</span>
                    <span className="text-beige">COMMISSIONS OPEN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            02. INTERACTIVE TABS / BUTTONS (MANDATORY REQUIREMENT)
            3 Interactive options:
            - VIDEO EDITING (Default on load)
            - DIGITAL MARKETING
            - GRAPHIC DESIGN (Kept secondary)
            ============================================================ */}
        <div className="mb-10 sm:mb-14">
          <div className="p-2 sm:p-3 bg-[#08080c] border border-white/[0.08] rounded-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const IconComp = tab.icon;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                    onMouseEnter={playHoverSound}
                    className={`relative p-3.5 sm:p-4 rounded-xs border text-left transition-all duration-300 cursor-pointer min-h-[58px] sm:min-h-[72px] flex flex-col justify-between group ${
                      isActive
                        ? 'bg-[#12121c] border-caribbean text-white shadow-[0_0_20px_rgba(172,238,1,0.2)] ring-1 ring-caribbean/40'
                        : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:border-white/20 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Active Accent Bar Indicator */}
                    {isActive && (
                      <span className="absolute top-0 left-0 right-0 h-[2px] bg-caribbean shadow-[0_0_8px_#acee01]" />
                    )}

                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <div className="flex items-center space-x-2">
                        <IconComp
                          className={`w-4 h-4 transition-colors ${
                            isActive ? 'text-caribbean' : 'text-zinc-500 group-hover:text-zinc-300'
                          }`}
                        />
                        <span
                          className={`font-display font-black text-sm sm:text-base tracking-tight uppercase ${
                            isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                          }`}
                        >
                          {tab.label}
                        </span>
                      </div>

                      <span
                        className={`font-mono text-[9px] px-1.5 py-0.5 rounded-xs uppercase tracking-wider font-semibold border ${
                          isActive
                            ? 'bg-caribbean text-black border-caribbean'
                            : 'bg-black/60 text-zinc-500 border-white/10'
                        }`}
                      >
                        {isActive ? '● ACTIVE' : tab.badge}
                      </span>
                    </div>

                    <p className="font-mono text-[10px] sm:text-[11px] text-zinc-400 truncate">
                      {tab.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================
            03. DYNAMIC CONTENT CONTAINER (ONLY ACTIVE TAB IS VISIBLE)
            Smooth crossfade transitions between categories.
            ============================================================ */}
        <div ref={contentContainerRef} className="relative min-h-[400px]">

          {/* ----------------------------------------------------------
              TAB 01: VIDEO EDITING (PRIMARY FOCUS & DEFAULT ON LOAD)
              Renders real commercial milestones from EXPERIENCE dataset
              ---------------------------------------------------------- */}
          {activeTab === 'video-editing' && (
            <div className="space-y-12 sm:space-y-16 animate-fadeIn">
              {/* Category Header Banner */}
              <div className="p-4 sm:p-6 bg-[#08080c] border border-white/[0.08] rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] sm:text-[11px] text-caribbean tracking-widest uppercase block mb-1 font-semibold">
                    PRIMARY DISCIPLINE // 01
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tight">
                    COMMERCIAL VIDEO EDITING & REELS
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-beige mt-1">
                    Kinetic cuts, subtitle architecture, beat-matched sound design, and retention hooks.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-400">
                  <span className="px-2.5 py-1 rounded-xs bg-white/[0.02] border border-white/[0.06] text-white">CapCut</span>
                  <span className="px-2.5 py-1 rounded-xs bg-white/[0.02] border border-white/[0.06] text-white">Adobe Premiere Pro</span>
                  <span className="px-2.5 py-1 rounded-xs bg-caribbean/15 text-caribbean border border-caribbean/30 font-semibold">9:16 Vertical Reels</span>
                </div>
              </div>

              {/* Sequence of All 3 Real Milestones from EXPERIENCE */}
              <div className="space-y-10 sm:space-y-14">
                {EXPERIENCE.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-7 md:p-8 bg-[#09090f] border border-white/[0.08] hover:border-caribbean/40 rounded-sm relative transition-all duration-300 group"
                  >
                    {/* Viewfinder Corners */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-caribbean/60 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-caribbean/60 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-caribbean/60 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-caribbean/60 pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* Left Meta & Role */}
                      <div className="lg:col-span-5 space-y-3">
                        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-[11px]">
                          <span className={`px-2 py-0.5 rounded-xs border font-bold uppercase tracking-wider ${
                            idx === 0
                              ? 'bg-caribbean/15 text-caribbean border-caribbean/40'
                              : 'bg-white/[0.04] text-beige border-white/10'
                          }`}>
                            {item.period}
                          </span>
                          <span className="text-zinc-600">·</span>
                          <span className="text-zinc-400 font-semibold uppercase">LOG 0{idx + 1}</span>
                          <span className="text-zinc-600 hidden xs:inline">·</span>
                          <span className="text-zinc-500 hidden xs:inline flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-caribbean" />
                            {item.location}
                          </span>
                        </div>

                        <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tight group-hover:text-caribbean transition-colors">
                          {item.role}
                        </h4>

                        <div className="font-mono text-xs sm:text-sm text-caribbean font-semibold uppercase tracking-wider">
                          {item.company}
                        </div>

                        <p className="text-zinc-300 font-light text-xs sm:text-sm leading-relaxed pt-1">
                          {item.description}
                        </p>
                      </div>

                      {/* Right Deliverables Multi-Track Console */}
                      <div className="lg:col-span-7 space-y-2.5">
                        <span className="font-mono text-[10px] text-beige uppercase tracking-widest block font-medium">
                          PRODUCTION DELIVERABLES & OUTPUT
                        </span>

                        <div className="space-y-2">
                          {item.deliverables.map((deliv, dIdx) => (
                            <div
                              key={dIdx}
                              onMouseEnter={playHoverSound}
                              className="p-3 sm:p-3.5 bg-black/60 border border-white/[0.05] hover:border-caribbean/50 hover:bg-[#101018] rounded-xs flex items-start space-x-3 transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-caribbean mt-1.5 flex-shrink-0" />
                              <div className="flex-1">
                                <span className="font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed block">
                                  {deliv}
                                </span>
                              </div>
                              <span className="font-mono text-[9px] text-zinc-600 flex-shrink-0 uppercase">
                                TRACK 0{dIdx + 1}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-500">
                          <span className="px-2 py-0.5 rounded-xs bg-white/[0.02] border border-white/[0.04] text-zinc-400">
                            {idx === 0 ? '4K Wedding Cinema & Automotive' : idx === 1 ? 'Destination Travel & Food Reels' : 'Executive Keynotes & Teasers'}
                          </span>
                          <span className="px-2 py-0.5 rounded-xs bg-white/[0.02] border border-white/[0.04] text-caribbean">
                            Fast-Cut Retention Hook
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------
              TAB 02: DIGITAL MARKETING (GROWTH, CONTENT PLANNING & SEO)
              Focus on audience retention, scheduled publishing & SEO
              ---------------------------------------------------------- */}
          {activeTab === 'digital-marketing' && (
            <div className="space-y-8 sm:space-y-12 animate-fadeIn">
              {/* Category Header Banner */}
              <div className="p-4 sm:p-6 bg-[#08080c] border border-white/[0.08] rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] sm:text-[11px] text-beige tracking-widest uppercase block mb-1 font-semibold">
                    STRATEGIC DISCIPLINE // 02
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tight">
                    DIGITAL MARKETING & SEO STRATEGY
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-zinc-400 mt-1">
                    Content planning, hashtag research, organic reach acceleration, and audience engagement.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-400">
                  <span className="px-2.5 py-1 rounded-xs bg-white/[0.02] border border-white/[0.06] text-white">Content Calendars</span>
                  <span className="px-2.5 py-1 rounded-xs bg-white/[0.02] border border-white/[0.06] text-white">Basic SEO</span>
                  <span className="px-2.5 py-1 rounded-xs bg-caribbean/15 text-caribbean border border-caribbean/30 font-semibold">Instagram Growth</span>
                </div>
              </div>

              {/* 5 Real Documented Responsibilities as a Structured Pipeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {[
                  {
                    step: 'NODE 01',
                    title: 'CONTENT PLANNING & CALENDARIZATION',
                    desc: 'Structured scheduling and weekly thematic asset planning to maintain audience retention without publishing friction.',
                    highlight: 'REGULAR RELEASES'
                  },
                  {
                    step: 'NODE 02',
                    title: 'HASHTAG ARCHITECTURE & TREND RESEARCH',
                    desc: 'Identifying high-intent, niche-specific hashtags for organic discovery across Instagram feeds and Explore tabs.',
                    highlight: 'DISCOVERY INDEX'
                  },
                  {
                    step: 'NODE 03',
                    title: 'SEARCH ENGINE OPTIMIZATION (BASIC SEO)',
                    desc: 'Targeted metadata setup, profile keywords, and caption formatting for search indexability and discoverability.',
                    highlight: 'SEARCH RANKING'
                  },
                  {
                    step: 'NODE 04',
                    title: 'INSTAGRAM GROWTH STRATEGIES',
                    desc: 'Optimizing hook pacing, cover imagery, and audio trends for algorithmic feed recommendations and watch time.',
                    highlight: 'ORGANIC ACCELERATION'
                  },
                  {
                    step: 'NODE 05',
                    title: 'AUDIENCE ENGAGEMENT & COMMUNITY',
                    desc: 'Translating passive views into active interactions through consistent responses and brand voice retention.',
                    highlight: 'RETENTION CURVE'
                  },
                  {
                    step: 'NODE 06',
                    title: 'VIDEO EDITING & MARKETING SYNERGY',
                    desc: 'Aligning video cuts, 3-sec retention hooks, and thumbnail design with marketing release schedules for maximum reach.',
                    highlight: 'UNIFIED PIPELINE'
                  }
                ].map((node, nIdx) => (
                  <div
                    key={nIdx}
                    className="p-5 sm:p-6 bg-[#08080c] border border-white/[0.08] hover:border-caribbean/40 rounded-sm flex flex-col justify-between transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 mb-3">
                        <span className="text-caribbean font-bold">{node.step}</span>
                        <span className="px-1.5 py-0.5 rounded-xs bg-white/[0.03] border border-white/10 text-beige">
                          {node.highlight}
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tight mb-2 group-hover:text-caribbean transition-colors">
                        {node.title}
                      </h4>

                      <p className="text-zinc-400 font-light text-xs sm:text-sm leading-relaxed">
                        {node.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[9px] text-zinc-500">
                      <span>CADENCE: REGULAR</span>
                      <span className="text-caribbean font-semibold">ALGORITHMIC REACH</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CV Quotation Note */}
              <div className="p-4 bg-[#08080c] border-l-2 border-caribbean rounded-r-xs font-mono text-xs text-zinc-400 leading-relaxed italic">
                "Managed social media pages by planning content, editing creative assets, and publishing on regular schedules while applying SEO and growth strategies."
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------
              TAB 03: GRAPHIC DESIGN (KEPT SECONDARY AS REQUESTED)
              Thumbnails, social creatives, posters & brand assets
              ---------------------------------------------------------- */}
          {activeTab === 'graphic-design' && (
            <div className="space-y-8 sm:space-y-12 animate-fadeIn">
              {/* Category Header Banner */}
              <div className="p-4 sm:p-6 bg-[#08080c] border border-white/[0.08] rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 tracking-widest uppercase block mb-1 font-semibold">
                    SUPPORTING DISCIPLINE // 03 (SECONDARY)
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tight">
                    SUPPORTING GRAPHIC ASSETS & THUMBNAILS
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-zinc-400 mt-1">
                    Visual enhancement supporting video releases and social media brand identity.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-400">
                  <span className="px-2.5 py-1 rounded-xs bg-white/[0.02] border border-white/[0.06] text-white">Canva</span>
                  <span className="px-2.5 py-1 rounded-xs bg-white/[0.02] border border-white/[0.06] text-white">Adobe Photoshop</span>
                  <span className="px-2.5 py-1 rounded-xs bg-white/[0.02] border border-white/[0.06] text-beige">Swiss Typography</span>
                </div>
              </div>

              {/* 3 Secondary Design Asset Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 sm:p-6 bg-[#08080c] border border-white/[0.08] hover:border-caribbean/40 rounded-sm flex flex-col justify-between transition-all duration-300 group">
                  <div>
                    <span className="font-mono text-[10px] text-caribbean font-semibold tracking-wider uppercase block mb-2">
                      01 / OPTICAL HOOK
                    </span>
                    <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tight mb-2 group-hover:text-caribbean transition-colors">
                      YOUTUBE & REEL THUMBNAILS
                    </h4>
                    <p className="text-zinc-400 font-light text-xs sm:text-sm leading-relaxed">
                      Engineered to maximize viewer click-through rates through strong typography, facial expression isolation, and high-contrast color palettes.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.06] font-mono text-[10px] text-zinc-500">
                    CANVA & PHOTOSHOP · HIGH CTR
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-[#08080c] border border-white/[0.08] hover:border-caribbean/40 rounded-sm flex flex-col justify-between transition-all duration-300 group">
                  <div>
                    <span className="font-mono text-[10px] text-beige font-semibold tracking-wider uppercase block mb-2">
                      02 / SOCIAL ASSETS
                    </span>
                    <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tight mb-2 group-hover:text-caribbean transition-colors">
                      SOCIAL MEDIA CREATIVES & BANNERS
                    </h4>
                    <p className="text-zinc-400 font-light text-xs sm:text-sm leading-relaxed">
                      Cohesive post layouts, carousel templates, and digital advertising banners maintaining strict visual unity and brand consistency.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.06] font-mono text-[10px] text-zinc-500">
                    LAYOUT SYSTEMS · FEED UNITY
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-[#08080c] border border-white/[0.08] hover:border-caribbean/40 rounded-sm flex flex-col justify-between transition-all duration-300 group">
                  <div>
                    <span className="font-mono text-[10px] text-zinc-400 font-semibold tracking-wider uppercase block mb-2">
                      03 / HIERARCHY
                    </span>
                    <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tight mb-2 group-hover:text-caribbean transition-colors">
                      PROMOTIONAL POSTERS & LOGOS
                    </h4>
                    <p className="text-zinc-400 font-light text-xs sm:text-sm leading-relaxed">
                      Clean event posters, digital promotional material, and minimalist brand marks rooted in color science and clear hierarchical composition.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.06] font-mono text-[10px] text-zinc-500">
                    COLOR THEORY · VECTOR MARKS
                  </div>
                </div>
              </div>

              {/* CV Quotation Note */}
              <div className="p-4 bg-[#08080c] border-l-2 border-white/20 rounded-r-xs font-mono text-xs text-zinc-400 leading-relaxed italic">
                "Designed posters, thumbnails, banners, and social creatives using Canva and Adobe Photoshop while maintaining strict brand consistency and visual appeal."
              </div>
            </div>
          )}

        </div>

        {/* ============================================================
            04. FINAL CINEMATIC SECTION EXIT
            Thumb-friendly call-to-action leading into #contact
            ============================================================ */}
        <div className="mt-16 sm:mt-24 md:mt-32 pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 font-mono text-xs text-zinc-500">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <span className="w-1.5 h-1.5 rounded-full bg-caribbean animate-ping flex-shrink-0" />
            <span className="text-zinc-300 text-[11px] sm:text-xs">
              ACTIVE SELECTION: {activeTab.toUpperCase().replace('-', ' ')}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-4 w-full md:w-auto">
            <span className="text-zinc-600 hidden lg:inline">OPEN FOR VIDEO EDITING & MARKETING COMMISSIONS</span>
            <a
              href="#contact"
              onClick={playShutterSound}
              onMouseEnter={playHoverSound}
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 sm:py-2.5 rounded-xs bg-white/[0.03] hover:bg-caribbean hover:text-black border border-white/10 text-white font-bold transition-all duration-300 w-full sm:w-auto text-center min-h-[44px]"
              data-cursor="CONNECT"
            >
              <span>INITIATE COLLABORATION</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
