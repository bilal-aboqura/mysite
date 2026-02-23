import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/global.css';
import faresTosonImg from '../assets/wbLB4yBEBSU-HD.webp';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: '01',
    title: 'Cloy AI',
    category: 'AI / SaaS',
    description: 'Advanced AI-powered platform for content generation and automation. Built with cutting-edge machine learning models and a sleek, intuitive interface.',
    url: 'https://cloyai.com',
  },
  {
    num: '02',
    title: 'SeenGCC',
    category: 'Platform / Business',
    description: 'A comprehensive business platform serving the GCC region. Features robust functionality, modern design, and seamless user experience.',
    url: 'https://seengcc.com',
  },
  {
    num: '03',
    title: 'Fares Toson',
    category: 'Education / Courses',
    description: 'A modern course platform for online learning. Features course management, student dashboards, and an engaging educational experience.',
    url: 'https://farestoson.com',
    image: faresTosonImg,
  },
  {
    num: '04',
    title: 'Nezam',
    category: 'Management System',
    description: 'A comprehensive management system with clean architecture, powerful organizational tools, and streamlined workflows for efficient operations.',
    url: 'https://nezam.vip',
  },
  {
    num: '05',
    title: 'Min Alakher',
    category: 'Education / Teachers',
    description: 'A dedicated teachers platform for managing educational content, student interactions, and classroom resources with a responsive mobile experience.',
    url: 'https://minalakher.com',
  },
];

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-heading',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );

      document.querySelectorAll('.project-row').forEach((row) => {
        gsap.fromTo(row,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 85%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-dark"
      aria-label="Portfolio — Web Development Projects by Bilal Aboqura"
      style={{ padding: 'var(--section-padding) 0' }}
    >
      <div className="container">
        <div className="project-heading" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 80px)' }}>
          <span className="section-label">Portfolio</span>
          <h2 className="section-heading">Website & App Development Projects</h2>
          <p className="section-subheading" style={{ margin: '1rem auto 0', maxWidth: '500px' }}>
            A curated selection of real-world websites and web applications I've built — from AI SaaS platforms to e-commerce and education solutions.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)' }}>
          {projects.map((project, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <div key={i} className="project-row"
                itemScope
                itemType="https://schema.org/CreativeWork"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'clamp(1.5rem, 3vw, 3rem)',
                  alignItems: 'center',
                  direction: isReversed ? 'rtl' : 'ltr',
                  opacity: 0,
                }}>
                {/* Image / Preview */}
                <div style={{ direction: 'ltr' }}>
                  <div className="glass-card" style={{
                    height: '320px',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(10px)',
                  }}
                  onClick={() => window.open(project.url, '_blank')}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          pointerEvents: 'none',
                        }}
                        loading="lazy"
                      />
                    ) : project.url && project.url !== '#' ? (
                      <iframe
                        src={project.url}
                        title={project.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '400%',
                          height: '400%',
                          transform: 'scale(0.25)',
                          transformOrigin: 'top left',
                          border: 'none',
                          pointerEvents: 'none',
                        }}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : (
                      <div style={{
                        position: 'relative', zIndex: 1,
                        textAlign: 'center',
                      }}>
                        <div style={{
                          fontSize: '2.5rem',
                          fontWeight: '900',
                          fontFamily: 'var(--font-heading)',
                          color: '#ffffff',
                          marginBottom: '0.5rem',
                        }}>
                          {project.title}
                        </div>
                        <span style={{
                          fontSize: '0.8rem',
                          color: 'var(--color-primary)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          fontWeight: '600',
                        }}>
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text content */}
                <div style={{ direction: 'ltr' }}>
                  <span style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    fontWeight: '900',
                    fontFamily: 'var(--font-heading)',
                    // color: 'rgba(255, 255, 255, 0.06)',
                    lineHeight: '1',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}>
                    {project.num}
                  </span>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: 'var(--color-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                    display: 'block',
                  }}>
                    {project.category}
                  </span>
                  <h3 style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    marginBottom: '1rem',
                    fontWeight: '700',
                  }}
                  itemProp="name"
                  >
                    {project.title}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    marginBottom: '1.5rem',
                    color: '#e2e8f0',
                  }}
                  itemProp="description"
                  >
                    {project.description}
                  </p>
                  <a href={project.url} target="_blank" rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ fontSize: '0.9rem', padding: '10px 24px' }}
                    itemprop="url"
                    aria-label={`View ${project.title} project`}
                  >
                    View Project →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Funny "more projects" note */}
        <div className="project-row" style={{
          textAlign: 'center',
          marginTop: 'clamp(40px, 6vw, 80px)',
          opacity: 0,
        }}>
          <div className="glass-card more-projects-note" style={{
            maxWidth: '700px',
            margin: '0 auto',
            padding: 'clamp(30px, 4vw, 50px) 2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(10px)',
            borderRadius: 'var(--radius-xl)',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🫣</div>
            <p dir="ltr" style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              color: '#e2e8f0',
              lineHeight: '1.8',
              fontWeight: '500',
            }}>
             And there are way more projects, but if I listed them all,<br /> this page would never end... 
              <br />
              <span style={{ color: '#94a3b8', fontSize: '0.95rem', direction: 'ltr' }}>
              Seriously, the scroll would take longer than your lunch break 😂
              </span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-row {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
            gap: 1rem !important;
          }
          .project-row .glass-card:not(.more-projects-note) {
            height: 200px !important;
          }
        }
        @media (max-width: 480px) {
          .project-row .glass-card:not(.more-projects-note) {
            height: 180px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
