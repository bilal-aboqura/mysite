import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import {
  copy,
  projectData,
  seoCopy,
  services,
} from './content';
import { getWhatsAppUrl, SITE_CONFIG, track } from './siteConfig';
import workspacePhotoSmall from './assets/IMG_E1456-640.webp';
import workspacePhotoMedium from './assets/IMG_E1456-1200.webp';
import workspacePhotoLarge from './assets/IMG_E1456-1600.webp';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function ArrowIcon({ up = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={up ? 'M7 17 17 7M8 7h9v9' : 'M5 12h14M13 6l6 6-6 6'} />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z" />
      <path d="M8.2 7.9c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.1.7l-.6.7c-.2.2-.1.4 0 .6.7 1.2 1.6 2.1 2.8 2.7.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.8.8c.3.1.4.3.4.5 0 .4-.2 1.5-.8 2-.6.5-1.4.7-2.3.4-1.4-.4-3.1-1.1-4.9-2.8-1.5-1.4-2.5-3.2-2.8-4.5-.3-.8 0-1.3.2-1.5Z" />
    </svg>
  );
}

function updateMeta(selector, value, attribute = 'content') {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

function updateDocumentMetadata(language) {
  const seo = seoCopy[language];
  const isArabic = language === 'ar';

  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  document.title = seo.title;

  updateMeta('meta[name="description"]', seo.description);
  updateMeta('meta[property="og:title"]', seo.title);
  updateMeta('meta[property="og:description"]', seo.description);
  updateMeta('meta[property="og:locale"]', seo.locale);
  updateMeta('meta[name="twitter:title"]', seo.title);
  updateMeta('meta[name="twitter:description"]', seo.description);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://bilalaboqura.com/#person',
        name: isArabic ? 'بلال أبو قورة' : 'Bilal Aboqura',
        url: 'https://bilalaboqura.com/',
        email: SITE_CONFIG.email,
        jobTitle: isArabic
          ? 'مطوّر Full-stack وشريك منتجات رقمية'
          : 'Full-Stack Developer and Digital Product Builder',
        description: seo.description,
        knowsLanguage: ['ar', 'en'],
        sameAs: [
          'https://www.linkedin.com/in/bilal-aboqura/',
          'https://www.instagram.com/_bilalaboqura/',
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://bilalaboqura.com/#service',
        name: isArabic
          ? 'بلال أبو قورة — تصميم وتطوير المنتجات الرقمية'
          : 'Bilal Aboqura — Digital Product Design and Development',
        url: 'https://bilalaboqura.com/',
        email: SITE_CONFIG.email,
        areaServed: ['Egypt', 'Arab world', 'GCC', 'International'],
        availableLanguage: ['Arabic', 'English'],
        description: seo.description,
      },
    ],
  };

  let schema = document.getElementById('localized-structured-data');
  if (!schema) {
    schema = document.createElement('script');
    schema.id = 'localized-structured-data';
    schema.type = 'application/ld+json';
    document.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify(structuredData);
}

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'ar';
  const queryLanguage = new URLSearchParams(window.location.search).get('lang');
  if (queryLanguage === 'ar' || queryLanguage === 'en') return queryLanguage;

  const savedLanguage = window.localStorage.getItem('bilal-language');
  return savedLanguage === 'en' ? 'en' : 'ar';
}

