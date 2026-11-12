import React, { useEffect } from 'react';
import { PERSONAL_INFO, EDUCATION, EXPERIENCE, SKILL_CATEGORIES, PROJECTS, ACHIEVEMENTS } from '../data/profileData';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => window.print();

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 400,
        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: 24, overflowY: 'auto',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#181818', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 28, maxWidth: 760, width: '100%',
          boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
          margin: '20px 0',
        }}
      >
        {/* Modal header controls */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: 800, fontSize: 15, color: '#fff' }}>
            Resume Preview
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={handlePrint}
              style={{
                padding: '10px 22px', borderRadius: 50,
                background: '#F2F2F2', color: '#0D0D0D',
                fontFamily: 'Manrope,sans-serif', fontWeight: 800, fontSize: 13,
                border: 'none', cursor: 'pointer',
              }}
            >
              🖨 Print / Save PDF
            </button>
            <button
              onClick={onClose}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >×</button>
          </div>
        </div>

        {/* Resume content */}
        <div id="resume-print" style={{ padding: '36px 40px', color: '#fff' }}>
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <h1 style={{
              fontFamily: 'Manrope,sans-serif', fontWeight: 800,
              fontSize: 30, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 6px',
            }}>{PERSONAL_INFO.name}</h1>
            <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 15, color: '#8BA8FF', fontWeight: 600, marginBottom: 10 }}>
              {PERSONAL_INFO.title}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
              <span>📧 {PERSONAL_INFO.email}</span>
              <span>📍 {PERSONAL_INFO.location}</span>
              <a href={PERSONAL_INFO.github} style={{ color: '#8BA8FF', textDecoration: 'none' }}>GitHub</a>
            </div>
          </div>

          {/* Summary */}
          <Section title="Professional Summary">
            <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: 0 }}>
              Computer Science undergraduate at KL University (CGPA: 9.46/10) passionate about Artificial Intelligence, Machine Learning, and Full-Stack Development. Experienced in building practical AI-powered applications, RESTful APIs, and responsive web interfaces.
            </p>
          </Section>

          {/* Education */}
          <Section title="Education">
            {EDUCATION.map((e, i) => (
              <div key={i} style={{ marginBottom: i < EDUCATION.length - 1 ? 16 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <strong style={{ fontFamily: 'Manrope,sans-serif', fontSize: 14, color: '#fff' }}>{e.degree}</strong>
                  <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{e.period}</span>
                </div>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '3px 0' }}>{e.institution}</p>
                <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 12, color: '#8BA8FF', fontWeight: 700 }}>{e.score}</span>
              </div>
            ))}
          </Section>

          {/* Experience */}
          <Section title="Experience">
            {EXPERIENCE.map((e, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <strong style={{ fontFamily: 'Manrope,sans-serif', fontSize: 14, color: '#fff' }}>{e.role}</strong>
                  <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{e.period}</span>
                </div>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: '#8BA8FF', fontWeight: 600, margin: '3px 0 8px' }}>{e.company}</p>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0 }}>{e.description}</p>
              </div>
            ))}
          </Section>

          {/* Skills */}
          <Section title="Technical Skills">
            {SKILL_CATEGORIES.map((cat, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>
                  {cat.category}:&nbsp;
                </span>
                <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
                  {cat.items.map(s => s.name).join(', ')}
                </span>
              </div>
            ))}
          </Section>

          {/* Projects */}
          <Section title="Projects">
            {PROJECTS.map((p, i) => (
              <div key={i} style={{ marginBottom: i < PROJECTS.length - 1 ? 18 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <strong style={{ fontFamily: 'Manrope,sans-serif', fontSize: 14, color: '#fff' }}>{p.title}</strong>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {p.github && <a href={p.github} style={{ fontFamily: 'Manrope,sans-serif', fontSize: 12, color: '#8BA8FF', textDecoration: 'none' }}>GitHub</a>}
                    {p.demo && <a href={p.demo} style={{ fontFamily: 'Manrope,sans-serif', fontSize: 12, color: '#8BA8FF', textDecoration: 'none' }}>Live Demo</a>}
                  </div>
                </div>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '4px 0 6px' }}>
                  {p.tags.join(' · ')}
                </p>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0 }}>{p.description}</p>
              </div>
            ))}
          </Section>

          {/* Achievements */}
          <Section title="Achievements & Leadership">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                <span>{a.icon}</span>
                <div>
                  <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, fontWeight: 700, color: '#fff' }}>{a.title}</span>
                  <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginLeft: 8 }}>{a.org}</span>
                </div>
              </div>
            ))}
          </Section>
        </div>
      </div>

      <style>{`
        @media print {
          body > *:not(#resume-print) { display: none !important; }
          #resume-print { background: white !important; color: black !important; padding: 20px !important; }
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{
        fontFamily: 'Manrope,sans-serif', fontWeight: 800, fontSize: 11,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)', marginBottom: 16,
        paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>{title}</h3>
      {children}
    </div>
  );
}
