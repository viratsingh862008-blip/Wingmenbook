import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Grid2X2, Instagram, X } from "lucide-react";
import { getNextChapter, getPreviousChapter } from "./lib/navigation";

type Chapter = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  body?: string[];
  accent?: string;
  kind: "cover" | "manifesto" | "story" | "experience" | "disciplines" | "people" | "services" | "process" | "proof" | "portfolio" | "contact";
};

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

const team = [
  { name: "ARYAN SINGH", role: "CHIEF TECHNOLOGY OFFICER", note: "AI-assisted technology · Digital strategy · Web & software · SEO / GEO", accent: "#d71920", image: "https://res.cloudinary.com/roq8nakt/image/upload/f_auto,q_auto,w_900,c_limit/4wingmen/brand-book/aryan-singh.jpg", tag: "THE TECHNOLOGIST" },
  { name: "SAAD GANI", role: "POST-PRODUCTION SPECIALIST", note: "Video editing · Post-production · Visual finishing", accent: "#d71920", image: "https://res.cloudinary.com/roq8nakt/image/upload/f_auto,q_auto,w_900,c_limit/4wingmen/brand-book/saad-gani.jpg", tag: "THE EDITOR" },
  { name: "AYUSH", role: "CHIEF CREATIVE OFFICER", note: "Creative production · Photography · Videography · Content ideation", accent: "#d71920", image: "https://res.cloudinary.com/roq8nakt/image/upload/f_auto,q_auto,w_900,c_limit/4wingmen/brand-book/ayush.jpg", tag: "THE CRAFTSPERSON" },
  { name: "ZAID AHMAD", role: "CHIEF STRATEGY & OPERATIONS OFFICER", note: "Strategic planning · Business discussions · Meetings · Operations", accent: "#d71920", image: "https://res.cloudinary.com/roq8nakt/image/upload/f_auto,q_auto,w_900,c_limit/4wingmen/brand-book/zaid-ahmad.jpg", tag: "THE STRATEGIST" }
];

const services = [
  ["01", "Social Media Management", "Planning, creating, publishing and managing a brand's social presence across agreed platforms."],
  ["02", "Brand Content Production", "Photography, videography and creator-led brand content featuring our own on-camera team."],
  ["03", "Creative Design", "Promotional posters and digital creatives shaped around the brand and campaign."],
  ["04", "Paid Advertising", "Meta ad strategy, copy, creative production, campaign setup, management and optimisation."],
  ["05", "Web & Software Development", "Business websites, landing pages, funnels, custom applications and integrations."],
  ["06", "Search Visibility", "SEO, local SEO and Generative Engine Optimisation (GEO)."],
  ["07", "Business Intelligence & Strategy", "Digital audits, competitor analysis, business gap identification and growth recommendations."]
];

