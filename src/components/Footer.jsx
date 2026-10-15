import React from 'react';
import { ArrowUp, Film } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playShutterSound } from '../utils/audio';

export default function Footer() {
  const scrollToTop = () => {
    playShutterSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-white/[0.08] py-12 px-6 md:px-12 text-zinc-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Brand Monogram & Role */}
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-sm bg-black border border-white/20 flex items-center justify-center font-display font-bold text-xs text-caribbean shadow-[0_0_8px_rgba(0,223,137,0.2)]">
            R
          </div>
          <div>
            <div className="text-white font-bold tracking-widest uppercase">
              {PERSONAL_INFO.name} · CINEMA & VISUAL STORIES
            </div>
            <div className="text-[10px] text-beige uppercase tracking-wider mt-0.5">
              ALL RIGHTS RESERVED © {new Date().getFullYear()}
            </div>
          </div>
        </div>

        {/* Center: Film Spec Marker in Beige */}
        <div className="text-center text-[10px] text-beige tracking-widest uppercase hidden lg:block font-medium">
          2.39:1 CINEMASCOPE ARCHIVE · CARIBBEAN ACCENT GRADE · 4K DCI
        </div>

        {/* Right: Back to Top */}
        <div className="flex items-center space-x-6">
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-zinc-300 hover:text-caribbean tracking-widest uppercase transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 text-caribbean" />
          </button>
        </div>
      </div>
    </footer>
  );
}
