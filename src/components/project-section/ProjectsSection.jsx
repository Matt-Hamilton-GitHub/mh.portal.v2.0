import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal } from "../../utils/utils";
import { PROJECTS } from "../../utils/data";
import { Corners, Ticks } from "../Hud";
import "./project.styles.css";

const pad = (n) => String(n).padStart(2, "0");
const HEADING = ["Recent things I", "made real."];

/* ---------- lightbox (portaled so the section can't clip it) ---------- */
function Lightbox({ state, onClose, onStep }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onStep]);

  const it = state.items[state.i];

  return createPortal(
    <div className="pj-lb" role="dialog" aria-modal="true" aria-label={it.caption || "Project image"} onClick={onClose}>
      <div className="pj-lb-box hud-panel" onClick={(e) => e.stopPropagation()}>
        <Corners />
        <img src={it.src} alt={it.alt || it.caption || ""} draggable="false" />
        <div className="pj-lb-bar">
          <span className="hud-label t">{it.caption}</span>
          <span className="hud-label"><b>{state.i + 1}</b> / {state.items.length}</span>
          <button type="button" onClick={() => onStep(-1)}>PREV</button>
          <button type="button" onClick={() => onStep(1)}>NEXT</button>
          <button type="button" ref={closeRef} onClick={onClose}>CLOSE</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ---------- detail ---------- */
function Detail({ p, index, total, onOpen }) {
  const meta = [p.status, p.year, p.role].filter(Boolean).join(" · ");
  const images = (p.images || []).filter((im) => im.src);

  return (
    <div className="pj-detail">
      <div
        className="hud-display pj-num glitch"
        data-text={pad(index + 1)}
        style={{ "--g-dur": "9s" }}
        aria-hidden="true"
      >
        {pad(index + 1)}
      </div>

      <header className="pj-dhead">
        {meta && <div className="pj-meta">{meta}</div>}
        <h3 className="hud-display pj-name glitch" data-text={p.name} style={{ "--g-dur": "9s" }}>{p.name}</h3>
        {p.tagline && <p className="pj-tagline">{p.tagline}</p>}
        <p className="pj-desc">{p.desc}</p>

        {(p.link || p.repo) && (
          <div className="pj-actions">
            {p.link && (
              <a className="hud-btn primary" href={p.link} target="_blank" rel="noopener noreferrer">
                VIEW PROJECT ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {p.repo && (
              <a className="hud-btn ghost" href={p.repo} target="_blank" rel="noopener noreferrer">
                SOURCE CODE ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </header>

      {images.length > 0 && (
        <div className="pj-gallery">
          {images.map((im, i) => (
            <button
              key={im.src}
              type="button"
              className="pj-tile"
              onClick={() => onOpen(images, i)}
              aria-label={`Open image: ${im.caption || p.name}`}
            >
              <img src={im.src} alt={im.alt || im.caption || ""} loading="lazy" draggable="false" />
              {im.caption && <span className="hud-label pj-cap">{im.caption}</span>}
            </button>
          ))}
        </div>
      )}

      {p.stack?.length > 0 && (
        <ul className="pj-stack" aria-label="Tech stack">
          {p.stack.map((s) => <li key={s} className="hud-chip">{s}</li>)}
        </ul>
      )}

      <div className="pj-foot hud-label" aria-hidden="true">
        <span>PROJECT {pad(index + 1)} / {pad(total)}</span>
        <span className="dots"><i /><i /><i /></span>
      </div>
    </div>
  );
}

/* ---------- section ---------- */
const ProjectsSection = () => {
  const [sel, setSel] = useState(0);
  const [lb, setLb] = useState(null);
  const listRef = useRef(null);
  const total = PROJECTS.length;
  const p = PROJECTS[sel];

  const openLb = (items, i) => setLb({ items, i });
  const closeLb = () => setLb(null);
  const stepLb = (d) => setLb((s) => (s ? { ...s, i: (s.i + d + s.items.length) % s.items.length } : s));

  const onKeyNav = (e) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
    e.preventDefault();
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (sel + d + total) % total;
    setSel(next);
    listRef.current?.querySelectorAll("button")[next]?.focus();
  };

  return (
    <section id="projects" className="hud pj">
      {/* <div className="hud-grid" aria-hidden="true" />
      <div className="hud-beam" aria-hidden="true" />
      <div className="hud-ghost" aria-hidden="true">04</div>
      <span className="hud-meta tl" aria-hidden="true">Section <b>04</b></span>
      <span className="hud-meta tr" aria-hidden="true">Rev 2026.10</span>
      <span className="hud-meta bl" aria-hidden="true">Index // Builds</span>
      <span className="hud-meta br" aria-hidden="true">Repo · <b>Online</b></span> */}

      <div className="pj-inner">
        <Reveal>
          <div className="pj-head">
            <div className="hud-eyebrow">
              <span className="ln" /><span className="dia" />
              <span> PROJECTS</span>
              <span className="dia" /><span className="ln" />
            </div>
            <h2 className="hud-display pj-h2">
              {HEADING.map((text, i) => (
                <span
                  key={text}
                  className={`glitch ${i ? "pj-t2" : "pj-t1"}`}
                  data-text={text}
                  style={{ "--g-dur": "9s", "--g-del": `${i * 0.5}s` }}
                >
                  {text}
                </span>
              ))}
            </h2>
            <div className="hud-sub" aria-hidden="true">
              <i /> <b>{pad(total)}</b> PROJECTS INDEXED
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="pj-explorer">
            <div
              className="pj-index"
              role="tablist"
              aria-orientation="vertical"
              aria-label="Projects"
              ref={listRef}
              onKeyDown={onKeyNav}
            >
              {PROJECTS.map((x, i) => (
                <button
                  key={x.name}
                  type="button"
                  role="tab"
                  id={`pj-tab-${i}`}
                  aria-selected={sel === i}
                  aria-controls="pj-panel"
                  tabIndex={sel === i ? 0 : -1}
                  className="pj-item"
                  onClick={() => setSel(i)}
                >
                  <span>{pad(i + 1)} · {x.name}</span>
                  <span className="y">{x.year}</span>
                </button>
              ))}
            </div>

            <div id="pj-panel" role="tabpanel" aria-labelledby={`pj-tab-${sel}`} className="hud-hairline pj-panel">
              <Ticks />
              <div className="hud-sheen" aria-hidden="true" />
              <Detail key={sel} p={p} index={sel} total={total} onOpen={openLb} />
            </div>
          </div>
        </Reveal>
      </div>

      {lb && <Lightbox state={lb} onClose={closeLb} onStep={stepLb} />}
    </section>
  );
};

export default ProjectsSection;