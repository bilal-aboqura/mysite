export const SITE_CONFIG = {
  email: 'hello@bilalaboqura.com',
  whatsappNumber: '201112678333',
  discoveryCallUrl: import.meta.env.VITE_DISCOVERY_CALL_URL?.trim() || '',
  enquiryEndpoint: import.meta.env.VITE_PROJECT_ENQUIRY_ENDPOINT?.trim() || '',
};

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
}
