import React, { useState, Suspense, lazy } from 'react';

import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SmoothScroll from './components/SmoothScroll';
import './styles/global.css';

// Lazy load below-the-fold components
const Services = lazy(() => import('./components/Services'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Blog = lazy(() => import('./components/Blog'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <div className="app-container">
      <CustomCursor />
      <NoiseOverlay />
      <Navbar />

      <SmoothScroll>
        <main aria-label="Bilal Aboqura — Full Stack Developer Portfolio">
          <Hero />
          <About />
          <Suspense fallback={null}>
            <Services />
            <Skills />
            <Projects />
            <Testimonials />
            <Blog />
            <CTA />
            <Footer />
          </Suspense>

          {/* ═══════════════════════════════════════════════════════
               SEO: Visually hidden rich-text block for crawlers.
               Fully accessible (screen-reader friendly), not spam.
          ═══════════════════════════════════════════════════════ */}
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
              With 4+ years of professional experience and 39+ completed projects, Bilal Aboqura is
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
    </div>
  );
}

export default App;