function useSmoothMotion(appRef, language) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const limitedHardware =
      typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

    if (reduced || coarsePointer || limitedHardware) return undefined;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      anchors: { offset: -70 },
    });
    const raf = (time) => lenis.raf(time * 1000);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  useLayoutEffect(() => {
    const root = appRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('[data-hero-badge]', {
          opacity: 0,
          y: 18,
          stagger: 0.08,
          duration: 0.45,
        })
        .from(
          '[data-hero-word]:not([data-highlight-word])',
          {
            opacity: 0,
            yPercent: 72,
            stagger: 0.055,
            duration: 0.55,
          },
          '-=0.18',
        )
        .from(
          '[data-hero-highlight-backdrop]',
          {
            opacity: 0,
            scaleX: 0,
            transformOrigin:
              document.documentElement.dir === 'rtl' ? 'right center' : 'left center',
            duration: 0.48,
          },
          '-=0.2',
        )
        .from(
          '[data-highlight-word]',
          {
            opacity: 0,
            yPercent: 72,
            stagger: 0.06,
            duration: 0.55,
          },
          '-=0.18',
        )
        .from(
          '[data-hero-support]',
          {
            opacity: 0,
            y: 18,
            stagger: 0.07,
            duration: 0.48,
          },
          '-=0.28',
        )
        .from(
          '.hero-portrait img',
          {
            opacity: 0,
            filter: 'blur(22px)',
            duration: 0.8,
          },
          '-=0.55',
        )
        .from(
          '[data-hero-art]',
          {
            opacity: 0,
            filter: 'blur(8px)',
            duration: 0.72,
          },
          '-=0.62',
        );

      gsap.to('[data-hero-art]', {
        y: -34,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        },
      });

      gsap.from('[data-trust-item]', {
        opacity: 0,
        y: 28,
        scale: 0.94,
        filter: 'blur(8px)',
        stagger: 0.09,
        duration: 0.68,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '[data-trust-rail]',
          start: 'top 92%',
          once: true,
        },
      });

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 26,
          filter: 'blur(10px)',
          duration: 0.66,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 87%',
            once: true,
          },
        });
      });

      gsap.from('[data-reveal-media]', {
        opacity: 0,
        y: 18,
        duration: 0.55,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: '[data-reveal-media]',
          start: 'top 88%',
          once: true,
        },
      });

      gsap.utils.toArray('[data-stagger]').forEach((group) => {
        const items = group.querySelectorAll('[data-stagger-item]');
        gsap.from(items, {
          opacity: 0,
          y: 20,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 84%',
            once: true,
          },
        });
      });

      ScrollTrigger.matchMedia({
        '(min-width: 901px) and (prefers-reduced-motion: no-preference)': () => {
          const stage = root.querySelector('.horizontal-stage');
          const trackElement = root.querySelector('.project-track');
          if (!stage || !trackElement) return undefined;

          const getDistance = () =>
            Math.max(0, trackElement.scrollWidth - document.documentElement.clientWidth);

          const tween = gsap.fromTo(
            trackElement,
            {
              x: 0,
            },
            {
              x: () => -getDistance(),
              ease: 'none',
              scrollTrigger: {
                trigger: stage,
                start: 'top top',
                end: () => `+=${Math.max(900, getDistance())}`,
                pin: true,
                scrub: 0.75,
                invalidateOnRefresh: true,
              },
            },
          );

          return () => tween.kill();
        },
      });
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 140);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [appRef, language]);
}

