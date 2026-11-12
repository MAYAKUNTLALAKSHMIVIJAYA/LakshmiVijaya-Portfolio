import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/profileData';
import { sendContactMessage } from '../services/api';

const GH_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.192.694.8.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LI_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const inputStyle = {
  width: '100%',
  padding: '16px 20px',
  borderRadius: 16,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  fontFamily: 'Manrope, sans-serif',
  fontSize: 15,
  fontWeight: 500,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, background 0.2s',
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      await sendContactMessage(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const getFocusedStyle = (name) => focused === name
    ? { ...inputStyle, borderColor: 'rgba(56,114,255,0.5)', background: 'rgba(56,114,255,0.04)' }
    : inputStyle;

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(100px,12vw,160px) clamp(24px,6vw,80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw', height: '60vh',
        background: 'radial-gradient(circle at 50% 100%, rgba(56,114,255,0.12) 0%, rgba(13,13,13,0) 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Kicker */}
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          marginBottom: 20, fontFamily: 'Manrope, sans-serif', textAlign: 'center',
        }}>Get In Touch</p>

        {/* Big headline */}
        <h2 style={{
          fontSize: 'clamp(30px, 4.2vw, 50px)', fontWeight: 800,
          letterSpacing: '-0.035em', color: '#FFFFFF',
          marginBottom: 20, fontFamily: 'Manrope, sans-serif',
          textAlign: 'center', lineHeight: 1.1,
        }}>
          Let's Build Something<br />Meaningful.
        </h2>

        <p style={{
          fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
          maxWidth: 540, margin: '0 auto 40px',
          fontFamily: 'Manrope, sans-serif', textAlign: 'center',
        }}>
          Open to internships, collaborations, and exciting AI & full-stack projects.
          Drop me a message — I'd love to connect.
        </p>

        {/* Primary CTAs */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '18px 40px', borderRadius: 60,
              background: '#F2F2F2', color: '#0D0D0D',
              fontFamily: 'Manrope, sans-serif', fontWeight: 800,
              fontSize: 15, letterSpacing: '-0.01em',
              textDecoration: 'none', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            📧 Send An Email
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '18px 40px', borderRadius: 60,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#FFFFFF',
              fontFamily: 'Manrope, sans-serif', fontWeight: 800,
              fontSize: 15, letterSpacing: '-0.01em',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
          >
            {GH_ICON} GitHub Profile
          </a>
        </div>

        {/* Social circles */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 60 }}>
          {[
            { icon: GH_ICON, href: PERSONAL_INFO.github, label: 'GitHub' },
            { icon: LI_ICON, href: PERSONAL_INFO.linkedin, label: 'LinkedIn' },
          ].map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              style={{
                width: 50, height: 50, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Location */}
        <p style={{
          textAlign: 'center', fontFamily: 'Manrope, sans-serif',
          fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 56,
          letterSpacing: '0.05em',
        }}>
          📍 {PERSONAL_INFO.location}
        </p>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: 56 }} />

        {/* Contact form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 16 }}>
            <div>
              <label style={{
                display: 'block', fontFamily: 'Manrope,sans-serif',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.4)', marginBottom: 8, textTransform: 'uppercase',
              }}>Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                placeholder="Your name"
                required
                style={getFocusedStyle('name')}
              />
            </div>
            <div>
              <label style={{
                display: 'block', fontFamily: 'Manrope,sans-serif',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.4)', marginBottom: 8, textTransform: 'uppercase',
              }}>Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                placeholder="your@email.com"
                required
                style={getFocusedStyle('email')}
              />
            </div>
          </div>
          <div>
            <label style={{
              display: 'block', fontFamily: 'Manrope,sans-serif',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.4)', marginBottom: 8, textTransform: 'uppercase',
            }}>Subject</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              onFocus={() => setFocused('subject')}
              onBlur={() => setFocused(null)}
              placeholder="What's this about?"
              style={getFocusedStyle('subject')}
            />
          </div>
          <div>
            <label style={{
              display: 'block', fontFamily: 'Manrope,sans-serif',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.4)', marginBottom: 8, textTransform: 'uppercase',
            }}>Message *</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
              placeholder="Tell me about your project or opportunity..."
              required
              rows={5}
              style={{
                ...getFocusedStyle('message'),
                resize: 'vertical', minHeight: 130,
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '16px 36px', borderRadius: 50,
                background: status === 'success' ? 'rgba(34,197,94,0.15)' : '#F2F2F2',
                color: status === 'success' ? '#4ade80' : '#0D0D0D',
                border: status === 'success' ? '1px solid rgba(34,197,94,0.3)' : 'none',
                fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 15,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
                transition: 'all 0.3s',
              }}
            >
              {status === 'loading' ? 'Sending…' : status === 'success' ? '✓ Message Sent!' : 'Send Message'}
            </button>
            {status === 'error' && (
              <span style={{
                fontFamily: 'Manrope,sans-serif', fontSize: 14,
                color: 'rgba(248,113,113,0.9)',
              }}>
                Something went wrong. Try the email link above.
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
