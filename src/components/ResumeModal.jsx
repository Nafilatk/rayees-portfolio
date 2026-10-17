import { useEffect } from 'react';
import { X, Download, Printer, ExternalLink, Briefcase, GraduationCap, Award, Film, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playHoverSound, playShutterSound } from '../utils/audio';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    playShutterSound();
    window.open('/Muhammed_Rayees_CV.pdf', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-black border border-white/15 rounded-sm shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-caribbean animate-pulse" />
            <span className="font-mono text-xs text-caribbean uppercase tracking-widest font-bold">
              CURRICULUM VITAE // MUHAMMED RAYEES V
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* View / Open PDF */}
            <a
              href="/Muhammed_Rayees_CV.pdf"
              target="_blank"
              rel="noreferrer noopener"
              onMouseEnter={playHoverSound}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-sm bg-white/5 border border-white/15 text-zinc-300 hover:text-white hover:border-caribbean text-xs font-mono tracking-wider transition-colors"
              title="Open PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-caribbean" />
              <span className="hidden sm:inline">OPEN PDF</span>
            </a>

            {/* Direct Download */}
            <a
              href="/Muhammed_Rayees_CV.pdf"
              download="Muhammed_Rayees_CV.pdf"
              onClick={playShutterSound}
              onMouseEnter={playHoverSound}
              className="inline-flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-sm bg-caribbean text-black font-mono font-bold text-xs tracking-wider hover:bg-white transition-colors shadow-md shadow-caribbean/20"
              title="Download PDF resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD</span>
            </a>

            {/* Close */}
            <button
              onClick={() => {
                playShutterSound();
                onClose();
              }}
              onMouseEnter={playHoverSound}
              aria-label="Close resume viewer"
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Document */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 select-text">
          
          {/* Header Banner */}
          <div className="border-b border-white/10 pb-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-caribbean block mb-1">
                  OFFICIAL CREATIVE PROFILE
                </span>
                <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
                  MUHAMMED RAYEES V
                </h1>
                <p className="font-mono text-xs sm:text-sm text-zinc-300 tracking-wider mt-1 font-medium">
                  Videographer · Video Editor · Visual Storyteller
                </p>
              </div>

              {/* Quick Details */}
              <div className="font-mono text-xs text-zinc-400 space-y-1 md:text-right">
                <div className="flex items-center md:justify-end space-x-2">
                  <Phone className="w-3.5 h-3.5 text-caribbean" />
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
                <div className="flex items-center md:justify-end space-x-2">
                  <Mail className="w-3.5 h-3.5 text-caribbean" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center md:justify-end space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-caribbean" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statement */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 font-mono text-xs text-caribbean tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-caribbean" />
              <span>CREATIVE STATEMENT</span>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
              Creative videographer and video editor dedicated to turning raw moments into unforgettable cinematic stories. Specializing in sacred wedding ceremonies (Nikkah, Engagement, Bride or Groom to Be), milestone galas, high-speed automotive commercials, culinary storytelling, and retention-engineered vertical reels with beat-matched rhythm and kinetic visual flow.
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 font-mono text-xs text-caribbean tracking-widest uppercase">
              <Briefcase className="w-4 h-4 text-caribbean" />
              <span>PROFESSIONAL EXPERIENCE</span>
            </div>

            <div className="space-y-6">
              {/* Job 1 */}
              <div className="p-4 sm:p-5 bg-white/[0.02] border border-white/[0.07] rounded-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Lead Videographer & Director of Photography</h3>
                    <span className="font-mono text-xs text-caribbean font-semibold">Rayees Visual Productions</span>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 bg-white/5 px-2.5 py-1 rounded-sm w-fit">2024 — PRESENT</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-light list-disc list-inside">
                  <li>Full cinematic coverage of wedding milestones (Nikkah, Engagement, Bride & Groom celebrations) with Sony FX cinema rigs.</li>
                  <li>Directed car-to-car rolling automotive commercials with speed-matched editing and exhaust sound design sync.</li>
                  <li>Delivered broadcast-grade 4K CinemaScope masters along with optimized 9:16 vertical cuts for social engagement.</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="p-4 sm:p-5 bg-white/[0.02] border border-white/[0.07] rounded-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Short-Form Video & Reels Specialist</h3>
                    <span className="font-mono text-xs text-caribbean font-semibold">Creative Visual Media</span>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 bg-white/5 px-2.5 py-1 rounded-sm w-fit">2022 — 2024</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-light list-disc list-inside">
                  <li>Engineered high-retention short-form reels with kinetic cuts, dynamic subtitles, and 3-second hook architecture.</li>
                  <li>Handled audio beat-matching, sound stem mixing, and visual effects to boost algorithmic reach across Meta & YouTube.</li>
                  <li>Formulated structured content schedules, hashtag architectures, and search engine discoverability strategies.</li>
                </ul>
              </div>

              {/* Job 3 */}
              <div className="p-4 sm:p-5 bg-white/[0.02] border border-white/[0.07] rounded-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Video Editor & Motion Designer</h3>
                    <span className="font-mono text-xs text-caribbean font-semibold">Digital Motion Studio</span>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 bg-white/5 px-2.5 py-1 rounded-sm w-fit">2020 — 2022</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-light list-disc list-inside">
                  <li>Edited corporate keynote presentations, event teasers, and promotional brand campaigns.</li>
                  <li>Handled multi-camera audio/video synchronization, vocal leveling, and atmospheric sound design integration.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Core Competencies */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 font-mono text-xs text-caribbean tracking-widest uppercase">
              <Film className="w-4 h-4 text-caribbean" />
              <span>TECHNICAL COMPETENCIES & TOOLKIT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-sm space-y-2">
                <span className="text-caribbean font-bold block uppercase tracking-wider">VIDEO PRODUCTION</span>
                <p className="text-zinc-300 font-light leading-relaxed">
                  Cinematic Camera Work, Multi-Cam Sync, Lighting Rigs, Audio Sync, Color Grading
                </p>
              </div>

              <div className="p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-sm space-y-2">
                <span className="text-caribbean font-bold block uppercase tracking-wider">EDITING & MOTION</span>
                <p className="text-zinc-300 font-light leading-relaxed">
                  CapCut, Adobe Premiere Pro, Kinetic Subtitles, Sound Design, 9:16 Social Reels
                </p>
              </div>

              <div className="p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-sm space-y-2">
                <span className="text-caribbean font-bold block uppercase tracking-wider">DESIGN & GROWTH</span>
                <p className="text-zinc-300 font-light leading-relaxed">
                  Canva, Adobe Photoshop, High-CTR Thumbnails, Social Media Strategy, SEO
                </p>
              </div>
            </div>
          </div>

          {/* Education & Qualifications */}
          <div className="space-y-4 border-t border-white/10 pt-6">
            <div className="flex items-center space-x-2 font-mono text-xs text-caribbean tracking-widest uppercase">
              <GraduationCap className="w-4 h-4 text-caribbean" />
              <span>EDUCATION & CERTIFICATIONS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-sm space-y-1">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">ACADEMIC DEGREE</span>
                <h4 className="font-display font-bold text-base text-white">B.Com (Computer Application)</h4>
                <p className="font-mono text-xs text-caribbean">Calicut University</p>
                <span className="font-mono text-[11px] text-zinc-500 block">2022 — 2025</span>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-sm space-y-1">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">PROFESSIONAL CERTIFICATION</span>
                <h4 className="font-display font-bold text-base text-white">Digital Marketing & Designing</h4>
                <p className="font-mono text-caribbean text-xs">Adi Group of Institute</p>
                <span className="font-mono text-[11px] text-zinc-500 block">Certified 2026</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Sticky CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-white/10 bg-black">
          <span className="font-mono text-xs text-zinc-400">
            PDF ready for immediate download or print.
          </span>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <a
              href="/Muhammed_Rayees_CV.pdf"
              download="Muhammed_Rayees_CV.pdf"
              onClick={playShutterSound}
              className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-caribbean text-black font-mono font-bold text-xs tracking-wider uppercase rounded-sm hover:bg-white transition-colors shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF (OFFICIAL)</span>
            </a>

            <button
              onClick={() => {
                playShutterSound();
                onClose();
              }}
              className="px-4 py-2.5 border border-white/20 text-zinc-300 hover:text-white hover:border-white font-mono text-xs tracking-wider uppercase rounded-sm transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
