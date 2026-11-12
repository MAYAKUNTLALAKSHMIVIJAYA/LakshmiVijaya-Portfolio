import React, { useState } from 'react';
import { PERSONAL_INFO, HERO_SKILLS } from '../data/profileData';

const GH_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.192.694.8.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LI_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const EMAIL_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const DOWN_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 5v14M5 12l7 7 7-7"/>
  </svg>
);

export default function Hero({ onOpenResume }) {
  const [imgError, setImgError] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '140px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow behind avatar */}
      <div
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -60%)',
          width: '70vw', height: '70vw',
          maxWidth: 700, maxHeight: 700,
          background: 'radial-gradient(circle, rgba(56,114,255,0.13) 0%, rgba(13,13,13,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Avatar */}
      <div
        style={{
          position: 'relative', zIndex: 1,
          width: 200, height: 200, borderRadius: '50%',
          border: '2.5px solid rgba(255,255,255,0.15)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 0 0 8px rgba(56,114,255,0.07)',
          marginBottom: 20, overflow: 'hidden',
          background: 'rgba(56,114,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {!imgError ? (
          <img
            src="/images/profile.jpg"
            alt="Mayakuntla Lakshmi Vijaya"
            loading="eager"
            fetchpriority="high"
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 6,
          }}>
            <span style={{ fontSize: 56, lineHeight: 1 }}>👩‍💻</span>
          </div>
        )}
      </div>

      {/* AI Developer badge — sits just below avatar */}
      <div
        style={{
          position: 'relative', zIndex: 1,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '9px 22px', borderRadius: 50, marginBottom: 22,
          background: 'rgba(56,114,255,0.14)',
          border: '1px solid rgba(56,114,255,0.3)',
          boxShadow: '0 0 16px rgba(56,114,255,0.15)',
          fontFamily: 'Manrope, sans-serif', fontSize: 14,
          fontWeight: 800, color: '#8BA8FF', letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#8BA8FF', display: 'inline-block', boxShadow: '0 0 8px #8BA8FF', animation: 'pulse 2s infinite' }} />
        AI Developer
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>

      {/* Greeting kicker */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
          marginBottom: 14, fontFamily: 'Manrope, sans-serif',
        }}>
          Hi, I'm
        </p>

        {/* Name */}
        <h1 style={{
          fontSize: 'clamp(38px, 6vw, 68px)',
          fontWeight: 800, lineHeight: 1.08,
          letterSpacing: '-0.035em', color: '#FFFFFF',
          marginBottom: 20, fontFamily: 'Manrope, sans-serif',
        }}>
          Mayakuntla Lakshmi Vijaya
        </h1>

        {/* Role tagline */}
        <p style={{
          fontSize: 'clamp(16px, 2.2vw, 21px)',
          fontWeight: 500, color: 'rgba(255,255,255,0.55)',
          maxWidth: 620, margin: '0 auto 32px',
          lineHeight: 1.6, fontFamily: 'Manrope, sans-serif',
        }}>
          Aspiring AI Developer & Full-Stack Engineer building intelligent solutions through code.
        </p>

        {/* Skill pills */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 10,
          justifyContent: 'center', marginBottom: 44,
        }}>
          {HERO_SKILLS.map(skill => (
            <div
              key={skill.name}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 50,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'Manrope, sans-serif', fontSize: 14,
                fontWeight: 600, color: 'rgba(255,255,255,0.8)',
                cursor: 'default', transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              <img src={skill.icon} alt={skill.name} width={18} height={18} style={{ objectFit: 'contain' }}
                onError={e => e.target.style.display = 'none'} />
              {skill.name}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 52 }}>
          <button
            onClick={() => scrollTo('projects')}
            style={{
              padding: '16px 36px', borderRadius: 50,
              background: '#F2F2F2', color: '#0D0D0D',
              fontFamily: 'Manrope, sans-serif', fontWeight: 800,
              fontSize: 15, border: 'none', cursor: 'pointer',
              letterSpacing: '-0.01em', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Explore My Projects
          </button>
          <a
            href="/resume.pdf"
            download="Mayakuntla_Lakshmi_Vijaya_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none',
              padding: '16px 36px', borderRadius: 50,
              background: 'transparent',
              color: 'rgba(255,255,255,0.75)',
              fontFamily: 'Manrope, sans-serif', fontWeight: 700,
              fontSize: 15, border: '1px solid rgba(255,255,255,0.15)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
            }}
          >
            Download Resume
          </a>
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 60 }}>
          {[
            { icon: GH_ICON, href: PERSONAL_INFO.github, label: 'GitHub' },
            { icon: LI_ICON, href: PERSONAL_INFO.linkedin, label: 'LinkedIn' },
            { icon: EMAIL_ICON, href: `mailto:${PERSONAL_INFO.email}`, label: 'Email' },
          ].map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noreferrer"
              aria-label={label}
              style={{
                width: 50, height: 50, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => scrollTo('about')}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.3)', fontFamily: 'Manrope,sans-serif',
            fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            transition: 'color 0.2s', margin: '0 auto',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
        >
          <span>Scroll</span>
          {DOWN_ICON}
        </button>
      </div>
    </section>
  );
}
