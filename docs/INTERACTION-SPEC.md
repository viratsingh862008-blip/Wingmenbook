# 4WINGMEN Interactive Brand Book — Interaction Specification

**Status:** Core navigation and motion are implemented; reference-fidelity and responsive browser QA remain in progress.

## 1. Experience model
A hybrid digital book: a centered 3D CSS cover opens on user action, then eleven full-screen editorial chapters use direction-aware hinged transitions and accessible chapter navigation. It should feel continuous and immersive without requiring a literal physical-page simulation on every device.

## 2. Navigation
Required:
- Next and previous chapter controls.
- Mouse drag or swipe gesture where it does not conflict with interactive content.
- Touch gesture support on mobile.
- Keyboard navigation using left/right arrows, with clear focus handling.
- Visible progress or chapter indicator.
- A way to identify the current chapter and access chapter navigation.
- Correct handling of first and final chapters.
- Prevent accidental multi-step navigation while a transition is in progress.

The current implementation uses a conservative 60px horizontal swipe threshold, preserves vertical scrolling and pinch zoom, and locks chapter navigation while a GSAP page transition is running. Further gesture and duration tuning remains part of browser QA.

## 3. Motion and visual effects
Reference: https://howtotalktowhitekidsaboutracism.com/

Study and target the following effect families:
- CSS 3D book-cover opening and perceived physical depth.
- Direction-aware hinged page/scene transitions with coherent movement.
- Layered parallax and canvas-based visual presentation remain candidate enhancements if they prove necessary after comparison.
- Image displacement or shader-based visual movement where appropriate.
- Staggered typography and graphic reveals.
- Responsive pointer/touch interaction.
- Deliberate entry/loading choreography.

The implementation must be original. Do not copy the reference site's source code, assets or written content. Exact parity cannot be promised before detailed browser testing and asset-specific prototyping; use visual and behavioural acceptance checks to measure similarity.

## 4. Implemented interaction states
The current build includes:
- Cover ready.
- Cover opening after explicit activation by either the book surface or its Open button.
- Chapter idle.
- Chapter transition forward/backward.
- Transition lock to prevent accidental multi-step navigation.
- Pointer/touch swipe and mouse drag.
- Chapter-index focus, Escape close and focus return.
- Asset loading and explicit unavailable-image fallback.
- Reduced-motion presentation.
- WebGL is not used by the current build; a non-WebGL fallback is therefore the baseline.

## 5. Input behaviour

### Pointer / mouse
- Drag gesture should be discoverable and should not select text unintentionally within the visual interaction surface.
- Interactive links and buttons must remain clickable.
- Pointer movement may influence parallax subtly, but must not make content difficult to read.

### Touch
- Support horizontal swipe without blocking normal vertical page scrolling or pinch zoom.
- Avoid gesture conflicts on small screens.
- Provide explicit navigation controls as an alternative to gestures.

### Keyboard
- Provide visible focus indicators.
- Unmodified left/right arrows navigate only when focus is not inside a text input or another control that uses those keys; modified shortcuts and Shift+Arrow text selection remain native.
- Enter/Space activates focused controls.
- Escape may close chapter navigation or overlays if those are implemented.

## 6. Accessibility and reduced motion
- Use semantic HTML for all essential text.
- Give meaningful images appropriate alternative text; decorative layers should be hidden from assistive technology.
- Maintain readable contrast and scalable text.
- Respect prefers-reduced-motion.
- In reduced-motion mode, replace large parallax and elaborate transitions with short fades or immediate state changes.
- Do not rely on colour alone to convey chapter state.

## 7. Mobile adaptation
- Recompose editorial layouts for narrow viewports.
- Keep names, body copy and navigation readable.
- Reduce shader complexity and rendering resolution if needed.
- Use simplified effects or the non-WebGL fallback on constrained devices.
- Do not require precision dragging; swipe and buttons must both work.

## 8. Acceptance checklist
A prototype passes when:
- Next/previous works consistently.
- Swipe and mouse drag do not trigger accidental double navigation.
- Keyboard navigation works and focus remains visible.
- The current chapter/progress indicator stays in sync.
- Transitions do not expose blank frames or stale content.
- Parallax responds smoothly without impairing legibility.
- Resize and orientation changes are handled.
- Reduced-motion mode is usable.
- WebGL failure does not make the book unusable.
- The experience is checked against reference recordings/screenshots using a documented visual review. The implementation branch preview is currently SSO-protected, so this check requires an authenticated project reviewer.
