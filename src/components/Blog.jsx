import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/global.css';

gsap.registerPlugin(ScrollTrigger);


const Blog = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-heading',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );

      gsap.fromTo('.blog-coming-soon',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7,
          scrollTrigger: { trigger: '.blog-coming-soon', start: 'top 85%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="section-dark"
      style={{ padding: 'var(--section-padding) 0' }}
    >
      <div className="container">
        <div className="blog-heading" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 60px)' }}>
          <span className="section-label">Blog</span>
          <h2 className="section-heading">From My Blog Post</h2>
        </div>

        <div className="blog-coming-soon glass-card" style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: 'clamp(40px, 6vw, 80px) 2rem',
          textAlign: 'center',
          opacity: 0,
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1.5rem',
          }}>
            ✍️
          </div>
          <h3 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1rem',
          }}>
            Coming Soon
          </h3>
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#94a3b8',
            maxWidth: '400px',
            margin: '0 auto',
          }}>
            I'm currently crafting insightful articles on design, development, and technology. Stay tuned!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;
