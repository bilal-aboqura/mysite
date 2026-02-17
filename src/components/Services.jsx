import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/global.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: '⚡',
    title: 'Web Development',
    description: 'Building performant, modern web applications with React, Next.js, and cutting-edge technologies.',
  },
  {
    icon: '🔧',
    title: 'Backend Engineering',
    description: 'Designing scalable server architectures with Node.js, MongoDB, and cloud infrastructure.',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Creating stunning, intuitive interfaces with attention to every pixel and interaction.',
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
      style={{ padding: 'var(--section-padding) 0' }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="services-reveal section-label">What I Do</span>
          <h2 className="services-reveal section-heading" style={{ margin: '0.5rem auto', maxWidth: '500px' }}>
            Services I Provide
          </h2>
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
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1.2rem',
                width: '70px', height: '70px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(59, 130, 246, 0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.2rem',
              }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>{service.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{service.description}</p>
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
