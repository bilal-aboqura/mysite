import React from 'react';
import '../styles/global.css';

const Contact = () => {
  return (
    <section id="contact" className="container" style={{ padding: '100px 0' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginBottom: 'clamp(1.5rem, 4vw, 3rem)', textAlign: 'center' }}>Get In Touch</h2>
      <div 
        className="glass"
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          borderRadius: '20px'
        }}
      >
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '10px',
                color: '#fff',
                outline: 'none'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Email</label>
            <input 
              type="email" 
              placeholder="john@example.com" 
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '10px',
                color: '#fff',
                outline: 'none'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Message</label>
            <textarea 
              rows="5" 
              placeholder="Tell me about your project..." 
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '10px',
                color: '#fff',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>
          <button style={{
            padding: '1rem',
            background: 'var(--color-primary)',
            border: 'none',
            borderRadius: '10px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '1rem'
          }}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
