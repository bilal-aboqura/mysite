import React from 'react';
import '../styles/global.css';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  {
    label: 'LinkedIn — Bilal Aboqura',
    href: 'https://www.linkedin.com/in/bilal-aboqura/',
    rel: 'me noopener noreferrer',
  },
  {
    label: 'Instagram — Bilal Aboqura',
    href: 'https://www.instagram.com/_bilalaboqura/',
    rel: 'me noopener noreferrer',
  },
];

const Footer = () => {
  return (
    <footer
      aria-label="Site footer"
      itemScope
      itemType="https://schema.org/WPFooter"
      style={{
        borderTop: '1px solid rgba(59, 130, 246, 0.1)',
        padding: '2.5rem 0',
        position: 'relative',
      }}
    >
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
      }}>
        {/* Brand */}
        <div itemScope itemType="https://schema.org/Person" style={{ textAlign: 'center' }}>
          <a
            href="#home"
            itemProp="url"
            style={{
              fontSize: '1.1rem',
              fontWeight: '800',
              color: '#ffffff',
              textDecoration: 'none',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.02em',
            }}
          >
            <span itemProp="name">Bilal Aboqura</span>
          </a>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
            <span itemProp="jobTitle">Full Stack Developer</span> &amp; Website Builder
          </p>
        </div>

        {/* Nav Links */}
        <nav aria-label="Footer navigation">
          <ul style={{
            display: 'flex',
            gap: '2rem',
            listStyle: 'none',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: 0,
            padding: 0,
          }}>
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-dim)',
                  transition: 'color 0.3s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-dim)'}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              rel={link.rel}
              target="_blank"
              aria-label={link.label}
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                transition: 'color 0.3s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
            >
              {link.label.split(' — ')[0]}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          width: '100%',
          maxWidth: '200px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent)',
        }} />

        {/* Copyright + Keywords */}
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
        }}>
          Copyright© {new Date().getFullYear()}{' '}
          <span itemScope itemType="https://schema.org/Person">
            <a href="https://bilalaboqura.com" itemProp="url" style={{ color: 'inherit', textDecoration: 'none' }}>
              <span itemProp="name">Bilal Aboqura</span>
            </a>
          </span>
          {' '}— Full Stack Developer. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
