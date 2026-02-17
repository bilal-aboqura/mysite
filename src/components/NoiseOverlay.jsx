import React from 'react';
import '../styles/global.css';

const NoiseOverlay = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9000,
        opacity: 0.05,
        mixBlendMode: 'overlay',
      }}
    >
      <svg
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};

export default NoiseOverlay;
