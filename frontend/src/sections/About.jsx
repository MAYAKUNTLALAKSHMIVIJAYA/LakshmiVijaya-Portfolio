import React from 'react';
import { ABOUT_STATS, ABOUT_TEXT } from '../data/profileData';

export default function About() {
  return (
    <section
      id="about"
      style={{ padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Kicker */}
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          marginBottom: 20, fontFamily: 'Manrope, sans-serif',
        }}>About Me</p>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(40px, 6vw, 90px)',
          alignItems: 'start',
        }}>
          {/* Left — text */}
          <div>
            <h2 style={{
              fontSize: 'clamp(28px, 3.6vw, 42px)',
              fontWeight: 800, lineHeight: 1.15,
              letterSpacing: '-0.03em', color: '#FFFFFF',
              marginBottom: 24, fontFamily: 'Manrope, sans-serif',
            }}>
              Building AI-driven solutions,<br />one project at a time.
            </h2>
            <p
              style={{
                fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.6)',
                marginBottom: 18, fontFamily: 'Manrope, sans-serif',
              }}
              dangerouslySetInnerHTML={{ __html: ABOUT_TEXT.p1 }}
            />
            <p
              style={{
                fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.6)',
                fontFamily: 'Manrope, sans-serif',
              }}
              dangerouslySetInnerHTML={{ __html: ABOUT_TEXT.p2 }}
            />

            {/* Journey highlights */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 32 }}>
              {['AI & Machine Learning', 'Full-Stack Development', 'Computer Vision', 'Problem Solving'].map(tag => (
                <span
                  key={tag}
                  style={{
                    padding: '8px 18px', borderRadius: 50,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'Manrope, sans-serif', fontSize: 13,
                    fontWeight: 600, color: 'rgba(255,255,255,0.65)',
                  }}
                >{tag}</span>
              ))}
            </div>
          </div>

          {/* Right — stat cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
          }}>
            {ABOUT_STATS.map((stat, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 24, padding: '32px 24px',
                  background: stat.accent
                    ? 'rgba(56,114,255,0.1)'
                    : 'rgba(255,255,255,0.03)',
                  border: stat.accent
                    ? '1px solid rgba(56,114,255,0.2)'
                    : '1px solid rgba(255,255,255,0.07)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: 'clamp(36px,4vw,52px)', fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: stat.accent ? '#8BA8FF' : '#FFFFFF',
                  fontFamily: 'Manrope, sans-serif',
                  lineHeight: 1,
                }}>
                  {stat.value}
                </div>
                <div style={{
                  marginTop: 10, fontSize: 13, fontWeight: 600,
                  color: 'rgba(255,255,255,0.45)', letterSpacing: '0.03em',
                  fontFamily: 'Manrope, sans-serif', textTransform: 'uppercase',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        strong { color: #fff; font-weight: 700; }
      `}</style>
    </section>
  );
}
