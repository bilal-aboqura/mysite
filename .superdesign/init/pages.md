# Page dependency trees

## `/` Portfolio

Entry: `src/main.jsx`

Dependencies:

- `src/App.jsx`
  - `src/App.css`
  - `src/content.js`
  - `src/siteConfig.js`
  - `src/assets/IMG_E1456.webp`
  - `src/components/Wizard.jsx`
    - `src/components/Wizard.css`
- `src/index.css`

The testimonial target renders from the `Testimonials` function inside
`src/App.jsx`, reads the `testimonials` array and bilingual heading from
`src/content.js`, and is styled by the testimonial selectors in `src/App.css`.
