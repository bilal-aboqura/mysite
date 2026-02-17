import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/global.css';
import profileImg from '../assets/IMG_E1456.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-light"
      style={{ padding: 'var(--section-padding) 0' }}
    >
      <div className="container">
        {/* About Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 4vw, 4rem)',
          alignItems: 'center',
          marginBottom: 'clamp(60px, 8vw, 100px)',
        }} className="about-grid">
          <div>
            <span className="about-reveal section-label">About Me</span>
            <h2 className="about-reveal section-heading" style={{ marginBottom: '1.5rem' }}>
              Passion for crafting digital excellence
            </h2>
            <p className="about-reveal" style={{ fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              I am a passionate Full Stack Developer with a knack for creating immersive
              digital experiences. With expertise in modern web technologies, I bridge the
              gap between design and engineering.
            </p>
            <p className="about-reveal" style={{ fontSize: '1.05rem', marginBottom: '2rem' }}>
              My goal is to build software that not only solves problems but leaves a lasting
              impression. Every project is an opportunity to push boundaries.
            </p>

            {/* Stats row */}
            <div className="about-reveal about-stats" style={{
              display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
            }}>
              {[
                { number: '39+', label: 'Projects' },
                { number: '27+', label: 'Happy Clients' },
                { number: '4+', label: 'Years Exp.' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{
                    fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-heading)',
                    color: 'var(--color-primary)',
                  }}>{stat.number}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile / Image card */}
          <div className="about-reveal">
            <div className="glass-card-light" style={{
              height: 'clamp(250px, 40vw, 450px)',
              borderRadius: 'var(--radius-xl)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <img
                src={profileImg}
                alt="Bilal Aboqura"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            text-align: center !important;
          }
          .about-grid p {
            font-size: 0.95rem !important;
          }
          .about-stats {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
