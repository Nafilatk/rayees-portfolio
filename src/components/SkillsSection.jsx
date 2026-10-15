import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Clapperboard,
  Film,
  TrendingUp,
  Palette,
  Cpu,
  Award,
  Sparkles,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Crosshair,
  Clock,
  Monitor,
  Check,
  Layers,
  Sliders,
  Eye,
  ArrowUpRight
} from 'lucide-react';
import { playHoverSound, playShutterSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

// Verified skills dataset directly from Muhammed Rayees V's CV
const SKILL_SEQUENCES = [
  {
    id: 'video-editing',
    seqNumber: '01',
    code: 'SEQ_CUT // 01',
    title: 'VIDEO EDITING & REELS',
    role: 'Video Editor & Reels Specialist',
    icon: Film,
    aspectRatio: '9:16 & 2.39:1',
    codec: 'Apple ProRes 422 HQ',
    fps: '24.00 FPS',
    timecode: '00:01:24:18',
    previewImage: '/images/editing_suite.jpg',
    headline: 'Every cut is a rhythm. Every frame commands attention.',
    skills: [
      { name: 'Short-Form Video & Reels Editing', detail: 'High-pacing cuts & visual flow' },
      { name: 'Kinetic Cuts & Transitions', detail: 'Seamless scene transitions' },
      { name: 'Text Animation & Subtitle Creation', detail: 'Dynamic animated captions' },
      { name: 'Audio Sync & Music Editing', detail: 'Beat-matched audio impact' },
      { name: 'Basic Color Correction & Grading', detail: 'Mood & tonal balance' },
      { name: 'Visual Effects & Pacing Strategy', detail: 'Hook in first 3 seconds' }
    ],
    tools: ['CapCut', 'Adobe Premiere Pro', 'Audio Sync Engine'],
    cvHighlight: 'Created engaging Instagram Reels and short-form videos using transitions, visual effects, subtitles, and audio synchronization to elevate retention.',
    stageData: {
      tagline: 'TIMELINE MULTI-TRACK COMPOSITOR',
      metrics: [
        { label: 'RETENTION HOOK', value: '00:03:00' },
        { label: 'PACE CADENCE', value: 'FAST CUT' },
        { label: 'AUDIO STEMS', value: 'SYNCED' }
      ]
    }
  },
  {
    id: 'digital-marketing',
    seqNumber: '02',
    code: 'SEQ_ALGO // 02',
    title: 'DIGITAL MARKETING & SEO',
    role: 'Digital Marketing Associate',
    icon: TrendingUp,
    aspectRatio: '4:5 SOCIAL FEED',
    codec: 'Meta / Google Distribution',
    fps: 'REALTIME',
    timecode: '00:04:12:06',
    previewImage: '/images/aboutimage.jpeg',
    headline: 'Content engineered for the feed, optimized for discoverability.',
    skills: [
      { name: 'Social Media Page Management', detail: 'Consistent publishing schedules' },
      { name: 'Content Planning & Calendarization', detail: 'Strategic campaign scheduling' },
      { name: 'Search Engine Optimization (SEO)', detail: 'Discoverability & metadata' },
      { name: 'Hashtag Architecture & Research', detail: 'Niche targeting & reach' },
      { name: 'Instagram Growth Strategies', detail: 'Organic follower acceleration' },
      { name: 'Audience Engagement & Community', detail: 'Retention through interaction' }
    ],
    tools: ['Meta Business Suite', 'Basic SEO', 'Instagram Insights', 'Content Calendar'],
    cvHighlight: 'Managed social media pages by planning content, editing creative assets, and publishing on regular schedules while applying SEO and growth strategies.',
    stageData: {
      tagline: 'ALGORITHMIC REACH & RETENTION CURVE',
      metrics: [
        { label: 'DISCOVERY INDEX', value: 'OPTIMIZED' },
        { label: 'SCHEDULE CADENCE', value: '3X / WEEK' },
        { label: 'COMMUNITY RETENTION', value: 'HIGH' }
      ]
    }
  },
  {
    id: 'graphic-design',
    seqNumber: '03',
    code: 'SEQ_FRAME // 03',
    title: 'GRAPHIC DESIGN & BRANDING',
    role: 'Graphic Designer',
    icon: Palette,
    aspectRatio: '16:9 & 1:1 POSTER',
    codec: 'CMYK / RGB 300DPI',
    fps: 'STATIC / MOTION',
    timecode: '00:07:45:00',
    previewImage: '/images/grafic.png',
    headline: 'Stopping the scroll with disciplined typography and visual balance.',
    skills: [
      { name: 'High-CTR YouTube & Reel Thumbnails', detail: 'Maximized click-through rate' },
      { name: 'Social Media Creative Assets', detail: 'Instagram posts, carousels & stories' },
      { name: 'Promotional Posters & Banners', detail: 'Hierarchical event layouts' },
      { name: 'Basic Logo Design & Identity', detail: 'Minimalist brand marks' },
      { name: 'Layout Design & Swiss Typography', detail: 'Strict visual hierarchy' },
      { name: 'Color Theory & Composition', detail: 'Complementary color science' }
    ],
    tools: ['Adobe Photoshop', 'Canva', 'Color Theory', 'Layout Systems'],
    cvHighlight: 'Designed posters, thumbnails, banners, and social media creatives using Canva and Adobe Photoshop while maintaining visual consistency and brand appeal.',
    stageData: {
      tagline: 'OPTICAL BALANCE & GOLDEN RATIO GRID',
      metrics: [
        { label: 'THUMBNAIL CTR', value: 'MAXIMIZED' },
        { label: 'TYPOGRAPHIC GRID', value: 'SWISS RATIO' },
        { label: 'COLOR HARMONY', value: 'ACCENTUATED' }
      ]
    }
  },
  {
    id: 'technical-toolkit',
    seqNumber: '04',
    code: 'SEQ_CORE // 04',
    title: 'TECHNICAL ARSENAL',
    role: 'Software & Pipeline Engine',
    icon: Cpu,
    aspectRatio: 'CROSS-PLATFORM',
    codec: 'Multi-Format Render',
    fps: '60.00 FPS PIPELINE',
    timecode: '00:10:02:14',
    previewImage: '/images/hero_cinematic.jpg',
    headline: 'Agile creator pipeline: from raw camera roll to final broadcast export.',
    skills: [
      { name: 'CapCut Video Architecture', detail: 'Keyframes, ramps & transitions' },
      { name: 'Adobe Photoshop Retouching', detail: 'Compositing & raster graphics' },
      { name: 'Canva Pro Rapid Layouts', detail: 'Speed-to-publish digital templates' },
      { name: 'Basic SEO & Search Engine Indexing', detail: 'Targeted metadata setup' },
      { name: 'Social Media Content Schedulers', detail: 'Multi-platform release workflows' },
      { name: 'Digital Asset Optimization', detail: 'High-resolution compressed outputs' }
    ],
    tools: ['CapCut', 'Adobe Photoshop', 'Canva', 'SEO Platforms'],
    cvHighlight: 'Hands-on execution across industry-standard video, graphic design, and search engine optimization tools with zero friction in production.',
    stageData: {
      tagline: 'END-TO-END CREATIVE WORKFLOW ENGINE',
      metrics: [
        { label: 'TIMELINE FLOW', value: 'CAPCUT / PREMIERE' },
        { label: 'GRAPHIC ENGINE', value: 'PHOTOSHOP / CANVA' },
        { label: 'DEPLOY PIPELINE', value: 'SEO READY' }
      ]
    }
  },
  {
    id: 'professional-attributes',
    seqNumber: '05',
    code: 'SEQ_ETHIC // 05',
    title: 'PROFESSIONAL ATTRIBUTES',
    role: 'Work Ethic & Credentials',
    icon: Award,
    aspectRatio: 'EXECUTIVE DOSSIER',
    codec: 'Calicut Univ / Adi Group',
    fps: 'CONSISTENT',
    timecode: '00:12:30:00',
    previewImage: '/images/behind_the_frame.jpg',
    headline: 'Fast learning, attention to detail, and a commitment to delivery.',
    skills: [
      { name: 'Creative Problem Solving', detail: 'Fresh storytelling angles' },
      { name: 'Fast Learning & Trend Agility', detail: 'Rapid platform adaptation' },
      { name: 'Attention to Frame-by-Frame Detail', detail: 'Pixel and cut precision' },
      { name: 'Clear Client Communication', detail: 'Translating project briefs' },
      { name: 'Time Management & Deadlines', detail: '100% on-schedule delivery' },
      { name: 'Adaptability Across Formats', detail: 'Vertical reels to widescreen posters' }
    ],
    tools: ['Calicut University (B.Com)', 'Adi Group of Institute (Cert)'],
    cvHighlight: 'Quick learner with strong creativity, communication skills, and a commitment to delivering high-quality visual content while continuously expanding expertise.',
    stageData: {
      tagline: 'ACADEMIC & PROFESSIONAL CREDENTIALS',
      metrics: [
        { label: 'DEGREE', value: 'B.COM (CA) · 2022–2025' },
        { label: 'DIPLOMA', value: 'DIGITAL DESIGN · 2026' },
        { label: 'DELIVERY ETHIC', value: 'ZERO DELAYS' }
      ]
    }
  }
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const stageInteriorRef = useRef(null);
  
  const [activeSkillId, setActiveSkillId] = useState('video-editing');
  const [isPlaying, setIsPlaying] = useState(true);
  const [timecodeSeconds, setTimecodeSeconds] = useState(84);
  const [timelineScrub, setTimelineScrub] = useState(24);

  const activeSequence = SKILL_SEQUENCES.find((s) => s.id === activeSkillId) || null;
  const activeIndex = activeSkillId ? SKILL_SEQUENCES.findIndex((s) => s.id === activeSkillId) : -1;

  // Simulated Timecode ticker
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimecodeSeconds((prev) => (prev + 1) % 3600);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Format seconds to cinematic timecode HH:MM:SS:FF
  const formatTimecode = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    const frames = Math.floor((totalSec * 24) % 24);
    return `00:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
  };

  // Entrance & Stage Transitions with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        '.cut-header-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Console Stage entrance
      gsap.fromTo(
        '.cut-stage-anim',
        { opacity: 0, scale: 0.97, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cut-stage-anim',
            start: 'top 85%',
          }
        }
      );

      // Sequence navigation entrance
      gsap.fromTo(
        '.cut-sequence-anim',
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cut-sequence-anim',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // When active sequence changes, animate stage crossfade
  useEffect(() => {
    if (!stageInteriorRef.current) return;
    gsap.fromTo(
      stageInteriorRef.current,
      { opacity: 0.6, scale: 0.99 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }
    );
  }, [activeSkillId]);

  // Subtle pointer parallax on stage container (desktop only)
  const handleStageMouseMove = (e) => {
    if (window.innerWidth < 1024 || !stageInteriorRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(stageInteriorRef.current, {
      rotationY: x * 4,
      rotationX: -y * 4,
      duration: 0.8,
      ease: 'power1.out',
      transformPerspective: 1000,
    });
  };

  const handleStageMouseLeave = () => {
    if (!stageInteriorRef.current) return;
    gsap.to(stageInteriorRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: 'power1.out',
    });
  };

  // Directly activate sequence
  const activateSequence = (id) => {
    playShutterSound();
    setActiveSkillId(id);
    const idx = SKILL_SEQUENCES.findIndex((s) => s.id === id);
    setTimelineScrub((idx / (SKILL_SEQUENCES.length - 1)) * 100);
  };

  // Toggle skill sequence: click once -> active, click again -> unactive / select
  const toggleSequence = (id) => {
    playShutterSound();
    if (activeSkillId === id) {
      // Toggle off / deselect
      setActiveSkillId(null);
    } else {
      // Activate
      setActiveSkillId(id);
      const idx = SKILL_SEQUENCES.findIndex((s) => s.id === id);
      setTimelineScrub((idx / (SKILL_SEQUENCES.length - 1)) * 100);
    }
  };

  const handleNext = () => {
    if (activeIndex === -1) {
      activateSequence(SKILL_SEQUENCES[0].id);
    } else {
      const nextIdx = (activeIndex + 1) % SKILL_SEQUENCES.length;
      activateSequence(SKILL_SEQUENCES[nextIdx].id);
    }
  };

  const handlePrev = () => {
    if (activeIndex === -1) {
      activateSequence(SKILL_SEQUENCES[SKILL_SEQUENCES.length - 1].id);
    } else {
      const prevIdx = (activeIndex - 1 + SKILL_SEQUENCES.length) % SKILL_SEQUENCES.length;
      activateSequence(SKILL_SEQUENCES[prevIdx].id);
    }
  };

  const handleTimelineScrubClick = (e) => {
    playShutterSound();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const pct = clickX / rect.width;
    setTimelineScrub(pct * 100);

    const targetIdx = Math.min(
      SKILL_SEQUENCES.length - 1,
      Math.floor(pct * SKILL_SEQUENCES.length)
    );
    setActiveSkillId(SKILL_SEQUENCES[targetIdx].id);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 bg-black border-t border-white/[0.08] overflow-hidden select-none"
    >
      {/* Ambient Flare */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-caribbean/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-caribbean/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ============================================================
            1. EDITORIAL OPENING CREDITS INTRO: “BEHIND THE CUT”
            ============================================================ */}
        <div className="cut-header-anim border-b border-white/[0.08] pb-8 mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              {/* Technical Identifier */}
              <div className="flex items-center space-x-2 font-mono text-xs text-caribbean tracking-[0.3em] uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-caribbean animate-pulse" />
                <span>CREATIVE SYSTEM // SKILLS 001</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400">THE VISUAL OPERATING SYSTEM</span>
              </div>

              {/* Main Headline */}
              <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95]">
                BEHIND THE CUT.
              </h2>

              {/* Supporting Line */}
              <p className="mt-3 text-beige font-light text-sm sm:text-base md:text-lg tracking-wide max-w-2xl">
                “Every frame is a decision. Every cut tells a story.”
              </p>
            </div>

            {/* Right Telemetry Bar */}
            <div className="flex flex-col md:items-end font-mono text-xs text-zinc-400 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-white font-medium">REC ● LIVE</span>
                <span className="text-zinc-600">|</span>
                <span className="text-caribbean">{formatTimecode(timecodeSeconds)}</span>
              </div>
              <div className="text-[11px] text-zinc-500 tracking-wider uppercase">
                ACEScc · PRORES 422 · 24.00 FPS
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            2. ASYMMETRIC FILMMAKER WORKSTATION
            Left: Interactive Creative Console & Stage (Span 7)
            Right: Cinematic Sequence Navigator (Span 5)
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ==========================================================
              A. INTERACTIVE CREATIVE CONSOLE / VISUAL STAGE (7 cols)
              ========================================================== */}
          <div
            ref={stageRef}
            className="cut-stage-anim lg:col-span-7 bg-[#08080c] border border-white/[0.08] hover:border-white/20 rounded-sm relative transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden"
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
          >
            {/* Console Monitor Top Header Bar */}
            <div className="p-3.5 sm:p-4 bg-[#0d0d14] border-b border-white/[0.08] flex items-center justify-between font-mono text-[10px] md:text-xs">
              <div className="flex items-center space-x-3">
                <span className={`w-2 h-2 rounded-full ${activeSequence ? 'bg-caribbean animate-pulse' : 'bg-zinc-500'}`} />
                <span className="text-white font-bold tracking-widest uppercase">
                  {activeSequence
                    ? `MONITOR // 01 · ${activeSequence.aspectRatio}`
                    : 'MONITOR // STANDBY · 16:9 MASTER FEED'}
                </span>
                <span className="text-zinc-600 hidden sm:inline">|</span>
                <span className="text-zinc-400 hidden sm:inline">
                  {activeSequence ? activeSequence.codec : 'ALL 5 SEQUENCES LOADED'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-xs bg-white/[0.03] border border-white/10 text-beige">
                  {activeSequence ? activeSequence.fps : '24.00 FPS'}
                </span>
                <span className={`px-2 py-0.5 rounded-xs font-bold border ${
                  activeSequence
                    ? 'bg-black text-caribbean border-caribbean/30'
                    : 'bg-black text-zinc-400 border-white/10'
                }`}>
                  {activeSequence ? `TAKE 0${activeSequence.seqNumber}` : 'STANDBY'}
                </span>
              </div>
            </div>

            {/* Interior Reactive Stage Screen */}
            <div
              ref={stageInteriorRef}
              className="relative p-6 sm:p-8 md:p-10 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between overflow-hidden will-change-transform"
            >
              {activeSequence ? (
                <>
                  {/* Background Layer with Masked Real Project Media */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img
                      src={activeSequence.previewImage}
                      alt={activeSequence.title}
                      className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-[0.22] transform transition-transform duration-1000 ease-out scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
                  </div>

                  {/* Camera Viewfinder Crosshairs & Frame Ticks */}
                  <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-white/40 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-white/40 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-white/40 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-white/40 pointer-events-none" />
                  
                  {/* Center Crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                    <Crosshair className="w-10 h-10 text-white" />
                  </div>

                  {/* Stage Top Metadata Badge */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-zinc-400">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-caribbean" />
                      <span className="text-white font-medium">{activeSequence.code}</span>
                    </div>
                    <div className="text-beige text-[10px] tracking-widest uppercase">
                      {activeSequence.stageData.tagline}
                    </div>
                  </div>

                  {/* Dynamic Center Visual Focus */}
                  <div className="relative z-10 my-auto py-6 sm:py-8 space-y-4">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-black/80 border border-white/10 text-caribbean font-mono text-xs tracking-widest uppercase backdrop-blur-md">
                      <activeSequence.icon className="w-3.5 h-3.5" />
                      <span>{activeSequence.role}</span>
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase leading-snug">
                      {activeSequence.title}
                    </h3>

                    <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed max-w-xl">
                      {activeSequence.headline}
                    </p>

                    {/* Live Contextual Telemetry Meters */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 font-mono text-xs">
                      {activeSequence.stageData.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-2 sm:p-2.5 rounded-xs bg-black/70 border border-white/[0.08] backdrop-blur-md"
                        >
                          <span className="text-zinc-500 text-[9px] uppercase tracking-wider block">
                            {m.label}
                          </span>
                          <span className="text-caribbean font-bold text-xs sm:text-sm tracking-wide block mt-0.5 truncate">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stage Bottom Quotation */}
                  <div className="relative z-10 p-3 bg-black/80 border-l-2 border-caribbean rounded-r-xs font-mono text-xs text-zinc-400 leading-relaxed italic backdrop-blur-md">
                    "{activeSequence.cvHighlight}"
                  </div>
                </>
              ) : (
                <>
                  {/* Standby Background */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img
                      src="/images/hero_cinematic.jpg"
                      alt="Post Production Suite Standby"
                      className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-[0.16] transform scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]" />
                  </div>

                  {/* Camera Viewfinder Crosshairs */}
                  <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-white/20 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-white/20 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-white/20 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-white/20 pointer-events-none" />

                  {/* Center Crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-15">
                    <Crosshair className="w-12 h-12 text-white" />
                  </div>

                  {/* Top Standby Badge */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-zinc-400">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
                      <span className="text-zinc-300 font-medium tracking-wider">SUITE // STANDBY</span>
                    </div>
                    <div className="text-zinc-500 text-[10px] tracking-widest uppercase">
                      READY FOR INSPECTION
                    </div>
                  </div>

                  {/* Center Standby Message */}
                  <div className="relative z-10 my-auto py-6 sm:py-8 space-y-4">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-black/80 border border-white/10 text-beige font-mono text-xs tracking-widest uppercase backdrop-blur-md">
                      <Clapperboard className="w-3.5 h-3.5 text-caribbean" />
                      <span>CINEMATIC TIMELINE CONSOLE</span>
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase leading-snug">
                      ALL SEQUENCES STANDBY
                    </h3>

                    <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed max-w-xl">
                      Click any take in the sequence list to activate and inspect its editing workflow, pacing metrics, software toolkit, and production skills. Click again to unselect.
                    </p>

                    {/* Standby Summary Meters */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 font-mono text-xs">
                      <div className="p-2 sm:p-2.5 rounded-xs bg-black/70 border border-white/[0.08] backdrop-blur-md">
                        <span className="text-zinc-500 text-[9px] uppercase tracking-wider block">
                          AVAILABLE TAKES
                        </span>
                        <span className="text-caribbean font-bold text-xs sm:text-sm tracking-wide block mt-0.5">
                          05 SEQUENCES
                        </span>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded-xs bg-black/70 border border-white/[0.08] backdrop-blur-md">
                        <span className="text-zinc-500 text-[9px] uppercase tracking-wider block">
                          STATUS
                        </span>
                        <span className="text-white font-bold text-xs sm:text-sm tracking-wide block mt-0.5">
                          STANDBY / IDLE
                        </span>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded-xs bg-black/70 border border-white/[0.08] backdrop-blur-md">
                        <span className="text-zinc-500 text-[9px] uppercase tracking-wider block">
                          CONTROL
                        </span>
                        <span className="text-beige font-bold text-xs sm:text-sm tracking-wide block mt-0.5">
                          CLICK TO SELECT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stage Bottom Instruction */}
                  <div className="relative z-10 p-3 bg-black/80 border-l-2 border-white/30 rounded-r-xs font-mono text-xs text-zinc-400 leading-relaxed italic backdrop-blur-md">
                    "Select a take from the Take List on the right to examine individual sequence details, or click an active take to deactivate it."
                  </div>
                </>
              )}
            </div>

            {/* Interactive Timeline Scrubber Console */}
            <div className="p-4 bg-[#0a0a10] border-t border-white/[0.08] z-20">
              <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 mb-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 rounded-xs bg-white/[0.03] hover:bg-caribbean hover:text-black text-white transition-colors"
                    title={isPlaying ? "Pause Timeline Ticker" : "Play Timeline Ticker"}
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                  </button>
                  <span className="text-white font-semibold">SCRUB TIMELINE:</span>
                  <span className="text-caribbean font-bold">{Math.round(timelineScrub)}%</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrev}
                    onMouseEnter={playHoverSound}
                    className="p-1 rounded-xs hover:text-caribbean transition-colors text-zinc-400"
                    title="Previous Take"
                  >
                    <SkipBack className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-zinc-600">|</span>
                  <button
                    onClick={handleNext}
                    onMouseEnter={playHoverSound}
                    className="p-1 rounded-xs hover:text-caribbean transition-colors text-zinc-400"
                    title="Next Take"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Clickable / Draggable Track */}
              <div
                onClick={handleTimelineScrubClick}
                className="relative h-6 bg-black border border-white/[0.08] rounded-xs cursor-pointer group flex items-center px-2"
                title="Click anywhere to scrub between sequences"
              >
                {/* Film Perforation Sprocket Ticks */}
                <div className="absolute inset-x-2 inset-y-1 flex justify-between items-center pointer-events-none opacity-20">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="w-[1px] h-2 bg-white" />
                  ))}
                </div>

                {/* 5 Take Sequence Markers */}
                <div className="absolute inset-x-4 flex justify-between items-center pointer-events-none z-10 font-mono text-[9px] text-zinc-500">
                  {SKILL_SEQUENCES.map((s, idx) => (
                    <span
                      key={s.id}
                      className={activeSkillId === s.id ? 'text-caribbean font-bold' : ''}
                    >
                      0{s.seqNumber}
                    </span>
                  ))}
                </div>

                {/* Active Scrubber Head / Needle */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-caribbean shadow-[0_0_10px_#acee01] z-20 pointer-events-none transition-all duration-150"
                  style={{ left: `${timelineScrub}%` }}
                >
                  <div className="absolute top-0 -left-1.5 w-3.5 h-2 bg-caribbean rounded-b-xs shadow-[0_0_8px_#acee01]" />
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================================
              B. SKILL NAVIGATION AS A CINEMATIC SEQUENCE (5 cols)
              ========================================================== */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {/* Sequence Rack Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] font-mono text-xs">
              <span className="text-beige tracking-widest uppercase">
                TAKE LIST // SEQUENCES
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-zinc-500">
                  ACTIVE:{' '}
                  {activeSequence ? (
                    <span className="text-caribbean font-bold">0{activeSequence.seqNumber} / 05</span>
                  ) : (
                    <span className="text-zinc-400 font-medium">STANDBY</span>
                  )}
                </span>
                {activeSequence && (
                  <button
                    type="button"
                    onClick={() => setActiveSkillId(null)}
                    onMouseEnter={playHoverSound}
                    className="px-2 py-0.5 text-[10px] text-zinc-400 hover:text-caribbean border border-white/10 hover:border-caribbean/30 rounded-xs bg-white/[0.02] transition-colors"
                    title="Deselect active take"
                  >
                    RESET
                  </button>
                )}
              </div>
            </div>

            {/* The 5 Sequence Takes */}
            {SKILL_SEQUENCES.map((seq, idx) => {
              const isActive = seq.id === activeSkillId;
              const IconComp = seq.icon;

              return (
                <div
                  key={seq.id}
                  onClick={() => toggleSequence(seq.id)}
                  onMouseEnter={playHoverSound}
                  className={`cut-sequence-anim rounded-sm p-4 sm:p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#0f0f16] border-caribbean/60 shadow-xl ring-1 ring-caribbean/30'
                      : 'bg-[#07070a] border-white/[0.07] hover:border-white/20 hover:bg-[#0b0b10]'
                  }`}
                  data-cursor={isActive ? "DESELECT" : "SELECT"}
                >
                  {/* Sequence Card Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-sm flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-caribbean text-black font-bold'
                            : 'bg-white/[0.03] text-zinc-400 border border-white/10 group-hover:border-white/30'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>

                      <div>
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                          TAKE // 0{seq.seqNumber}
                        </span>
                        <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tight">
                          {seq.title}
                        </h4>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSequence(seq.id);
                      }}
                      className={`font-mono text-[10px] px-2.5 py-0.5 rounded-xs border uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-caribbean/15 text-caribbean border-caribbean/50 font-bold shadow-[0_0_10px_rgba(172,238,1,0.2)] hover:bg-caribbean hover:text-black'
                          : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:border-caribbean/40 hover:text-white'
                      }`}
                      title={isActive ? "Click to deactivate / unselect" : "Click to select"}
                    >
                      {isActive ? 'ACTIVE' : 'SELECT'}
                    </button>
                  </div>

                  {/* Expanded Skill Details when Active */}
                  {isActive && (
                    <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-3 animate-fadeIn">
                      <p className="text-zinc-300 font-light text-xs leading-relaxed">
                        {seq.headline}
                      </p>

                      {/* Verified Skills from CV */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                        {seq.skills.slice(0, 4).map((sk, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-2 bg-white/[0.02] border border-white/[0.04] rounded-xs flex items-center space-x-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-caribbean flex-shrink-0" />
                            <span className="text-zinc-200 truncate">{sk.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tools & Apps */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {seq.tools.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-xs bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-zinc-300 uppercase tracking-wider"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
