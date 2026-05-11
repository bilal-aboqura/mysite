import React, { useState, Suspense, lazy } from 'react';

import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SmoothScroll from './components/SmoothScroll';
import Wizard from './components/Wizard';
import WhatsAppButton from './components/WhatsAppButton';
import './styles/global.css';

// Lazy load below-the-fold components
const Projects    = lazy(() => import('./components/Projects'));
const Services    = lazy(() => import('./components/Services'));
const Skills      = lazy(() => import('./components/Skills'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Plans       = lazy(() => import('./components/Plans'));
const FAQ         = lazy(() => import('./components/FAQ'));
const Blog        = lazy(() => import('./components/Blog'));
const CTA         = lazy(() => import('./components/CTA'));
const Footer      = lazy(() => import('./components/Footer'));
const Library     = lazy(() => import('./components/Library'));

function App() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const openWizard = () => setWizardOpen(true);
  const isLibrary = window.location.pathname === '/library';

  if (isLibrary) {
    return (
      <div className="app-container">
        <CustomCursor />
        <NoiseOverlay />
        <Navbar onOpenWizard={openWizard} />
        <Suspense fallback={null}>
          <Library />
          <Footer />
        </Suspense>
        <WhatsAppButton />
        <Wizard isOpen={wizardOpen} onClose={() => setWizardOpen(false)} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <CustomCursor />
      <NoiseOverlay />
      <Navbar onOpenWizard={openWizard} />

      <SmoothScroll>
        <main aria-label="Bilal Aboqura — Full Stack Developer Portfolio">

          {/* 1. Hero — hook the visitor instantly */}
          <Hero onOpenWizard={openWizard} />

          {/* 2. About — quick credibility: who am I + 47 projects */}
          <About />

          <Suspense fallback={null}>

            {/* 3. Projects — show the work BEFORE explaining what you do */}
            <Projects />

            {/* 4. Services — now they understand the context */}
            <Services />

            {/* 5. Skills — reinforce technical credibility */}
            <Skills />

            {/* 6. Testimonials — social proof before the price reveal */}
            <Testimonials />

            {/* 7. Plans — pricing after trust is established */}
            <Plans onOpenWizard={openWizard} />

            {/* 8. FAQ — pre-answer objections, reduce friction */}
            <FAQ onOpenWizard={openWizard} />

            {/* 9. Blog / Library — authority & thought leadership */}
            <Blog />

            {/* 10. Final CTA — last push to convert */}
            <CTA onOpenWizard={openWizard} />

            <Footer />
          </Suspense>

          {/* SEO: Visually hidden rich-text block for crawlers */}
          <div
            aria-hidden="false"
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              overflow: 'hidden',
              clip: 'rect(0,0,0,0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
          >
            <h2>Hire Bilal Aboqura — Expert Full Stack Developer for Your Next Website</h2>
            <p>
              Looking to <strong>build a website</strong> or <strong>web application</strong>?{' '}
              Bilal Aboqura is an experienced <strong>full stack developer</strong> available for
              hire worldwide. Whether you need a <strong>custom website</strong>,{' '}
              <strong>React web app</strong>, <strong>Next.js</strong> project, <strong>SaaS platform</strong>,
              or <strong>e-commerce store</strong>, Bilal delivers fast, beautiful, and scalable solutions.
            </p>
            <p>
              With 4+ years of professional experience and 47+ completed projects, Bilal Aboqura is
              one of the best <strong>freelance web developers</strong> you can hire. Specializing in
              React, Next.js, Node.js, MongoDB, TypeScript, REST APIs, and modern UI/UX design.
            </p>
            <p>
              Services include: <strong>website development</strong>, <strong>web application development</strong>,
              <strong>backend engineering</strong>, <strong>API development</strong>,
              <strong>database design</strong>, and <strong>UI/UX design</strong>.
              Contact Bilal at info.bilalcs@gmail.com or call +201112678333.
            </p>
          </div>
        </main>
      </SmoothScroll>

      {/* Global floating elements — outside SmoothScroll so they stay fixed */}
      <WhatsAppButton />
      <Wizard isOpen={wizardOpen} onClose={() => setWizardOpen(false)} />
    </div>
  );
}

export default App;
