import { useEffect, useRef, useState } from "react";
import { Reveal } from "../../utils/utils";
import { SKILLS } from "../../utils/data";
import Ticks from "../Ticks";
import CodeRain from "../CodeRain";
import "./skill.styles.css";

const ROOT = { title: "SOFTWARE ENGINEER", sub: "FULL-STACK" };
const WIDE = "(min-width: 1100px)";

const pad = (n) => String(n).padStart(2, "0");
const hex = (i) => `0x${(i + 1).toString(16).toUpperCase().padStart(2, "0")}`;

/* position of el inside root via the offset chain (ignores transforms, so it's
   correct even while Reveal is still animating) */
const posIn = (el, root) => {
  let x = 0, y = 0, n = el;
  while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
  return { x, y };
};

/* branch geometry: wide = S-curves from the root; narrow = elbows off a left trunk */
const buildPaths = ({ root: r, cats }, wide) => {
  if (wide) {
    return {
      trunk: null,
      branches: cats.map((c) => {
        const m = (r.y + c.y) / 2;
        const d = `M${r.x} ${r.y} C ${r.x} ${m}, ${c.x} ${m}, ${c.x} ${c.y}`;
        return { line: d, run: d };
      }),
    };
  }
  const last = cats[cats.length - 1];
  return {
    trunk: `M${r.x} ${r.y} V ${Math.max(r.y, last.y - 28)}`,
    branches: cats.map((c) => {
      const y0 = c.y - 28;
      const cx = r.x + (c.x - r.x) * 0.4;
      const curve = `C ${r.x} ${c.y}, ${cx} ${c.y}, ${c.x} ${c.y}`;
      return { line: `M${r.x} ${y0} ${curve}`, run: `M${r.x} ${r.y} V ${y0} ${curve}` };
    }),
  };
};

const SkillsSection = () => {
  const total = SKILLS.length;
  const tools = SKILLS.reduce((n, c) => n + c.items.length, 0);

  const treeRef = useRef(null);
  const rootAnchor = useRef(null);
  const anchors = useRef([]);
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.matchMedia(WIDE).matches);
  const [geo, setGeo] = useState(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const tree = treeRef.current;
    if (!tree) return;
    const measure = () => {
      if (!rootAnchor.current) return;
      setGeo({
        w: tree.offsetWidth,
        h: tree.offsetHeight,
        root: posIn(rootAnchor.current, tree),
        cats: anchors.current.filter(Boolean).map((el) => posIn(el, tree)),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(tree);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [wide, total]);

  const paths = geo && geo.cats.length === total ? buildPaths(geo, wide) : null;

  return (
    <section id="skills" className="hud hud-aurora sk">
      <div className="sk-inner">
        <Reveal>
          <div className="sk-head">
            <div className="ed-head">
          <div className="hud-eyebrow">
            <span className="ln" /><span className="dia" />
            <span>Skills</span>
            <span className="dia" /><span className="ln" />
          </div>
        </div>
            <h2 className="hud-display sk-h2 glitch" data-text="My skillbox" style={{ "--g-dur": "7s" }}>
              My <em>toolbox</em>
            </h2>
            <div className="hud-sub" aria-hidden="true">
              <i /> <b>{pad(total)}</b> BRANCHES · <b>{pad(tools)}</b> TOOLS LOADED
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div ref={treeRef} className="hud-hairline sk-tree" data-wide={wide}>
            <Ticks />
            <CodeRain className="sk-rain" />

            {paths && (
              <>
                <svg className="sk-lines" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
                  {paths.trunk && <path className="sk-trunk" d={paths.trunk} />}
                  {paths.branches.map((b, i) => (
                    <path key={i} className={`sk-branch${active === i ? " on" : ""}`} d={b.line} />
                  ))}
                </svg>
                {paths.branches.map((b, i) => (
                  <span
                    key={i}
                    className="sk-pulse"
                    aria-hidden="true"
                    style={{ offsetPath: `path("${b.run}")`, "--d": `${5 + (i % 3) * 1.2}s`, "--w": `${i * 0.9}s` }}
                  />
                ))}
              </>
            )}

            {/* ---------- root ---------- */}
            <div className="sk-root">
              <span className="hud-label">// ROOT · 0x00</span>
              <div className="hud-display sk-root-t glitch" data-text={ROOT.title} style={{ "--g-dur": "6s" }}>
                {ROOT.title}
              </div>
              <span className="hud-label">{ROOT.sub}</span>
              <span className="sk-anchor sk-ra" ref={rootAnchor} />
            </div>

            {/* ---------- branches ---------- */}
            <ol
              className="sk-cats"
              aria-label="Skills by area"
              style={{ "--n": total }}
              onMouseLeave={() => setActive(null)}
            >
              {SKILLS.map((cat, i) => (
                <li
                  key={cat.category}
                  className="sk-cat"
                  data-active={active === i}
                  data-dim={active !== null && active !== i}
                  tabIndex={0}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                >
                  <div className="sk-node">
                    <span className="sk-anchor sk-ca" ref={(el) => (anchors.current[i] = el)} />
                    <span className="sk-dia" aria-hidden="true"><span>{cat.icon}</span></span>
                    <div>
                      <h3 className="hud-display sk-name">{cat.category}</h3>
                      <div className="hud-label sk-sub" aria-hidden="true">
                        {hex(i)} · <b>{pad(cat.items.length)}</b> TOOLS
                      </div>
                    </div>
                  </div>

                  <ul className="sk-tools">
                    {cat.items.map((skill, j) => (
                      <li key={skill} className="sk-tool">
                        <i aria-hidden="true">{i + 1}.{j + 1}</i>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

           
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SkillsSection;