function App() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isGuided, setIsGuided] = useState(true);
  const touchStart = useRef<{x:number;y:number}|null>(null);
  const chapter = chapters[active];
  const progress = useMemo(() => Math.round(((active + 1) / chapters.length) * 100), [active]);

  const go = (index: number) => {
    setActive(Math.max(0, Math.min(index, chapters.length - 1)));
    setMenuOpen(false);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      const target = event.target as HTMLElement | null;
      if (target?.closest("button,a,input,textarea,select,[contenteditable=true]")) return;
      if (event.key === "ArrowRight" && !menuOpen) setActive((current) => getNextChapter(current, chapters.length));
      if (event.key === "ArrowLeft" && !menuOpen) setActive((current) => getPreviousChapter(current));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.title = `${chapter.id === "cover" ? "4WINGMEN" : chapter.eyebrow + " — 4WINGMEN"} | Ideas That Fly`;
  }, [chapter]);

  const next = () => setActive((current) => getNextChapter(current, chapters.length));
  const previous = () => setActive((current) => getPreviousChapter(current));

  return (
    <main className={`book-shell chapter-${chapter.kind}`} style={{ "--accent": chapter.kind === "people" ? team[active % team.length].accent : "#d71920" } as CSSProperties}>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <a className="wordmark" href="#cover" onClick={(e) => { e.preventDefault(); go(0); }} aria-label="4WINGMEN home">
          <span className="mark-four">4</span><span className="mark-wing">WING</span><span className="mark-men">MEN</span>
        </a>
        <div className="top-center"><span>MARKETING</span><i /> <span>STRATEGY</span><i /> <span>CREATIVITY</span><i /> <span>GROWTH</span></div>
        <div className="top-actions">\n          <button className="icon-button" onClick={() => setMenuOpen(true)} aria-label="Open chapter index"><Grid2X2 size={18} /></button>\n        </div>
      </header>

      <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>

      <section className="stage" key={chapter.id} onTouchStart={(event) => { const t=event.changedTouches[0]; touchStart.current={x:t.clientX,y:t.clientY}; }} onTouchEnd={(event) => { if(!touchStart.current) return; const t=event.changedTouches[0]; const dx=t.clientX-touchStart.current.x; const dy=t.clientY-touchStart.current.y; touchStart.current=null; if(Math.abs(dx)>65 && Math.abs(dx)>Math.abs(dy)*1.25) setActive((current)=>dx<0?getNextChapter(current,chapters.length):getPreviousChapter(current)); }}>
        <div className="chapter-meta"><span>{chapter.eyebrow}</span><span>{String(active + 1).padStart(2, "0")} <b>/</b> {String(chapters.length).padStart(2, "0")}</span></div>
        {chapter.kind === "cover" && <Cover onBegin={next} />}
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
        <div className="bottom-left"><span className="tiny-dot" /> <span>{isGuided ? "GUIDED READING" : "FREE EXPLORATION"}</span><button className="mode-toggle" onClick={() => setIsGuided((v) => !v)}>{isGuided ? "SWITCH TO FREE" : "SWITCH TO GUIDED"}</button></div>
        <div className="bottom-center"><span>{String(active + 1).padStart(2, "0")}</span><div className="mini-progress"><i style={{ width: `${progress}%` }} /></div><span>{String(chapters.length).padStart(2, "0")}</span></div>
        <div className="bottom-right">
          <button className="nav-button" onClick={previous} disabled={active === 0} aria-label="Previous chapter"><ArrowLeft size={17} /></button>
          <button className="next-button" onClick={next} disabled={active === chapters.length - 1}>{active === chapters.length - 1 ? "END" : "NEXT"} <ArrowRight size={17} /></button>
        </div>
      </footer>

      {menuOpen && <div className="menu-overlay" role="dialog" aria-modal="true" aria-label="Chapter index">
        <div className="menu-head"><span>CONTENTS / 4WINGMEN</span><button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close chapter index"><X /></button></div>
        <div className="menu-list">{chapters.map((item, index) => <button key={item.id} className={index === active ? "menu-item active" : "menu-item"} onClick={() => go(index)}><span>{String(index).padStart(2, "0")}</span><strong>{item.eyebrow.split("/").pop()?.trim() ?? item.title}</strong><ArrowUpRight size={16} /></button>)}</div>
      </div>}
      <div className="edge-hint">SCROLL / SWIPE TO EXPLORE <ArrowDownRight size={14} /></div>
    </main>
  );
}

function Cover({ onBegin }: { onBegin: () => void }) {
  return <div className="cover-layout">
    <div className="cover-ghost">4</div>\n    <img className="cover-logo" src="https://res.cloudinary.com/roq8nakt/image/upload/f_auto,q_auto,w_420/4wingmen/brand-book/4wingmen-logo.png" alt="4WINGMEN official logo" />
    <div className="cover-copy"><p className="kicker">A DIFFERENT KIND OF AGENCY</p><h1>IDEAS THAT<br /><em>FLY.</em></h1><h2>BRANDS THAT <span>GROW.</span></h2>
      <button className="begin-button" onClick={onBegin}>ENTER THE EXPERIENCE <ArrowUpRight size={19} /></button>
    </div>
    <div className="cover-side-note">MARKETING <b>·</b> STRATEGY <b>·</b> CREATIVITY <b>·</b> GROWTH</div>
    <div className="cover-stamp"><span>4</span><small>WING<br />MEN</small></div>
    <div className="cover-bottom"><span>AN INTERACTIVE BRAND BOOK</span><span>EST. 4WINGMEN</span></div>
  </div>;
}

