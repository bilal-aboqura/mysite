import { useEffect, useRef, useState } from 'react';
import { getWhatsAppUrl, SITE_CONFIG, track } from '../siteConfig';
import './Wizard.css';

const EMPTY_FORM = {
  projectType: '',
  description: '',
  features: [],
  currentStage: '',
  launchDate: '',
  budget: '',
  name: '',
  company: '',
  email: '',
  whatsapp: '',
  website: '',
};

const formCopy = {
  en: {
    label: 'Project enquiry',
    title: 'Tell me what you are building.',
    step: (current) => `Step ${current} of 4`,
    close: 'Close enquiry form',
    back: 'Back',
    continue: 'Continue',
    submit: 'Send project brief',
    sending: 'Sending…',
    privacy: 'Your details are used only to respond to this enquiry.',
    required: 'Please complete the required fields before continuing.',
    submitError:
      'The enquiry could not be sent. Please try again or send the prepared summary on WhatsApp.',
    readyTitle: 'Your project brief is ready.',
    successTitle: 'Your project brief was sent.',
    successBody: 'Thank you. I will review the details and respond with the clearest next step.',
    fallbackBody:
      'The secure enquiry endpoint has not been configured yet. Nothing was submitted—send the prepared summary through WhatsApp instead.',
    whatsappAction: 'Send summary on WhatsApp',
    closeAction: 'Done',
    steps: [
      {
        title: 'What are you planning to build?',
        body: 'Choose the closest project type and describe the business need.',
      },
      {
        title: 'What does the project need?',
        body: 'Select the likely capabilities and tell me where the project stands today.',
      },
      {
        title: 'What are the commercial parameters?',
        body: 'A date and budget range help me suggest a realistic scope.',
      },
      {
        title: 'How can I reach you?',
        body: 'Share the contact details you want me to use for the response.',
      },
    ],
    fields: {
      projectType: 'Project type',
      description: 'Short project description',
      descriptionPlaceholder: 'What should the product help your business or customers do?',
      features: 'Required features',
      currentStage: 'Current stage',
      launchDate: 'Expected launch date',
      budget: 'Approximate budget range',
      name: 'Name',
      company: 'Company name',
      email: 'Email',
      whatsapp: 'WhatsApp number',
    },
    projectTypes: [
      ['corporate-website', 'Corporate website'],
      ['web-platform', 'Web platform'],
      ['dashboard', 'Dashboard or internal system'],
      ['ecommerce', 'E-commerce website'],
      ['booking', 'Booking system'],
      ['ai-assistant', 'AI assistant'],
      ['redesign', 'Existing product redesign'],
      ['other', 'Other'],
    ],
    features: [
      ['design', 'UX/UI design'],
      ['admin', 'Admin dashboard'],
      ['payments', 'Payments'],
      ['booking', 'Booking'],
      ['multilingual', 'Arabic + English'],
      ['integrations', 'Third-party integrations'],
      ['ai', 'AI capabilities'],
      ['unsure', 'Not sure yet'],
    ],
    stages: [
      ['idea', 'Idea or early concept'],
      ['requirements', 'Requirements in progress'],
      ['design', 'Design already exists'],
      ['product', 'Existing product'],
    ],
    budgets: [
      ['under-2000', 'Under $2,000'],
      ['2000-5000', '$2,000–$5,000'],
      ['5000-10000', '$5,000–$10,000'],
      ['10000-plus', '$10,000+'],
      ['unsure', 'Not sure yet'],
    ],
  },
  ar: {
    label: 'طلب مشروع',
    title: 'احكي لي عن المشروع الذي تريد تنفيذه.',
    step: (current) => `الخطوة ${current} من 4`,
    close: 'إغلاق نموذج المشروع',
    back: 'السابق',
    continue: 'متابعة',
    submit: 'أرسل تفاصيل المشروع',
    sending: 'جارٍ الإرسال…',
    privacy: 'تُستخدم بياناتك فقط للرد على هذا الطلب.',
    required: 'أكمل الحقول المطلوبة قبل المتابعة.',
    submitError:
      'تعذّر إرسال الطلب. حاول مرة أخرى أو أرسل الملخص الجاهز عبر واتساب.',
    readyTitle: 'تفاصيل مشروعك جاهزة.',
    successTitle: 'تم إرسال تفاصيل مشروعك.',
    successBody: 'شكرًا لك. سأراجع التفاصيل وأرد عليك بأوضح خطوة تالية.',
    fallbackBody:
      'نقطة استقبال الطلبات الآمنة غير مُعدّة بعد. لم يتم إرسال أي بيانات—أرسل الملخص الجاهز عبر واتساب بدلًا من ذلك.',
    whatsappAction: 'أرسل الملخص على واتساب',
    closeAction: 'تم',
    steps: [
      {
        title: 'ما الذي تخطط لتنفيذه؟',
        body: 'اختر أقرب نوع للمشروع واشرح الاحتياج الأساسي باختصار.',
      },
      {
        title: 'ما الذي يحتاجه المشروع؟',
        body: 'حدد الخصائص المتوقعة والمرحلة التي وصل إليها المشروع حاليًا.',
      },
      {
        title: 'ما إطار الوقت والميزانية؟',
        body: 'الموعد والميزانية التقريبية يساعدان في اقتراح نطاق واقعي.',
      },
      {
        title: 'كيف يمكنني التواصل معك؟',
        body: 'أضف بيانات التواصل التي تفضّل استخدامها للرد.',
      },
    ],
    fields: {
      projectType: 'نوع المشروع',
      description: 'وصف مختصر للمشروع',
      descriptionPlaceholder: 'ما الذي يجب أن يساعد المنتج شركتك أو عملاءك على إنجازه؟',
      features: 'الخصائص المطلوبة',
      currentStage: 'المرحلة الحالية',
      launchDate: 'الموعد المتوقع للإطلاق',
      budget: 'نطاق الميزانية التقريبي',
      name: 'الاسم',
      company: 'اسم الشركة',
      email: 'البريد الإلكتروني',
      whatsapp: 'رقم واتساب',
    },
    projectTypes: [
      ['corporate-website', 'موقع شركة'],
      ['web-platform', 'منصة ويب'],
      ['dashboard', 'لوحة تحكم أو نظام داخلي'],
      ['ecommerce', 'متجر إلكتروني'],
      ['booking', 'نظام حجز'],
      ['ai-assistant', 'مساعد بالذكاء الاصطناعي'],
      ['redesign', 'إعادة تصميم منتج قائم'],
      ['other', 'أخرى'],
    ],
    features: [
      ['design', 'تصميم UX/UI'],
      ['admin', 'لوحة تحكم'],
      ['payments', 'الدفع الإلكتروني'],
      ['booking', 'الحجوزات'],
      ['multilingual', 'العربية + الإنجليزية'],
      ['integrations', 'تكاملات خارجية'],
      ['ai', 'خصائص ذكاء اصطناعي'],
      ['unsure', 'غير متأكد بعد'],
    ],
    stages: [
      ['idea', 'فكرة أو تصور أولي'],
      ['requirements', 'جارٍ تحديد المتطلبات'],
      ['design', 'يوجد تصميم جاهز'],
      ['product', 'يوجد منتج قائم'],
    ],
    budgets: [
      ['under-2000', 'أقل من 2,000 دولار'],
      ['2000-5000', '2,000–5,000 دولار'],
      ['5000-10000', '5,000–10,000 دولار'],
      ['10000-plus', 'أكثر من 10,000 دولار'],
      ['unsure', 'غير متأكد بعد'],
    ],
  },
};

