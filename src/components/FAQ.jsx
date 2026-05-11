import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/global.css';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'Is hosting included in the project price?',
    a: "One-time project packages don't include hosting — but once your site is live, you can join a Care Plan starting at $79/mo which covers hosting, SSL, daily backups, and ongoing support. No need to deal with servers yourself.",
    tag: 'Pricing',
  },
  {
    q: 'How long does it take to build a website?',
    a: "A Landing Page typically takes 5–7 business days. A Business Website takes 2–3 weeks. Web Applications vary by scope — we'll define a clear milestone timeline in our free consultation call before anything starts.",
    tag: 'Timeline',
  },
  {
    q: 'Can I pay in installments?',
    a: "Yes, flexible 6 or 12-month payment plans are available to fit your budget — at a fixed total with no hidden fees. You can also pay upfront and save.",
    tag: 'Pricing',
  },
  {
    q: 'Do you work with clients outside Egypt?',
    a: "Absolutely! I work with clients globally, using professional tools for communication and project management. Payments accepted internationally with no friction.",
    tag: 'General',
  },
  {
    q: 'What if I need changes after the project is delivered?',
    a: "Every package includes a post-launch support window. After that, a Care Plan keeps things running with monthly updates, or you can request one-off revisions at any time. I don't disappear after delivery.",
    tag: 'Support',
  },
  {
    q: 'Will my website work on mobile and load fast?',
    a: "Always. Every site I build is mobile-first and optimized for Core Web Vitals. Speed is non-negotiable — especially if you're running paid ads, where a slow site directly kills your return on ad spend.",
    tag: 'Technical',
  },
  {
    q: 'Do you sign NDAs or contracts?',
    a: "Yes. I can sign an NDA before we discuss your idea, and every project starts with a clear written agreement covering scope, timeline, deliverables, and pricing — so both sides are protected.",
    tag: 'Legal',
  },
  {
    q: 'How do I get started?',
    a: "Click \"Get My Instant Estimate\", fill in 4 quick steps about your project, and I'll receive your brief on WhatsApp instantly. I typically respond within a few hours and we can start the same week.",
    tag: 'General',
  },
];

