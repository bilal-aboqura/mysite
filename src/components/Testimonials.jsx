import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/global.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "بلال حوّل رؤيتنا إلى واقع بشكل احترافي. الاهتمام بالتفاصيل والجودة في التصميم والتطوير كان مميز جداً. أنصح بالتعامل معه بشدة.",
    author: "أحمد الشريف",
    role: "SeenGCC",
  },
  {
    quote: "شغل ممتاز وسرعة في التنفيذ. الموقع طلع بشكل أكثر من رائع والتعامل كان محترف من البداية للنهاية. شكراً بلال على المجهود.",
    author: "فارس طوسون",
    role: "FaresToson.com",
  },
  {
    quote: "من أفضل المطورين اللي اشتغلت معاهم. فاهم شغله كويس وبيسلم في المواعيد. النتيجة كانت فوق التوقعات.",
    author: "محمد نظام",
    role: "Nezam",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-heading',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );

      gsap.fromTo('.testimonial-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.2,
          scrollTrigger: { trigger: '.testimonial-grid', start: 'top 80%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="section-light" style={{
      padding: 'var(--section-padding) 0',
      position: 'relative',
    }}>
      {/* Background blob */}
      <div style={{
        position: 'absolute', bottom: '10%', right: '-10%',
        width: '35vw', height: '35vw',
        background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="container">
        <div className="testimonial-heading" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 60px)' }}>
          <span className="section-label">Testimonials</span>
          <h2 className="section-heading">What People Say</h2>
        </div>

        <div className="testimonial-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card glass-card-light" style={{
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              position: 'relative',
              opacity: 0,
            }}>
              {/* Large quote mark */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '25px',
                fontSize: '5rem',
                fontFamily: 'Georgia, serif',
                color: 'rgba(59, 130, 246, 0.12)',
                lineHeight: '1',
                pointerEvents: 'none',
              }}>
                "
              </div>

              <p dir="rtl" style={{
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#334155',
                marginBottom: '2rem',
                position: 'relative',
                zIndex: 1,
                fontStyle: 'normal',
                fontFamily: "'Cairo', sans-serif",
              }}>
                "{t.quote}"
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                {/* Avatar */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: '#fff',
                  flexShrink: 0,
                }}>
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '2px',
                    fontFamily: "'Cairo', sans-serif",
                  }}>
                    {t.author}
                  </h4>
                  <span style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-accent)',
                  }}>
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
