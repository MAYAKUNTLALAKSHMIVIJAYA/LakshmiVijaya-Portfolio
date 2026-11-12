import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/profileData';

export default function Skills() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="skills"
      style={{ padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          marginBottom: 20, fontFamily: 'Manrope, sans-serif',
        }}>Skills</p>

        <h2 style={{
          fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800,
          letterSpacing: '-0.03em', color: '#FFFFFF',
          marginBottom: 44, fontFamily: 'Manrope, sans-serif',
        }}>My Technical Arsenal</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {SKILL_CATEGORIES.map((cat, ci) => (
            <div
              key={ci}
              style={{
                borderRadius: 32, padding: '36px 32px',
                background: 'rgba(255,255,255,0.03)',
                border: hovered === ci
                  ? '1px solid rgba(255,255,255,0.15)'
                  : '1px solid rgba(255,255,255,0.08)',
                transform: hovered === ci ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hovered === ci ? '0 24px 48px rgba(0,0,0,0.4)' : 'none',
                transition: 'all 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={() => setHovered(ci)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <span style={{ fontSize: 22 }}>{cat.emoji}</span>
                <span style={{
                  fontFamily: 'Manrope, sans-serif', fontWeight: 800,
                  fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.75)',
                }}>
                  {cat.category}
                </span>
              </div>

              {/* Skill chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {cat.items.map((skill, si) => (
                  <div
                    key={si}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '10px 16px', borderRadius: 50,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 13, fontWeight: 600,
                      color: 'rgba(255,255,255,0.75)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                    }}
                  >
                    <img
                      src={skill.icon} alt={skill.name}
                      width={18} height={18}
                      style={{ objectFit: 'contain', flexShrink: 0 }}
                      onError={e => e.target.style.display = 'none'}
                    />
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