function Header({ language, onLanguageChange, text }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  const changeLanguage = () => {
    const nextLanguage = language === 'ar' ? 'en' : 'ar';
    onLanguageChange(nextLanguage);
    setMenuOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a
        className="brand"
        href="#home"
        aria-label={language === 'ar' ? 'بلال أبو قورة، الرئيسية' : 'Bilal Aboqura, home'}
      >
        {language === 'ar' ? 'بــــلال أبــــوقــــورة' : 'BILAL'}
        <span>.</span>
      </a>

      <nav
        className="desktop-nav"
        aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}
      >
        {text.nav.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button
          className="language-switch"
          type="button"
          onClick={changeLanguage}
          aria-label={language === 'en' ? 'عرض الموقع بالعربية' : 'View the site in English'}
        >
          {language === 'en' ? 'عربي' : 'EN'}
        </button>
        <a
          className="header-cta"
          href="#contact"
          onClick={() => track('lead_form_cta_click', { location: 'header' })}
        >
          {text.navCta}
        </a>
      </div>

      <a
        className="mobile-header-cta"
        href="#contact"
        onClick={() => track('lead_form_cta_click', { location: 'mobile_header' })}
      >
        <span>{text.mobileCta}</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={
          menuOpen
            ? language === 'ar'
              ? 'إغلاق القائمة'
              : 'Close navigation'
            : language === 'ar'
              ? 'فتح القائمة'
              : 'Open navigation'
        }
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      {menuOpen && (
        <nav
          className="mobile-nav"
          id="mobile-navigation"
          aria-label={language === 'ar' ? 'قائمة الهاتف' : 'Mobile navigation'}
        >
          {text.nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <div className="mobile-nav-actions">
            <button type="button" onClick={changeLanguage}>
              {text.languageAction}
            </button>
            <a
              href="#contact"
              onClick={() => {
                setMenuOpen(false);
                track('lead_form_cta_click', { location: 'mobile_menu' });
              }}
            >
              {text.navCta}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function HeroBadges({ text, mobile = false }) {
  return (
    <div className={`hero-badges ${mobile ? 'hero-badges-mobile' : 'hero-badges-desktop'}`}>
      <span className="availability" data-hero-badge>
        <i />
        {text.available}
      </span>
      <span className="experience" data-hero-badge>
        {text.experience}
      </span>
    </div>
  );
}

function Hero({ language, text }) {
  const splitWords = (line) => line.split(/(\s+)/);

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-art" aria-hidden="true">
        <svg className="hero-artwork" data-hero-art viewBox="0 0 1000 900" preserveAspectRatio="none">
          <path
            className="hero-art-line hero-art-line-main"
            d="M76 668C192 567 181 428 318 385c139-44 209 93 358 42 111-38 142-155 265-186"
          />
          <path
            className="hero-art-line hero-art-line-echo"
            d="M44 704c132-60 196-35 254 39 63 80 181 94 272 18 82-68 150-86 356-57"
          />
          <path
            className="hero-art-orbit"
            d="M724 92c87-28 176 16 199 96 20 69-18 137-88 157-54 16-116-4-144-53"
          />
          <circle className="hero-art-dot hero-art-dot-one" cx="685" cy="279" r="12" />
          <circle className="hero-art-dot hero-art-dot-two" cx="929" cy="681" r="7" />
          <path className="hero-art-spark hero-art-spark-one" d="M156 151v80M116 191h80" />
          <path className="hero-art-spark hero-art-spark-two" d="M847 516v54M820 543h54" />
          <path className="hero-art-diamond" d="m474 116 27 34-27 34-27-34 27-34Z" />
          <path className="hero-art-arrow" d="m912 219 35 18-28 28" />
        </svg>
      </div>
      <div className="hero-inner">
        <div className="hero-copy">
          <HeroBadges text={text} />

          <h1 id="hero-title">
            {text.hero.map((line, index) => (
              <span
                className={index === text.hero.length - 1 ? 'hero-highlight' : ''}
                data-hero-line
                aria-label={line}
                key={line}
              >
                {index === text.hero.length - 1 && (
                  <span
                    className="hero-highlight-backdrop"
                    data-hero-highlight-backdrop
                    aria-hidden="true"
                  />
                )}
                {splitWords(line).map((part, partIndex) =>
                  /\s+/.test(part) ? (
                    part
                  ) : (
                    <span
                      className="hero-word"
                      data-hero-word
                      data-highlight-word={
                        index === text.hero.length - 1 ? '' : undefined
                      }
                      aria-hidden="true"
                      key={`${part}-${partIndex}`}
                    >
                      {part}
                    </span>
                  ),
                )}
              </span>
            ))}
          </h1>

          <p data-hero-support>
            {(Array.isArray(text.heroBody) ? text.heroBody : [text.heroBody]).map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>

          <div className="hero-actions" data-hero-support>
            <a
              className="button button-dark"
              href="#contact"
              onClick={() => track('lead_form_cta_click', { location: 'hero' })}
            >
              {text.whatsapp}
              <ArrowIcon />
            </a>
            <a className="button button-light" href="#work">
              {text.call} <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="hero-portrait-wrap" aria-label={language === 'ar' ? 'صورة بلال أبو قورة' : 'Portrait of Bilal Aboqura'}>
          <HeroBadges text={text} mobile />
          {/* <div className="portrait-note portrait-note-top">
            {language === 'ar' ? 'تصميم + برمجة' : 'DESIGN + DEVELOPMENT'}
          </div> */}
          <figure className="hero-portrait">
            <img
              src="/images/bilal-hero.jpeg"
              alt={
                language === 'ar'
                  ? 'بلال أبو قورة، مطوّر Full-stack وشريك منتجات رقمية'
                  : 'Bilal Aboqura, full-stack developer and digital product builder'
              }
              width="896"
              height="1200"
              fetchPriority="high"
            />
            {/* <figcaption>
              <span>{language === 'ar' ? 'مقيم في القاهرة' : 'Based in Cairo'}</span>
              <span>
                {language === 'ar' ? 'أعمل مع عملاء عرب ودوليين' : 'Working internationally'}
              </span>
            </figcaption> */}
          </figure>
          {/* <div className="portrait-note portrait-note-bottom">
            {language === 'ar' ? 'عربي + ENGLISH' : 'ARABIC + ENGLISH'}
          </div> */}
        </div>
      </div>
    </section>
  );
}

function TrustRail({ language, text }) {
  return (
    <section
      className="trust-rail"
      aria-label={language === 'ar' ? 'مؤشرات الثقة' : 'Trust signals'}
      data-trust-rail
    >
      {text.trust.map(([value, label]) => (
        <div key={label} data-trust-item>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}

function Problems({ text }) {
  return (
    <section className="problems" id="problems" aria-labelledby="problems-title">
      <div className="section-shell problems-layout">
        <div className="problems-heading" data-reveal>
          <h2 id="problems-title">{text.problemsTitle}</h2>
          <p>{text.problemsIntro}</p>
        </div>
        <ol className="problem-list" data-stagger>
          {text.problems.map(([title, body], index) => (
            <li key={title} data-stagger-item>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Positioning({ language, text }) {
  return (
    <section className="positioning section-shell" aria-labelledby="positioning-title">
      <div data-reveal>
        <h2 id="positioning-title">{text.introTitle}</h2>
      </div>
      <figure className="positioning-visual" data-reveal-media>
        <img
          src={workspacePhotoMedium}
          srcSet={`${workspacePhotoSmall} 640w, ${workspacePhotoMedium} 1200w, ${workspacePhotoLarge} 1600w`}
          sizes="(max-width: 620px) calc(100vw - 28px), min(1180px, calc(100vw - 36px))"
          alt={
            language === 'ar'
              ? 'بلال أبو قورة يعمل على تصميم وبرمجة منتج رقمي'
              : 'Bilal Aboqura designing and developing a digital product'
          }
          loading="lazy"
          decoding="async"
          width="1600"
          height="1595"
        />
        <figcaption>
          {language === 'ar' ? 'من داخل عملية البناء' : 'Inside the build'}
        </figcaption>
      </figure>
      <div className="positioning-foot">
        <p className="positioning-copy" data-reveal>
          {text.introBody}
        </p>
        <ul className="outcome-list" data-stagger>
          {text.outcomeItems.map((item) => (
            <li key={item} data-stagger-item>
              <span aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function VoiceProjectPreview({ language, text }) {
  return (
    <div className="project-voice-preview" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="voice-preview-head">
        <span className="voice-status">
          <i />
          {text.voicePreview}
        </span>
        <strong>THE LOBBY</strong>
      </div>
      <div className="voice-orb" aria-hidden="true">
        <div className="waveform">
          {Array.from({ length: 13 }, (_, index) => (
            <i key={index} style={{ '--bar': index }} />
          ))}
        </div>
      </div>
      <div className="voice-dialogue">
        <p>
          <span>{text.voiceGuestLabel}</span>
          {text.voiceGuest}
        </p>
        <p>
          <span>{text.voiceAgentLabel}</span>
          {text.voiceAgent}
        </p>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, language, text }) {
  const titleId = `project-${project.slug}-title`;

  return (
    <article
      className={`case-card case-card-${index + 1}`}
      id={`case-${project.slug}`}
      aria-labelledby={titleId}
    >
      <div className={`case-visual ${project.visual === 'voice' ? 'case-visual-voice' : ''}`}>
        {project.visual === 'voice' ? (
          <VoiceProjectPreview language={language} text={text} />
        ) : (
          <img
            src={project.image}
            alt={
              language === 'ar'
                ? `واجهة مشروع ${project.name.ar}`
                : `${project.name.en} product interface`
            }
            width="800"
            height="500"
            loading="lazy"
          />
        )}
        <span className="case-index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="case-content" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="case-meta">
          <span>{project.type[language]}</span>
          {project.featured && <strong>{text.gccProof}</strong>}
        </div>
        <h3 id={titleId}>{project.name[language]}</h3>
        <dl>
          <div>
            <dt>{text.challenge}</dt>
            <dd>{project.challenge[language]}</dd>
          </div>
          <div>
            <dt>{text.delivered}</dt>
            <dd>{project.delivered[language]}</dd>
          </div>
          <div>
            <dt>{text.outcome}</dt>
            <dd>{project.outcome[language]}</dd>
          </div>
          <div>
            <dt>{text.role}</dt>
            <dd>{project.role[language]}</dd>
          </div>
        </dl>
        {project.url && (
          <a
            className="case-project-link"
            href={project.url}
            target="_blank"
            rel="noreferrer"
            onClick={() => track('project_view', { project: project.slug })}
          >
            {text.viewProject} <ArrowIcon up />
          </a>
        )}
        <a
          className="case-lead-link"
          href="#contact"
          onClick={() => track('lead_form_cta_click', { location: `case_${project.slug}` })}
        >
          <span>{text.similarProblem}</span>
          <strong>{text.tellMeAboutIt} <ArrowIcon /></strong>
        </a>
      </div>
    </article>
  );
}

function Work({ language, text }) {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const selectedSlugs = ['platvo', 'the-lobby', 'xeemo'];
  const selectedProjects = selectedSlugs
    .map((slug) => projectData.find((project) => project.slug === slug))
    .filter(Boolean);
  const additionalProjects = projectData.filter(
    (project) => !selectedSlugs.includes(project.slug),
  );
  const visibleProjects = showAllProjects
    ? [...selectedProjects, ...additionalProjects]
    : selectedProjects;

  const toggleProjects = () => {
    const nextState = !showAllProjects;
    setShowAllProjects(nextState);
    track(nextState ? 'more_projects_open' : 'more_projects_close', {
      visible_count: nextState ? projectData.length : selectedProjects.length,
    });
  };

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="work-intro section-shell">
        <div data-reveal>
          <h2 id="work-title">{text.workTitle}</h2>
        </div>
        <p data-reveal>{text.workBody}</p>
      </div>

      <div className="selected-projects section-shell">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            project={project}
            index={index}
            language={language}
            text={text}
            key={project.slug}
          />
        ))}
      </div>
      <div className="projects-more-wrap section-shell">
        <button
          className="button projects-more-button"
          type="button"
          aria-expanded={showAllProjects}
          onClick={toggleProjects}
        >
          {showAllProjects ? text.viewFewerProjects : text.viewMoreProjects}
          <span aria-hidden="true">{showAllProjects ? '−' : '+'}</span>
        </button>
      </div>
    </section>
  );
}

function MidCta({ text }) {
  return (
    <section className="mid-cta" aria-labelledby="mid-cta-title">
      <div className="section-shell mid-cta-inner" data-reveal>
        <div>
          <h2 id="mid-cta-title">{text.midCtaTitle}</h2>
          <p>{text.midCtaBody}</p>
        </div>
        <a
          className="button button-white"
          href="#contact"
          onClick={() => track('lead_form_cta_click', { location: 'mid_page' })}
        >
          {text.midCtaAction} <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

function ServiceIcon({ type }) {
  const icons = {
    website: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
      </>
    ),
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="4" rx="1" />
        <rect x="14" y="11" width="7" height="10" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </>
    ),
    assistant: (
      <>
        <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
        <path d="m12 8 .7 1.7L14.5 11l-1.8.7L12 13.5l-.7-1.8L9.5 11l1.8-.7L12 8Z" />
      </>
    ),
    commerce: (
      <>
        <path d="M5 8h14l-1 13H6L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3M9 13h6" />
      </>
    ),
  };

  return (
    <span className="service-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{icons[type]}</svg>
    </span>
  );
}

function Services({ language, text }) {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="section-shell">
        <div className="services-heading" data-reveal>
          <h2 id="services-title">{text.servicesTitle}</h2>
        </div>
        <div className="service-list" data-stagger>
          {services.map((service) => (
            <article key={service.title.en} data-stagger-item>
              <ServiceIcon type={service.icon} />
              <h3>{service.title[language]}</h3>
              <p>{service.text[language]}</p>
              <small>{service.details[language]}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessIcon({ index }) {
  const paths = [
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4 4M7.5 10.5h6M10.5 7.5v6" />
    </>,
    <>
      <path d="m4 16.5-.8 4.3 4.3-.8L18.8 8.7l-3.5-3.5L4 16.5Z" />
      <path d="m13.8 6.7 3.5 3.5M4 16.5 7.5 20" />
    </>,
    <>
      <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M14 4 10 20" />
    </>,
    <>
      <path d="M14.5 4.5c2.7-2.7 5.8-2.2 5.8-2.2s.5 3.1-2.2 5.8l-6.8 6.8-4.1-4.1 7.3-6.3Z" />
      <path d="M13.8 5.2 18 9.4M7.2 10.8l-3.8.8-1.7 1.7 5.1 1M11.3 14.9l-.8 3.8-1.7 1.7-1-5.1M5.5 18.5l-2 2" />
    </>,
  ];

  return (
    <span className="process-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{paths[index]}</svg>
    </span>
  );
}

function Process({ text }) {
  return (
    <section className="process section-shell" id="process" aria-labelledby="process-title">
      <div className="process-heading" data-reveal>
        <h2 id="process-title">{text.processTitle}</h2>
      </div>
      <ol data-stagger>
        {text.process.map(([title, body], index) => (
          <li key={title} data-stagger-item>
            <ProcessIcon index={index} />
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Testimonials({ text }) {
  const proofImages = [
    {
      src: '/images/testimonials/client-website.jpeg',
      width: 1206,
      height: 1536,
    },
    {
      src: '/images/testimonials/client-team.jpeg',
      width: 1068,
      height: 1595,
    },
    {
      src: '/images/testimonials/client-result.jpeg',
      width: 1206,
      height: 1077,
    },
    {
      src: '/images/testimonials/client-system.jpeg',
      width: 1206,
      height: 1055,
    },
  ];

  return (
    <section className="testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonial-heading section-shell" data-reveal>
        <h2 id="testimonials-title">{text.testimonialTitle}</h2>
      </div>
      <div className="verified-reviews section-shell" data-reveal>
        {proofImages.map((proof, index) => (
          <figure className="proof-message" key={proof.src}>
            <img
              src={proof.src}
              alt={text.testimonialProofs[index]}
              width={proof.width}
              height={proof.height}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <strong>{text.testimonialProofs[index]}</strong>
              <span>{text.testimonialPrivacy}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Faq({ language, text }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq section-shell" id="faq" aria-labelledby="faq-title">
      <div className="faq-heading" data-reveal>
        <h2 id="faq-title">{text.faqTitle}</h2>
        <p>{text.faqIntro}</p>
      </div>
      <div className="faq-list">
        {text.faqs.map(([question, answer], index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${index}`;
          return (
            <article className={isOpen ? 'is-open' : ''} key={question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => {
                    setOpenIndex(isOpen ? -1 : index);
                    track('faq_interaction', { question_index: index, language });
                  }}
                >
                  <span>{question}</span>
                  <i aria-hidden="true">{isOpen ? '−' : '+'}</i>
                </button>
              </h3>
              <div className="faq-answer" id={answerId}>
                <p>{answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Contact({ language, text }) {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    projectType: '',
    description: '',
    budget: '',
    website: '',
  });
  const [status, setStatus] = useState('idle');
  const formStartedRef = useRef(false);
  const formText = text.form;
  const optionLabel = (options, value) =>
    options.find(([id]) => id === value)?.[1] || value;
  const summary = language === 'ar'
    ? `مرحبًا بلال، عندي مشروع وأرغب في مناقشته معك.\n\nالاسم: ${formData.name}\nواتساب: ${formData.whatsapp}\nنوع المشروع: ${optionLabel(formText.projectTypes, formData.projectType)}\nالميزانية: ${optionLabel(formText.budgets, formData.budget)}\n\nالمشكلة أو الفكرة:\n${formData.description}`
    : `Hi Bilal, I have a project I would like to discuss.\n\nName: ${formData.name}\nWhatsApp: ${formData.whatsapp}\nProject type: ${optionLabel(formText.projectTypes, formData.projectType)}\nBudget: ${optionLabel(formText.budgets, formData.budget)}\n\nProblem or idea:\n${formData.description}`;
  const whatsappUrl = getWhatsAppUrl(language, summary);

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const submitLead = async (event) => {
    event.preventDefault();
    if (formData.website) return;

    track('lead_form_submit_attempt', {
      project_type: formData.projectType,
      budget: formData.budget,
    });

    if (!SITE_CONFIG.enquiryEndpoint) {
      setStatus('fallback');
      track('lead_form_ready', { project_type: formData.projectType, budget: formData.budget });
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(SITE_CONFIG.enquiryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, language, source: 'inline-sales-form' }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
      track('lead_form_submit', { project_type: formData.projectType, budget: formData.budget });
    } catch {
      setStatus('error');
    }
  };

  const trackFormStart = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    track('lead_form_start', { language });
  };

  const trackWhatsAppLead = () => {
    const hasQualifiedBrief = Boolean(
      formData.name.trim().length > 1 &&
      formData.whatsapp.trim().length >= 7 &&
      formData.projectType &&
      formData.description.trim().length >= 20 &&
      formData.budget,
    );

    track('whatsapp_project_click', { location: 'inline_form' });
    if (hasQualifiedBrief) {
      track('lead_form_submit', {
        method: 'whatsapp',
        project_type: formData.projectType,
        budget: formData.budget,
      });
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="section-shell contact-layout">
        <div className="contact-copy" data-reveal>
          <h2 id="contact-title">
            {text.contactTitle[0]}
            <span>{text.contactTitle[1]}</span>
          </h2>
          <p className="contact-body">{text.contactBody}</p>
          <p className="contact-minimum">{formText.minimum}</p>
        </div>

        <form className="lead-form" onSubmit={submitLead} onFocus={trackFormStart} data-reveal>
          <div className="lead-form-row">
            <label>
              <span>{formText.name}</span>
              <input
                autoComplete="name"
                required
                minLength="2"
                value={formData.name}
                onChange={(event) => updateField('name', event.target.value)}
              />
            </label>
            <label>
              <span>{formText.whatsapp}</span>
              <input
                autoComplete="tel"
                inputMode="tel"
                required
                minLength="7"
                dir="ltr"
                value={formData.whatsapp}
                onChange={(event) => updateField('whatsapp', event.target.value)}
              />
            </label>
          </div>

          <label>
            <span>{formText.projectType}</span>
            <select
              required
              value={formData.projectType}
              onChange={(event) => updateField('projectType', event.target.value)}
            >
              <option value="">—</option>
              {formText.projectTypes.map(([id, label]) => (
                <option value={id} key={id}>{label}</option>
              ))}
            </select>
          </label>

          <label>
            <span>{formText.description}</span>
            <textarea
              required
              minLength="20"
              rows="5"
              placeholder={formText.descriptionPlaceholder}
              value={formData.description}
              onChange={(event) => updateField('description', event.target.value)}
            />
          </label>

          <label>
            <span>{formText.budget}</span>
            <select
              required
              value={formData.budget}
              onChange={(event) => updateField('budget', event.target.value)}
            >
              <option value="">—</option>
              {formText.budgets.map(([id, label]) => (
                <option value={id} key={id}>{label}</option>
              ))}
            </select>
          </label>

          <label className="lead-honeypot" aria-hidden="true">
            Website
            <input
              tabIndex="-1"
              autoComplete="off"
              value={formData.website}
              onChange={(event) => updateField('website', event.target.value)}
            />
          </label>

          <button className="button lead-submit" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? formText.sending : formText.submit}
            <ArrowIcon />
          </button>

          <p className="lead-selection-note">{formText.selectionNote}</p>

          {status === 'success' && <p className="form-status is-success" role="status">{formText.success}</p>}
          {(status === 'fallback' || status === 'error') && (
            <p className="form-status" role="status">
              {status === 'error' ? formText.error : formText.fallback}
            </p>
          )}

          <a
            className="lead-whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={trackWhatsAppLead}
          >
            <WhatsAppIcon />
            {formText.whatsappAlternative}
          </a>
        </form>
      </div>
    </section>
  );
}

function Footer({ language, onLanguageChange, text }) {
  const isArabic = language === 'ar';

  return (
    <footer className="site-footer">
      <div className="footer-main section-shell">
        <div>
          <a
            className="brand brand-footer"
            href="#home"
            aria-label={language === 'ar' ? 'بلال أبو قورة، الرئيسية' : 'Bilal Aboqura, home'}
          >
            {language === 'ar' ? 'بــــلال أبــــوقــــورة' : 'BILAL'}
            <span>.</span>
          </a>
          <p>{text.footerLine}</p>
        </div>
        <div className="footer-contact">
          <span className="footer-label">{isArabic ? 'تواصل مباشر' : 'Direct contact'}</span>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            onClick={() => track('email_click', { location: 'footer' })}
          >
            {SITE_CONFIG.email}
          </a>
          <a href={getWhatsAppUrl(language)} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href="tel:+201112678333" dir="ltr">+20 111 267 8333</a>
        </div>
        <div className="social-links">
          <span className="footer-label">{isArabic ? 'روابط سريعة' : 'Quick links'}</span>
          <a href="https://www.linkedin.com/in/bilal-aboqura/" target="_blank" rel="noreferrer">
            LinkedIn <ArrowIcon up />
          </a>
          <a href="https://www.instagram.com/_bilalaboqura/" target="_blank" rel="noreferrer">
            Instagram <ArrowIcon up />
          </a>
          <button
            className="footer-language"
            type="button"
            onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
          >
            {text.languageAction}
          </button>
          <a href="/privacy.html">{text.privacy}</a>
        </div>
      </div>
      <div className="footer-bottom section-shell">
        <span>{text.copyright}</span>
        <span>{text.location}</span>
      </div>
    </footer>
  );
}

function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const appRef = useRef(null);
  const pageViewTracked = useRef(false);
  const text = copy[language];

  useEffect(() => {
    window.localStorage.setItem('bilal-language', language);
    updateDocumentMetadata(language);

    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);

    if (!pageViewTracked.current) {
      pageViewTracked.current = true;
      track('page_view', {
        language,
        path: url.pathname,
        utm_source: url.searchParams.get('utm_source') || '',
        utm_campaign: url.searchParams.get('utm_campaign') || '',
        referrer: document.referrer || '',
      });
    }
  }, [language]);

  useEffect(() => {
    const milestones = new Set();
    const handleScroll = () => {
      const pageHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (pageHeight <= 0) return;
      const depth = Math.round((window.scrollY / pageHeight) * 100);
      [25, 50, 75, 90].forEach((milestone) => {
        if (depth >= milestone && !milestones.has(milestone)) {
          milestones.add(milestone);
          track('scroll_depth', { percent: milestone });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useSmoothMotion(appRef, language);

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
    track('language_change', { language: nextLanguage });
  };

  return (
    <div className="app" ref={appRef} data-language={language}>
      <a className="skip-link" href="#main-content">
        {language === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}
      </a>
      <Header language={language} onLanguageChange={handleLanguageChange} text={text} />
      <main id="main-content">
        <Hero language={language} text={text} />
        <TrustRail language={language} text={text} />
        <Problems text={text} />
        <Services language={language} text={text} />
        <Work language={language} text={text} />
        <MidCta text={text} />
        <Testimonials text={text} />
        <Process text={text} />
        <Positioning language={language} text={text} />
        <Contact language={language} text={text} />
        <Faq language={language} text={text} />
      </main>
      <Footer language={language} onLanguageChange={handleLanguageChange} text={text} />
    </div>
  );
}

export default App;
