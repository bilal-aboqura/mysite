# Shared UI Components

The active portfolio is intentionally implemented mostly in `src/App.jsx`. The small
shared primitives used throughout that rendered page are:

## ArrowIcon

- Source: `src/App.jsx`
- Purpose: inline directional arrow used in buttons and links.

```jsx
function ArrowIcon({ up = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={up ? 'M7 17 17 7M8 7h9v9' : 'M5 12h14M13 6l6 6-6 6'} />
    </svg>
  );
}
```

## WhatsAppIcon

- Source: `src/App.jsx`
- Purpose: WhatsApp mark used in the primary contact actions.

```jsx
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z" />
      <path d="M8.2 7.9c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.1.7l-.6.7c-.2.2-.1.4 0 .6.7 1.2 1.6 2.1 2.8 2.7.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.8.8c.3.1.4.3.4.5 0 .4-.2 1.5-.8 2-.6.5-1.4.7-2.3.4-1.4-.4-3.1-1.1-4.9-2.8-1.5-1.4-2.5-3.2-2.8-4.5-.3-.8 0-1.3.2-1.5Z" />
    </svg>
  );
}
```

## Wizard

- Source: `src/components/Wizard.jsx`
- Purpose: bilingual project-estimate modal opened from calls to action.
- Key props: `language`, `open`, `onClose`.
- Styling: `src/components/Wizard.css`.

The current testimonial target does not depend on Wizard internals.
