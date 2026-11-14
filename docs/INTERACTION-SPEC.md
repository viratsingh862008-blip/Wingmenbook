# 4WINGMEN Interactive Brand Book — Interaction Specification

**Status:** Target behaviour for prototype and QA.

## 1. Experience model
A hybrid digital book: full-screen editorial compositions connected by book-like navigation and transitions. It should feel continuous and immersive without requiring a literal physical-page simulation on every device.

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

Gesture thresholds, velocity handling and transition lock duration will be tuned during prototyping.

## 3. Motion and visual effects
Reference: https://howtotalktowhitekidsaboutracism.com/

Study and target the following effect families:
- Canvas-based visual presentation.
- Layered parallax and perceived depth.
- Page/scene transitions with coherent movement.
- Image displacement or shader-based visual movement where appropriate.
- Staggered typography and graphic reveals.
- Responsive pointer/touch interaction.
- Deliberate entry/loading choreography.

The implementation must be original. Do not copy the reference site's source code, assets or written content. Exact parity cannot be promised before detailed browser testing and asset-specific prototyping; use visual and behavioural acceptance checks to measure similarity.

## 4. Interaction states
At minimum:
- Initial loading.
- Intro/cover ready.
- Entering the book.
- Chapter idle.
- Chapter transition forward.
- Chapter transition backward.
- Dragging/swiping.
- Navigation focus.
- Asset loading for next chapter.
- WebGL unavailable fallback.
- Reduced-motion presentation.
- Recoverable rendering error.

## 5. Input behaviour

### Pointer / mouse
- Drag gesture should be discoverable and should not select text unintentionally within the visual interaction surface.
- Interactive links and buttons must remain clickable.
- Pointer movement may influence parallax subtly, but must not make content difficult to read.

### Touch
- Support horizontal swipe without blocking normal vertical page scrolling where vertical scrolling is used.
- Avoid gesture conflicts on small screens.
- Provide explicit navigation controls as an alternative to gestures.

### Keyboard
- Provide visible focus indicators.
- Left/right arrows navigate only when focus is not inside a text input or another control that uses those keys.
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
- The experience is checked against reference recordings/screenshots using a documented visual review.
