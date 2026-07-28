# Shared Layouts

## Active portfolio shell

- Source: `src/App.jsx`
- Route: `/`
- Description: one-page bilingual portfolio with sticky header, hero, trust rail,
  positioning, horizontally scrolling work, services, process, reasons to work
  together, testimonials, FAQ, contact, and footer.

```jsx
function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [wizardOpen, setWizardOpen] = useState(false);
  const appRef = useRef(null);
  const text = copy[language];

  useSmoothMotion(appRef, language);

  return (
    <div className="app" ref={appRef}>
      <Header language={language} text={text} />
      <main>
        <Hero language={language} text={text} />
        <TrustRail language={language} text={text} />
        <Positioning language={language} text={text} />
        <Work language={language} text={text} />
        <Services language={language} text={text} />
        <Process text={text} />
        <WhyBilal text={text} />
        <Testimonials language={language} text={text} />
        <Faq language={language} text={text} />
        <Contact language={language} text={text} />
      </main>
      <Footer language={language} text={text} />
      <Wizard language={language} open={wizardOpen} onClose={() => setWizardOpen(false)} />
    </div>
  );
}
```

## Header

- Source: `src/App.jsx`
- Description: sticky white header with BILAL. wordmark, anchor navigation,
  language switch, WhatsApp action, and responsive mobile menu.

## Footer

- Source: `src/App.jsx`
- Description: wordmark, short positioning line, email, WhatsApp, phone,
  LinkedIn, Instagram, language action, privacy link, and copyright.
