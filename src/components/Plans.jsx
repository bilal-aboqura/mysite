import React from 'react';
import '../styles/global.css';

const plans = [
  {
    name: 'Basic',
    price: '$1,500',
    features: ['Landing Page', '3D Hero Element', 'Responsive Design', 'Contact Form', '1 Week Support'],
  },
  {
    name: 'Pro',
    price: '$3,500',
    features: ['5-Page Website', 'Custom 3D Animations', 'CMS Integration', 'SEO Optimization', '1 Month Support'],
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Full Web Application', 'Advanced 3D & AI', 'Backend Integration', 'Performance Audit', 'Priority Support'],
  },
];

const Plans = () => {
  return (
    <section id="plans" className="container" style={{ padding: '100px 0' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginBottom: 'clamp(1.5rem, 4vw, 3rem)', textAlign: 'center' }}>Plans & Pricing</h2>
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        {plans.map((plan, index) => (
          <div 
            key={index}
            className="glass"
            style={{
              padding: 'clamp(1.5rem, 3vw, 3rem)',
              borderRadius: '20px',
              textAlign: 'center',
              border: plan.recommended ? '1px solid var(--color-primary)' : '1px solid var(--glass-border)',
              transform: plan.recommended ? 'scale(1.05)' : 'scale(1)',
              position: 'relative'
            }}
          >
            {plan.recommended && (
              <span style={{
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--color-primary)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                MOST POPULAR
              </span>
            )}
            <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--color-primary)' }}>
              {plan.price}
            </div>
            <ul style={{ listStyle: 'none', marginBottom: '2rem', textAlign: 'left', padding: '0 1rem' }}>
              {plan.features.map((feature, i) => (
                <li key={i} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: 'var(--color-primary)', marginRight: '10px' }}>✓</span> {feature}
                </li>
              ))}
            </ul>
            <button style={{
              width: '100%',
              padding: '1rem',
              background: plan.recommended ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}>
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #plans .glass {
            transform: scale(1) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Plans;
