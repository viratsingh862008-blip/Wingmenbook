# Interactive Brand Book Implementation Plan

**Date:** 2026-11-14  
**Branch:** `build/interactive-book-implementation`  
**Base commit:** `d0a1c7c12bae8b0528fb9fb905626597b50956a1`

## Goal
Turn the existing React/Vite prototype into a functional, responsive editorial brand book using the verified original team posters and official logo, while preserving the approved manuscript and factual safeguards.

## Existing-state findings
- Repository contains a React/Vite application, chapter content, basic navigation, Vitest tests and a GitHub Actions quality workflow.
- Team photos point to nonexistent `/assets/*.jpg` paths; the official logo is not used on the cover.
- The sound control is a visual toggle without audio; the guided/free switch changes only its label.
- Keyboard navigation does not ignore editable focus; touch swipe is not implemented.
- The visual-system document specifies a monochrome editorial base with restrained, person-specific accents from the supplied posters.
- The portfolio remains a factual placeholder because approved case-study assets have not been supplied.

## Verified Cloudinary mapping
- Aryan Singh: `4wingmen/brand-book/aryan-singh.jpg`
- Saad Gani: `4wingmen/brand-book/saad-gani.jpg`
- Ayush: `4wingmen/brand-book/ayush.jpg`
- Zaid Ahmad: `4wingmen/brand-book/zaid-ahmad.jpg`
- Official logo: `4wingmen/brand-book/4wingmen-logo.png`

The posters are full editorial compositions with embedded typography; display them without destructive cropping or alteration. The logo has a white circular field; preserve it.

## Implementation decisions
1. Reuse React/Vite/TypeScript/GSAP; do not introduce Three.js unless a measured effect requires it.
2. Use semantic HTML for text and controls, and verified Cloudinary URLs for poster assets.
3. Replace the nonfunctional sound toggle with a motion preference control; audio is deferred until an approved sound asset exists.
4. Make guided mode sequential and free mode chapter-index-driven; next/previous remain available in both modes.
5. Add touch/pointer swipe navigation with a conservative threshold and interactive-element guards.
6. Respect reduced-motion preferences and clean up timelines/listeners.
7. Add chapter announcements and accessible chapter-index focus handling.
8. Keep portfolio placeholders and client-experience disclaimers intact.
9. Add a clickable CSS 3D opening cover and direction-aware hinged chapter transitions; lock navigation while either cover or page animation runs.

## Slices
### Slice 1 — Content and asset integrity
- Add typed asset URLs and the official logo on the cover.
- Connect the verified member poster to the correct member record.
- Use `object-fit: contain` so the complete poster artwork remains visible.
- Extend tests for navigation and keyboard target guards.

### Slice 2 — Navigation and motion
- Implement guided/free behavior.
- Add guarded keyboard navigation, touch/pointer swipe, chapter-index focus management and progress state.
- Add a CSS 3D book cover that opens only after user activation.
- Add GSAP direction-aware hinged page transitions, progressive reveals, navigation lock and reduced-motion behaviour.

### Slice 3 — Responsive and accessibility hardening
- Validate stage scroll, mobile composition, touch targets and menu semantics.
- Add screen-reader current-chapter announcements and focus return.
- Remove no-op controls.

### Slice 4 — Docs and quality
- Update README, asset inventory and roadmap.
- Run 19 tests (13 navigation-helper + 6 React component tests), TypeScript build and Vite production build through CI on Node.js 26 LTS.
- Run the five-axis code review: correctness, readability, architecture, security and performance.
- Capture desktop/mobile preview screenshots where deployment access permits.

## Acceptance criteria
- All five verified assets load and each portrait is assigned to the correct person.
- Official logo is used unchanged with original white field.
- Previous/next, guided/free, chapter index, keyboard and touch navigation work.
- Keyboard arrows do not hijack typing or button/select interactions.
- Chapter index supports Escape, focus entry/return, visible focus and active chapter state.
- Reduced-motion users get the same content/navigation without large animation.
- No sound toggle appears until audio is actually implemented.
- Portfolio and 10+ collective experience statements remain accurately qualified.
- All 19 CI tests and production build pass before merging.
- Preview is visually checked on desktop and mobile.

## Risks and limits
- Supplied media are designed posters, not isolated transparent headshots; do not auto-extract/recolour them.
- Exact reference parity cannot be claimed without comparative browser QA; implement original interaction qualities, not copied source code/art.
- A dedicated browser DevTools connection is not available in this session; use deployment screenshots and CI, and disclose remaining verification gaps.


## Implementation addendum — reference-matched book opening and page motion

- The opening screen uses a centered CSS 3D book object with a user-triggered hinged cover animation; the book itself is a keyboard-accessible button.
- After opening, the eleven content chapters remain semantic HTML and use GSAP direction-aware rotation/translation to suggest a page turn.
- Navigation is locked during page movement to prevent rapid input from skipping chapters.
- The motion preference can bypass the cover animation and chapter movement.
- The neutral page-level accent system remains restrained; member-specific warm accents stay scoped to supplied posters and selected details.
- The latest completed security-audit run reported zero vulnerabilities; all 19 Vitest tests and the TypeScript/Vite production build passed.
- The Vercel preview is READY but protected by SSO; external browser visual QA remains an explicit release gate.
- The approved cover tagline has been aligned to the manuscript wording, and an unconfirmed establishment-date-style label was replaced with an edition marker.
