import React, { useState } from 'react';
import { EDUCATION, EXPERIENCE, ACHIEVEMENTS } from '../data/profileData';

export default function Certifications() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="certifications"
      style={{ padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          marginBottom: 20, fontFamily: 'Manrope, sans-serif',
        }}>Credentials</p>

        <h2 style={{
          fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800,
          letterSpacing: '-0.03em', color: '#FFFFFF',
          marginBottom: 48, fontFamily: 'Manrope, sans-serif',
        }}>Education, Experience & Achievements</h2>

        {/* ── Education ── */}
        <div style={{ marginBottom: 56 }}>
          <h3 style={{
            fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)', marginBottom: 24,
          }}>Education</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {EDUCATION.map((edu, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', gap: 24, alignItems: 'flex-start',
                  padding: '28px 32px', borderRadius: 24,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <span style={{ fontSize: 28, flexShrink: 0 }}>{edu.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: 8, marginBottom: 6,
                  }}>
                    <h4 style={{
                      fontFamily: 'Manrope, sans-serif', fontWeight: 800,
                      fontSize: 17, color: '#FFFFFF', margin: 0,
                    }}>{edu.degree}</h4>
                    <span style={{
                      fontFamily: 'Manrope, sans-serif', fontSize: 13,
                      color: 'rgba(255,255,255,0.4)', fontWeight: 600,
                    }}>{edu.period}</span>
                  </div>
                  <p style={{
                    fontFamily: 'Manrope, sans-serif', fontSize: 14,
                    color: 'rgba(255,255,255,0.5)', margin: '0 0 8px',
                  }}>{edu.institution}</p>
                  <span style={{
                    padding: '5px 14px', borderRadius: 50,
                    background: 'rgba(56,114,255,0.1)',
                    border: '1px solid rgba(56,114,255,0.2)',
                    fontFamily: 'Manrope, sans-serif', fontSize: 12,
                    fontWeight: 700, color: '#8BA8FF',
                  }}>{edu.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Experience ── */}
        <div style={{ marginBottom: 56 }}>
          <h3 style={{
            fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)', marginBottom: 24,
          }}>Experience</h3>
          {EXPERIENCE.map((exp, i) => (
            <div
              key={i}
              style={{
                padding: '32px', borderRadius: 24,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: 8, marginBottom: 10,
              }}>
                <div>
                  <h4 style={{
                    fontFamily: 'Manrope, sans-serif', fontWeight: 800,
                    fontSize: 20, color: '#FFFFFF', margin: '0 0 4px',
                  }}>{exp.role}</h4>
                  <p style={{
                    fontFamily: 'Manrope, sans-serif', fontSize: 15,
                    color: '#8BA8FF', fontWeight: 700, margin: 0,
                  }}>{exp.company}</p>
                </div>
                <span style={{
                  padding: '8px 18px', borderRadius: 50,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: 'Manrope, sans-serif', fontSize: 13,
                  fontWeight: 600, color: 'rgba(255,255,255,0.45)',
                  alignSelf: 'flex-start',
                }}>{exp.period}</span>
              </div>
              <p style={{
                fontFamily: 'Manrope, sans-serif', fontSize: 15,
                color: 'rgba(255,255,255,0.55)', lineHeight: 1.7,
                marginBottom: 20,
              }}>{exp.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {exp.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '6px 14px', borderRadius: 50,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'Manrope, sans-serif', fontSize: 12,
                    fontWeight: 600, color: 'rgba(255,255,255,0.45)',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Achievements ── */}
        <div>
          <h3 style={{
            fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)', marginBottom: 24,
          }}>Achievements & Leadership</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {ACHIEVEMENTS.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '32px', borderRadius: 28,
                  background: 'rgba(255,255,255,0.03)',
                  border: hovered === `ach-${i}`
                    ? '1px solid rgba(255,255,255,0.14)'
                    : '1px solid rgba(255,255,255,0.07)',
                  transform: hovered === `ach-${i}` ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hovered === `ach-${i}` ? '0 16px 36px rgba(0,0,0,0.35)' : 'none',
                  transition: 'all 0.25s',
                  cursor: 'default',
                }}
                onMouseEnter={() => setHovered(`ach-${i}`)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Number + icon */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', marginBottom: 20,
                }}>
                  <span style={{
                    fontFamily: 'Manrope, sans-serif', fontSize: 13,
                    fontWeight: 800, color: 'rgba(255,255,255,0.2)',
                    letterSpacing: '0.05em',
                  }}>{item.id}</span>
                  <span style={{ fontSize: 24 }}>{item.icon}</span>
                </div>

                <h4 style={{
                  fontFamily: 'Manrope, sans-serif', fontWeight: 800,
                  fontSize: 17, color: '#FFFFFF', marginBottom: 6,
                }}>{item.title}</h4>
                <p style={{
                  fontFamily: 'Manrope, sans-serif', fontSize: 13,
                  color: '#8BA8FF', fontWeight: 600, marginBottom: 12,
                }}>{item.org}</p>
                <p style={{
                  fontFamily: 'Manrope, sans-serif', fontSize: 14,
                  color: 'rgba(255,255,255,0.45)', lineHeight: 1.6,
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
