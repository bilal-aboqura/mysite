import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/global.css';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { 
    label: 'LinkedIn', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ), 
    url: 'https://www.linkedin.com/in/bilal-aboqura/' 
  },
  { 
    label: 'Instagram', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ), 
    url: 'https://www.instagram.com/_bilalaboqura/' 
  },
];

const CTA = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section-light" style={{
      padding: 'var(--section-padding) 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Large background blob */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vw',
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 60%)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto',
        }}>
          <span className="cta-reveal section-label">Contact</span>
          <h2 className="cta-reveal" style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-heading)',
            color: '#000000',
          }}>
            Let's Connect<br />
            <span style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>There</span>
          </h2>

          <p className="cta-reveal" style={{
            fontSize: '1.1rem',
            color: '#1e293b',
            lineHeight: '1.7',
            marginBottom: '3rem',
            fontWeight: '500',
          }}>
            Whether it's a website, app, or branding — let's build something extraordinary together.
            I'm always open to discussing new projects and creative ideas.
          </p>

          {/* Email link */}
          <div className="cta-reveal" style={{ marginBottom: '1.5rem' }}>
            <a href="mailto:info.bilalcs@gmail.com" style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
              color: 'var(--color-primary)',
              fontWeight: '800',
              borderBottom: '3px solid rgba(59, 130, 246, 0.2)',
              paddingBottom: '4px',
              transition: 'all 0.3s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--color-primary)';
              e.target.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
              e.target.style.color = 'var(--color-primary)';
            }}
            >
              info.bilalcs@gmail.com
            </a>
          </div>

          {/* Phone number */}
          <div className="cta-reveal" style={{ marginBottom: '2.5rem' }}>
            <a href="tel:+201112678333" style={{
              fontSize: '1.25rem',
              color: '#334155',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
            onMouseLeave={(e) => e.target.style.color = '#334155'}
            >
              +201112678333
            </a>
          </div>

          {/* Social links */}
          <div className="cta-reveal" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            {socialLinks.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                className="glass-card-light"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#000000',
                  transition: 'all 0.3s',
                  padding: '0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.background = 'var(--color-primary)';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                title={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="cta-reveal" style={{ marginTop: '3rem' }}>
            <a href="mailto:info.bilalcs@gmail.com" className="btn-primary" style={{
              fontSize: '1.1rem',
              padding: '16px 40px',
            }}>
              Start a Project →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
