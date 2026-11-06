# Settle In — UI/UX case study + clickable prototype

A concept app that helps international students in India get through their first month: one checklist, one clear next step.

**This is a self-initiated concept project, not client work.** All people, places and numbers inside the screens are sample data and labelled as such. No user research has been run yet; the case study says which statements are assumptions.

## Visual refresh
The premium visual layer lives in `css/premium.css` and overrides the original design tokens and component styling without replacing the semantic HTML or prototype interaction logic. It adds a deep teal/navy editorial palette, warm accent gradients, refined spacing and type scale, glass-inspired surfaces, responsive device framing, hover/micro-interactions, and reduced-motion handling. Keep this file linked after `css/style.css` and `css/premium.css` in both HTML pages.

## What is inside
- `css/premium.css` — the visual layer (gradients, depth, motion) on top of `css/style.css`
- `index.html` — the case study: problem, assumptions, flows, wireframes, design system (contrast ratios computed from the real colours), the six screens, accessibility decisions, test plan
- `prototype.html` — a working clickable prototype (welcome → home → task details → mark done → documents → nearby → help)
- `assets/screens/` — PNG exports of the six screens
- `assets/og-image.jpg` — social preview (1200×630)
- `docs/` — screenshots for this README

## Run it
No build step. Open `index.html`, or serve the folder: `python3 -m http.server`.

## Publish on GitHub Pages
Create a repo named `ux-settle-in`, upload these files, then Settings → Pages → deploy from `main` / root. Live URL: `https://paulalan2509.github.io/ux-settle-in/`. If your username or repo name differs, update the canonical and og:image URLs in both HTML files.

## Tech
HTML, CSS (custom properties), vanilla JavaScript. Plus Jakarta Sans, self-hosted (SIL OFL). Reduced-motion respected; focus moves to each screen's title; a polite live region announces screen changes.

Author: Paul Alain Nyoum
