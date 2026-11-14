# 4WINGMEN — Visual System & Experience Specification

**Status:** Direction locked for implementation  
**Project:** Interactive agency brand book  
**Positioning:** Integrated Growth Agency  
**Audience:** Prospective clients and collaborators

## 1. Art direction

Create a cinematic, high-contrast editorial brand book that feels like an interactive publication rather than a conventional agency landing page or a PDF viewer.

The experience combines:
- Editorial typography and deliberate page composition.
- Book-like guided progression with independent chapter access.
- Layered imagery, depth, parallax and controlled transitions.
- Clear, accessible text and navigation.
- Responsive layouts designed for mobile as a first-class experience.

## 2. Colour system

The book's approved direction remains **black, white and red**.

- Near-black: primary canvas and dark chapter backgrounds.
- White/off-white: primary text and light editorial pages.
- Deep red: primary interaction and emphasis accent.
- Neutral greys: secondary text, rules and quiet UI.

The gold/orange visible in some supplied social campaign creatives is treated as campaign artwork, not a reason to change the book's already-approved red accent. Do not recolour the official logo or modify supplied images to force palette consistency. Use supplied assets in their original colours where appropriate.

## 3. Typography and composition

- Use a high-contrast editorial display face for chapter titles and a highly legible sans-serif for body copy and navigation.
- Establish hierarchy through scale, spacing, alignment and cropping rather than excessive decoration.
- Use short, deliberate text blocks and strong negative space.
- Keep all essential text as real HTML, selectable and accessible.
- Avoid text embedded in generated imagery.

## 4. Logo and photography

- Use the official 4WINGMEN logo as supplied. Preserve its geometry, proportions and clear space.
- Inspect transparency/background behaviour before placing it on dark or light surfaces.
- Use the four supplied team portraits as the actual member images. Do not substitute stock or generated portraits.
- Do not retouch identities or materially alter the portraits without explicit approval.
- Keep original source files unchanged; create derivatives only for crop/format optimisation.

## 5. Interaction model

- Guided reading: clear next/previous chapter controls and a visible progress indicator.
- Free navigation: persistent or easily accessible chapter index.
- Pointer/touch: support drag or swipe where it naturally fits the book metaphor; do not make gestures the only navigation method.
- Keyboard: support arrow keys where appropriate, Tab navigation, visible focus and Escape to close overlays.
- Sound: optional, muted by default, with a visible user-controlled toggle. No autoplay audio.
- Motion: progressive reveals, layered page transitions and subtle depth/parallax inspired by the reference experience.
- Reduced motion: provide a low-motion mode that removes parallax and large transitions while retaining all content and navigation.

## 6. Rendering strategy

Use semantic React/HTML for text, navigation and accessible controls. Use CSS transforms and animation for the first implementation of page transitions. Introduce a Three.js/WebGL layer only for decorative depth/parallax where it materially improves fidelity.

Do not make WebGL responsible for rendering essential text. Provide a graceful fallback when WebGL is unavailable or device performance is constrained.

## 7. Responsive and performance requirements

- Design mobile layouts intentionally; do not merely shrink the desktop composition.
- Use responsive image sources and appropriate compression.
- Lazy-load non-critical portfolio media.
- Avoid loading heavy 3D assets before they are needed.
- Maintain readable type sizes and comfortable touch targets.
- Prevent horizontal overflow and layout shifts.
- Keep the first meaningful view fast and usable on mid-range mobile devices.

## 8. Portfolio policy

The portfolio chapter follows the agency story and services, then leads into contact.

Until verified portfolio material and display permission are supplied:
- Do not invent clients, project names, metrics, testimonials or results.
- Do not present individual members' prior projects as agency projects.
- Use a clearly labelled editorial transition such as “Selected work” with a note that the portfolio is being curated, or temporarily omit project-specific cards.
- Replace the placeholder only when approved assets, attribution and permission are available.

## 9. Contact

The only contact CTA in this version is the official Instagram profile:
https://www.instagram.com/4wingmen?vrfl=MW44aWNwcWlmdTFvNg==

Use the CTA “Let's talk” / “DM us” and open the supplied profile URL.

## 10. Acceptance criteria

The experience is ready for release only when:
- All approved manuscript chapters are present and accurate.
- Guided and free navigation both work.
- Mobile, desktop, touch and keyboard interactions work.
- Sound is muted by default and only plays after user action.
- Reduced-motion mode works.
- Portfolio content is either verified or clearly presented as a placeholder.
- The official logo and portraits are used without unauthorised substitution.
- Instagram CTA opens the exact supplied profile.
- No fabricated claims, client work, pricing or testimonials appear.
- Browser console has no application errors and core user flows are tested.
