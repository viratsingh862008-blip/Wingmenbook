import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent
} from "react";
import { gsap } from "gsap";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Grid2X2,
  Instagram,
  X,
  Zap,
  ZapOff
} from "lucide-react";
import {
  getNextChapter,
  getPreviousChapter,
  getSwipeDirection,
  shouldNavigateWithKeyboard,
  clampChapterIndex,
  getTransitionDirection
} from "./lib/navigation";

type ChapterKind =
  | "cover"
  | "manifesto"
  | "story"
  | "experience"
  | "disciplines"
  | "people"
  | "services"
  | "process"
  | "proof"
  | "portfolio"
  | "contact";

type Chapter = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  body?: string[];
  kind: ChapterKind;
};

type TeamMember = {
  name: string;
  role: string;
  note: string;
  accent: string;
  image: string;
  tag: string;
};

const assets = {
  logo: "https://res.cloudinary.com/roq8nakt/image/upload/v1794639104/4wingmen/brand-book/4wingmen-logo.png",
  aryan: "https://res.cloudinary.com/roq8nakt/image/upload/v1794639146/4wingmen/brand-book/aryan-singh.jpg",
  saad: "https://res.cloudinary.com/roq8nakt/image/upload/v1794639140/4wingmen/brand-book/saad-gani.jpg",
  ayush: "https://res.cloudinary.com/roq8nakt/image/upload/v1794639110/4wingmen/brand-book/ayush.jpg",
  zaid: "https://res.cloudinary.com/roq8nakt/image/upload/v1794639134/4wingmen/brand-book/zaid-ahmad.jpg"
} as const;

const chapters: Chapter[] = [
  { id: "cover", eyebrow: "INTEGRATED GROWTH AGENCY", title: "4WINGMEN", subtitle: "IDEAS THAT FLY. BRANDS THAT GROW.", kind: "cover" },
  { id: "point-of-view", eyebrow: "01 / OUR POINT OF VIEW", title: "Beyond content.\nBeyond marketing.", subtitle: "Complete digital growth.", body: ["A business deserves more than disconnected posts, repetitive reels or isolated digital services.", "We bring creative production, technology, marketing and business strategy together—so every part of a brand's digital presence works toward one connected experience."], kind: "manifesto" },
  { id: "why", eyebrow: "02 / WHY 4WINGMEN", title: "We saw a gap.\nWe chose to build differently.", body: ["Too often, digital execution becomes repetitive: generic scripts, familiar content formats, limited platform coverage and creative that overlooks the craft behind production.", "We wanted to build something more connected. Not simply a team that makes content or manages a social account, but an agency that can work across the wider digital journey—from strategy and production to platforms, visibility, technology and customer experience.", "That thinking is the foundation of 4WINGMEN."], kind: "story" },
  { id: "experience", eyebrow: "03 / THE EXPERIENCE", title: "For the business.\nFor its customers.", subtitle: "We don't just build brands. We build experiences.", body: ["A connected digital presence and strategic direction for the business.", "A clearer, more engaging experience for the people who discover, explore and interact with the brand.", "Creative, technology, marketing and strategy—working as one."], kind: "experience" },
  { id: "disciplines", eyebrow: "04 / FOUR DISCIPLINES", title: "Different strengths.\nOne direction.", subtitle: "Creative · Technology · Marketing · Strategy", body: ["Four complementary disciplines combine to create a connected digital growth experience."], kind: "disciplines" },
  { id: "people", eyebrow: "05 / THE PEOPLE", title: "The people\nbehind the work.", subtitle: "Four roles. One team.", kind: "people" },
  { id: "services", eyebrow: "06 / WHAT WE DO", title: "Built around\nwhat business needs.", subtitle: "A connected set of capabilities.", kind: "services" },
  { id: "approach", eyebrow: "07 / OUR APPROACH", title: "One connected\napproach.", subtitle: "Understand → Strategise → Create → Execute → Optimise → Grow", body: ["The exact combination of activities is shaped around each client's requirements. The objective is to connect the right creative, technology, marketing and strategy capabilities to the business's needs."], kind: "process" },
  { id: "experience-behind", eyebrow: "08 / EXPERIENCE", title: "Experience built\nthrough real work.", subtitle: "10+ clients · Collective team experience", body: ["The team members bring prior experience working with 10+ clients collectively and have handled and delivered projects before coming together under 4WINGMEN.", "This represents the team's previous individual experience—not 10+ clients served by 4WINGMEN as an agency."], kind: "proof" },
  { id: "work", eyebrow: "09 / SELECTED WORK", title: "Work speaks.", subtitle: "A portfolio in the making.", body: ["Selected projects from the team's previous work will be presented with clear attribution. Official 4WINGMEN projects will be added as they are completed.", "We only show work we can verify and have permission to share."], kind: "portfolio" },
  { id: "contact", eyebrow: "10 / THE NEXT MOVE", title: "Let's build\nsomething that stands out.", subtitle: "Have a business to grow, a vision to execute, or an idea worth building?", kind: "contact" }
];

