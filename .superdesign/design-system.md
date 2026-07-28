# Bilal Aboqura Portfolio Design System

## Product context

A bilingual Arabic/English personal portfolio for a product designer and
full-stack developer working directly with founders and GCC businesses. The
site must feel personal, credible, technically capable, and easy to scan.

## Visual direction

- Keep the current blue, white and deep-ink palette.
- Use strong 2px ink borders and restrained hard blue shadows.
- Prefer editorial, asymmetric layouts over generic agency cards.
- Arabic headings use Thmanyah Serif Display with selective kashida.
- Arabic body uses IBM Plex Sans Arabic; English uses Manrope.
- Large headings are compact and high contrast.
- Avoid gradients, glassmorphism, purple, neon, and anonymous stock-avatar
  aesthetics.

## Testimonial section requirements

- Client identity appears before the quote, like a compact review card.
- Use initials in a branded circular avatar when a real client photo is not
  available.
- Keep quote, role/company and related-project link clearly associated.
- Do not fabricate client names, quotes, ratings, photos, or business results.
- With one confirmed review, show one deliberate featured card rather than
  duplicating it across a fake marquee.
- The layout must scale to multiple cards and can become a horizontal marquee
  only when additional confirmed reviews are added.
- Arabic and English must share the same hierarchy with native RTL/LTR flow.

## Motion

- Use the existing GSAP reveal/stagger behavior.
- If a future marquee is enabled, pause on hover/focus and respect
  `prefers-reduced-motion`.

## Responsive behavior

- Desktop: heading and review card use the 1180px section shell with a strong
  aligned composition.
- Mobile: single full-width card, comfortable 18px side gutters, no clipped
  author metadata, and no tiny text.