function labelFor(options, value) {
  return options.find(([id]) => id === value)?.[1] || value;
}

function buildSummary(data, language, text) {
  const selectedFeatures = data.features
    .map((feature) => labelFor(text.features, feature))
    .join('، ');

  if (language === 'ar') {
    return `مرحبًا بلال، لدي مشروع وأرغب في مناقشته معك.

نوع المشروع: ${labelFor(text.projectTypes, data.projectType)}
وصف المشروع: ${data.description}
الخصائص المطلوبة: ${selectedFeatures || 'غير محددة'}
المرحلة الحالية: ${labelFor(text.stages, data.currentStage)}
الموعد المتوقع: ${data.launchDate}
الميزانية التقريبية: ${labelFor(text.budgets, data.budget)}

الاسم: ${data.name}
الشركة: ${data.company || 'غير مذكور'}
البريد: ${data.email}
واتساب: ${data.whatsapp}`;
  }

  return `Hi Bilal, I have a project I would like to discuss with you.

Project type: ${labelFor(text.projectTypes, data.projectType)}
Description: ${data.description}
Required features: ${selectedFeatures || 'Not specified'}
Current stage: ${labelFor(text.stages, data.currentStage)}
Expected launch date: ${data.launchDate}
Approximate budget: ${labelFor(text.budgets, data.budget)}

Name: ${data.name}
Company: ${data.company || 'Not provided'}
Email: ${data.email}
WhatsApp: ${data.whatsapp}`;
}

