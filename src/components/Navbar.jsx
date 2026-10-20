import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Film, Circle } from 'lucide-react';
import { toggleMute, playHoverSound, playShutterSound } from '../utils/audio';

export default function Navbar({ onSelectWork, onOpenContact, onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Live studio clock
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0] + ' UTC' + (now.getTimezoneOffset() <= 0 ? '+' : '-') + Math.abs(Math.floor(now.getTimezoneOffset()/60)));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleAudioToggle = () => {
    const newMuted = toggleMute();
    setMuted(newMuted);
  };

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'SHOWREEL', href: '#showreel' },
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-black/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onClick={playShutterSound}
            onMouseEnter={playHoverSound}
            className="group flex items-center space-x-3 text-white"
            data-cursor="HOME"
          >
            <div className="w-8 h-8 rounded-sm bg-black border border-white/20 flex items-center justify-center font-display font-bold text-xs tracking-wider text-caribbean group-hover:border-caribbean transition-colors shadow-[0_0_10px_rgba(0,223,137,0.2)]">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-widest uppercase text-white group-hover:text-caribbean transition-colors">
                RAYEES
              </span>
              <span className="font-mono text-[9px] text-beige tracking-wider uppercase">
                CINEMA · EDITS & VISUALS
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.label === 'CONTACT' && onOpenContact) {
                    e.preventDefault();
                    onOpenContact();
                  }
                  playHoverSound();
                }}
                onMouseEnter={playHoverSound}
                className="relative text-xs font-mono font-medium tracking-[0.2em] text-zinc-300 hover:text-white transition-colors duration-300 py-1 group"
                data-cursor="NAV"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-caribbean transition-all duration-300 group-hover:w-full shadow-[0_0_6px_#acee01]" />
              </a>
            ))}

            {onOpenResume && (
              <button
                type="button"
                onClick={() => {
                  playShutterSound();
                  onOpenResume();
                }}
                onMouseEnter={playHoverSound}
                className="relative text-xs font-mono font-medium tracking-[0.2em] text-caribbean hover:text-white transition-colors duration-300 py-1 group"
                data-cursor="RESUME"
              >
                RESUME
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            )}
          </nav>

          {/* Right Actions: Time, Availability, Audio Toggle, CTA */}
          <div className="flex items-center space-x-4 md:space-x-6">
            
            {/* Availability Badge */}
            <div className="hidden xl:flex items-center space-x-2 px-3 py-1 rounded-full bg-black/60 border border-white/[0.1]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-caribbean opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-caribbean"></span>
              </span>
              <span className="text-[10px] font-mono tracking-wider text-beige uppercase font-medium">
                AVAILABLE FOR BOOKINGS
              </span>
            </div>

            {/* Audio Atmosphere Toggle */}
         

            {/* Contact CTA */}
            <button
              type="button"
              onClick={() => {
                playShutterSound();
                if (onOpenContact) onOpenContact();
                else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={playHoverSound}
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-sm border border-caribbean/60 text-caribbean font-mono text-xs tracking-widest hover:bg-caribbean hover:text-black transition-all duration-300 group shadow-md shadow-caribbean/10"
              data-cursor="CONTACT"
            >
              <span>INQUIRE</span>
              <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/98 backdrop-blur-2xl flex flex-col justify-center px-8 lg:hidden animate-fadeIn">
          <div className="flex flex-col space-y-6">
            <div className="font-mono text-xs text-caribbean tracking-widest uppercase mb-4">
              [ DIRECTORY // RAYEES VISUALS ]
            </div>
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  playShutterSound();
                  if (link.label === 'CONTACT' && onOpenContact) {
                    e.preventDefault();
                    onOpenContact();
                  }
                }}
                className="text-xl sm:text-2xl font-bold text-zinc-200 hover:text-caribbean transition-colors tracking-wider flex items-center justify-between border-b border-white/5 pb-3"
              >
                <span>{link.label}</span>
                <span className="text-xs text-beige">0{idx + 1}</span>
              </a>
            ))}

            {onOpenResume && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  playShutterSound();
                  onOpenResume();
                }}
                className="text-xl sm:text-2xl font-bold text-caribbean hover:text-white transition-colors tracking-wider flex items-center justify-between border-b border-white/5 pb-3 text-left"
              >
                <span>CURRICULUM VITAE (CV)</span>
                <span className="font-mono text-xs text-caribbean">VIEW</span>
              </button>
            )}

            <div className="pt-8 flex flex-col space-y-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  playShutterSound();
                  if (onOpenContact) onOpenContact();
                }}
                className="w-full text-center py-3 bg-caribbean text-black font-mono text-xs tracking-widest uppercase font-bold shadow-lg shadow-caribbean/20"
              >
                BOOK A COMMISSION
              </button>
              <div className="text-center font-mono text-[10px] text-beige tracking-widest uppercase">
                {timeStr}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
