import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/api';
import { getLocalChatbotResponse } from '../services/chatbotEngine';

const VIJAYA_FACTS = [
  "Ask me about my AI projects!",
  "I can tell you about my skills 💻",
  "Ask about my education or experience",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm Vijaya's AI assistant. Ask me anything about her projects, skills, education, or background! 👋",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => setHint(h => (h + 1) % VIJAYA_FACTS.length), 4000);
    return () => clearInterval(t);
  }, [open]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text: q }]);
    setLoading(true);
    try {
      let reply;
      try {
        const data = await sendChatMessage(q);
        reply = (typeof data === 'string') ? data : (data?.reply || data?.response || data?.message || 'Got it!');
      } catch {
        reply = getLocalChatbotResponse(q);
      }
      setMessages(m => [...m, { role: 'assistant', text: reply }]);
    } catch {
      setMessages(m => [...m, { role: 'assistant', text: "Sorry, something went wrong. Try asking again!" }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI chat"
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 300,
          width: 56, height: 56, borderRadius: '50%',
          background: open ? '#1a1a1a' : '#F2F2F2',
          border: open ? '1px solid rgba(255,255,255,0.12)' : 'none',
          color: open ? 'rgba(255,255,255,0.7)' : '#0D0D0D',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.25s',
          fontSize: 22,
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? '✕' : '✦'}
      </button>

      {/* Panel */}
      {open && (
        <div
          style={{
            position: 'fixed', bottom: 96, right: 28, zIndex: 299,
            width: 'min(400px, calc(100vw - 48px))',
            borderRadius: 24,
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden', maxHeight: '70vh',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '18px 22px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(56,114,255,0.15)',
              border: '1px solid rgba(56,114,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
            }}>✦</div>
            <div>
              <div style={{
                fontFamily: 'Manrope,sans-serif', fontWeight: 800,
                fontSize: 15, color: '#fff',
              }}>Ask Vijaya AI</div>
              <div style={{
                fontFamily: 'Manrope,sans-serif', fontSize: 12,
                color: 'rgba(255,255,255,0.35)',
              }}>Powered by grounded knowledge</div>
            </div>
          </div>

          {/* Hint bar */}
          <div style={{
            padding: '10px 22px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            fontFamily: 'Manrope,sans-serif', fontSize: 12,
            color: '#8BA8FF', fontStyle: 'italic',
            transition: 'opacity 0.4s',
          }}>
            {VIJAYA_FACTS[hint]}
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 20px',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  maxWidth: '82%',
                  padding: '12px 16px', borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.role === 'user'
                    ? '#F2F2F2'
                    : 'rgba(255,255,255,0.06)',
                  color: m.role === 'user' ? '#0D0D0D' : 'rgba(255,255,255,0.85)',
                  fontFamily: 'Manrope,sans-serif', fontSize: 14, lineHeight: 1.6,
                  fontWeight: m.role === 'user' ? 600 : 400,
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 16px', borderRadius: '18px 18px 18px 4px',
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'Manrope,sans-serif', fontSize: 14,
                }}>
                  Thinking…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '14px 16px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', gap: 10, alignItems: 'flex-end',
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask about skills, projects, education…"
              rows={1}
              style={{
                flex: 1, resize: 'none', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14,
                color: '#fff', fontFamily: 'Manrope,sans-serif',
                fontSize: 14, padding: '12px 16px', outline: 'none',
                lineHeight: 1.5,
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                padding: '12px 18px', borderRadius: 12, flexShrink: 0,
                background: input.trim() ? '#F2F2F2' : 'rgba(255,255,255,0.08)',
                color: input.trim() ? '#0D0D0D' : 'rgba(255,255,255,0.3)',
                border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                fontFamily: 'Manrope,sans-serif', fontWeight: 800, fontSize: 14,
                transition: 'all 0.2s',
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}
