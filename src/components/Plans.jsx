import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/global.css';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

// Project Packages first (build) → Care Plans second (maintain)
const projectPackages = [
  {
    name: 'Landing Page',
    period: 'project',
    desc: 'A high-converting single page built to turn visitors into customers.',
    payment: {
      cash: { total: '$999',   save: '$151',  label: 'Pay upfront & save $151' },
      s3:   { total: '$1,050', monthly: '$350', label: '3-Month Plan' },
      s6:   { total: '$1,150', monthly: '$192', label: '6-Month Plan' },
    },
    features: [
      '1-Page Custom Design',
      'Responsive & Mobile-First',
      'Speed Optimization (Ads-Ready)',
      'Contact Form & WhatsApp CTA',
      'SEO Setup & Meta Tags',
      '2 Weeks of Priority Support',
    ],
    cta: 'Start Landing Page',
    waBase: "Hi Bilal! I'm interested in the Landing Page package.",
  },
  {
    name: 'Business Website',
    period: 'project',
    desc: 'A full website that sets you apart — built, not templated.',
    badge: 'Best Value for Growth',
    payment: {
      cash: { total: '$2,500', save: '$500',  label: 'Pay upfront & save $500' },
      s3:   { total: '$2,700', monthly: '$900', label: '3-Month Plan' },
      s6:   { total: '$2,900', monthly: '$484', label: '6-Month Plan' },
    },
    features: [
      'Up to 7 Pages, Custom Design',
      '3D Animations & Micro-interactions',
      'CMS / Blog Integration',
      'Full SEO Optimization',
      'Speed & Performance Tuning',
      '1 Month of Priority Support',
    ],
    recommended: true,
    cta: 'Start Business Site',
    waBase: "Hi Bilal! I'm interested in the Business Website package.",
  },
  {
    name: 'Web Application',
    period: 'project',
    desc: 'SaaS platforms, dashboards, and complex systems — built to scale.',
    payment: null, // Custom pricing — no selector
    features: [
      'Free 30-Min Consultation Call',
      'User Auth & Admin Dashboard',
      'Custom Backend & Database',
      'API & Third-Party Integrations',
      'Scalable Cloud Deployment',
      'Ongoing Maintenance Available',
    ],
    cta: 'Book Free Consultation',
    waBase: "Hi Bilal! I have a Web Application idea and I'd like to book a free consultation call. Can we schedule a time?",
  },
];


const carePlans = [
  {
    name: 'Basic Care',
    price: '$79',
    period: '/month',
    desc: 'Keep your site healthy, secure, and always online.',
    billingNote: 'Automatic Monthly Billing · Cancel Anytime',
    features: [
      'Hosting & SSL Certificate (Included)',
      'Daily Automated Backups',
      'Uptime Monitoring (24/7)',
      'Monthly Security Scan',
      'Email Support',
    ],
    cta: 'Get Basic Care',
    waMsg: "Hi Bilal! I'm interested in the Basic Care Plan ($79/mo). Can we discuss?",
  },
  {
    name: 'Pro Care',
    price: '$149',
    period: '/month',
    desc: 'Hands-on updates and reporting, every single month.',
    billingNote: 'Automatic Monthly Billing · Cancel Anytime',
    badge: 'Most Stable Choice',
    features: [
      'Everything in Basic Care',
      '4 Content Updates / Month (up to 2hrs each)',
      'Performance Optimization',
      'Google Analytics Report',
      'Priority Email & Chat Support',
    ],
    recommended: true,
    cta: 'Get Pro Care',
    waMsg: "Hi Bilal! I'm interested in the Pro Care Plan ($149/mo). Can we discuss?",
  },
  {
    name: 'Elite Care',
    price: '$299',
    period: '/month',
    desc: 'Your website — fully managed, zero worries.',
    billingNote: 'Automatic Monthly Billing · Cancel Anytime',
    features: [
      'Everything in Pro Care',
      'Unlimited Content Updates',
      'Monthly SEO Improvements',
      'Speed & Core Web Vitals Audit',
      'Dedicated WhatsApp / Slack Channel',
    ],
    cta: 'Get Elite Care',
    waMsg: "Hi Bilal! I'm interested in the Elite Care Plan ($299/mo). Can we discuss?",
  },
];

// ─── Check icon ───────────────────────────────────────────────────────────────
const Check = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Payment Selector (inside project package cards) ──────────────────────────
const PAYMENT_OPTIONS = [
  { key: 'cash', label: 'Pay Upfront' },
  { key: 's3',   label: '3 Months' },
  { key: 's6',   label: '6 Months' },
];