const team: TeamMember[] = [
  { name: "ARYAN SINGH", role: "CHIEF TECHNOLOGY OFFICER", note: "AI-assisted technology · Digital strategy · Web & software · SEO / GEO", accent: "#d6d0c4", image: assets.aryan, tag: "THE TECHNOLOGIST" },
  { name: "AYUSH", role: "CHIEF CREATIVE OFFICER", note: "Creative production · Photography · Videography · Content ideation", accent: "#d71920", image: assets.ayush, tag: "THE CRAFTSPERSON" },
  { name: "SAAD GANI", role: "POST-PRODUCTION SPECIALIST", note: "Video editing · Post-production · Visual finishing", accent: "#d6a33d", image: assets.saad, tag: "THE EDITOR" },
  { name: "ZAID AHMAD", role: "CHIEF STRATEGY & OPERATIONS OFFICER", note: "Strategic planning · Business discussions · Meetings · Operations", accent: "#f05a16", image: assets.zaid, tag: "THE STRATEGIST" }
];

const services = [
  ["01", "Social Media Management", "Planning, creating, publishing and managing a brand's social presence across agreed platforms."],
  ["02", "Brand Content Production", "Photography, videography and creator-led brand content featuring our own on-camera team."],
  ["03", "Creative Design", "Promotional posters and digital creatives shaped around the brand and campaign."],
  ["04", "Paid Advertising", "Meta ad strategy, copy, creative production, campaign setup, management and optimisation."],
  ["05", "Web & Software Development", "Business websites, landing pages, funnels, custom applications and integrations."],
  ["06", "Search Visibility", "SEO, local SEO and Generative Engine Optimisation (GEO)."],
  ["07", "Business Intelligence & Strategy", "Digital audits, competitor analysis, business gap identification and growth recommendations."]
] as const;

