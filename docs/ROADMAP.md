# 4WINGMEN Interactive Brand Book — Roadmap

**Status:** Core interactions implemented on a build branch; automated checks pass; logged-in visual QA remains outstanding.

## Phase 0 — Planning and source audit
- [x] Confirm hybrid editorial/book experience.
- [x] Establish the agency-profile scope and target audience.
- [x] Audit the reference experience and document interaction requirements.
- [x] Capture the manuscript, storyboard and visual-system specification.
- [x] Confirm service catalogue and editorial/factual safeguards.
- [x] Verify the four original team poster files and official logo.
- [x] Correct portrait-to-member mapping and upload the original assets to Cloudinary.
- [x] Audit the existing React/Vite app, navigation and CI workflow.

## Phase 1 — Design system and storyboard
- [x] Establish cinematic monochrome foundation and member-specific accent palette.
- [x] Define display/body typography and editorial composition.
- [x] Storyboard all eleven chapters.
- [x] Define guided and free exploration modes.
- [x] Define mobile, keyboard, swipe and reduced-motion requirements.
- [x] Document logo and photo preservation rules.

## Phase 2 — Core interaction implementation
- [x] Connect the official logo and four verified team posters.
- [x] Implement guided sequential navigation and free chapter-index navigation.
- [x] Add keyboard navigation with editable/interactive target guards.
- [x] Add horizontal pointer/touch swipe detection.
- [x] Add chapter progress and screen-reader chapter announcements.
- [x] Add focus entry/return and Escape/focus-trap behaviour for the chapter index.
- [x] Add a centered CSS 3D book cover that opens when the book surface or Open button is activated.
- [x] Add direction-aware hinged chapter transitions and lock navigation while transitions run.
- [x] Add GSAP progressive content reveals.
- [x] Add system-aware and user-toggleable reduced-motion mode.
- [x] Add React component tests covering cover opening, guided/free mode, chapter index, Escape handling and keyboard guards.
- [x] Move CI to Node.js 26 LTS.
- [x] Confirm GitHub Actions helper/component tests and the TypeScript/Vite production build pass (19 tests).
- [ ] Check preview screenshots at desktop and mobile viewports.

## Phase 3 — Signature visual refinement
- [ ] Compare the new 3D opening cover, chapter compositions, spacing and page movement against the reference interaction checklist.
- [ ] Tune image sizing and typography at 320px, 390px, 768px, 1024px and 1440px.
- [ ] Validate poster visibility and image loading in the deployed preview.
- [ ] Add a WebGL/GLSL prototype only if a specific visual requirement cannot be achieved cleanly with CSS and GSAP.
- [ ] Profile loading and animation on a representative mid-range mobile device.

## Phase 4 — Portfolio and final content
- [x] Integrate approved agency narrative, roles and service descriptions from the manuscript.
- [x] Preserve the qualified 10+ collective prior-client experience statement.
- [x] Keep creator-led in-house brand content distinct from customer-generated UGC.
- [x] Keep the selected-work chapter clearly marked as a placeholder.
- [ ] Collect approved project visuals, project descriptions, member attribution and publication permissions.
- [ ] Replace the placeholder only after portfolio evidence is approved.

## Phase 5 — Release QA
- [x] Confirm GitHub Actions tests and TypeScript/Vite production build are green (19 tests on the latest code commit).
- [ ] Complete logged-in desktop and mobile browser QA (the current preview URL is protected by Vercel SSO).
- [ ] Check keyboard focus order, menu focus trap and screen-reader announcements.
- [ ] Check reduced-motion behaviour.
- [ ] Check broken-image/network errors and image-loading performance.
- [ ] Confirm Instagram CTA destination.
- [x] Verify the Vercel preview deployment reaches READY state (preview remains SSO-protected).
- [ ] Merge to main and verify the production deployment after visual review.
- [ ] Review all factual content against `MANUSCRIPT.md`.

## Technical scope decision
The current product does not need Three.js/WebGL to satisfy its initial interaction brief. Use the existing React/Vite/TypeScript, custom CSS and GSAP stack first. Only introduce WebGL if visual comparison shows a meaningful effect that CSS/GSAP cannot provide efficiently.

## Release rule
Do not mark the project production-ready until the full CI pipeline, responsive browser checks, asset checks, accessibility checks and factual-content review have passed.
