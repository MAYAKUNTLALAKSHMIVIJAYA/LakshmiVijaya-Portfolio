import React, { useEffect } from 'react';

const EXT_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const GH_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.192.694.8.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 400,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#181818',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 32,
          maxWidth: 680, width: '100%',
          maxHeight: '88vh', overflowY: 'auto',
          boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
        }}
      >
        {/* Project image */}
        <div style={{
          width: '100%', aspectRatio: '16/8',
          background: 'rgba(56,114,255,0.07)',
          borderRadius: '32px 32px 0 0',
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:12px"><span style="font-size:52px">🚀</span><span style="font-family:Manrope,sans-serif;font-size:14px;color:rgba(255,255,255,0.3)">${project.title}</span></div>`;
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: 36 }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, gap: 16 }}>
            <div>
              <span style={{
                fontFamily: 'Manrope,sans-serif', fontSize: 12,
                fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em',
              }}>{project.id}</span>
              <h2 style={{
                fontFamily: 'Manrope,sans-serif', fontWeight: 800,
                fontSize: 26, color: '#fff', letterSpacing: '-0.02em',
                margin: '4px 0 6px',
              }}>{project.title}</h2>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 14, color: '#8BA8FF', fontWeight: 600 }}>
                {project.tagline}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >×</button>
          </div>

          {/* Description */}
          <p style={{
            fontFamily: 'Manrope,sans-serif', fontSize: 15, lineHeight: 1.75,
            color: 'rgba(255,255,255,0.6)', marginBottom: 24,
          }}>{project.description}</p>

          {/* Features */}
          <div style={{ marginBottom: 24 }}>
            <h4 style={{
              fontFamily: 'Manrope,sans-serif', fontWeight: 800, fontSize: 12,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)', marginBottom: 14,
            }}>Key Features</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {project.features.map((f, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontFamily: 'Manrope,sans-serif', fontSize: 14,
                  color: 'rgba(255,255,255,0.65)',
                }}>
                  <span style={{ color: '#8BA8FF', fontWeight: 800, fontSize: 16 }}>→</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                padding: '7px 16px', borderRadius: 50,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'Manrope,sans-serif', fontSize: 12,
                fontWeight: 700, color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>{tag}</span>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '13px 26px', borderRadius: 50,
                  background: '#F2F2F2', color: '#0D0D0D',
                  fontFamily: 'Manrope,sans-serif', fontWeight: 800, fontSize: 14,
                  textDecoration: 'none', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
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
                  padding: '13px 26px', borderRadius: 50,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.75)',
                  fontFamily: 'Manrope,sans-serif', fontWeight: 700, fontSize: 14,
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
              >
                {GH_ICON} View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
