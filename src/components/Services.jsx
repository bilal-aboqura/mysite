import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/global.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: '⚡',
    title: 'Custom Website Development',
    description: 'Building performant, modern websites and web applications with React, Next.js, and cutting-edge frontend technologies. Fast, SEO-optimized, and beautifully designed.',
  },
  {
    icon: '🔧',
    title: 'Backend Engineering',
    description: 'Designing scalable server architectures and robust REST APIs with Node.js, MongoDB, PostgreSQL, and cloud infrastructure. Full backend solutions from scratch.',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Creating stunning, intuitive interfaces with exceptional attention to every pixel and interaction. Turning ideas into beautiful user experiences that convert.',
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
                fontSize: '2.5rem',
                marginBottom: '1.2rem',
                width: '70px', height: '70px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(59, 130, 246, 0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.2rem',
              }}>
                <span aria-hidden="true">{service.icon}</span>
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
