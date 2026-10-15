import { ME } from "../../utils/data";
import { Reveal } from "../../utils/utils";
import { Ticks } from "../Hud";
import "./about.styles.css";

const FACTS = [
  ["San Francisco", "Location"],
  ["Full Stack", "Specialty"],
  ["Open Source & Ownership", "Mindset"],
];

const HEADING = ["The engineer", "behind the", "commit history."];
const TONE = ["ab-t1", "ab-t2", "ab-t3"];

/* floating chips: absolute on wide screens, a static row on small ones */
const CHIPS = [
  { g: "</>", l: "code",     pos: { "--l": "4%", "--t": "13%" }, bd: "7s",   bw: "0s" },
  { g: "⎇",   l: "git",      pos: { "--r": "5%", "--t": "17%" }, bd: "8s",   bw: "1s" },
  { g: "{ }", l: "json",     pos: { "--l": "8%", "--t": "45%" }, bd: "6.5s", bw: "2s" },
  { g: "$_",  l: "terminal", pos: { "--r": "4%", "--t": "49%" }, bd: "7.5s", bw: "0.5s" },
  { g: "::",  l: "api",      pos: { "--l": "3%", "--t": "76%" }, bd: "8.5s", bw: "1.5s" },
  { g: "▤",   l: "db",       pos: { "--r": "7%", "--t": "80%" }, bd: "7s",   bw: "2.5s" },
];

/* deterministic decorative "commit activity" cells */
const CELLS = Array.from({ length: 36 }, (_, i) => {
  const n = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  return { o: n < 0.25 ? 0.12 : n < 0.55 ? 0.32 : n < 0.85 ? 0.65 : 1, t: `${(n * 4).toFixed(2)}s` };
});

/* blank line = new paragraph; first sentence of the first paragraph becomes the lead */
const splitAbout = (text = "") => {
  const paras = text.trim().split(/\n\s*\n/).filter(Boolean);
  if (!paras.length) return { lead: "", body: [] };
  const m = paras[0].match(/^([\s\S]+?[.!?])\s+([\s\S]+)$/);
  return m
    ? { lead: m[1], body: [m[2], ...paras.slice(1)] }
    : { lead: paras[0], body: paras.slice(1) };
};

const AboutSection = () => {
  const { lead, body } = splitAbout(ME.about);

  return (
    <section id="about" className="hud ab w-full">
      {/* <div className="hud-grid" aria-hidden="true" />
      <div className="hud-beam" aria-hidden="true" />
      <div className="hud-ghost" aria-hidden="true">01</div>
      <span className="hud-meta tl" aria-hidden="true">Section <b>01</b></span>
      <span className="hud-meta tr" aria-hidden="true">Rev 2026.10</span>
      <span className="hud-meta bl" aria-hidden="true">Profile // Bio</span>
      <span className="hud-meta br" aria-hidden="true">Status · <b>Online</b></span> */}

      <div className="ab-inner">
        <Reveal>
          <div className="ab-head">
            
            <h2 className="hud-display ab-h2">
              {HEADING.map((text, i) => (
                <span
                  key={text}
                  className={`glitch ${TONE[i]}`}
                  data-text={text}
                  style={{ "--g-dur": `${5 + i * 1.4}s`, "--g-del": `${i * 0.6}s` }}
                >
                  {text}
                </span>
              ))}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="ab-copy">
            
            {body.map((para, i) => <p key={i} className="ab-p">{para}</p>)}
          </div>
        </Reveal>

        <Reveal delay={0.22} style={{ width: "100%" }}>
          <dl className="hud-hairline ab-facts">
            <Ticks />
            {FACTS.map(([v, l]) => (
              <div key={l} className="ab-fact">
                <dt className="hud-label">{l}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="ab-strip" aria-hidden="true">
          {CELLS.map((c, i) => <i key={i} style={{ "--o": c.o, "--t": c.t }} />)}
        </div>
        
      </div>

      <div className="ab-chips" aria-hidden="true">
        {CHIPS.map(({ g, l, pos, bd, bw }) => (
          <span key={l} className="hud-tag ab-chip" style={{ ...pos, "--bd": bd, "--bw": bw }}>
            <b>{g}</b>{l}
          </span>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;