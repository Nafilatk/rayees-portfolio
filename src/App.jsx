import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showreel from './components/Showreel';
import SelectedWorks from './components/SelectedWorks';
import ProjectModal from './components/ProjectModal';
import AboutSection from './components/AboutSection';

import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

import ResumeModal from './components/ResumeModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenContact = () => {
    setIsContactOpen(true);
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      const firstInput = document.querySelector('#contact-form-side input');
      if (firstInput) firstInput.focus();
    }, 100);
  };

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const rafHandler = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafHandler);
    gsap.ticker.lagSmoothing(500, 33);

    // Refresh ScrollTrigger after elements mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(rafHandler);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-caribbean selection:text-black">
      {/* Custom Follower Cursor */}
      <CustomCursor />

      {/* Header Navigation */}
      <Navbar
        onOpenContact={handleOpenContact}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="relative z-20">
        <Hero onOpenShowreel={() => {
          document.getElementById('showreel')?.scrollIntoView({ behavior: 'smooth' });
        }} />

        <Showreel />

        <SelectedWorks onSelectProject={(project) => setSelectedProject(project)} />

        <AboutSection onOpenContact={handleOpenContact} />

        <ExperienceSection />

        <ContactSection
          isOpen={isContactOpen}
          onToggleContact={() => setIsContactOpen(prev => !prev)}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Case Study Deep-Dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Interactive Curriculum Vitae / Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
