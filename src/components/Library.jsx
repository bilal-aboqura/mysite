import React, { useEffect } from 'react';
import gsap from 'gsap';
import '../styles/global.css';

const Library = () => {
  useEffect(() => {
    // Reveal animation
    gsap.fromTo(
      '.library-content > *',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  const resources = [
    {
      title: 'دليلك الشامل لرفع موقعك على VPS',
      type: 'eBook',
      description: 'من كتابة الكود إلى إطلاق الموقع باستخدام النسخة الأحدث من Docker. تعلم إدارة سيرفرك الخاص بكل سهولة.',
      link: '/ebooks/vps-guide.html',
      color: '#3b82f6'
    }
  ];

  return (
    <section className="library-section" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 20px 60px',
      position: 'relative'
    }}>
      {/* Background elements */}
      <div className="glow-orb" style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: -1
      }} />
      <div className="glow-orb" style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: -1
      }} />

      <div className="library-content" style={{
        maxWidth: '1000px',
        width: '100%',
        margin: '0 auto',
        // Make sure it works well with LTR/RTL depending on audience, but UI is usually LTR, content RTL.
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 className="text-glow" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em'
          }}>
            Digital Resource Library
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Access my collection of free eBooks, guides, articles, and premium project files. Discover knowledge to help you scale your digital presence.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {resources.map((res, index) => (
            <a key={index} href={res.link} className="resource-card" style={{
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
              {/* Type Badge */}
              <div style={{
                background: `rgba(59, 130, 246, 0.1)`,
                color: res.color,
                padding: '6px 14px',
                borderRadius: '50px',
                fontSize: '0.8rem',
                fontWeight: '600',
                width: 'fit-content',
                marginBottom: '20px',
                border: `1px solid rgba(59, 130, 246, 0.2)`
              }}>
                {res.type}
              </div>

              {/* Title (RTL support for Arabic text) */}
              <h3 style={{
                color: '#ffffff',
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '15px',
                lineHeight: '1.4',
                direction: /[\u0600-\u06FF]/.test(res.title) ? 'rtl' : 'ltr'
              }}>
                {res.title}
              </h3>

              {/* Description */}
              <p style={{
                color: '#94a3b8',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                flexGrow: 1,
                direction: /[\u0600-\u06FF]/.test(res.description) ? 'rtl' : 'ltr'
              }}>
                {res.description}
              </p>

              {/* Action */}
              <div style={{
                marginTop: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: res.color,
                fontWeight: '500',
                fontSize: '0.95rem'
              }}>
                Read Now 
                <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>→</span>
              </div>
            </a>
          ))}
        </div>
        
        {/* Placeholder entry to show it accepts more */}
        {resources.length === 1 && (
          <div style={{
            textAlign: 'center',
            marginTop: '60px',
            color: '#64748b',
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '40px',
            fontSize: '1rem'
          }}>
            <p>More articles and files coming soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Library;