function ChoiceGrid({ name, options, value, onChange, multiple = false }) {
  const isSelected = (id) => (multiple ? value.includes(id) : value === id);

  return (
    <div className="wz-choice-grid">
      {options.map(([id, label]) => (
        <button
          className={`wz-choice ${isSelected(id) ? 'is-selected' : ''}`}
          key={id}
          type="button"
          aria-pressed={isSelected(id)}
          onClick={() => onChange(id)}
          name={name}
        >
          <span className="wz-choice-mark" aria-hidden="true">
            {isSelected(id) ? '✓' : ''}
          </span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

export default function Wizard({ isOpen, language, onClose }) {
  const text = formCopy[language];
  const [step, setStep] = useState(1);
  const [data, setData] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const startedAt = useRef(Date.now());
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    startedAt.current = Date.now();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 60);
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) return;
    const resetTimer = window.setTimeout(() => {
      setStep(1);
      setData(EMPTY_FORM);
      setError('');
      setStatus('idle');
    }, 250);
    return () => window.clearTimeout(resetTimer);
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleFeature = (feature) => {
    setData((current) => ({
      ...current,
      features: current.features.includes(feature)
        ? current.features.filter((item) => item !== feature)
        : [...current.features.filter((item) => item !== 'unsure'), feature],
    }));
  };

  const validateStep = () => {
    if (step === 1) return Boolean(data.projectType && data.description.trim().length >= 20);
    if (step === 2) return Boolean(data.currentStage);
    if (step === 3) return Boolean(data.launchDate && data.budget);
    return Boolean(
      data.name.trim().length > 1 &&
        /\S+@\S+\.\S+/.test(data.email) &&
        data.whatsapp.trim().length >= 7,
    );
  };

  const goNext = () => {
    if (!validateStep()) {
      setError(text.required);
      return;
    }
    setError('');
    setStep((current) => Math.min(4, current + 1));
  };

  const submitForm = async () => {
    if (!validateStep()) {
      setError(text.required);
      return;
    }
    if (data.website || Date.now() - startedAt.current < 1800) {
      setError(text.submitError);
      return;
    }

    setError('');
    if (!SITE_CONFIG.enquiryEndpoint) {
      setStatus('fallback');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch(SITE_CONFIG.enquiryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          language,
          source: 'bilalaboqura.com',
        }),
      });
      if (!response.ok) throw new Error('Submission failed');

      setStatus('success');
      track('estimate_form_submit', { language, project_type: data.projectType });
    } catch {
      setStatus('error');
      setError(text.submitError);
    }
  };

  const summary = buildSummary(data, language, text);
  const progress = status === 'success' || status === 'fallback' ? 100 : (step / 4) * 100;
  const isComplete = status === 'success' || status === 'fallback';

  return (
    <div
      className="wz-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="wz-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wz-title"
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        <header className="wz-header">
          <div>
            <span className="wz-header-label">{text.label}</span>
            <h2 id="wz-title">
              {isComplete
                ? status === 'success'
                  ? text.successTitle
                  : text.readyTitle
                : text.title}
            </h2>
          </div>
          <button
            className="wz-close"
            type="button"
            onClick={onClose}
            aria-label={text.close}
            ref={closeButtonRef}
          >
            ×
          </button>
        </header>

        <div
          className="wz-progress"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress}
        >
          <span style={{ '--progress': progress / 100 }} />
        </div>

        <div className="wz-body">
          {!isComplete && (
            <>
              <div className="wz-step-heading">
                <span>{text.step(step)}</span>
                <h3>{text.steps[step - 1].title}</h3>
                <p>{text.steps[step - 1].body}</p>
              </div>

              {step === 1 && (
                <div className="wz-step">
                  <fieldset>
                    <legend>{text.fields.projectType}</legend>
                    <ChoiceGrid
                      name="projectType"
                      options={text.projectTypes}
                      value={data.projectType}
                      onChange={(projectType) =>
                        setData((current) => ({ ...current, projectType }))
                      }
                    />
                  </fieldset>
                  <label className="wz-field">
                    <span>{text.fields.description}</span>
                    <textarea
                      rows="4"
                      value={data.description}
                      placeholder={text.fields.descriptionPlaceholder}
                      onChange={(event) =>
                        setData((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="wz-step">
                  <fieldset>
                    <legend>{text.fields.features}</legend>
                    <ChoiceGrid
                      name="features"
                      options={text.features}
                      value={data.features}
                      onChange={toggleFeature}
                      multiple
                    />
                  </fieldset>
                  <fieldset>
                    <legend>{text.fields.currentStage}</legend>
                    <ChoiceGrid
                      name="currentStage"
                      options={text.stages}
                      value={data.currentStage}
                      onChange={(currentStage) =>
                        setData((current) => ({ ...current, currentStage }))
                      }
                    />
                  </fieldset>
                </div>
              )}

              {step === 3 && (
                <div className="wz-step wz-two-column">
                  <label className="wz-field">
                    <span>{text.fields.launchDate}</span>
                    <input
                      type="date"
                      value={data.launchDate}
                      onChange={(event) =>
                        setData((current) => ({
                          ...current,
                          launchDate: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="wz-field">
                    <span>{text.fields.budget}</span>
                    <select
                      value={data.budget}
                      onChange={(event) =>
                        setData((current) => ({ ...current, budget: event.target.value }))
                      }
                    >
                      <option value="">—</option>
                      {text.budgets.map(([id, label]) => (
                        <option key={id} value={id}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}

              {step === 4 && (
                <div className="wz-step wz-contact-grid">
                  <label className="wz-field">
                    <span>{text.fields.name}</span>
                    <input
                      autoComplete="name"
                      value={data.name}
                      onChange={(event) =>
                        setData((current) => ({ ...current, name: event.target.value }))
                      }
                    />
                  </label>
                  <label className="wz-field">
                    <span>{text.fields.company}</span>
                    <input
                      autoComplete="organization"
                      value={data.company}
                      onChange={(event) =>
                        setData((current) => ({ ...current, company: event.target.value }))
                      }
                    />
                  </label>
                  <label className="wz-field">
                    <span>{text.fields.email}</span>
                    <input
                      autoComplete="email"
                      inputMode="email"
                      type="email"
                      value={data.email}
                      onChange={(event) =>
                        setData((current) => ({ ...current, email: event.target.value }))
                      }
                    />
                  </label>
                  <label className="wz-field">
                    <span>{text.fields.whatsapp}</span>
                    <input
                      autoComplete="tel"
                      inputMode="tel"
                      type="tel"
                      value={data.whatsapp}
                      onChange={(event) =>
                        setData((current) => ({ ...current, whatsapp: event.target.value }))
                      }
                    />
                  </label>
                  <label className="wz-honeypot" aria-hidden="true">
                    Website
                    <input
                      tabIndex="-1"
                      autoComplete="off"
                      value={data.website}
                      onChange={(event) =>
                        setData((current) => ({ ...current, website: event.target.value }))
                      }
                    />
                  </label>
                </div>
              )}

              {error && (
                <p className="wz-error" role="alert">
                  {error}
                </p>
              )}
              <p className="wz-privacy">{text.privacy}</p>
            </>
          )}

          {isComplete && (
            <div className="wz-result" role="status" aria-live="polite">
              <p>{status === 'success' ? text.successBody : text.fallbackBody}</p>
              <a
                className="wz-whatsapp"
                href={getWhatsAppUrl(language, summary)}
                target="_blank"
                rel="noreferrer"
                onClick={() => track('whatsapp_project_click', { location: 'enquiry_result' })}
              >
                {text.whatsappAction}
              </a>
              <button className="wz-done" type="button" onClick={onClose}>
                {text.closeAction}
              </button>
            </div>
          )}
        </div>

        {!isComplete && (
          <footer className="wz-footer">
            {step > 1 ? (
              <button
                className="wz-button wz-button-secondary"
                type="button"
                onClick={() => {
                  setError('');
                  setStep((current) => current - 1);
                }}
              >
                {text.back}
              </button>
            ) : (
              <span />
            )}
            <button
              className="wz-button wz-button-primary"
              type="button"
              disabled={status === 'loading'}
              onClick={step === 4 ? submitForm : goNext}
            >
              {status === 'loading'
                ? text.sending
                : step === 4
                  ? text.submit
                  : text.continue}
            </button>
          </footer>
        )}
      </section>
    </div>
  );
}
