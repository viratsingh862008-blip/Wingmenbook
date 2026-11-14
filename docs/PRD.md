# 4WINGMEN Interactive Brand Book — Product Requirements Document

**Status:** Planning / pre-development  
**Version:** 0.1  
**Repository:** https://github.com/viratsingh862008-blip/Wingmenbook  
**Product:** 4WINGMEN Interactive Brand Book

## 1. Product summary

Build a browser-based interactive agency profile for 4WINGMEN. The experience should combine a digital editorial publication with book-like navigation and cinematic transitions. It will introduce the agency, its four team members, services, working approach, selected work, and a clear way to make contact.

This is a brand and capability presentation, not a general-purpose agency website or a PDF viewer.

## 2. Goals

- Present 4WINGMEN as a coherent creative agency.
- Introduce all four team members using the supplied editorial portraits.
- Explain the agency's actual services and working approach.
- Present selected projects and verified outcomes when source material is supplied.
- Deliver an immersive, high-quality experience on desktop and mobile.
- Reproduce the reference site's interaction *qualities* through an original implementation.

## 3. Non-goals

- No authentication, user accounts, database, or admin dashboard in the initial release.
- No invented biographies, job titles, service claims, client names, case studies, or performance metrics.
- No copying of the reference website's source code, proprietary artwork, text, or branding.
- No requirement to imitate a physical book at the expense of responsive usability.

## 4. Audiences

1. Potential clients and business owners evaluating 4WINGMEN.
2. Potential collaborators and team members learning who is behind the agency.

## 5. Agreed creative and product decisions

| Area | Decision |
|---|---|
| Experience | Hybrid: editorial screens with book-like movement |
| Visual identity | Black, white, red |
| Scope | Agency profile |
| Motion strategy | Progressive implementation |
| Audience | Clients and collaborators |
| Reference | https://howtotalktowhitekidsaboutracism.com/ |
| Brand mark | User-supplied official 4WINGMEN logo; preserve its geometry |

## 6. Proposed information architecture

The following is the working chapter plan. Final copy and exact page count remain subject to content review.

| Chapter | Working title | Purpose |
|---|---|---|
| 00 | The Cover | Establish the brand and invite entry |
| 01 | The Introduction | Explain who 4WINGMEN is |
| 02 | The Four | Introduce the team as a group |
| 03 | Aryan Singh | Individual team profile |
| 04 | Saad Gani | Individual team profile |
| 05 | Ayush | Individual team profile |
| 06 | Zaid Ahmad | Individual team profile |
| 07 | What We Do | Explain verified agency services |
| 08 | How We Work | Explain philosophy, process and execution |
| 09 | Selected Work / Closing | Show supplied work and provide a contact action |

Team responsibilities and all factual profile details are **content dependencies**, not assumptions.

## 7. Core experience requirements

- Introductory cover and deliberate entry transition.
- Chapter/page navigation with previous and next controls.
- Pointer and touch gesture support, with keyboard alternatives.
- Progress indication and clear current chapter/page state.
- Layered image movement and parallax where appropriate.
- Choreographed typography and page transitions.
- Responsive layouts with mobile-specific composition.
- Reduced-motion support and a non-WebGL fallback.
- Loading and error states for visual assets.

## 8. Quality requirements

- Responsive across common phone, tablet and desktop viewports.
- Keep text selectable, semantic and accessible in HTML; do not bake essential copy into a canvas.
- Avoid blocking the experience while non-critical assets load.
- Respect prefers-reduced-motion.
- Provide graceful fallback if WebGL is unavailable or GPU performance is limited.
- Optimise images and avoid unnecessarily large textures.
- Test navigation, touch gestures, keyboard access, loading and resize behaviour.

## 9. Success criteria

The project is ready for release when:
- All approved chapters and factual content are present.
- Navigation works with mouse, touch and keyboard.
- The visual treatment is consistent with the approved 4WINGMEN identity.
- The signature interaction effects have been compared against the reference using an agreed acceptance checklist.
- Mobile and desktop QA pass.
- Reduced-motion and WebGL fallback paths work.
- The production deployment is verified.

## 10. Open content dependencies

- Confirm the exact role, responsibilities and approved profile copy for Aryan Singh, Saad Gani, Ayush and Zaid Ahmad.
- Confirm the current service catalogue and descriptions.
- Supply the agency story, positioning and working process.
- Supply portfolio projects, permissions, credits and substantiated outcomes.
- Supply contact details and desired call-to-action destination.
- Supply original high-resolution team photographs and any separate logo variants.

## 11. Delivery approach

Plan first, then build a single representative interaction prototype. Validate its visual and interaction quality before extending the system across all chapters. See `ARCHITECTURE.md`, `INTERACTION-SPEC.md` and `ROADMAP.md`.
