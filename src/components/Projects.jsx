import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/global.css';

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
  },
  {
    num: '04',
    title: 'Platvo',
    category: 'Business / Platform',
    description: 'A modern business platform designed for seamless operations, clean architecture, and a polished user experience built for growth.',
    url: 'https://www.platvo.com/',
  },
  {
    num: '05',
    title: 'Nezam',
    category: 'Management System',
    description: 'A comprehensive management system with clean architecture, powerful organizational tools, and streamlined workflows for efficient operations.',
    url: 'https://nezam.vip',
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
                  <div className="glass-card project-preview-card" style={{
                    height: '320px',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(99,102,241,0.04) 100%)',
                    backdropFilter: 'blur(10px)',
                  }}
                  onClick={() => window.open(project.url, '_blank')}
                  >
                    {/* Subtle dot grid */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                      pointerEvents: 'none',
                    }} />

                    {/* Glow accent */}
                    <div style={{
                      position: 'absolute',
                      width: '200px', height: '200px',
                      background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
                      borderRadius: '50%',
                      pointerEvents: 'none',
                    }} />

                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          position: 'absolute',
                          top: 0, left: 0,
                          width: '100%', height: '100%',
                          objectFit: 'cover',
                          pointerEvents: 'none',
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <div className="project-browser-wrap">
                        {/* Browser chrome */}
                        <div className="project-browser-chrome">
                          <div className="project-browser-bar">
                            <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                              {['#ff5f57','#febc2e','#28c840'].map(c => (
                                <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />
                              ))}
                            </div>
                            <div className="project-browser-url">
                              {project.url ? project.url.replace('https://', '').replace('www.', '') : project.title.toLowerCase().replace(' ', '') + '.com'}
                            </div>
                          </div>
                          <div className="project-browser-body">
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                              <div style={{ height: '8px', width: '40%', background: 'rgba(59,130,246,0.6)', borderRadius: '4px' }} />
                              <div style={{ height: '8px', width: '22%', background: 'rgba(255,255,255,0.18)', borderRadius: '4px' }} />
                            </div>
                            <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.13)', borderRadius: '4px', marginBottom: '5px' }} />
                            <div style={{ height: '6px', width: '85%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '5px' }} />
                            <div style={{ height: '6px', width: '92%', background: 'rgba(255,255,255,0.09)', borderRadius: '4px', marginBottom: '5px' }} />
                            <div style={{ height: '6px', width: '75%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', marginBottom: '10px' }} />
                            <div style={
                              { padding: '5px 12px', background: 'rgba(59,130,246,0.35)', borderRadius: '5px',
                                fontSize: '0.62rem', color: 'rgba(255,255,255,0.85)', fontWeight: '700',
                                display: 'inline-block', border: '1px solid rgba(59,130,246,0.4)' }
                            }>View Live →</div>
                          </div>
                        </div>
                        {/* Category pill */}
                        <div className="project-browser-pill">{project.category}</div>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="project-hover-overlay" style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(59,130,246,0.07)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </div>
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
                    style={{ fontSize: '0.9rem', padding: '10px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    itemprop="url"
                    aria-label={`View ${project.title} project`}
                  >
                    View Project
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
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
            <div style={{
              width: '64px', height: '64px',
              borderRadius: '50%',
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem',
              color: 'var(--color-primary)',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="16" />
                <line x1="10" y1="14" x2="14" y2="14" />
              </svg>
            </div>
            <p dir="ltr" style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              color: '#e2e8f0',
              lineHeight: '1.8',
              fontWeight: '500',
            }}>
             And there are way more projects, but if I listed them all,<br /> this page would never end...
              <br />
              <span style={{ color: '#94a3b8', fontSize: '0.95rem', direction: 'ltr' }}>
              Seriously, the scroll would take longer than your lunch break.
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
            height: auto !important;
            min-height: 220px !important;
          }
          .project-browser-wrap {
            padding: 1.25rem !important;
          }
          .project-browser-chrome {
            max-width: 100% !important;
          }
        }
        @media (max-width: 480px) {
          .project-row .glass-card:not(.more-projects-note) {
            min-height: 190px !important;
          }
        }
        .project-preview-card:hover .project-hover-overlay {
          opacity: 1 !important;
        }
        /* Browser mockup styles */
        .project-browser-wrap {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 1.75rem;
          width: 100%;
        }
        .project-browser-chrome {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          overflow: hidden;
          width: 100%;
          max-width: 280px;
          margin: 0 auto;
          box-shadow: 0 16px 40px rgba(0,0,0,0.5);
        }
        .project-browser-bar {
          background: rgba(0,0,0,0.35);
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .project-browser-url {
          flex: 1;
          background: rgba(255,255,255,0.08);
          border-radius: 4px;
          padding: 3px 8px;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.5);
          font-family: monospace;
          letter-spacing: 0.02em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
        }
        .project-browser-body {
          padding: 1.1rem 1rem;
          text-align: left;
        }
        .project-browser-pill {
          display: inline-block;
          margin-top: 0.85rem;
          padding: 4px 14px;
          background: rgba(59,130,246,0.15);
          border: 1px solid rgba(59,130,246,0.35);
          border-radius: 50px;
          font-size: 0.68rem;
          color: rgba(147,197,253,1);
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }
      `}</style>
    </section>
  );
};

export default Projects;
