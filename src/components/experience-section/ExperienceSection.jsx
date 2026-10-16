import { useState } from "react";
import { Reveal } from "../../utils/utils";
import { EXPERIENCE } from "../../utils/data";
import "./experience.styles.css";


const Ticks = () => (
  <>
    <span className="ex-tick tl" /><span className="ex-tick tr" />
    <span className="ex-tick bl" /><span className="ex-tick br" />
  </>
);

const pad = (n) => String(n).padStart(2, "0");

const HEADING = [
  { text: "Where I've", cls: "l1" },
  { text: "shipped.", cls: "l2" },
];

const ExperienceSection = () => {
  const [hovExp, setHovExp] = useState(null);
  const total = EXPERIENCE.length;

  return (
    <section id="experience" className="ex hud">
      {/* background + decoration */}
      <div className="ex-grid-bg" aria-hidden="true" />
      <div className="ex-beam" aria-hidden="true" />

      <div className="ex-inner">
        <Reveal>
          <div className="ex-head">
            <div className="ex-label">
              <span className="ln" />
              <span className="dia" />
              <span>EXPERIENCE</span>
              <span className="dia" />
              <span className="ln" />
            </div>
            
            <h2 className="ex-h2">
              {HEADING.map(({ text, cls }, i) => (
                <span key={text} className={`ex-g ${cls}`} data-text={text} style={{ "--w": `${i * 0.5}s` }}>
                  {text}
                </span>
              ))}
            </h2>
            <div className="ex-sub" aria-hidden="true">
              <i /> <b>{pad(total)}</b> ENTRIES LOGGED
            </div>
          </div>
        </Reveal>

        <div className="ex-list">
          <span className="ex-pulse" aria-hidden="true" />
          {EXPERIENCE.map((e, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article
                className="ex-entry"
                data-active={hovExp === i}
                data-dim={hovExp !== null && hovExp !== i}
                onMouseEnter={() => setHovExp(i)}
                onMouseLeave={() => setHovExp(null)}
                onFocus={() => setHovExp(i)}
                onBlur={() => setHovExp(null)}
                tabIndex={0}
              >
                <Ticks />
                <div className="ex-sheen" aria-hidden="true" />
                <span className="ex-node" aria-hidden="true" />
                <span className="ex-link" aria-hidden="true" />
                <div className="ex-num" aria-hidden="true">{pad(i + 1)}</div>

                <div className="ex-cols">
                  <div>
                    <div className="ex-period">{e.period}</div>
                    <h3 className="ex-company">{e.company}</h3>
                    {e.highlight?.length > 0 && (
                      <div className="ex-tags">
                        {e.highlight.map((h) => (
                          <span key={h} className="ex-tag">{h}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="ex-role">{e.role}</div>
                    <p className="ex-desc">{e.desc}</p>
                  </div>
                </div>

                <div className="ex-foot" aria-hidden="true">
                  <span>ENTRY {pad(i + 1)} / {pad(total)}</span>
                  <span className="dots"><i /><i /><i /></span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;