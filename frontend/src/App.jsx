import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import CodingProfiles from './sections/CodingProfiles';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0D0D0D] text-[#CCCCCC] min-h-screen font-['Manrope',sans-serif] overflow-x-hidden">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#3872FF] to-[#8BA8FF] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <main>
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Main content wrapper — matches reference's elevated inner container */}
        <div
          id="main-content"
          style={{
            background: '#0D0D0D',
            borderRadius: '40px 40px 0 0',
            boxShadow: 'inset 0 40px 100px -20px rgba(56, 114, 255, 0.08)',
            borderTop: '1px solid rgba(255, 255, 255, 0.07)',
          }}
        >
          <About />
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} />
          <Skills />
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} />
          <CodingProfiles />
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} />
          <Projects onSelectProject={setSelectedProject} />
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} />
          <Certifications />
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} />
          <Contact />
        </div>
      </main>

      <Footer />

      <Chatbot />

      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
