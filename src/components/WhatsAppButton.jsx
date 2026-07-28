import React, { useState } from 'react';

const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const msg = encodeURIComponent("Hi Bilal! I found you on bilalaboqura.com and I'd like to discuss a project.");
    window.open(`https://wa.me/+201112678333?text=${msg}`, '_blank');
  };

  return (
    <>
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Chat with Bilal on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 8000,
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25d366, #1da851)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hovered
            ? '0 8px 32px rgba(37, 211, 102, 0.55), 0 0 0 8px rgba(37, 211, 102, 0.12)'
            : '0 6px 24px rgba(37, 211, 102, 0.4)',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Pulse ring */}
        <span style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid rgba(37, 211, 102, 0.5)',
          animation: 'wa-pulse 2.5s ease-out infinite',
          pointerEvents: 'none',
        }} />
        <span style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid rgba(37, 211, 102, 0.3)',
          animation: 'wa-pulse 2.5s ease-out 0.8s infinite',
          pointerEvents: 'none',
        }} />

        {/* WhatsApp icon */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.115 1.523 5.845L.057 23.27a.75.75 0 00.92.92l5.425-1.466A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.704 9.704 0 01-4.964-1.363l-.356-.211-3.685.996.996-3.685-.211-.356A9.704 9.704 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
        </svg>
      </button>

      {/* Tooltip */}
      <div style={{
        position: 'fixed',
        bottom: '38px',
        right: '96px',
        zIndex: 7999,
        background: 'rgba(10, 20, 35, 0.95)',
        border: '1px solid rgba(37, 211, 102, 0.2)',
        borderRadius: '10px',
        padding: '8px 14px',
        fontSize: '0.82rem',
        fontWeight: '600',
        color: '#fff',
        whiteSpace: 'nowrap',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateX(0)' : 'translateX(8px)',
        transition: 'all 0.2s ease',
        pointerEvents: 'none',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
      }}>
        Chat on WhatsApp
        <span style={{
          position: 'absolute',
          right: '-6px',
          top: '50%',
          width: '10px',
          height: '10px',
          background: 'rgba(10, 20, 35, 0.95)',
          border: '1px solid rgba(37, 211, 102, 0.2)',
          borderLeft: 'none',
          borderBottom: 'none',
          transform: 'translateY(-50%) rotate(45deg)',
        }} />
      </div>

      <style>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @media (max-width: 480px) {
          /* Move up slightly on mobile to avoid nav overlap */
          button[aria-label="Chat with Bilal on WhatsApp"] {
            bottom: 20px !important;
            right: 16px !important;
            width: 52px !important;
            height: 52px !important;
          }
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;