const PaymentSelector = ({ payment, selected, onChange }) => (
  <div className="psel">
    <div className="psel__label">Choose payment plan:</div>
    <div className="psel__options">
      {PAYMENT_OPTIONS.map(opt => (
        <button
          key={opt.key}
          className={`psel__btn ${selected === opt.key ? 'psel__btn--active' : ''}`}
          onClick={() => onChange(opt.key)}
        >
          {opt.label}
        </button>
      ))}
    </div>

    {/* Result display */}
    {selected === 'cash' && (
      <div className="psel__result psel__result--cash">
        <div className="psel__result-main">
          <span className="psel__total">{payment.cash.total}</span>
          <span className="psel__save-badge">Save {payment.cash.save}</span>
        </div>
        <div className="psel__result-note">Full payment · 50% to start, 50% on delivery</div>
      </div>
    )}
    {selected === 's3' && (
      <div className="psel__result">
        <div className="psel__result-main">
          <span className="psel__monthly">{payment.s3.monthly}<span>/mo</span></span>
          <span className="psel__total-small">Total: {payment.s3.total}</span>
        </div>
        <div className="psel__result-note">3 equal monthly payments · fixed price, no changes</div>
      </div>
    )}
    {selected === 's6' && (
      <div className="psel__result">
        <div className="psel__result-main">
          <span className="psel__monthly">{payment.s6.monthly}<span>/mo</span></span>
          <span className="psel__total-small">Total: {payment.s6.total}</span>
        </div>
        <div className="psel__result-note">6 equal monthly payments · fixed price, no changes</div>
      </div>
    )}
  </div>
);

