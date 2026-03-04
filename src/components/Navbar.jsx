import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Service', href: '/#services' },
  { label: 'Project', href: '/#projects' },
  { label: 'Library', href: '/library' },
  { label: 'Contact', href: '/#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section based on scroll position
      const sections = ['home', 'about', 'services', 'projects', 'blog', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      let currentSection = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            currentSection = section;
          }
        }
      }
      
      setActiveSection(currentSection);
    };
    
    handleScroll(); // Call once on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <nav style={{
      position: 'fixed',
      top: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1001,
      width: 'fit-content',
      maxWidth: 'calc(100% - 40px)',
    }}>
      {/* Premium Glassy Pill Nav */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(10, 22, 40, 0.75)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderRadius: '60px',
        padding: '10px 12px',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(59, 130, 246, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          inset 0 -1px 0 rgba(0, 0, 0, 0.2)
        `,
        border: '1px solid rgba(59, 130, 246, 0.2)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }} className="nav-desktop">
        {navLinks.map((link) => {
          const sectionId = link.href.replace('/#', '').replace('/', '');
          const isActive = window.location.pathname === '/' 
            ? (activeSection === sectionId || (activeSection === 'blog' && sectionId === 'library')) 
            : window.location.pathname === `/${sectionId}`;
          
          return (
            <a 
              key={link.label}
              href={link.href}
              style={{
                padding: '13px 24px',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '50px',
                background: isActive ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)' : 'transparent',
                boxShadow: isActive ? '0 4px 16px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                whiteSpace: 'nowrap',
                position: 'relative',
              }}
              className="nav-link"
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {link.label}
            </a>
          );
        })}
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="nav-hamburger"
        aria-label="Toggle navigation menu"
        style={{
          display: 'none',
          background: 'rgba(10, 22, 40, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          cursor: 'pointer',
          flexDirection: 'column',
          gap: '5px',
          padding: '14px',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        <span style={{
          width: '24px', height: '2px', background: '#fff',
          transition: 'all 0.3s',
          transform: mobileOpen ? 'rotate(45deg) translateY(7px)' : 'none',
        }} />
        <span style={{
          width: '24px', height: '2px', background: '#fff',
          opacity: mobileOpen ? 0 : 1,
          transition: 'all 0.3s',
        }} />
        <span style={{
          width: '24px', height: '2px', background: '#fff',
          transition: 'all 0.3s',
          transform: mobileOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
        }} />
      </button>

      <style>{`
        @media (max-width: 920px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        
        .nav-logo:hover {
          transform: scale(1.15) rotate(10deg);
          box-shadow: 
            0 8px 28px rgba(59, 130, 246, 0.6),
            inset 0 2px 4px rgba(255, 255, 255, 0.4),
            inset 0 -2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .nav-link {
          position: relative;
          overflow: hidden;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #60a5fa, #3b82f6);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
          border-radius: 2px;
        }
        
        .nav-link:hover::after {
          transform: scaleX(1);
        }
      `}</style>
    </nav>

    {/* Mobile Menu - rendered outside nav so it's not constrained by width:fit-content */}
    {mobileOpen && (
      <>
        {/* Backdrop overlay */}
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          }}
        />
        {/* Menu panel */}
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '16px',
          right: '16px',
          background: 'rgba(10, 22, 40, 0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '20px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          padding: '1rem',
          zIndex: 1002,
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6)',
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navLinks.map((link) => {
              const sectionId = link.href.replace('/#', '').replace('/', '');
              const isActive = window.location.pathname === '/' 
                ? (activeSection === sectionId || (activeSection === 'blog' && sectionId === 'library')) 
                : window.location.pathname === `/${sectionId}`;
              return (
                <li key={link.label}>
                  <a href={link.href} style={{
                    display: 'block',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: '500',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    background: isActive ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)' : 'transparent',
                    boxShadow: isActive ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                  onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    )}
    </>
  );
};

export default Navbar;
