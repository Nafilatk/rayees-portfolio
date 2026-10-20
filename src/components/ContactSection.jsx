import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Copy, Check, Send, ArrowUpRight, Sparkles, Download, Eye, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playHoverSound, playShutterSound } from '../utils/audio';

// Clean SVG Icons for brand socials
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection({ isOpen, onToggleContact, onOpenResume }) {
  const sectionRef = useRef(null);
  const formContainerRef = useRef(null);
  const [internalOpen, setInternalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedService, setSelectedService] = useState('Nikkah Ceremony');
  const [formData, setFormData] = useState({ name: '', email: '', message: '', budget: '$2,000 — $5,000' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isSectionVisible = isOpen !== undefined ? isOpen : internalOpen;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    playShutterSound();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playShutterSound();
    setFormSubmitted(true);
  };

  const handleToggleClick = () => {
    playShutterSound();
    if (onToggleContact) {
      onToggleContact();
    } else {
      setInternalOpen(prev => !prev);
    }

    if (!isSectionVisible) {
      setTimeout(() => {
        const formSide = document.getElementById('contact-dropdown') || formContainerRef.current;
        if (formSide) {
          formSide.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          const firstInput = formSide.querySelector('input');
          if (firstInput) {
            setTimeout(() => firstInput.focus(), 600);
          }
        }
      }, 150);
    }
  };

  const services = [
    "Bride & Groom to Be",
    "Groom & Bride Entry",
    "Nikkah Ceremony",
    "Engagement",
    "Birthday Gala",
    "Automotive Cinema",
    "Travel & Drone",
    "Food & Culinary",
    "Keynote Presentation",
    "Wedding full package",
    "Other"
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-10 bg-black border-t border-white/[0.08]"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Main CTA Compact Headline */}
        <div className="contact-reveal flex flex-col mb-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-center space-x-2 font-mono text-[10px] text-caribbean tracking-[0.25em] uppercase mb-2">
            <Sparkles className="w-3 h-3" />
            <span>START A PROJECT // COMMISSION</span>
          </div>
          
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95] max-w-5xl select-none">
            LET'S CREATE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-caribbean via-white to-beige">
              SOMETHING WORTH WATCHING.
            </span>
          </h2>

          <p className="mt-2.5 max-w-xl text-zinc-400 font-light text-xs sm:text-sm leading-relaxed">
            Have a wedding ceremony (Nikkah, Engagement, Bride or Groom to Be), birthday gala, automotive film, travel shoot, food commercial, or keynote presentation in need of cinematic storytelling? Let's connect.
          </p>

          {/* Action Strip: Enquiry Button + View Resume + Download CV */}
          <div className="mt-5 flex items-center flex-wrap gap-2.5">
            {/* Primary Enquiry Dropdown Trigger Button */}
            <button
              type="button"
              onClick={handleToggleClick}
              onMouseEnter={playHoverSound}
              aria-expanded={isSectionVisible}
              aria-controls="contact-dropdown"
              className={`inline-flex items-center space-x-2.5 px-4 sm:px-5 py-2.5 font-mono font-bold text-xs tracking-wider uppercase rounded-sm transition-all duration-300 shadow-md group ${
                isSectionVisible
                  ? 'bg-white text-black border border-white hover:bg-caribbean hover:text-black'
                  : 'bg-caribbean text-black hover:bg-white shadow-caribbean/20'
              }`}
              data-cursor="ENQUIRE"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{isSectionVisible ? 'HIDE ENQUIRY SECTION' : 'ENQUIRE NOW'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  isSectionVisible ? 'rotate-180' : 'group-hover:translate-y-0.5'
                }`}
              />
            </button>

          </div>
        </div>

        {/* Contact Form & Channel Grid — Dropdown Drawer */}
        <div
          id="contact-dropdown"
          className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isSectionVisible
              ? 'grid-rows-[1fr] opacity-100 mt-6'
              : 'grid-rows-[0fr] opacity-0 pointer-events-none mt-0'
          }`}
          aria-hidden={!isSectionVisible}
        >
          <div className="overflow-hidden">
            <div 
              id="contact-side" 
              ref={formContainerRef}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-2 pb-2 transition-all duration-500 ease-out ${
                isSectionVisible ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
              }`}
            >
              {/* Left Column: Direct Inquiries & Channels */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                
                {/* Direct Email Card with One-Click Copy */}
                <div className="p-4 sm:p-5 bg-black border border-white/[0.08] rounded-sm space-y-3 shadow-md">
                  <span className="font-mono text-[10px] text-beige tracking-widest uppercase block font-medium">
                    DIRECT INBOX
                  </span>
                  
                  <div className="font-bold text-base sm:text-lg text-white tracking-tight break-all">
                    {PERSONAL_INFO.email}
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <button
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 bg-black/60 hover:bg-caribbean hover:text-black border border-white/10 rounded-sm font-mono text-[11px] tracking-wider transition-colors flex items-center space-x-1.5 text-zinc-200"
                      data-cursor="COPY"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-caribbean" />
                          <span className="text-caribbean font-semibold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>COPY EMAIL</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="px-3 py-1.5 bg-caribbean text-black font-mono text-[11px] font-semibold tracking-wider rounded-sm hover:bg-white transition-colors flex items-center space-x-1 shadow-md shadow-caribbean/20"
                    >
                      <span>COMPOSE</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Social Network Links (Instagram & LinkedIn Only) */}
                <div className="space-y-2.5">
                  <span className="font-mono text-[10px] text-beige tracking-widest uppercase block font-medium">
                    CREATIVE NETWORKS & COMMISSIONS
                  </span>

                  <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                    <a
                      href={PERSONAL_INFO.instagram}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHoverSound}
                      className="p-2.5 bg-black border border-white/10 hover:border-caribbean text-zinc-300 hover:text-white rounded-sm flex items-center justify-between transition-colors group"
                    >
                      <span className="flex items-center space-x-2">
                        <InstagramIcon className="w-3.5 h-3.5 text-caribbean" />
                        <span className="text-[11px]">INSTAGRAM</span>
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-caribbean transition-colors" />
                    </a>

                    <a
                      href={PERSONAL_INFO.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHoverSound}
                      className="p-2.5 bg-black border border-white/10 hover:border-caribbean text-zinc-300 hover:text-white rounded-sm flex items-center justify-between transition-colors group"
                    >
                      <span className="flex items-center space-x-2">
                        <WhatsAppIcon className="w-3.5 h-3.5 text-caribbean" />
                        <span className="text-[11px]">WHATSAPP</span>
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-caribbean transition-colors" />
                    </a>
                  </div>
                </div>

                {/* Location & Availability Note */}
                <div className="flex items-start space-x-2.5 p-3 bg-black border border-white/10 rounded-sm font-mono text-[11px] text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-caribbean flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white block font-medium">LOCATION & ON-SITE COMMISSIONS</span>
                    <span className="text-beige text-[10px] block mt-0.5">{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                {/* CV Download & View Card */}
                <div className="p-3.5 sm:p-4 bg-black border border-white/10 hover:border-caribbean/50 rounded-sm transition-all duration-300 flex items-center justify-between group">
                  <div 
                    className="flex items-center space-x-2.5 cursor-pointer flex-1"
                    onClick={() => {
                      playShutterSound();
                      if (onOpenResume) onOpenResume();
                    }}
                  >
                    <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 group-hover:border-caribbean/50 flex items-center justify-center transition-colors">
                      <Eye className="w-3.5 h-3.5 text-zinc-300 group-hover:text-caribbean transition-colors" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-caribbean tracking-widest uppercase block font-semibold">CURRICULUM VITAE</span>
                      <span className="font-mono text-xs text-white font-medium">Muhammed Rayees V</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        playShutterSound();
                        if (onOpenResume) onOpenResume();
                      }}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-xs font-mono text-[10px] tracking-wider transition-colors border border-white/10"
                    >
                      VIEW
                    </button>
                    <a
                      href="/Muhammed_Rayees_CV.pdf"
                      download="Muhammed_Rayees_CV.pdf"
                      onClick={playShutterSound}
                      onMouseEnter={playHoverSound}
                      title="Download PDF"
                      className="p-1.5 bg-caribbean/10 hover:bg-caribbean text-caribbean hover:text-black rounded-xs transition-colors border border-caribbean/30"
                    >
                      <Download className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Project Inquiry Form */}
              <div id="contact-form-side" className="lg:col-span-7 bg-black border border-white/[0.08] p-5 sm:p-7 rounded-sm shadow-xl transition-all duration-300">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-caribbean/10 border border-caribbean text-caribbean mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(0,223,137,0.2)]">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white tracking-tight uppercase">
                      MESSAGE TRANSMITTED
                    </h3>
                    <p className="text-beige text-xs font-light max-w-sm mx-auto">
                      Thank you for reaching out. I review all project proposals and respond within 24–48 hours with availability and scoping.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-3 px-4 py-1.5 border border-white/20 font-mono text-xs text-white hover:border-caribbean hover:text-caribbean transition-colors rounded-xs"
                    >
                      SEND ANOTHER INQUIRY
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="font-mono text-[10px] text-beige tracking-widest uppercase block mb-2 font-medium">
                        CHOOSE YOUR INQUIRY SERVICE
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        {services.map((srv) => (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => setSelectedService(srv)}
                            className={`p-2 text-center font-mono text-[11px] rounded-sm border transition-all ${
                              selectedService === srv
                                ? 'bg-caribbean text-black font-bold border-caribbean shadow-sm shadow-caribbean/20'
                                : 'bg-black text-zinc-300 border-white/10 hover:border-caribbean/60'
                            }`}
                          >
                            {srv}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[10px] text-beige tracking-widest uppercase block mb-1.5 font-medium">
                          YOUR NAME / CLIENT
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tariq / Ayesha"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-black border border-white/15 focus:border-caribbean rounded-sm px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-[10px] text-beige tracking-widest uppercase block mb-1.5 font-medium">
                          EMAIL ADDRESS
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="contact@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-black border border-white/15 focus:border-caribbean rounded-sm px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-beige tracking-widest uppercase block mb-1.5 font-medium">
                        EVENT DETAILS, DATES & REQUIREMENTS
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell me about your event date, location, desired coverage (Nikkah, Bride/Groom to Be, Automotive shoot, Travel, Food promo, etc.)..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-black border border-white/15 focus:border-caribbean rounded-sm px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      onMouseEnter={playHoverSound}
                      className="w-full py-3 bg-caribbean hover:bg-white text-black font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-caribbean/20 rounded-sm"
                      data-cursor="TRANSMIT"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>SUBMIT INQUIRY</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
