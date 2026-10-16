import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThreeCanvas from './components/ThreeCanvas';
import Showreel from './components/Showreel';
import SelectedWorks from './components/SelectedWorks';
import ProjectModal from './components/ProjectModal';
import AboutSection from './components/AboutSection';

import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

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

      {/* Floating 3D Lens Background Object (Subtle & Non-distracting) */}
      <div className="absolute top-0 left-0 right-0 h-screen pointer-events-none z-10 overflow-hidden">
        <ThreeCanvas />
      </div>

      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="relative z-20">
        <Hero onOpenShowreel={() => {
          document.getElementById('showreel')?.scrollIntoView({ behavior: 'smooth' });
        }} />

        <Showreel />

        <SelectedWorks onSelectProject={(project) => setSelectedProject(project)} />

        <AboutSection />



        <ExperienceSection />

        <ContactSection />
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
    </div>
  );
}