function Editorial({ chapter }: { chapter: Chapter }) {
  return <div className="editorial-layout"><div className="editorial-title"><h1>{chapter.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h1>{chapter.subtitle && <p className="editorial-subtitle">{chapter.subtitle}</p>}</div><div className="editorial-body">{chapter.body?.map((p) => <p key={p}>{p}</p>)}</div><div className="editorial-index">4W / {chapter.id.toUpperCase()}</div></div>;
}

function Disciplines() {
  const items = [["01", "CREATIVE", "Ideas made visible.", "#d71920"], ["02", "TECHNOLOGY", "Digital foundations.", "#d6a33d"], ["03", "MARKETING", "Attention into action.", "#f05a16"], ["04", "STRATEGY", "Direction with purpose.", "#d6a33d"]];
  return <div className="discipline-grid">{items.map(([n, title, text, color]) => <article className="discipline-card" key={n} style={{ "--card-accent": color } as React.CSSProperties}><span>{n}</span><h2>{title}</h2><p>{text}</p><i /></article>)}</div>;
}

function People() {
  return <div className="people-grid">{team.map((person, index) => <article className="person-card" key={person.name} style={{ "--person-accent": person.accent } as React.CSSProperties}><div className="person-image"><img src={person.image} alt={person.name} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} /><span className="person-fallback">{String(index + 1).padStart(2, "0")}</span><span className="person-tag">{person.tag}</span></div><div className="person-info"><h2>{person.name}</h2><p className="person-role">{person.role}</p><p>{person.note}</p></div></article>)}</div>;
}

function Services() {
  return <div className="services-layout"><div className="services-heading"><h1>WHAT WE<br /><em>BRING.</em></h1><p>One team. A connected set of capabilities.</p></div><div className="service-list">{services.map(([n, title, desc]) => <article className="service-row" key={n}><span>{n}</span><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight size={17} /></article>)}</div></div>;
}

function Process() {
  const steps = ["UNDERSTAND", "STRATEGISE", "CREATE", "EXECUTE", "OPTIMISE", "GROW"];
  return <div className="process-layout"><div className="process-orbit"><div className="orbit-core">4W</div>{steps.map((step, i) => <div className={`orbit-step step-${i}`} key={step}><span>0{i + 1}</span>{step}</div>)}</div><p className="process-note">The right combination of capabilities, shaped around each business.</p></div>;
}

function Proof() {
  return <div className="proof-layout"><div className="proof-number">10<span>+</span></div><div className="proof-copy"><h1>CLIENTS.<br /><em>COLLECTIVE EXPERIENCE.</em></h1><p>Prior client experience across the team, before coming together as 4WINGMEN.</p><small>This is the team's combined previous experience, not an agency client-count claim.</small></div></div>;
}

function Portfolio() {
  return <div className="portfolio-layout"><div className="portfolio-mark">SELECTED<br /><em>WORK.</em></div><div className="portfolio-placeholder"><span>THE PORTFOLIO IS BEING CURATED</span><p>Previous work will be shown with clear individual attribution. 4WINGMEN projects will be added as they are completed.</p><div className="placeholder-lines"><i /><i /><i /></div></div></div>;
}

function Contact() {
  return <div className="contact-layout"><p className="kicker">THE NEXT MOVE IS YOURS</p><h1>LET'S BUILD<br /><em>SOMETHING</em><br />THAT STANDS OUT.</h1><p>Have a business to grow, a vision to execute, or an idea worth building?</p><a className="instagram-cta" href="https://www.instagram.com/4wingmen?vrfl=MW44aWNwcWlmdTFvNg==" target="_blank" rel="noreferrer"><Instagram size={19} /> DM 4WINGMEN <ArrowUpRight size={19} /></a><span className="contact-foot">OWN THE SCENE. STAY SUPREME.</span></div>;
}

export default App;
