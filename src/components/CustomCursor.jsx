import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Move cursor logic
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power3.out'
      });
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5, // Slower/lagging feel
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference'
        }}
      />
      <div 
        ref={followerRef}
        className="cursor-follower"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s, background-color 0.3s',
          mixBlendMode: 'difference'
        }}
      />
    </>
  );
};

export default CustomCursor;
