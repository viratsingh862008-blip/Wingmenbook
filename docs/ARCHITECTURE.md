# 4WINGMEN Interactive Brand Book — Technical Architecture

**Status:** Implemented core architecture; refinements and release QA in progress.

## 1. Architecture goals
- Deliver an immersive editorial publication with reliable navigation.
- Keep essential content semantic, selectable HTML.
- Preserve original brand assets.
- Build progressive motion without unnecessary GPU complexity.
- Make mobile, keyboard and reduced-motion use first-class.

## 2. Actual stack

| Layer | Technology | Responsibility |
|---|---|---|
| Application | React 18 + Vite + TypeScript | Chapter shell, content and interaction state |
| Styling | Custom CSS | Visual system, editorial layouts and responsive behaviour |
| Motion | CSS 3D transforms + GSAP | Opening cover hinge, direction-aware page movement and progressive reveal choreography |
| Icons | Lucide React | Interface icons |
| Tests | Vitest | Navigation helper and input-behaviour tests |
| Asset hosting | Cloudinary | Original team poster and logo delivery |
| CI | GitHub Actions | Dependency install, tests and TypeScript/Vite build |
| Deployment | Vercel | Preview and production hosting |
| Version control | GitHub | Branches, commits, code review and CI |

Three.js, WebGL, GLSL, Tailwind and ScrollTrigger are not currently required dependencies. Keep them deferred unless a documented visual or performance need justifies adding them.

## 3. Current source layout

```
src/
  App.tsx                 # Chapter content, shell and UI behaviour
  main.tsx                # React entry point
  styles.css              # Editorial visual system and responsive layouts
  lib/
    navigation.ts         # Chapter clamping, keyboard guards and swipe detection
    navigation.test.ts    # Unit tests for navigation behaviour
docs/
  PRD.md
  MANUSCRIPT.md
  STORYBOARD.md
  VISUAL-SYSTEM.md
  INTERACTION-SPEC.md
  ASSET-GUIDELINES.md
  ARCHITECTURE.md
  ROADMAP.md
```

Keep future components and modules focused. Avoid creating abstractions or directories before a second concrete use case needs them.

## 4. Separation of responsibilities

### React / HTML layer
Owns chapter data, semantic headings, selectable text, accessible controls, current chapter state, the chapter index, image alt text, focus management, responsive structure and error states.

### CSS layer
Owns the editorial layout, responsive type and spacing, visual accents, poster containment, the CSS 3D cover geometry, focus visibility and no-motion fallback.

### GSAP layer
Owns the opening-cover hinge, direction-aware chapter page movement and progressive reveal effects. The cover opens only after user activation. Chapter navigation is locked during the transition and unlocked on completion. Animation contexts are reverted on cleanup; GSAP must not mutate the same element properties independently from React state.

### Cloudinary
Serves the original supplied assets via HTTPS. The current app uses static, versioned URLs; no API key or client-side secret is required.

## 5. Navigation and input model
- Guided mode offers sequential previous/next navigation.
- Free mode exposes an accessible chapter index for direct chapter selection.
- Unmodified left/right arrows navigate only when focus is not in an interactive or editable target; Shift/Alt/Ctrl/Meta combinations are preserved for browser and text-selection behaviour.
- Horizontal pointer/touch swipe has a movement threshold and ignores starts/ends on controls and links.
- The index dialog has initial focus, Escape close, focus trapping and focus return.
- The progress indicator exposes a numeric progress value to assistive technology.

## 6. Motion and accessibility
- Read `prefers-reduced-motion` on startup and respond to system preference changes until a manual override is chosen.
- Expose a manual reduced-motion control.
- Reduced-motion mode removes ambient and page animation while preserving content and navigation.
- Audio is not enabled until an approved audio file and playback behaviour exist.
- Do not make motion the sole way to navigate or understand content.

## 7. Assets and lifecycle
- Use the verified Cloudinary URLs in the asset inventory.
- Preserve poster compositions using `object-fit: contain`.
- Lazy-load non-cover posters.
- Keep the original logo's geometry and white circular field.
- Provide an explicit unavailable-image state for network failures.
- Do not add Three.js texture/geometry lifecycle until a WebGL layer is justified.

## 8. Performance and resilience
- Keep first-view work limited to the cover and its logo.
- Lazy-load below-the-fold poster images.
- Use a conservative transition duration and avoid continuous animation loops.
- Keep essential copy independent of external assets.
- Preserve the CSS/HTML experience as the baseline if future decorative WebGL is unavailable.
- Review network and browser rendering in the Vercel preview before release.

## 9. Testing and verification
- 13 unit tests for chapter clamping, keyboard-target guards (including modified shortcuts), swipe-direction detection and forward/backward page-turn direction.
- GitHub Actions executes `npm test` and `npm run build`.
- Browser QA should cover 320px, 390px, 768px, 1024px and 1440px widths.
- Check opening-cover interaction, page-turn direction/lock, keyboard focus, chapter index, mobile swipe and pinch zoom, reduced-motion, image loading and outbound contact link.
- Review correctness, readability, architecture, security and performance before merging.

## 10. Deployment
The Vercel project is connected to the GitHub repository. Use a build branch/preview for implementation review. Do not publish to production until CI and responsive browser QA pass. No backend, database, authentication or environment secret is required for the initial static book.
