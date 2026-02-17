import React, { useState } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import CTA from './components/CTA';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import './styles/global.css';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="app-container">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <NoiseOverlay />
      <Navbar />

      {!loading && (
        <SmoothScroll>
          <main>
            <Hero />
            <About />
            <Services />
            <Skills />
            <Projects />
            <Testimonials />
            <Blog />
            <CTA />
            <Footer />
          </main>
        </SmoothScroll>
      )}
    </div>
  );
}

export default App;