const chapterAccent: Record<ChapterKind, string> = {
  cover: "#d6d0c4",
  manifesto: "#d6d0c4",
  story: "#d71920",
  experience: "#d6d0c4",
  disciplines: "#d6d0c4",
  people: "#d6d0c4",
  services: "#d6d0c4",
  process: "#d6d0c4",
  proof: "#d6d0c4",
  portfolio: "#d6d0c4",
  contact: "#d71920"
};

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function App() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isGuided, setIsGuided] = useState(true);
  const [motionReduced, setMotionReduced] = useState(prefersReducedMotion);
  const [motionOverride, setMotionOverride] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const chapter = chapters[active];
  const progress = ((active + 1) / chapters.length) * 100;
  const stageRef = useRef<HTMLElement | null>(null);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const menuCloseRef = useRef<HTMLButtonElement | null>(null);
  const pointerStart = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const activeIndexRef = useRef(active);
  const navigationLockRef = useRef(false);
  const transitionDirection = useRef<1 | -1>(1);
  activeIndexRef.current = active;

  const navigateTo = (index: number) => {
    const target = clampChapterIndex(index, chapters.length);
    setMenuOpen(false);
    if (target === activeIndexRef.current || navigationLockRef.current) return;

    transitionDirection.current = getTransitionDirection(activeIndexRef.current, target);
    activeIndexRef.current = target;
    if (!motionReduced) {
      navigationLockRef.current = true;
      setIsTransitioning(true);
    }
    setActive(target);
  };

  const go = (index: number) => navigateTo(index);
  const next = () => navigateTo(getNextChapter(activeIndexRef.current, chapters.length));
  const previous = () => navigateTo(getPreviousChapter(activeIndexRef.current));

  const toggleReadingMode = () => {
    if (!isGuided) setMenuOpen(false);
    setIsGuided((current) => !current);
  };

  const toggleMotion = () => {
    setMotionOverride(true);
    setMotionReduced((current) => !current);
  };

  useEffect(() => {
    if (motionOverride) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setMotionReduced(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [motionOverride]);

  useEffect(() => {
    if (menuOpen) {
      menuCloseRef.current?.focus();
      return () => {
        if (navigationLockRef.current) {
          stageRef.current?.focus();
        } else {
          menuTriggerRef.current?.focus();
        }
      };
    }
    return undefined;
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (menuOpen || navigationLockRef.current) return;
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (!shouldNavigateWithKeyboard(event.key, target, event)) return;

      event.preventDefault();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, motionReduced]);

  useEffect(() => {
    document.title = (chapter.id === "cover" ? "4WINGMEN" : chapter.eyebrow + " — 4WINGMEN") + " | Ideas That Fly";
  }, [chapter]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    if (motionReduced) {
      navigationLockRef.current = false;
      setIsTransitioning(false);
      return undefined;
    }

    const direction = transitionDirection.current;
    const context = gsap.context(() => {
      gsap.fromTo(
        stage,
        {
          autoAlpha: 0,
          x: direction === 1 ? 12 : -12,
          rotateY: direction === 1 ? -7 : 7,
          transformPerspective: 1500,
          transformOrigin: direction === 1 ? "left center" : "right center"
        },
        {
          autoAlpha: 1,
          x: 0,
          rotateY: 0,
          duration: 0.72,
          ease: "power3.out",
          clearProps: "transform",
          onComplete: () => {
            navigationLockRef.current = false;
            setIsTransitioning(false);
          }
        }
      );
      const reveals = stage.querySelectorAll(".reveal");
      if (reveals.length > 0) {
        gsap.fromTo(
          reveals,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.055, delay: 0.12, ease: "power2.out", clearProps: "transform" }
        );
      }
    }, stage);

    return () => context.revert();
  }, [active, motionReduced]);

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (!event.isPrimary || event.button > 0) return;
    const target = event.target;
    if (target instanceof Element && target.closest("button, a, input, textarea, select, [contenteditable='true'], [data-no-swipe]")) return;
    pointerStart.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.pointerId !== event.pointerId) return;

    const target = event.target;
    if (target instanceof Element && target.closest("button, a, input, textarea, select, [contenteditable='true'], [data-no-swipe]")) return;
    const direction = getSwipeDirection(start.x, start.y, event.clientX, event.clientY);
    if (direction === "next") next();
    if (direction === "previous") previous();
  };

  const onMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setMenuOpen(false);
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])")
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <main
      className={"book-shell chapter-" + chapter.kind + (motionReduced ? " motion-reduced" : "")}
      style={{ "--accent": chapterAccent[chapter.kind] } as CSSProperties}
      aria-label="4WINGMEN interactive brand book"
    >
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <a className="wordmark" href="#cover" onClick={(event) => { event.preventDefault(); go(0); }} aria-label="4WINGMEN home">
          <img src={assets.logo} alt="4WINGMEN" className="brand-logo" />
        </a>

        <div className="top-center" aria-label="Agency disciplines">
          <span>MARKETING</span><i /><span>STRATEGY</span><i /><span>CREATIVITY</span><i /><span>GROWTH</span>
        </div>

        <div className="top-actions">
          <button
            className="icon-button"
            type="button"
            onClick={toggleMotion}
            aria-label={motionReduced ? "Enable page motion" : "Reduce page motion"}
            aria-pressed={motionReduced}
            title={motionReduced ? "Motion reduced" : "Reduce motion"}
          >
            {motionReduced ? <ZapOff size={17} /> : <Zap size={17} />}
          </button>
          {!isGuided && (
            <button
              className="icon-button"
              type="button"
              ref={menuTriggerRef}
              onClick={() => setMenuOpen(true)}
              disabled={isTransitioning}
              aria-label="Open chapter index"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              <Grid2X2 size={18} />
            </button>
          )}
        </div>
      </header>

      <div
        className="progress-track"
        role="progressbar"
        aria-label="Book progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <span style={{ width: progress + "%" }} />
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Chapter {active + 1} of {chapters.length}: {chapter.eyebrow}. {chapter.title.replace("\n", " ")}
      </div>

      <section
        id="chapter-content"
        className="stage"
        key={chapter.id}
        ref={stageRef}
        tabIndex={-1}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { pointerStart.current = null; }}
        aria-label={chapter.eyebrow}
      >
        <div className="chapter-meta">
          <span>{chapter.eyebrow}</span>
          <span>{String(active + 1).padStart(2, "0")} <b>/</b> {String(chapters.length).padStart(2, "0")}</span>
        </div>
        {chapter.kind === "cover" && (
          <Cover
            onBegin={next}
            reducedMotion={motionReduced}
            onOpening={() => { navigationLockRef.current = true; setIsTransitioning(true); }}
            onOpened={() => { navigationLockRef.current = false; setIsTransitioning(false); }}
          />
        )}
        {chapter.kind === "people" && <People />}
        {chapter.kind === "services" && <Services />}
        {chapter.kind === "disciplines" && <Disciplines />}
        {chapter.kind === "process" && <Process />}
        {chapter.kind === "proof" && <Proof />}
        {chapter.kind === "portfolio" && <Portfolio />}
        {chapter.kind === "contact" && <Contact />}
        {["manifesto", "story", "experience"].includes(chapter.kind) && <Editorial chapter={chapter} />}
      </section>

      <footer className="bottom-bar">
        <div className="bottom-left">
          <span className="tiny-dot" aria-hidden="true" />
          <span>{isGuided ? "GUIDED READING" : "FREE EXPLORATION"}</span>
          <button className="mode-toggle" type="button" onClick={toggleReadingMode} disabled={isTransitioning}>
            {isGuided ? "SWITCH TO FREE" : "SWITCH TO GUIDED"}
          </button>
        </div>
        <div className="bottom-center" aria-hidden="true">
          <span>{String(active + 1).padStart(2, "0")}</span>
          <div className="mini-progress"><i style={{ width: progress + "%" }} /></div>
          <span>{String(chapters.length).padStart(2, "0")}</span>
        </div>
        <div className="bottom-right">
          <button className="nav-button" type="button" onClick={previous} disabled={active === 0 || isTransitioning} aria-label="Previous chapter">
            <ArrowLeft size={17} />
          </button>
          <button className="next-button" type="button" onClick={next} disabled={active === chapters.length - 1 || isTransitioning}>
            {active === chapters.length - 1 ? "END" : "NEXT"} <ArrowRight size={17} />
          </button>
        </div>
      </footer>

      {!isGuided && menuOpen && (
        <div
          className="menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Chapter index"
          onKeyDown={onMenuKeyDown}
          onClick={(event) => { if (event.target === event.currentTarget) setMenuOpen(false); }}
        >
          <div className="menu-panel">
            <div className="menu-head">
              <span>CONTENTS / 4WINGMEN</span>
              <button className="icon-button" type="button" ref={menuCloseRef} onClick={() => setMenuOpen(false)} aria-label="Close chapter index">
                <X size={18} />
              </button>
            </div>
            <nav className="menu-list" aria-label="Book chapters">
              {chapters.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={index === active ? "menu-item active" : "menu-item"}
                  onClick={() => go(index)}
                  aria-current={index === active ? "step" : undefined}
                >
                  <span>{String(index).padStart(2, "0")}</span>
                  <strong>{item.eyebrow.split("/").pop()?.trim() ?? item.title}</strong>
                  <ArrowUpRight size={16} />
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="edge-hint" aria-hidden="true">SWIPE / ARROW KEYS TO EXPLORE <ArrowDownRight size={14} /></div>
    </main>
  );
}

function Cover({
  onBegin,
  reducedMotion,
  onOpening,
  onOpened
}: {
  onBegin: () => void;
  reducedMotion: boolean;
  onOpening: () => void;
  onOpened: () => void;
}) {
  const frontRef = useRef<HTMLDivElement | null>(null);
  const [opening, setOpening] = useState(false);

  const openBook = () => {
    if (opening) return;
    if (reducedMotion || !frontRef.current) {
      onBegin();
      return;
    }

    onOpening();
    setOpening(true);
    gsap.to(frontRef.current, {
      rotateY: -154,
      duration: 1.05,
      ease: "power3.inOut",
      transformOrigin: "left center",
      onComplete: () => {
        onOpened();
        onBegin();
      }
    });
  };

  return (
    <div className="cover-layout">
      <div className="cover-stage-kicker">4W / AN INTERACTIVE BRAND BOOK</div>
      <div className="cover-book-scene">
        <button
          className="cover-book-action"
          type="button"
          onClick={openBook}
          disabled={opening}
          aria-label="Open the 4WINGMEN brand book"
        >
          <div className="cover-book" aria-hidden="true">
            <div className="cover-book-back" />
            <div className="cover-book-pages" />
            <div className="cover-book-spine" />
            <div className="cover-book-front" ref={frontRef}>
              <div className="cover-front-rule" />
              <img src={assets.logo} alt="" />
              <p className="cover-book-kicker">INTEGRATED GROWTH AGENCY</p>
              <h1>4WINGMEN</h1>
              <p className="cover-book-title">IDEAS THAT <em>FLY.</em></p>
              <span className="cover-book-tagline">OWN THE SCENE. STAY SUPREME.</span>
              <span className="cover-book-edition">EST. / 04</span>
            </div>
          </div>
        </button>
      </div>
      <div className="cover-lower">
        <p>CREATIVE / TECHNOLOGY / MARKETING / STRATEGY</p>
        <button className="begin-button" type="button" onClick={openBook} disabled={opening}>
          {opening ? "OPENING..." : "OPEN THE BOOK"} <ArrowUpRight size={19} />
        </button>
        <span>4WINGMEN · 2026</span>
      </div>
    </div>
  );
}

function Editorial({ chapter }: { chapter: Chapter }) {
  return (
    <div className="editorial-layout">
      <div className="editorial-title">
        <h1>{chapter.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
        {chapter.subtitle && <p className="editorial-subtitle">{chapter.subtitle}</p>}
      </div>
      <div className="editorial-body">
        {chapter.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div className="editorial-index">4W / {chapter.id.toUpperCase()}</div>
    </div>
  );
}

function Disciplines() {
  const items = [
    ["01", "CREATIVE", "Ideas made visible.", "#d71920"],
    ["02", "TECHNOLOGY", "Digital foundations.", "#d6a33d"],
    ["03", "MARKETING", "Attention into action.", "#d6d0c4"],
    ["04", "STRATEGY", "Direction with purpose.", "#f05a16"]
  ] as const;

  return (
    <div className="discipline-grid">
      {items.map(([number, title, text, color]) => (
        <article className="discipline-card reveal" key={number} style={{ "--card-accent": color } as CSSProperties}>
          <span>{number}</span><h2>{title}</h2><p>{text}</p><i aria-hidden="true" />
        </article>
      ))}
    </div>
  );
}

function People() {
  return (
    <div className="people-grid">
      {team.map((person, index) => (
        <article className="person-card reveal" key={person.name} style={{ "--person-accent": person.accent } as CSSProperties}>
          <div className="person-image">
            <img
              src={person.image}
              alt={person.name + " — original 4WINGMEN team poster"}
              loading="lazy"
              decoding="async"
              onError={(event) => event.currentTarget.closest(".person-image")?.classList.add("is-error")}
            />
            <span className="person-fallback">ORIGINAL POSTER UNAVAILABLE</span>
            <span className="person-tag">{person.tag}</span>
          </div>
          <div className="person-info">
            <h2>{person.name}</h2>
            <p className="person-role">{person.role}</p>
            <p>{person.note}</p>
            <span className="person-index">0{index + 1} / 04</span>
          </div>
        </article>
      ))}
    </div>
  );
}

function Services() {
  return (
    <div className="services-layout">
      <div className="services-heading">
        <h1>WHAT WE<br /><em>BRING.</em></h1>
        <p>One team. A connected set of capabilities.</p>
      </div>
      <div className="service-list">
        {services.map(([number, title, description]) => (
          <article className="service-row reveal" key={number}>
            <span>{number}</span>
            <div><h3>{title}</h3><p>{description}</p></div>
            <ArrowUpRight size={17} aria-hidden="true" />
          </article>
        ))}
      </div>
    </div>
  );
}

function Process() {
  const steps = ["UNDERSTAND", "STRATEGISE", "CREATE", "EXECUTE", "OPTIMISE", "GROW"];
  return (
    <div className="process-layout">
      <div className="process-orbit" aria-label="Understand, strategise, create, execute, optimise and grow">
        <div className="orbit-core">4W</div>
        {steps.map((step, index) => (
          <div className={"orbit-step step-" + index} key={step}>
            <span>0{index + 1}</span>{step}
          </div>
        ))}
      </div>
      <p className="process-note">The right combination of capabilities, shaped around each business.</p>
    </div>
  );
}

function Proof() {
  return (
    <div className="proof-layout">
      <div className="proof-number">10<span>+</span></div>
      <div className="proof-copy">
        <h1>CLIENTS.<br /><em>COLLECTIVE EXPERIENCE.</em></h1>
        <p>Prior client experience across the team, before coming together as 4WINGMEN.</p>
        <small>This is the team's combined previous experience, not an agency client-count claim.</small>
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <div className="portfolio-layout">
      <div className="portfolio-mark">SELECTED<br /><em>WORK.</em></div>
      <div className="portfolio-placeholder">
        <span>THE PORTFOLIO IS BEING CURATED</span>
        <p>Previous work will be shown with clear individual attribution. 4WINGMEN projects will be added as they are completed.</p>
        <div className="placeholder-lines" aria-hidden="true"><i /><i /><i /></div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="contact-layout">
      <p className="kicker">THE NEXT MOVE IS YOURS</p>
      <h1>LET'S BUILD<br /><em>SOMETHING</em><br />THAT STANDS OUT.</h1>
      <p>Have a business to grow, a vision to execute, or an idea worth building?</p>
      <a className="instagram-cta" href="https://www.instagram.com/4wingmen?vrfl=MW44aWNwcWlmdTFvNg==" target="_blank" rel="noopener noreferrer">
        <Instagram size={19} /> DM 4WINGMEN <ArrowUpRight size={19} />
      </a>
      <span className="contact-foot">OWN THE SCENE. STAY SUPREME.</span>
    </div>
  );
}

export default App;
