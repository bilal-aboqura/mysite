export const SITE_CONFIG = {
  email: 'hello@bilalaboqura.com',
  whatsappNumber: '201112678333',
  discoveryCallUrl: import.meta.env.VITE_DISCOVERY_CALL_URL?.trim() || '',
  enquiryEndpoint: import.meta.env.VITE_PROJECT_ENQUIRY_ENDPOINT?.trim() || '/api/leads/public',
};

const SELF_HOSTED_EVENTS = new Set(['page_view', 'lead_form_submit', 'proposal_view', 'content_view']);

function getAnalyticsSessionId() {
  const key = 'bilal-analytics-session';
  let sessionId = window.sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
}

function recordSelfHostedEvent(event, properties) {
  if (!SELF_HOSTED_EVENTS.has(event)) return;
  const body = JSON.stringify({
    event,
    sessionId: getAnalyticsSessionId(),
    path: properties.path || window.location.pathname,
    referrer: properties.referrer || document.referrer || '',
    source: properties.utm_source || '',
    properties,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }));
    return;
  }

  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
}

const DEFAULT_WHATSAPP_MESSAGES = {
  ar: `مرحبًا بلال، لدي مشروع وأرغب في مناقشته معك.
نوع المشروع:
الهدف الأساسي:
الموعد المتوقع للإطلاق:`,
  en: `Hi Bilal, I have a project I would like to discuss with you.
Project type:
Main goal:
Expected launch date:`,
};

export function getWhatsAppUrl(language, message = '') {
  const text = message || DEFAULT_WHATSAPP_MESSAGES[language] || DEFAULT_WHATSAPP_MESSAGES.en;
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function track(event, properties = {}) {
  if (typeof window === 'undefined') return;

  const payload = { event, ...properties };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent('portfolio:analytics', { detail: payload }));
  recordSelfHostedEvent(event, properties);
}
