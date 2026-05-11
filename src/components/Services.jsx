import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/global.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'High-Converting Websites',
    description: 'Websites built for one goal: turning visitors into paying customers. Fast, mobile-first, SEO-optimized, and designed to outperform any WordPress template out there.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Scalable Backend Systems',
    description: 'Your product needs to handle growth without breaking. I build rock-solid APIs, databases, and cloud infrastructure that scale with your business — no bottlenecks, no surprises.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    title: 'Interfaces That Sell',
    description: 'A beautiful product people enjoy using. I design UX flows and interfaces that reduce friction, build trust, and keep users coming back — because great design is your best salesperson.',
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      gsap.fromTo('.service-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.2,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-dark"
      aria-label="Web Development Services offered by Bilal Aboqura"
      style={{ padding: 'var(--section-padding) 0' }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="services-reveal section-label">What I Do</span>
          <h2 className="services-reveal section-heading" style={{ margin: '0.5rem auto', maxWidth: '500px' }}>
            Website & Web App Development Services
          </h2>
          <p className="services-reveal" style={{ margin: '1rem auto 0', maxWidth: '500px', color: '#94a3b8', fontSize: '1rem' }}>
            From idea to launch — I build fast, beautiful, and scalable digital products.
          </p>
        </div>

        <div ref={cardsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {services.map((service, i) => (
            <div key={i} className="service-card glass-card" style={{
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              textAlign: 'center',
              cursor: 'default',
              opacity: 0,
            }}
            itemScope
            itemType="https://schema.org/Service"
            >
              <div style={{
                width: '70px', height: '70px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'var(--color-primary)',
              }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }} itemProp="name">{service.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }} itemProp="description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .service-card h3 {
            font-size: 1.1rem !important;
          }
          .service-card p {
            font-size: 0.875rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
