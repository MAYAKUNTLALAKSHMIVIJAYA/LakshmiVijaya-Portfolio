import React, { useState } from 'react';
import { PROJECTS } from '../data/profileData';

const GH_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.192.694.8.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const EXT_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export default function Projects({ onSelectProject }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="projects"
      style={{ padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          marginBottom: 20, fontFamily: 'Manrope, sans-serif',
        }}>Projects</p>

        <h2 style={{
          fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800,
          letterSpacing: '-0.03em', color: '#FFFFFF',
          marginBottom: 44, fontFamily: 'Manrope, sans-serif',
        }}>Featured Work</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              style={{
                borderRadius: 40,
                padding: 'clamp(32px,4vw,52px)',
                background: 'rgba(255,255,255,0.03)',
                border: hovered === i
                  ? '1px solid rgba(255,255,255,0.15)'
                  : '1px solid rgba(255,255,255,0.08)',
                transform: hovered === i ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hovered === i ? '0 32px 64px rgba(0,0,0,0.5)' : 'none',
                transition: 'all 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Header row */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                marginBottom: 16, gap: 16, flexWrap: 'wrap',
              }}>
                <div>
                  <h3 style={{
                    fontFamily: 'Manrope, sans-serif', fontWeight: 800,
                    fontSize: 'clamp(22px,3vw,30px)', color: '#FFFFFF',
                    letterSpacing: '-0.02em', marginBottom: 6,
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Manrope, sans-serif', fontSize: 14,
                    color: 'rgba(255,255,255,0.4)', fontWeight: 600,
                  }}>
                    {project.tagline}
                  </p>
                </div>
                {/* Index pill */}
                <div style={{
                  padding: '10px 20px', borderRadius: 50,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontFamily: 'Manrope, sans-serif', fontSize: 13,
                  fontWeight: 800, color: 'rgba(255,255,255,0.3)',
                  flexShrink: 0,
                }}>
                  {project.id}
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontFamily: 'Manrope, sans-serif', fontSize: 16,
                color: 'rgba(255,255,255,0.6)', lineHeight: 1.75,
                maxWidth: 750, marginBottom: 24,
              }}>
                {project.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: '7px 16px', borderRadius: 50,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontFamily: 'Manrope, sans-serif', fontSize: 12,
                      fontWeight: 700, color: 'rgba(255,255,255,0.5)',
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}
                  >{tag}</span>
                ))}
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      padding: '11px 22px', borderRadius: 50,
                      background: 'rgba(56,114,255,0.14)',
                      border: '1px solid rgba(56,114,255,0.25)',
                      fontFamily: 'Manrope, sans-serif', fontSize: 13,
                      fontWeight: 700, color: '#8BA8FF',
                      textDecoration: 'none', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(56,114,255,0.22)';
                      e.currentTarget.style.color = '#A8BFFF';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(56,114,255,0.14)';
                      e.currentTarget.style.color = '#8BA8FF';
                    }}
                  >
                    Live Demo {EXT_ICON}
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      padding: '11px 22px', borderRadius: 50,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontFamily: 'Manrope, sans-serif', fontSize: 13,
                      fontWeight: 700, color: 'rgba(255,255,255,0.65)',
                      textDecoration: 'none', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                    }}
                  >
                    {GH_ICON} GitHub
                  </a>
                )}
                <button
                  onClick={() => onSelectProject(project)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '11px 22px', borderRadius: 50,
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'Manrope, sans-serif', fontSize: 13,
                    fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
