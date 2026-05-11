import React, { useState, useEffect } from 'react';
import './Wizard.css';

// ─── Rule-based pricing engine ───────────────────────────────────────────────
function calcEstimate(data) {
  let base = 500;
  if (data.type === 'webapp') base = 1200;
  if (data.type === 'ecommerce') base = 1800;
  if (data.type === 'saas') base = 2500;

  let extras = 0;
  if (data.features.auth) extras += 300;
  if (data.features.admin) extras += 400;
  if (data.features.payments) extras += 500;
  if (data.features.multilang) extras += 200;
  if (data.features.seo) extras += 250;
  if (data.features.api) extras += 350;

  if (data.timeline === 'asap') extras += 400;

  const total = base + extras;
  const low = Math.round(total * 0.85 / 100) * 100;
  const high = Math.round(total * 1.2 / 100) * 100;
  return { low, high };
}

// ─── WhatsApp message builder ─────────────────────────────────────────────────
function buildWAMessage(data, estimate) {
  const typeLabels = { website: 'Website', webapp: 'Web App', ecommerce: 'E-commerce', saas: 'SaaS Platform', other: 'Other' };
  const timelineLabels = { asap: 'ASAP', month: 'Within 1 Month', flexible: 'Flexible' };

  const featList = Object.entries(data.features)
    .filter(([, v]) => v)
    .map(([k]) => ({ auth: 'User Auth', admin: 'Admin Panel', payments: 'Payment Integration', multilang: 'Multi-language', seo: 'SEO Optimization', api: 'API / Backend' }[k]))
    .join(', ') || 'None selected';

  const waasNote = data.waas ? '\n💡 Interested in: Website as a Service (monthly plan)' : '';

  return encodeURIComponent(
    `🚀 New Project Request — bilalaboqura.com\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 Name: ${data.name}\n` +
    `📱 Phone: ${data.phone}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🔧 Project Type: ${typeLabels[data.type]}\n` +
    `⚡ Features: ${featList}\n` +
    `🗓 Timeline: ${timelineLabels[data.timeline]}` +
    waasNote + `\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `💰 Budget Estimate: $${estimate.low.toLocaleString()} – $${estimate.high.toLocaleString()}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `Sent from the project quote wizard.`
  );
}

// ─── Step configs ─────────────────────────────────────────────────────────────
const PROJECT_TYPES = [
  { id: 'website', label: 'Website', desc: 'Business, portfolio, or landing page', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  )},
  { id: 'webapp', label: 'Web App', desc: 'Dashboard, SaaS, or custom tool', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  )},
  { id: 'ecommerce', label: 'E-commerce', desc: 'Online store with products & payments', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )},
  { id: 'saas', label: 'SaaS Platform', desc: 'Subscription-based software product', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
    </svg>
  )},
  { id: 'other', label: 'Other', desc: 'Not sure yet — let\'s discuss', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )},
];

const FEATURES = [
  { id: 'auth',      label: 'User Authentication', desc: 'Login / signup system' },
  { id: 'admin',     label: 'Admin Dashboard',     desc: 'Manage content or users' },
  { id: 'payments',  label: 'Payment Integration', desc: 'Stripe, PayPal, etc.' },
  { id: 'multilang', label: 'Multi-language',      desc: 'Arabic + English support' },
  { id: 'seo',       label: 'SEO Optimization',    desc: 'Rank higher on Google' },
  { id: 'api',       label: 'API / Backend',        desc: 'Custom server & database' },
];

const TIMELINES = [
  { id: 'asap',     label: 'ASAP',           desc: 'Rushed delivery (+priority fee)' },
  { id: 'month',    label: 'Within a Month', desc: 'Standard timeline' },
  { id: 'flexible', label: 'Flexible',       desc: 'No hard deadline' },
];