// ─── Plan card ────────────────────────────────────────────────────────────────
const PlanCard = ({ plan, accentColor }) => {
  const [payPlan, setPayPlan] = useState('cash');

  const buildWAMsg = () => {
    if (!plan.payment) return plan.waMsg || plan.waBase || '';
    if (payPlan === 'cash') return `${plan.waBase} Payment plan: Upfront (${plan.payment.cash.total}). Can we discuss?`;
    if (payPlan === 's3')  return `${plan.waBase} Payment plan: 3 months at ${plan.payment.s3.monthly}/mo (total ${plan.payment.s3.total}). Can we discuss?`;
    if (payPlan === 's6')  return `${plan.waBase} Payment plan: 6 months at ${plan.payment.s6.monthly}/mo (total ${plan.payment.s6.total}). Can we discuss?`;
    return plan.waMsg || plan.waBase || '';
  };

  const handleWA = () => {
    window.open(`https://wa.me/+201112678333?text=${encodeURIComponent(buildWAMsg())}`, '_blank');
  };

  // Derive displayed price for the card header
  const displayPrice = plan.payment
    ? (payPlan === 'cash' ? plan.payment.cash.total
      : payPlan === 's3'  ? `${plan.payment.s3.monthly}/mo`
      : `${plan.payment.s6.monthly}/mo`)
    : (plan.price ?? 'Custom');

  return (
    <div className={`plans-card ${plan.recommended ? 'plans-card--recommended' : ''}`}>
      {/* Badge */}
      {plan.badge && (
        <div className="plans-card__badge" style={{ background: accentColor === 'care' ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#3b82f6,#6366f1)' }}>
          {plan.badge}
        </div>
      )}

      {/* Header */}
      <div className="plans-card__header">
        <h3 className="plans-card__name">{plan.name}</h3>
        <div className="plans-card__price-row">
          <span className="plans-card__price" style={{ transition: 'all 0.25s' }}>{displayPrice}</span>
        </div>
        <p className="plans-card__desc">{plan.desc}</p>
      </div>

      {/* Payment selector — only for project packages */}
      {plan.payment && (
        <PaymentSelector payment={plan.payment} selected={payPlan} onChange={setPayPlan} />
      )}
      {!plan.payment && plan.billingNote && (
        <div className="psel__flexible">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          {plan.billingNote}
        </div>
      )}

      {/* Features */}
      <ul className="plans-card__features">
        {plan.features.map((f, i) => (
          <li key={i} className="plans-card__feature">
            <span className="plans-card__check" style={{ color: accentColor === 'care' ? '#10b981' : '#3b82f6' }}>
              <Check />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={`plans-card__cta ${plan.recommended ? 'plans-card__cta--primary' : ''}`}
        style={plan.recommended ? { background: accentColor === 'care' ? 'linear-gradient(135deg,#10b981,#059669)' : '#3b82f6', borderColor: accentColor === 'care' ? '#10b981' : '#3b82f6' } : {}}
        onClick={handleWA}
      >
        {plan.cta}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────────
const Plans = ({ onOpenWizard }) => {
  // 'projects' first (Build), then 'care' (Maintain)
  const [tab, setTab] = useState('projects');
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.plans-heading',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Re-animate cards when tab changes
    gsap.fromTo('.plans-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out' }
    );
  }, [tab]);

  const plans = tab === 'projects' ? projectPackages : carePlans;
  const accentColor = tab === 'care' ? 'care' : 'build';

  return (
    <section
      id="plans"
      ref={sectionRef}
      className="section-dark"
      aria-label="Pricing Plans — Project Packages and Monthly Care Plans"
      style={{ padding: 'var(--section-padding) 0' }}
    >
      <div className="container">

        {/* ── Heading ── */}
        <div className="plans-heading" style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 56px)' }}>
          <span className="section-label">Pricing</span>
          <h2 className="section-heading">Simple, Transparent Pricing</h2>
          <p className="section-subheading" style={{ margin: '1rem auto 0', maxWidth: '540px' }}>
            Need something built? Or want to keep what you have running at its best?
            I have a plan for both.
          </p>

          {/* ── Tab Switcher ── */}
          <div className="plans-switcher">
            <button
              className={`plans-switch-btn ${tab === 'projects' ? 'plans-switch-btn--active' : ''}`}
              onClick={() => setTab('projects')}
              aria-pressed={tab === 'projects'}
            >
              <div className="plans-switch-btn__icon" style={{ background: tab === 'projects' ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                </svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div className="plans-switch-btn__title">Build a Project</div>
                <div className="plans-switch-btn__sub">One-time website or app</div>
              </div>
            </button>

            <div className="plans-switch-divider">
              <span>or</span>
            </div>

            <button
              className={`plans-switch-btn ${tab === 'care' ? 'plans-switch-btn--active plans-switch-btn--green' : ''}`}
              onClick={() => setTab('care')}
              aria-pressed={tab === 'care'}
            >
              <div className="plans-switch-btn__icon" style={{ background: tab === 'care' ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div className="plans-switch-btn__title">Maintain My Site</div>
                <div className="plans-switch-btn__sub">Monthly care & hosting</div>
              </div>
            </button>
          </div>

          {/* Context label */}
          <p className="plans-context-label">
            {tab === 'projects'
              ? 'One-time investment. I build it, you own it.'
              : 'Hosting included. Cancel anytime. No lock-in.'}
          </p>
        </div>

        {/* ── Cards grid ── */}
        <div className="plans-grid" key={tab}>
          {plans.map((plan, i) => (
            <PlanCard key={i} plan={plan} accentColor={accentColor} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(40px, 6vw, 64px)' }}>
          <p style={{ color: '#64748b', marginBottom: '1.25rem', fontSize: '1rem' }}>
            Not sure what fits? Get an instant estimate tailored to your project in 2 minutes.
          </p>
          <button
            className="btn-primary"
            onClick={onOpenWizard}
            style={{ fontSize: '1rem', padding: '14px 36px' }}
          >
            Get a Free Instant Estimate
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        /* ── Switcher ── */
        .plans-switcher {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-top: 2.25rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .plans-switch-btn {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 1rem 1.5rem;
          background: rgba(255,255,255,0.03);
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.25s;
          font-family: 'Inter', sans-serif;
          min-width: 210px;
        }

        .plans-switch-btn:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.15);
        }

        .plans-switch-btn--active {
          background: rgba(59,130,246,0.1) !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 24px rgba(59,130,246,0.15);
        }

        .plans-switch-btn--active.plans-switch-btn--green {
          background: rgba(16,185,129,0.1) !important;
          border-color: #10b981 !important;
          box-shadow: 0 0 24px rgba(16,185,129,0.15);
        }

        .plans-switch-btn__icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #94a3b8;
          transition: all 0.25s;
        }

        .plans-switch-btn--active .plans-switch-btn__icon { color: #60a5fa; }
        .plans-switch-btn--active.plans-switch-btn--green .plans-switch-btn__icon { color: #34d399; }

        .plans-switch-btn__title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #e2e8f0;
          font-family: 'Outfit', sans-serif;
        }

        .plans-switch-btn__sub {
          font-size: 0.75rem;
          color: #64748b;
          margin-top: 1px;
        }

        .plans-switch-divider {
          display: flex;
          align-items: center;
          padding: 0 0.75rem;
          color: #334155;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .plans-context-label {
          margin-top: 1rem;
          font-size: 0.82rem !important;
          color: #475569 !important;
          font-style: italic;
        }

        /* ── Grid ── */
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          align-items: start;
        }

        /* ── Card ── */
        .plans-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: clamp(1.5rem, 3vw, 2rem);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          transition: all 0.3s;
        }

        .plans-card:hover {
          border-color: rgba(59,130,246,0.35);
          background: rgba(255,255,255,0.04);
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }

        .plans-card--recommended {
          border-color: rgba(59,130,246,0.4) !important;
          background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.04)) !important;
          box-shadow: 0 0 40px rgba(59,130,246,0.1), 0 16px 48px rgba(0,0,0,0.4) !important;
        }

        .plans-card__badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 50px;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }

        .plans-card__header { display: flex; flex-direction: column; gap: 0.5rem; }

        .plans-card__name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          font-family: 'Outfit', sans-serif;
        }

        .plans-card__price-row { display: flex; align-items: baseline; gap: 0.4rem; }

        .plans-card__price {
          font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: 900;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          line-height: 1;
        }

        .plans-card__period { font-size: 0.82rem; color: #64748b; font-weight: 500; }
        .plans-card__desc { font-size: 0.88rem; color: #64748b; line-height: 1.5; }


        /* \u2500\u2500 Payment Selector \u2500\u2500 */
        .psel {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .psel__label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
        }

        .psel__options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }

        .psel__btn {
          padding: 7px 6px;
          border-radius: 9px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: #64748b;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Inter', sans-serif;
          white-space: nowrap;
        }

        .psel__btn:hover { color: #e2e8f0; border-color: rgba(255,255,255,0.15); }

        .psel__btn--active {
          background: rgba(59,130,246,0.15) !important;
          border-color: rgba(59,130,246,0.4) !important;
          color: #93c5fd !important;
        }

        .psel__result {
          background: rgba(255,255,255,0.03);
          border-radius: 10px;
          padding: 0.75rem 0.9rem;
          animation: psel-fade 0.2s ease;
        }

        .psel__result--cash {
          background: linear-gradient(135deg, rgba(59,130,246,0.07), rgba(99,102,241,0.04));
          border: 1px solid rgba(59,130,246,0.15);
        }

        @keyframes psel-fade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .psel__result-main {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.3rem;
        }

        .psel__total {
          font-size: 1.5rem;
          font-weight: 900;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          line-height: 1;
        }

        .psel__monthly {
          font-size: 1.5rem;
          font-weight: 900;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          line-height: 1;
        }

        .psel__monthly span {
          font-size: 0.82rem;
          font-weight: 500;
          color: #64748b;
        }

        .psel__save-badge {
          background: rgba(16,185,129,0.15);
          border: 1px solid rgba(16,185,129,0.3);
          color: #34d399;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 50px;
          white-space: nowrap;
        }

        .psel__total-small {
          font-size: 0.78rem;
          color: #64748b;
          font-weight: 500;
        }

        .psel__result-note {
          font-size: 0.72rem !important;
          color: #475569 !important;
          line-height: 1.4;
        }

        .psel__flexible {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.8rem;
          color: #64748b;
          padding: 0.6rem 0;
        }


        .plans-card__features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          flex: 1;
        }

        .plans-card__feature {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.88rem;
          color: #cbd5e1;
          line-height: 1.4;
        }

        .plans-card__check {
          flex-shrink: 0;
          display: flex;
          margin-top: 1px;
        }

        .plans-card__cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 0.85rem 1rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #e2e8f0;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s;
          font-family: 'Inter', sans-serif;
        }

        .plans-card__cta:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          color: #fff;
        }

        .plans-card__cta--primary {
          color: #fff !important;
          box-shadow: 0 6px 24px rgba(59,130,246,0.35);
        }

        .plans-card__cta--primary:hover {
          box-shadow: 0 8px 32px rgba(59,130,246,0.5) !important;
          transform: translateY(-1px);
          filter: brightness(1.1);
        }

        @media (max-width: 640px) {
          .plans-switcher { flex-direction: column; align-items: stretch; }
          .plans-switch-btn { min-width: unset; }
          .plans-switch-divider { justify-content: center; padding: 0; }
        }
      `}</style>
    </section>
  );
};

export default Plans;
