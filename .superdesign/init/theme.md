# Theme

## Compact token summary

- Primary blue: `#006aff`
- Bright blue: `oklch(0.67 0.22 250)`
- Soft blue: `oklch(0.94 0.035 252)`
- Ink: `oklch(0.2 0.075 257)`
- White: `oklch(0.995 0.003 250)`
- Border color: same as ink, generally 2px
- English display/body: Manrope
- Arabic display: Thmanyah Serif Display
- Arabic body: IBM Plex Sans Arabic
- Main container: `min(100% - 36px, 1180px)`
- Visual language: blue/white/ink, strong borders, restrained hard shadows,
  large editorial headings, pill/circle accents, RTL/LTR native layouts
- Motion: GSAP reveal/stagger, Lenis smooth scrolling, reduced-motion safe
- Main responsive transitions: 1200px wide desktop tuning, 900px stacked
  layouts, 680px mobile typography/card changes

## Raw token source

Source: `src/App.css`

```css
@font-face {
  font-family: 'Thmanyah Serif Display';
  src: url('/fonts/ThmanyahSerifDisplay-Medium.woff2') format('woff2');
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}

:root {
  --blue: #006aff;
  --blue-bright: oklch(0.67 0.22 250);
  --blue-soft: oklch(0.94 0.035 252);
  --ink: oklch(0.2 0.075 257);
  --ink-soft: oklch(0.33 0.06 257);
  --white: oklch(0.995 0.003 250);
  --line: oklch(0.2 0.075 257);
  --font-display: 'Manrope', Arial, sans-serif;
  --font-body: 'Manrope', 'Noto Sans Arabic', sans-serif;
  --font-arabic-display: 'Thmanyah Serif Display', 'IBM Plex Sans Arabic', sans-serif;
  --font-arabic-body: 'IBM Plex Sans Arabic', 'Noto Sans Arabic', sans-serif;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

.section-shell {
  width: min(100% - 36px, 1180px);
  margin-inline: auto;
}
```
