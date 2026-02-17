import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/global.css';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const nameRef = useRef(null);
  const subtextRef = useRef(null);
  const blobRef = useRef(null);

  useEffect(() => {
    const name = nameRef.current;
    const chars = name.innerText.split("");
    name.innerHTML = chars.map(char =>
      `<span class="char" style="display: inline-block;">${char === " " ? "&nbsp;" : char}</span>`
    ).join("");

    const charElements = name.querySelectorAll(".char");

    // Animate the blob
    gsap.to(blobRef.current, {
      scale: 1.2, opacity: 0.2, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });

    const tl = gsap.timeline({
      onComplete: () => { if (onComplete) onComplete(); }
    });

    gsap.set(charElements, { opacity: 0, y: 15 });
    gsap.set(subtextRef.current, { opacity: 0, y: 20 });

    tl.to(charElements, {
      opacity: 1, y: 0, duration: 0.08, stagger: 0.08, ease: 'power2.out', delay: 0.3,
    })
    .to(subtextRef.current, {
      opacity: 0.6, y: 0, duration: 0.8, ease: 'power3.out',
    }, "-=0.3")
    .to(textContainerRef.current, {
      opacity: 0, y: -30, duration: 0.8, ease: 'power3.in', delay: 0.8,
    })
    .to(containerRef.current, {
      y: '-100%', duration: 1, ease: 'expo.inOut',
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={containerRef} style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100vh',
      backgroundColor: 'var(--color-bg)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 'var(--z-preloader)',
      color: '#fff',
      overflow: 'hidden',
    }}>
      {/* Animated blob */}
      <div ref={blobRef} style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40vw', height: '40vw',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div ref={textContainerRef} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h1 ref={nameRef} style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontFamily: '"Great Vibes", cursive',
          fontWeight: 400,
          marginBottom: '0.5rem',
          whiteSpace: 'nowrap',
          color: '#ffffff',
        }}>
          Bilal Aboqura
        </h1>
        <p ref={subtextRef} style={{
          fontSize: '0.9rem',
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--color-text-dim)',
          opacity: 0,
        }}>
          Full Stack Developer
        </p>
      </div>
    </div>
  );
};

export default Preloader;
