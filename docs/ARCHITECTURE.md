# 4WINGMEN Interactive Brand Book — Technical Architecture

**Status:** Proposed architecture; confirm versions and implementation details during repository setup.

## 1. Architecture goals
- Deliver a high-quality interactive editorial experience.
- Keep content, semantic UI and GPU rendering concerns separate.
- Build progressively, validating one representative chapter before scaling.
- Maintain a reliable responsive fallback for devices without suitable WebGL support.

## 2. Proposed stack

| Layer | Proposed technology | Responsibility |
|---|---|---|
| Application | React + Vite + TypeScript | App shell, components and state |
| Styling | Tailwind CSS + custom CSS | Layout, design tokens and responsive styling |
| Motion | GSAP | Timelines, transitions and choreography |
| Scroll-linked motion | GSAP ScrollTrigger, only if needed | Scroll-driven sequences |
| Graphics | Three.js + WebGL | Canvas rendering and layered visual effects |
| Shader effects | GLSL | Custom parallax/displacement and visual treatments |
| Input | Pointer Events + keyboard controls | Mouse, touch and accessible navigation |
| Deployment | Vercel | Hosting and preview/production deployment |
| Version control | GitHub | Source history and collaboration |

This is the proposed stack, not a claim that every library is required. Avoid adding dependencies until a prototype demonstrates the need.

## 3. Separation of responsibilities

### React / HTML layer
Owns chapter content and semantic headings, selectable text, accessible controls, current chapter state, responsive layout, non-canvas fallbacks, and loading/error/reduced-motion states.

### Three.js / WebGL layer
Owns canvas lifecycle, renderer setup, visual scene, camera, geometry and texture management, layered image composition, shader-driven parallax and GPU resource cleanup.

### GSAP layer
Owns enter/exit sequences, page transition choreography, text and graphic reveals, and synchronisation between navigation state and visual transitions.

Avoid having React, GSAP and Three.js independently mutate the same DOM properties. Define clear ownership for animated elements.

## 4. Proposed source layout

src/
- app/ — App.tsx, routes.ts
- components/ — BookShell, BookNavigation, ChapterLayout, ProfileChapter, ServicesChapter, LoadingScreen, ReducedMotionView
- content/ — chapters.ts, team.ts, services.ts, projects.ts
- hooks/ — useBookNavigation, useReducedMotion, useWebGLSupport
- graphics/ — BookCanvas, SceneManager, AssetManager, layers, shaders
- motion/ — timelines, transitions
- styles/ — tokens.css, global.css
- utils/ — imageSizing, input

This is a target structure, not a requirement to create every directory immediately. Keep the first prototype small.

## 5. Content model
Represent chapters as typed data rather than hard-coding all copy into animation components. A chapter may include a stable ID and order, chapter label and title, body copy, layout type, image asset references and alt text, optional accent treatment, and optional motion configuration.

Team member data must use verified names, approved role descriptions and supplied photographs. Do not invent missing fields.

## 6. Rendering and asset lifecycle
- Load only assets needed for the current and near-next chapter where practical.
- Use responsive image sources and optimised WebP/AVIF derivatives.
- Use appropriate texture dimensions and GPU memory budgets.
- Dispose of Three.js geometries, materials and textures when no longer used.
- Handle renderer resize and device pixel ratio conservatively.
- Detect WebGL availability before enabling the canvas experience.
- Provide a static or CSS/HTML visual fallback when WebGL is unavailable.

## 7. Performance and resilience
- Avoid rendering at unnecessarily high device pixel ratios on mobile.
- Pause or reduce rendering when the experience is not visible, where appropriate.
- Avoid large blocking JavaScript and unnecessary animation loops.
- Respect prefers-reduced-motion.
- Handle WebGL context loss and recover gracefully where feasible.
- Keep essential text and navigation functional without the graphics renderer.

## 8. Testing
- Unit tests for navigation state and chapter ordering.
- Component tests for accessible controls and state changes.
- Browser-level tests for mouse, touch, keyboard, viewport resize and reduced motion.
- Visual comparison checks for approved reference-inspired effects.
- Performance checks on a representative mid-range mobile device.

## 9. Deployment
Use GitHub for version control and Vercel for preview and production deployments. Configure build commands and environment variables only if later requirements introduce them. No backend or secrets are required for the initial static brand book.
