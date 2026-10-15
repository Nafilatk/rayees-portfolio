import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MessageSquare, MapPin, Copy, Check, Send, ArrowUpRight, Sparkles } from 'lucide-react';
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

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [selectedService, setSelectedService] = useState('Nikkah Ceremony');
  const [formData, setFormData] = useState({ name: '', email: '', message: '', budget: '$2,000 — $5,000' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
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

  const services = [
    "Bride to Be",
    "Groom to Be",
    "Nikkah Ceremony",
    "Engagement",
    "Birthday Gala",
    "Automotive Cinema",
    "Travel & Drone",
    "Food & Culinary",
    "Keynote Presentation"
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-black border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main CTA Headline */}
        <div className="contact-reveal flex flex-col mb-16 border-b border-white/[0.08] pb-12">
          <div className="flex items-center space-x-2 font-mono text-xs text-caribbean tracking-[0.3em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>START A PROJECT // COMMISSION</span>
          </div>
          
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95] max-w-5xl select-none">
            LET'S CREATE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-caribbean via-white to-beige">
              SOMETHING WORTH WATCHING.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-beige font-light text-base md:text-lg">
            Have a wedding ceremony (Nikkah, Engagement, Bride or Groom to Be), birthday gala, automotive film, travel shoot, food commercial, or keynote presentation in need of cinematic storytelling? Let's connect.
          </p>
        </div>

        {/* Contact Form & Channel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Inquiries & Channels */}
          <div className="contact-reveal lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Direct Email Card with One-Click Copy */}
            <div className="p-6 sm:p-8 bg-[#070707] border border-white/[0.08] rounded-sm space-y-4 shadow-xl">
              <span className="font-mono text-xs text-beige tracking-widest uppercase block font-medium">
                DIRECT INBOX
              </span>
              
              <div className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight break-all">
                {PERSONAL_INFO.email}
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 bg-black/60 hover:bg-caribbean hover:text-black border border-white/10 rounded-sm font-mono text-xs tracking-wider transition-colors flex items-center space-x-2 text-zinc-200"
                  data-cursor="COPY"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-caribbean" />
                      <span className="text-caribbean font-semibold">COPIED TO CLIPBOARD</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY EMAIL</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="px-4 py-2 bg-caribbean text-black font-mono text-xs font-semibold tracking-wider rounded-sm hover:bg-white transition-colors flex items-center space-x-1.5 shadow-lg shadow-caribbean/20"
                >
                  <span>COMPOSE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="space-y-4">
              <span className="font-mono text-xs text-beige tracking-widest uppercase block font-medium">
                CREATIVE NETWORKS & COMMISSIONS
              </span>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <a
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  className="p-3 bg-[#070707] border border-white/10 hover:border-caribbean text-zinc-300 hover:text-white rounded-sm flex items-center justify-between transition-colors group"
                >
                  <span className="flex items-center space-x-2">
                    <InstagramIcon className="w-4 h-4 text-caribbean" />
                    <span>INSTAGRAM</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-caribbean transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.behance}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  className="p-3 bg-[#070707] border border-white/10 hover:border-caribbean text-zinc-300 hover:text-white rounded-sm flex items-center justify-between transition-colors group"
                >
                  <span className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-caribbean" />
                    <span>BEHANCE</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-caribbean transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  className="p-3 bg-[#070707] border border-white/10 hover:border-caribbean text-zinc-300 hover:text-white rounded-sm flex items-center justify-between transition-colors group"
                >
                  <span className="flex items-center space-x-2">
                    <LinkedinIcon className="w-4 h-4 text-caribbean" />
                    <span>LINKEDIN</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-caribbean transition-colors" />
                </a>

                <a
                  href={`https://wa.me/${PERSONAL_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  className="p-3 bg-[#070707] border border-white/10 hover:border-caribbean text-zinc-300 hover:text-white rounded-sm flex items-center justify-between transition-colors group"
                >
                  <span className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-caribbean" />
                    <span>WHATSAPP</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-caribbean transition-colors" />
                </a>
              </div>
            </div>

            {/* Location & Availability Note */}
            <div className="flex items-start space-x-3 p-4 bg-[#070707] border border-white/10 rounded-sm font-mono text-xs text-zinc-300">
              <MapPin className="w-4 h-4 text-caribbean flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-white block font-medium">LOCATION & ON-SITE COMMISSIONS</span>
                <span className="text-beige text-[11px] block mt-0.5">{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Project Inquiry Form */}
          <div className="contact-reveal lg:col-span-7 bg-[#070707] border border-white/[0.08] p-8 sm:p-10 rounded-sm shadow-2xl">
            {formSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-caribbean/10 border border-caribbean text-caribbean mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(0,223,137,0.2)]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white tracking-tight uppercase">
                  MESSAGE TRANSMITTED
                </h3>
                <p className="text-beige text-sm font-light max-w-md mx-auto">
                  Thank you for reaching out. I review all project proposals and respond within 24–48 hours with availability and custom scoping.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-6 py-2 border border-white/20 font-mono text-xs text-white hover:border-caribbean hover:text-caribbean transition-colors"
                >
                  SEND ANOTHER INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-mono text-xs text-beige tracking-widest uppercase block mb-3 font-medium">
                    CHOOSE YOUR INQUIRY SERVICE
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {services.map((srv) => (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => setSelectedService(srv)}
                        className={`p-2.5 text-center font-mono text-xs rounded-sm border transition-all ${
                          selectedService === srv
                            ? 'bg-caribbean text-black font-bold border-caribbean shadow-md shadow-caribbean/20'
                            : 'bg-black text-zinc-300 border-white/10 hover:border-caribbean/60'
                        }`}
                      >
                        {srv}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-xs text-beige tracking-widest uppercase block mb-2 font-medium">
                      YOUR NAME / CLIENT
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq / Ayesha"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black border border-white/15 focus:border-caribbean rounded-sm px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-beige tracking-widest uppercase block mb-2 font-medium">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contact@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black border border-white/15 focus:border-caribbean rounded-sm px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-beige tracking-widest uppercase block mb-2 font-medium">
                    EVENT DETAILS, DATES & REQUIREMENTS
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your event date, location, desired coverage (Nikkah, Bride/Groom to Be, Automotive shoot, Travel, Food promo, etc.)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black border border-white/15 focus:border-caribbean rounded-sm px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={playHoverSound}
                  className="w-full py-4 bg-caribbean hover:bg-white text-black font-mono font-bold text-xs tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl shadow-caribbean/20"
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
    </section>
  );
}
