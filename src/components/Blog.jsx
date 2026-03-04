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
          <span className="section-label">Library & Blog</span>
          <h2 className="section-heading">Featured Resource</h2>
        </div>

        <div className="blog-coming-soon" style={{
          maxWidth: '800px',
          margin: '0 auto',
          opacity: 0,
        }}>
          <a href="/ebooks/vps-guide.html" className="resource-card" style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
            padding: '30px',
            textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => {
             e.currentTarget.style.transform = 'translateY(-8px)';
             e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
             e.currentTarget.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.15)';
          }}
          onMouseLeave={(e) => {
             e.currentTarget.style.transform = 'translateY(0)';
             e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
             e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
          }}
          >
            <div style={{
              background: `rgba(59, 130, 246, 0.1)`,
              color: '#3b82f6',
              padding: '6px 14px',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: '600',
              width: 'fit-content',
              marginBottom: '20px',
              border: `1px solid rgba(59, 130, 246, 0.2)`
            }}>
              eBook
            </div>
            <h3 style={{
              color: '#ffffff',
              fontSize: '1.3rem',
              fontWeight: '600',
              marginBottom: '15px',
              lineHeight: '1.4',
              direction: 'rtl'
            }}>
              دليلك الشامل لرفع موقعك على VPS
            </h3>
            <p style={{
              color: '#94a3b8',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              flexGrow: 1,
              direction: 'rtl'
            }}>
              من كتابة الكود إلى إطلاق الموقع باستخدام النسخة الأحدث من Docker. تعلم إدارة سيرفرك الخاص بكل سهولة.
            </p>
            <div style={{
              marginTop: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#3b82f6',
              fontWeight: '500',
              fontSize: '0.95rem'
            }}>
              Read Now 
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>→</span>
            </div>
          </a>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a href="/library" className="btn-primary" style={{
              display: 'inline-block',
              padding: '12px 30px',
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '50px',
              fontWeight: '500',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              View Full Library
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
