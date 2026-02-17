import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PoeticCards.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Cloyai',
    category: 'AI / SaaS',
    className: 'card-cloyai',
    description: 'Advanced AI-powered platform for content generation and automation.',
    url: 'https://cloyai.com',
    poem: [
      `A digital mind awakes at dawn,\nIts circuits hum, its thoughts are drawn.\nThrough neural paths of light and code,\nIt walks a vast, unmapped road.`,
      `It reads the world in streams of data,\nFrom whispered truths to noisy chatter.\nEach query posed, a spark ignites,\nIlluminating darkened nights.`,
      `It crafts with care what hands cannot,\nFrom scattered threads — a seamless thought.\nA partner born of silicon dreams,\nStitching language at the seams.`,
      `So trust the engine, let it grow,\nFor even machines learn what to know.\nIn ones and zeros, art appears—\nA future forged beyond our fears.`
    ]
  },
  {
    title: 'Fares Toson',
    category: 'Personal Portfolio',
    description: 'High-end personal branding website with immersive animations.',
    url: 'https://farestoson.com',
    poem: [
      `A canvas blank, a name to wear,\nWith pixels placed with utmost care.\nHis brand is built from sweat and soul,\nEach animation makes it whole.`,
      `The cursor dances, sections glide,\nRevealing layers deep inside.\nA portfolio that breathes and moves,\nIn every scroll, his craft improves.`,
      `From hero bold to footer's end,\nDesign and code and vision blend.\nA website not just built to show,\nBut one that lets the viewer grow.`,
      `He pours his essence into screens,\nIn gradients, transitions, themes.\nA personal touch in every frame—\nFares Toson, more than just a name.`
    ]
  },
  {
    title: 'Seen GCC',
    category: 'Corporate / Agency',
    description: 'Modern corporate website for a leading GCC-based agency.',
    url: 'https://seengcc.com',
    poem: [
      `Across the sands where towers rise,\nA vision gleams beneath wide skies.\nThe Gulf awaits with open arms,\nCharmed by digital's modern charms.`,
      `A website built to bridge the gap,\nFrom concept board to business map.\nCorporate lines meet creative thought,\nIn every section, value's wrought.`,
      `Clean grids with purpose, fonts that sing,\nA brand that pulses like a spring.\nThe agency's voice, refined and clear,\nReaches those both far and near.`,
      `In meeting rooms and mobile screens,\nSeen GCC fulfills its dreams.\nA presence strong, a story told—\nCorporate polish, futures bold.`
    ]
  },
  {
    title: 'Nezam VIP',
    category: 'Exclusive Membership',
    description: 'Premium membership platform with secure access and bespoke UI.',
    url: 'https://nezam.vip',
    poem: [
      `Behind the velvet digital door,\nLies access many search long for.\nA membership of curated taste,\nWhere every element is placed.`,
      `Security woven thread by thread,\nWith tokens, guards, and pathways led.\nA VIP experience, sleek and true,\nDesigned for those who value few.`,
      `The interface, a whisper soft,\nWith animations floating aloft.\nExclusivity in every byte,\nA platform gleaming, pure, and bright.`,
      `Nezam stands tall, a gated hall,\nFor those who answer luxury's call.\nA digital club of form and grace—\nWhere elegance meets cyberspace.`
    ]
  },
  {
    title: 'Arab Motion Academy',
    category: 'E-Learning',
    description: 'Interactive educational platform for motion graphics and design.',
    url: 'https://arabmotionacademy.com',
    poem: [
      `In frames that dance and shapes that sway,\nYoung artists learn a visual way.\nThe academy's halls are bright with light,\nFrom monitors glowing through the night.`,
      `Each lesson builds on what came before,\nOpening wide a creative door.\nFrom After Effects to 3D space,\nEvery student finds their pace.`,
      `Motion is language, bold and free,\nA grammar taught with artistry.\nHere, the future animators rise,\nWith skill that earned through sacrifice.`,
      `Arab Motion — a name well earned,\nFor all the knowledge here returned.\nA platform where the curious grow,\nAnd motion tells what words can't show.`
    ]
  },
  {
    title: 'Xeemo EG',
    category: 'Digital Services',
    description: 'Innovative digital services platform with a sleek user experience.',
    url: 'https://xeemo-eg.com',
    poem: [
      `Innovation hums through every wire,\nA digital forge of pure desire.\nXeemo crafts what others dream,\nA seamless, sleek, electric stream.`,
      `From UI flows to backend calls,\nThrough microservices and protocol halls.\nEach feature built with practiced hand,\nDesigned to scale, designed to stand.`,
      `The user's path is smooth as glass,\nNo friction found, no lag to pass.\nWith every tap, a world responds,\nLike ripples spreading over ponds.`,
      `Xeemo EG — the name rings clear,\nA force in tech without a peer.\nDigital dreams made manifest,\nEngineered to be the best.`
    ]
  },
  {
    title: 'Min Alakher',
    category: 'News / Media',
    description: 'Dynamic content hub delivering the latest updates with speed.',
    url: 'https://minalakher.com',
    poem: [
      `The headlines break before the dawn,\nAnother story, carried on.\nMin Alakher — from end to start,\nDelivering news with speed and heart.`,
      `Each article, a window wide,\nTo truths that some would rather hide.\nA platform built for those who seek,\nThe words that make the voiceless speak.`,
      `Speed meets substance, form meets fact,\nA digital stage where words react.\nFrom scroll to share, the journey's swift,\nEach reader leaves with knowledge's gift.`,
      `In feeds and threads, the stories flow,\nLike rivers finding where to go.\nMin Alakher, the end that starts—\nA newsroom wired with modern arts.`
    ]
  }
];

