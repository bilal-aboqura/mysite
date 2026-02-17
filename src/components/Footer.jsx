import React from 'react';
import '../styles/global.css';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid rgba(59, 130, 246, 0.1)',
      padding: '2.5rem 0',
      position: 'relative',
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
      }}>
        {/* Nav Links */}
        <ul style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {footerLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-dim)',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-text-dim)'}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div style={{
          width: '100%',
          maxWidth: '200px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent)',
        }} />

        {/* Copyright */}
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
        }}>
          Copyright© {new Date().getFullYear()} Bilal Aboqura. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
