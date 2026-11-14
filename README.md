# 4WINGMEN Interactive Brand Book

A browser-based, chapter-led agency profile built with React, TypeScript, Vite and GSAP. It is an interactive editorial publication—not a PDF viewer or a conventional agency landing page.

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm test
npm run build
```

GitHub Actions runs the tests and production build on pushes to `main` and `build/**`, and on pull requests targeting `main`.

## Experience

- Eleven editorial chapters from the cover through the contact close.
- Guided reading with previous/next controls.
- Free exploration with an accessible chapter index.
- Keyboard arrow navigation that does not hijack editable or interactive elements.
- Touch/pointer horizontal swipe navigation with a conservative threshold.
- Chapter progress, active chapter state and focus-managed chapter index.
- A centered 3D book cover that opens by clicking the book itself or the Open button, with keyboard-accessible focus.
- CSS/GSAP cover-opening animation with navigation locked until the cover completes its turn.
- Direction-aware hinged chapter transitions with a transition lock to prevent accidental double navigation.
- GSAP progressive content reveals.
- Reduced-motion support that follows the system preference and can be toggled in the interface.
- Responsive desktop and mobile compositions.
- Semantic HTML for all essential text, headings and controls.

There is no audio control until an approved audio asset and sound treatment are supplied. WebGL/Three.js is intentionally deferred; CSS and GSAP provide the current motion system without adding a GPU dependency prematurely.

## Original assets

The actual supplied poster artwork and official logo are hosted in the `4wingmen/brand-book` Cloudinary folder and referenced directly by the application.

| Asset | Cloudinary URL |
|---|---|
| Aryan Singh | https://res.cloudinary.com/roq8nakt/image/upload/v1794639146/4wingmen/brand-book/aryan-singh.jpg |
| Saad Gani | https://res.cloudinary.com/roq8nakt/image/upload/v1794639140/4wingmen/brand-book/saad-gani.jpg |
| Ayush | https://res.cloudinary.com/roq8nakt/image/upload/v1794639110/4wingmen/brand-book/ayush.jpg |
| Zaid Ahmad | https://res.cloudinary.com/roq8nakt/image/upload/v1794639134/4wingmen/brand-book/zaid-ahmad.jpg |
| Official logo | https://res.cloudinary.com/roq8nakt/image/upload/v1794639104/4wingmen/brand-book/4wingmen-logo.png |

The member images are full editorial poster compositions, not isolated headshots. They are displayed with `object-fit: contain` to avoid cutting out embedded names or typographic elements. The official logo's original white circular field is retained. Do not recolour, redraw or replace supplied brand assets.

## Content safeguards

- The 10+ client-experience statement describes the team's collective prior experience, not an agency client count.
- On-camera brand content is described as creator-led content featuring the in-house team; it is not represented as authentic customer-generated content.
- The selected-work chapter remains a placeholder until approved project visuals, attributions and publication permissions are available.
- Do not invent client names, case studies, testimonials, outcomes or performance metrics.
- Current chapter copy and editorial constraints are documented in `docs/MANUSCRIPT.md`.

## Project documentation

See `docs/` for the PRD, manuscript, storyboard, visual system, interaction specification, asset guidelines, architecture and roadmap.