const PoeticCards = () => {
  const sectionRef = useRef(null);
  const stackRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const totalCards = cards.length;

    if (!section || !stack || totalCards === 0) return;

    const ctx = gsap.context(() => {
      // Initial state: card 0 fully visible on top, rest hidden behind
      cards.forEach((card, i) => {
        gsap.set(card, {
          zIndex: totalCards - i,
          scale: i === 0 ? 1 : 0.92,
          y: 0,
          opacity: i === 0 ? 1 : 0,
        });
      });

      // Build a single master timeline
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalCards * 150}vh`,
          pin: stack,
          pinSpacing: true,
          scrub: 1.5,
          onEnter: () => setInView(true),
          onLeave: () => setInView(false),
          onEnterBack: () => setInView(true),
          onLeaveBack: () => setInView(false),
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(
              Math.floor(progress * totalCards),
              totalCards - 1
            );
            setActiveIndex(idx);
          },
        },
      });

      // For each card transition (card i flies away, card i+1 appears)
      for (let i = 0; i < totalCards - 1; i++) {
        const current = cards[i];
        const next = cards[i + 1];

        // Hold the current card visible before it starts leaving
        master.to({}, { duration: 0.8 });

        // Swipe current card up and away
        master.to(current, {
          y: '-110%',
          opacity: 0,
          scale: 0.88,
          rotateX: -5,
          duration: 1.5,
          ease: 'power2.in',
        });

        // Simultaneously bring the next card in
        master.fromTo(
          next,
          { opacity: 0, scale: 0.92, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out' },
          '<0.5' // starts slightly after the current card begins leaving
        );

        // Pause after the new card is fully visible
        if (i < totalCards - 2) {
          master.to({}, { duration: 0.5 });
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="poetic-section container" ref={sectionRef}>
      <h2 className="poetic-section__title">Selected Works</h2>
      <p className="poetic-section__subtitle">My Works</p>

      <div className="poetic-scroll-indicator">
        <span className="poetic-scroll-indicator__text">Scroll to explore</span>
        <span className="poetic-scroll-indicator__icon">↓</span>
      </div>

      <div className="poetic-stack-wrapper" ref={stackRef}>
        <div className="poetic-stack-inner" style={{ perspective: '1200px' }}>
          {projects.map((project, index) => (
            <article
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`poetic-card ${project.className || ''}`}
              id={`poetic-card-${index}`}
            >
              {/* Header */}
              <header className="poetic-card__header">
                <div>
                  <h3 className="poetic-card__title">{project.title}</h3>
                  <span className="poetic-card__category">{project.category}</span>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="poetic-card__arrow"
                  aria-label={`Visit ${project.title}`}
                >
                  ↗
                </a>
              </header>

              {/* Body */}
              <div className="poetic-card__body">
                <div className="poetic-card__iframe-wrap">
                  <iframe
                    src={project.url}
                    title={project.title}
                    className="poetic-card__iframe"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
                <div className="poetic-card__poem">
                  {project.poem.map((stanza, si) => (
                    <p key={si}>
                      {stanza.split('\n').map((line, li) => (
                        <React.Fragment key={li}>
                          {line}
                          {li < stanza.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  ))}
                </div>
              </div>

              {/* Link Bar */}
              <div className="poetic-card__link-bar">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="poetic-card__link"
                >
                  Visit Live Site{' '}
                  <span className="poetic-card__link-arrow">→</span>
                </a>
                <span style={{ color: '#555', fontSize: '0.75rem' }}>
                  {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>

              {/* Background Number */}
              <span className="poetic-card__number">
                {String(index + 1).padStart(2, '0')}
              </span>
            </article>
          ))}
        </div>
      </div>

      {/* Progress Dots (fixed on right side) */}
      <div className={`poetic-progress ${inView ? 'poetic-progress--visible' : ''}`}>
        {projects.map((_, i) => (
          <button
            key={i}
            className={`poetic-progress__dot ${i === activeIndex ? 'poetic-progress__dot--active' : ''}`}
            aria-label={`Card ${i + 1}`}
            onClick={() => {
              // Optional: could scroll to the right position
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default PoeticCards;
