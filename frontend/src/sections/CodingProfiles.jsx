import React, { useState } from 'react';
import { CODING_PROFILES } from '../data/profileData';

export default function CodingProfiles() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="coding"
      style={{ padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          marginBottom: 20, fontFamily: 'Manrope, sans-serif',
        }}>Coding</p>

        <h2 style={{
          fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800,
          letterSpacing: '-0.03em', color: '#FFFFFF',
          marginBottom: 44, fontFamily: 'Manrope, sans-serif',
        }}>Competitive Programming</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 20,
        }}>
          {CODING_PROFILES.map((profile, i) => (
            <div
              key={i}
              style={{
                borderRadius: 32, padding: '36px 32px',
                background: 'rgba(255,255,255,0.03)',
                border: hovered === i
                  ? '1px solid rgba(255,255,255,0.15)'
                  : '1px solid rgba(255,255,255,0.08)',
                transform: hovered === i ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hovered === i ? '0 24px 48px rgba(0,0,0,0.4)' : 'none',
                transition: 'all 0.3s',
                display: 'flex', flexDirection: 'column', gap: 20,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Icon box */}
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: '#FFFFFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 8, flexShrink: 0,
              }}>
                <img
                  src={profile.icon}
                  alt={profile.name}
                  style={{ width: 36, height: 36, objectFit: 'contain' }}
                  onError={e => e.target.style.display = 'none'}
                />
              </div>

              {/* Info */}
              <div>
                <h3 style={{
                  fontFamily: 'Manrope, sans-serif', fontWeight: 800,
                  fontSize: 20, color: '#FFFFFF', marginBottom: 8,
                }}>
                  {profile.name}
                </h3>
                <p style={{
                  fontFamily: 'Manrope, sans-serif', fontSize: 14,
                  color: 'rgba(255,255,255,0.5)', lineHeight: 1.6,
                }}>
                  {profile.desc}
                </p>
              </div>

              {/* CTA */}
              {profile.badge ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 16px', borderRadius: 50,
                    background: 'rgba(192,192,192,0.12)',
                    border: '1px solid rgba(192,192,192,0.2)',
                    fontFamily: 'Manrope, sans-serif', fontSize: 13,
                    fontWeight: 700, color: '#C8C8C8',
                    alignSelf: 'flex-start',
                  }}>
                    🥈 {profile.badge}
                  </div>
                  {profile.url && (
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '10px 16px', borderRadius: 50,
                        background: 'rgba(56,114,255,0.12)',
                        border: '1px solid rgba(56,114,255,0.2)',
                        fontFamily: 'Manrope, sans-serif', fontSize: 13,
                        fontWeight: 700, color: '#8BA8FF',
                        textDecoration: 'none', transition: 'all 0.2s',
                        alignSelf: 'flex-start',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(56,114,255,0.2)';
                        e.currentTarget.style.color = '#A8BFFF';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(56,114,255,0.12)';
                        e.currentTarget.style.color = '#8BA8FF';
                      }}
                    >
                      Visit Profile →
                    </a>
                  )}
                </div>
              ) : (
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 16px', borderRadius: 50,
                    background: 'rgba(56,114,255,0.12)',
                    border: '1px solid rgba(56,114,255,0.2)',
                    fontFamily: 'Manrope, sans-serif', fontSize: 13,
                    fontWeight: 700, color: '#8BA8FF',
                    textDecoration: 'none', transition: 'all 0.2s',
                    alignSelf: 'flex-start',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(56,114,255,0.2)';
                    e.currentTarget.style.color = '#A8BFFF';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(56,114,255,0.12)';
                    e.currentTarget.style.color = '#8BA8FF';
                  }}
                >
                  Visit Profile →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