const tagStyles = {
  Pricing:   { bg: '#eff6ff', border: '#bfdbfe', text: '#2563eb' },
  Timeline:  { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a' },
  General:   { bg: '#f5f3ff', border: '#ddd6fe', text: '#7c3aed' },
  Support:   { bg: '#fffbeb', border: '#fde68a', text: '#d97706' },
  Technical: { bg: '#fdf2f8', border: '#f9a8d4', text: '#db2777' },
  Legal:     { bg: '#f0fdfa', border: '#99f6e4', text: '#0d9488' },
};

const FAQ = ({ onOpenWizard }) => {
  const [openIdx, setOpenIdx] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-heading-wrap',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } }
      );
      gsap.fromTo('.faq-item',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '.faq-grid', start: 'top 82%' } }
      );
      gsap.fromTo('.faq-cta-wrap',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.faq-cta-wrap', start: 'top 90%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      aria-label="Frequently Asked Questions"
      style={{
        padding: 'var(--section-padding) 0',
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background circles */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '420px', height: '420px', borderRadius: '50%',
        background: 'radial-gradient(circle, #eff6ff 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-60px',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'radial-gradient(circle, #f5f3ff 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Heading ── */}
        <div className="faq-heading-wrap" style={{ opacity: 0, marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          {/* Top label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
            <div style={{
              width: '36px', height: '4px', borderRadius: '4px',
              background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
            }} />
            <span style={{
              fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#3b82f6',
            }}>
              FAQ
            </span>
          </div>

          <div style={{ display: 'flex', gap: 'clamp(2rem, 6vw, 5rem)', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 260px' }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: '800',
                color: '#0f172a',
                lineHeight: '1.15',
                fontFamily: 'Outfit, sans-serif',
                margin: 0,
              }}>
                Common<br />
                <span style={{ color: '#3b82f6' }}>Questions</span>
              </h2>
            </div>
            <div style={{ flex: '2 1 320px', paddingBottom: '6px' }}>
              <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.75', margin: '0 0 1rem' }}>
                Everything you need to know before we start working together.
              </p>
              <button
                onClick={onOpenWizard}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color: '#3b82f6', background: 'none', border: 'none',
                  cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif',
                  fontWeight: '600', padding: 0,
                }}
              >
                Can't find your answer? Ask me directly
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── FAQ List ── */}
        <div className="faq-grid" style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((item, i) => {
            const isOpen = openIdx === i;
            const tag = tagStyles[item.tag];
            return (
              <div
                key={i}
                className="faq-item"
                style={{
                  opacity: 0,
                  background: isOpen ? '#f8faff' : '#ffffff',
                  border: `1.5px solid ${isOpen ? '#bfdbfe' : '#f1f5f9'}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
                  boxShadow: isOpen
                    ? '0 4px 24px rgba(59,130,246,0.1)'
                    : '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: '1rem', padding: 'clamp(1rem, 2.5vw, 1.25rem) clamp(1rem, 2.5vw, 1.5rem)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {/* Number badge */}
                  <span style={{
                    flexShrink: 0, width: '34px', height: '34px', borderRadius: '10px',
                    background: isOpen ? '#3b82f6' : '#f1f5f9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.68rem', fontWeight: '800',
                    color: isOpen ? '#fff' : '#94a3b8',
                    letterSpacing: '0.03em',
                    transition: 'all 0.25s',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Question */}
                  <span style={{
                    flex: 1,
                    fontSize: 'clamp(0.93rem, 2vw, 1.02rem)',
                    fontWeight: '600',
                    color: isOpen ? '#0f172a' : '#334155',
                    lineHeight: '1.45',
                    transition: 'color 0.2s',
                  }}>
                    {item.q}
                  </span>

                  {/* Tag */}
                  <span className="faq-tag-pill" style={{
                    flexShrink: 0,
                    background: tag.bg,
                    border: `1px solid ${tag.border}`,
                    color: tag.text,
                    fontSize: '0.68rem', fontWeight: '700',
                    padding: '4px 11px', borderRadius: '50px',
                    letterSpacing: '0.05em',
                  }}>
                    {item.tag}
                  </span>

                  {/* Chevron */}
                  <span style={{
                    flexShrink: 0, width: '32px', height: '32px', borderRadius: '8px',
                    background: isOpen ? '#eff6ff' : '#f8fafc',
                    border: `1px solid ${isOpen ? '#bfdbfe' : '#e2e8f0'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isOpen ? '#3b82f6' : '#94a3b8',
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {/* Answer — smooth height transition */}
                <div style={{
                  maxHeight: isOpen ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}>
                  <div style={{
                    padding: '0 clamp(1rem,2.5vw,1.5rem) clamp(1rem,2.5vw,1.35rem)',
                    paddingLeft: 'calc(clamp(1rem,2.5vw,1.5rem) + 34px + 1rem)',
                    display: 'flex', gap: '14px',
                  }}>
                    <div style={{
                      width: '3px', borderRadius: '4px', flexShrink: 0, minHeight: '32px', alignSelf: 'stretch',
                      background: 'linear-gradient(180deg, #3b82f6 0%, #6366f1 60%, transparent 100%)',
                    }} />
                    <p style={{
                      fontSize: '0.93rem', color: '#64748b',
                      lineHeight: '1.8', margin: 0,
                    }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA Banner ── */}
        <div className="faq-cta-wrap" style={{
          opacity: 0,
          marginTop: 'clamp(48px, 7vw, 80px)',
          borderRadius: '24px',
          padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem)',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem', flexWrap: 'wrap',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Glow orbs */}
          <div style={{
            position: 'absolute', top: '-40px', right: '60px',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '-30px', left: '30px',
            width: '160px', height: '160px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{
              fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
              fontWeight: '700', color: '#fff',
              marginBottom: '0.4rem',
              fontFamily: 'Outfit, sans-serif',
            }}>
              Still have a question?
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
              I usually reply within a few hours on WhatsApp.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <a
              href={`https://wa.me/+201112678333?text=${encodeURIComponent('Hi Bilal! I have a question before starting my project.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 22px',
                background: 'rgba(37,211,102,0.12)',
                border: '1px solid rgba(37,211,102,0.35)',
                borderRadius: '50px', color: '#4ade80',
                fontSize: '0.9rem', fontWeight: '600',
                textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.22)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.12)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.115 1.523 5.845L.057 23.27a.75.75 0 00.92.92l5.425-1.466A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.704 9.704 0 01-4.964-1.363l-.356-.211-3.685.996.996-3.685-.211-.356A9.704 9.704 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              Ask on WhatsApp
            </a>
            <button
              onClick={onOpenWizard}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                border: 'none', borderRadius: '50px',
                color: '#fff', fontSize: '0.9rem', fontWeight: '700',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                boxShadow: '0 6px 24px rgba(59,130,246,0.4)',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.6)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(59,130,246,0.4)'; e.currentTarget.style.transform = 'none'; }}
            >
              Start My Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 580px) {
          .faq-tag-pill { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default FAQ;
