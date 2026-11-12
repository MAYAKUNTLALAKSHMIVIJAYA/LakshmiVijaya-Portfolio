import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/profileData';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Credentials', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 20,
          left: 0,
          right: 0,
          zIndex: 200,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 24px',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: 1000,
            borderRadius: 50,
            padding: '10px 20px',
            background: scrolled ? 'rgba(13,13,13,0.90)' : 'rgba(26,26,26,0.5)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
            transition: 'background 0.3s, box-shadow 0.3s',
            pointerEvents: 'all',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'none', border: 'none', cursor: 'pointer',
              textDecoration: 'none', padding: 0,
            }}
          >
            <img
              src="/images/logo.png"
              alt="ML Logo"
              style={{
                width: 38,
                height: 38,
                objectFit: 'contain',
                display: 'block',
              }}
            />
            <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: 700, fontSize: 15, color: '#fff', display: window.innerWidth < 480 ? 'none' : 'block' }}>
              Lakshmi
            </span>
          </button>

          {/* Desktop nav links */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: activeSection === link.href.replace('#', '') ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  padding: '8px 16px', borderRadius: 50,
                  fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: 14,
                  color: activeSection === link.href.replace('#', '') ? '#fff' : 'rgba(255,255,255,0.55)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = activeSection === link.href.replace('#', '') ? '#fff' : 'rgba(255,255,255,0.55)'}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={() => scrollTo('#contact')}
              style={{
                padding: '9px 22px', borderRadius: 50,
                background: '#F2F2F2', color: '#0D0D0D',
                fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13,
                border: 'none', cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}
              className="desktop-nav"
            >
              Let's Talk
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                display: 'none', background: 'none', border: 'none', cursor: 'pointer',
                padding: 8, borderRadius: 8, color: '#fff',
              }}
              className="mobile-nav"
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', top: 80, left: 20, right: 20, zIndex: 199,
            background: 'rgba(18,18,18,0.97)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24,
            padding: 20, display: 'flex', flexDirection: 'column', gap: 4,
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          }}
        >
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '14px 20px', borderRadius: 14, textAlign: 'left',
                fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: 16,
                color: 'rgba(255,255,255,0.8)', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {link.label}
            </button>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 8, paddingTop: 12 }}>
            <button
              onClick={() => { setMenuOpen(false); scrollTo('#contact'); }}
              style={{
                width: '100%', padding: '14px 20px', borderRadius: 50,
                background: '#F2F2F2', color: '#0D0D0D',
                fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15,
                border: 'none', cursor: 'pointer',
              }}
            >
              Let's Talk
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