// ─── Main Wizard component ────────────────────────────────────────────────────
const Wizard = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    type: '',
    features: { auth: false, admin: false, payments: false, multilang: false, seo: false, api: false },
    timeline: 'month',
    waas: false,
    name: '',
    phone: '',
  });
  const [estimate, setEstimate] = useState(null);
  const [done, setDone] = useState(false);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setStep(1); setDone(false); setEstimate(null); setData({ type: '', features: { auth: false, admin: false, payments: false, multilang: false, seo: false, api: false }, timeline: 'month', waas: false, name: '', phone: '' }); }, 300);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const canNext = () => {
    if (step === 1) return !!data.type;
    if (step === 3) return !!data.timeline;
    if (step === 4) return data.name.trim().length > 1;
    return true;
  };

  const handleNext = () => {
    if (step === 4) {
      const est = calcEstimate(data);
      setEstimate(est);
      setDone(true);
    } else {
      setStep(s => s + 1);
    }
  };

  const handleWA = () => {
    const msg = buildWAMessage(data, estimate);
    window.open(`https://wa.me/+201112678333?text=${msg}`, '_blank');
  };

  const progress = done ? 100 : ((step - 1) / 4) * 100;

  if (!isOpen) return null;

  return (
    <div className="wz-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="wz-modal" role="dialog" aria-modal="true" aria-label="Get a Free Project Quote">

        {/* Header */}
        <div className="wz-header">
          <div>
            <div className="wz-header__label">Free Quote</div>
            <h2 className="wz-header__title">
              {done ? 'Your Estimate is Ready!' : `Step ${step} of 4`}
            </h2>
          </div>
          <button className="wz-close" onClick={onClose} aria-label="Close wizard">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="wz-progress">
          <div className="wz-progress__bar" style={{ width: `${progress}%` }} />
        </div>

        {/* Body */}
        <div className="wz-body">

          {/* ── Step 1: Project type ── */}
          {step === 1 && !done && (
            <div className="wz-step">
              <p className="wz-step__question">What are you looking to build?</p>
              <div className="wz-type-grid">
                {PROJECT_TYPES.map(t => (
                  <button key={t.id} className={`wz-type-card ${data.type === t.id ? 'wz-type-card--active' : ''}`}
                    onClick={() => setData(d => ({ ...d, type: t.id }))}>
                    <span className="wz-type-card__icon">{t.icon}</span>
                    <span className="wz-type-card__label">{t.label}</span>
                    <span className="wz-type-card__desc">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 2: Features ── */}
          {step === 2 && !done && (
            <div className="wz-step">
              <p className="wz-step__question">Which features do you need?</p>
              <p className="wz-step__hint">Select all that apply — skip if unsure.</p>
              <div className="wz-features-grid">
                {FEATURES.map(f => (
                  <button key={f.id} className={`wz-feature-card ${data.features[f.id] ? 'wz-feature-card--active' : ''}`}
                    onClick={() => setData(d => ({ ...d, features: { ...d.features, [f.id]: !d.features[f.id] } }))}>
                    <div className="wz-feature-card__check">
                      {data.features[f.id] && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="wz-feature-card__label">{f.label}</div>
                      <div className="wz-feature-card__desc">{f.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 3: Timeline + WaaS ── */}
          {step === 3 && !done && (
            <div className="wz-step">
              <p className="wz-step__question">What's your timeline?</p>
              <div className="wz-timeline-grid">
                {TIMELINES.map(t => (
                  <button key={t.id} className={`wz-timeline-card ${data.timeline === t.id ? 'wz-timeline-card--active' : ''}`}
                    onClick={() => setData(d => ({ ...d, timeline: t.id }))}>
                    <span className="wz-timeline-card__label">{t.label}</span>
                    <span className="wz-timeline-card__desc">{t.desc}</span>
                  </button>
                ))}
              </div>

              {/* WaaS toggle */}
              <div className="wz-waas">
                <div className="wz-waas__text">
                  <div className="wz-waas__title">Interested in Website as a Service?</div>
                  <div className="wz-waas__desc">Pay monthly instead of a large upfront cost. From $99/mo.</div>
                </div>
                <button className={`wz-toggle ${data.waas ? 'wz-toggle--on' : ''}`}
                  onClick={() => setData(d => ({ ...d, waas: !d.waas }))}
                  aria-label="Toggle WaaS interest">
                  <span className="wz-toggle__knob" />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 4: Contact ── */}
          {step === 4 && !done && (
            <div className="wz-step">
              <p className="wz-step__question">Almost there — how do I reach you?</p>
              <div className="wz-inputs">
                <label className="wz-label">
                  Your Name
                  <input className="wz-input" type="text" placeholder="Ahmed Mohamed"
                    value={data.name} onChange={e => setData(d => ({ ...d, name: e.target.value }))} />
                </label>
                <label className="wz-label">
                  WhatsApp Number
                  <input className="wz-input" type="tel" placeholder="+20 100 000 0000"
                    value={data.phone} onChange={e => setData(d => ({ ...d, phone: e.target.value }))} />
                </label>
              </div>
              <p className="wz-privacy">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Your info is only used to contact you. Never shared.
              </p>
            </div>
          )}

          {/* ── Done: Estimate Result ── */}
          {done && estimate && (
            <div className="wz-result">
              <div className="wz-result__range">
                <div className="wz-result__label">Estimated Budget Range</div>
                <div className="wz-result__price">
                  ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}
                </div>
                <div className="wz-result__sub">Based on your project requirements</div>
              </div>

              <div className="wz-result__summary">
                <div className="wz-result__row"><span>Type:</span><span>{PROJECT_TYPES.find(t => t.id === data.type)?.label}</span></div>
                <div className="wz-result__row"><span>Timeline:</span><span>{TIMELINES.find(t => t.id === data.timeline)?.label}</span></div>
                {data.waas && <div className="wz-result__row"><span>Pricing Model:</span><span className="wz-result__badge">WaaS Monthly</span></div>}
                <div className="wz-result__row"><span>Features:</span><span>{Object.entries(data.features).filter(([,v])=>v).length || 0} selected</span></div>
              </div>

              <button className="wz-wa-btn" onClick={handleWA}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.115 1.523 5.845L.057 23.27a.75.75 0 00.92.92l5.425-1.466A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.704 9.704 0 01-4.964-1.363l-.356-.211-3.685.996.996-3.685-.211-.356A9.704 9.704 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
                Send to WhatsApp &amp; Get Started
              </button>
              <p className="wz-result__note">I'll reply within a few hours to discuss details.</p>
            </div>
          )}
        </div>

        {/* Footer nav */}
        {!done && (
          <div className="wz-footer">
            {step > 1 ? (
              <button className="wz-btn wz-btn--ghost" onClick={() => setStep(s => s - 1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                Back
              </button>
            ) : <div />}
            <button className="wz-btn wz-btn--primary" onClick={handleNext} disabled={!canNext()}>
              {step === 4 ? 'Get My Estimate' : 'Continue'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wizard;
