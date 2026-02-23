import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/global.css';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'Three.js', 'GSAP',
  'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Figma', 'Docker', 'AWS',
  'GraphQL', 'REST APIs', 'Git', 'Firebase',
];

const Skills = () => {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance
      gsap.fromTo('.skills-heading',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );

      // Infinite marquee
      const marquee = marqueeRef.current;
      if (marquee) {
        const totalWidth = marquee.scrollWidth / 2;
        gsap.to(marquee, {
          x: -totalWidth,
          duration: 30,
          ease: 'none',
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillPills = [...skills, ...skills]; // duplicate for seamless loop

  return (
    <section id="skills" ref={sectionRef} className="section-light" style={{
      padding: 'var(--section-padding) 0',
      overflow: 'hidden',
      position: 'relative',
    }}
    aria-label="Technical Skills and Technology Stack"
    >
      <div className="container" style={{ marginBottom: '3rem' }}>
        <div className="skills-heading" style={{ textAlign: 'center' }}>
          <span className="section-label">Tech Stack</span>
          <h2 className="section-heading">Skills &amp; Technologies I Use to Build Websites</h2>
          <p style={{ marginTop: '0.75rem', color: '#475569', fontSize: '1rem' }}>
            React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, Docker, AWS &amp; more.
          </p>
        </div>
      </div>

      {/* Marquee container */}
      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '120px', height: '100%',
          background: 'linear-gradient(90deg, #ffffff, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '120px', height: '100%',
          background: 'linear-gradient(-90deg, #ffffff, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        <div ref={marqueeRef} style={{
          display: 'flex',
          gap: '1rem',
          width: 'max-content',
        }}>
          {skillPills.map((skill, i) => (
            <div key={i} className="glass-card-light" style={{
              padding: '12px 32px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '1rem',
              fontWeight: '700',
              color: '#000000',
              whiteSpace: 'nowrap',
              cursor: 'default',
              transition: 'all 0.3s',
              background: '#ffffff',
              border: '2px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-primary)';
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
