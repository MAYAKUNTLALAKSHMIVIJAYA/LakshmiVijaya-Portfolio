import React from 'react';
import { PERSONAL_INFO } from '../data/profileData';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '28px clamp(24px,6vw,80px)',
      background: '#0D0D0D',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between',
        gap: 16,
      }}>
        {/* Copyright */}
        <span style={{
          fontFamily: 'Manrope, sans-serif', fontSize: 13,
          color: 'rgba(255,255,255,0.3)', fontWeight: 500,
        }}>
          © {year} Mayakuntla Lakshmi Vijaya
        </span>

        {/* Tagline */}
        <span style={{
          fontFamily: 'Manrope, sans-serif', fontSize: 13,
          color: 'rgba(255,255,255,0.2)', fontWeight: 500,
          textAlign: 'center', flex: '1 1 200px',
        }}>
          Designed & developed with curiosity, creativity, and code.
        </span>

        {/* Right: socials + back-to-top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.192.694.8.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>

          <button
            onClick={scrollTop}
            style={{
              padding: '8px 18px', borderRadius: 50,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontFamily: 'Manrope, sans-serif', fontSize: 12,
              fontWeight: 700, color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer', transition: 'all 0.2s',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  );
}
