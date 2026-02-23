import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../styles/global.css';
import bilalImage from '../assets/bilal-cutout.webp';

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Entrance animations
    tl.fromTo('.hello-badge', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' })
      .fromTo('.hero-name', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .fromTo('.profile-circle', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.6)' }, '-=0.5')
      .fromTo('.hero-btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .fromTo('.side-card', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.1 }, '-=0.5');
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="section-dark"
      aria-label="Hero — Bilal Aboqura, Full Stack Developer"
      itemScope
      itemType="https://schema.org/Person"
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0e1a',
        paddingTop: 'clamp(80px, 12vw, 100px)',
        paddingBottom: 'clamp(30px, 6vw, 60px)',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(2rem, 5vw, 5rem)',
        position: 'relative',
        zIndex: 10,
        maxWidth: '1500px',
        width: '100%',
        padding: '0 clamp(1rem, 4vw, 2rem)',
      }}>
        {/* Left Side: Testimonial Card */}
        <div className="side-card" style={{
          flex: '0 0 auto',
          width: '260px',
          opacity: 0,
        }}>
          <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(12px)',
        padding: '1.75rem',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}>
        <p style={{
          fontSize: '0.875rem',
          color: '#e2e8f0',
          lineHeight: '1.7',
          marginBottom: '1.25rem',
          fontStyle: 'italic',
        }}>
          "Bilal's exceptional product design ensured our website's quality. Highly recommended."
        </p>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#3b82f6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Main Hero Content */}
        <div className="hero-center" style={{
          flex: '1 1 auto',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '700px',
          width: '100%',
        }}>
          {/* Hello Badge */}
          <div className="hello-badge" style={{
            display: 'inline-block',
            padding: '8px 22px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50px',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            color: '#ffffff',
            fontWeight: '500',
            opacity: 0,
          }}>
            Hello!
          </div>

          {/* Name */}
          <h1 className="hero-name" style={{
            fontSize: 'clamp(1.8rem, 5vw, 4rem)',
            fontWeight: '700',
            lineHeight: '1.15',
            marginBottom: '0.25rem',
            opacity: 0,
          }}>
            <span style={{ color: '#cbd5e1' }}>I'm </span>
            <span style={{ color: '#3b82f6' }} itemProp="name">Bilal Aboqura</span>
            <span style={{ color: '#cbd5e1' }}>,</span>
          </h1>

          {/* Subtitle */}
          <h2 className="hero-subtitle" style={{
            fontSize: 'clamp(1.1rem, 3vw, 2.25rem)',
            fontWeight: '600',
            color: '#64748b',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            opacity: 0,
          }}>
            <span itemProp="jobTitle">Full Stack Developer</span> &amp; Website Builder
          </h2>

          {/* Profile Image */}
          <div className="profile-circle" style={{
            position: 'relative',
            width: 'clamp(200px, 60vw, 550px)',
            height: 'clamp(200px, 60vw, 550px)',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            opacity: 0,
          }}>
            {/* Image */}
            <img 
              src={bilalImage} 
              alt="Bilal Aboqura — Full Stack Developer & Website Builder"
              title="Bilal Aboqura — Full Stack Developer"
              itemProp="image"
              width="550"
              height="550"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 60px rgba(59, 130, 246, 0.4))',
              }} 
            />
          </div>

          {/* CTA Buttons - Grouped in single container */}
          <div style={{ 
            display: 'inline-flex',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50px',
            padding: '6px',
            gap: '8px',
            opacity: 0,
          }} className="hero-btn">
            {/* Filled Button - Portfolio */}
            <a href="#projects" className="hero-btn-filled" aria-label="View Bilal Aboqura's project portfolio" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              background: 'rgba(59, 130, 246, 0.7)',
              border: 'none',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '50px',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              View Portfolio
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            
            {/* Outlined Button - Hire me */}
            <a href="#contact" className="hero-btn-outlined" aria-label="Hire Bilal Aboqura as a Full Stack Developer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '50px',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              Hire Me
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side: Experience Card */}
        <div className="side-card" style={{
          flex: '0 0 auto',
          width: '200px',
          opacity: 0,
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            padding: '2rem 1.5rem',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
          }}>
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '1rem' }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#3b82f6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              ))}
            </div>
            <div style={{
              fontSize: '2.25rem',
              fontWeight: '800',
              color: '#ffffff',
              marginBottom: '0.5rem',
              lineHeight: '1',
            }}>
              4 Years
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#64748b',
              fontWeight: '500',
            }}>
              Experience
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .side-card {
            display: none !important;
          }
        }
        
        .hero-btn-filled:hover {
          transform: scale(1.05);
          background: rgba(59, 130, 246, 0.7) !important;
        }
        
        .hero-btn-filled:hover ~ .hero-btn-outlined {
          transform: scale(0.95);
          background: transparent !important;
        }
        
        .hero-btn-outlined:hover {
          transform: scale(1.05);
          background: rgba(59, 130, 246, 0.7) !important;
        }
        
        div:has(.hero-btn-outlined:hover) .hero-btn-filled {
          transform: scale(0.95);
          background: transparent !important;
        }
        
        .glass-card {
          transition: all 0.3s ease;
        }
        
        .glass-card:hover {
          transform: translateY(-5px);
        }
        
        @media (max-width: 768px) {
          .hero-btn-filled,
          .hero-btn-outlined {
            padding: 10px 18px !important;
            font-size: 0.875rem !important;
            gap: 6px !important;
          }
          .hero-btn svg {
            width: 14px !important;
            height: 14px !important;
          }
          .hello-badge {
            margin-bottom: 1rem !important;
            font-size: 0.8rem !important;
            padding: 6px 16px !important;
          }
        }
        
        @media (max-width: 400px) {
          .hero-btn-filled,
          .hero-btn-outlined {
            padding: 8px 14px !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
