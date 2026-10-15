import { useState } from "react";
import { COURSEWORK } from "../../utils/data";
import Ticks from "../Ticks";

const NX = { l: 35, r: 65 };           // node x-position (% of width) per side
const ROW = 56;                        // viewBox row height; the real height comes from CSS --row
const pad = (n) => String(n).padStart(2, "0");
const hex = (i) => `0x${(i + 1).toString(16).toUpperCase().padStart(2, "0")}`;
const RAIN = ["01101001", "0xA3F9", "10010110", "7E2B04", "01010011", "C0DE", "11001010"];

export default function EducationVisual() {
  const [active, setActive] = useState(null);
  const n = COURSEWORK.length;
  const H = n * ROW;

  const leaves = COURSEWORK.map((course, i) => {
    const side = i % 2 ? "r" : "l";
    const nx = NX[side];
    const y = i * ROW + ROW / 2;
    const cx = 50 + (nx - 50) * 0.4;
    return { course, i, side, nx, d: `M50 ${y - ROW * 0.45} C 50 ${y}, ${cx} ${y}, ${nx} ${y}` };
  });

  return (
    <div className="hud-hairline ed-tree">
      <Ticks />

      <div className="ed-rain" aria-hidden="true">
        {RAIN.map((s, i) => (
          <span key={i} style={{ "--x": `${6 + i * 14}%`, "--d": `${9 + i * 1.7}s`, "--w": `-${i * 1.3}s` }}>{s}</span>
        ))}
      </div>

      <div className="ed-root">
        <span className="hud-label">BERKELEY, CA · EST. 1868</span>
        <div className="hud-display ed-root-t glitch" data-text="UC BERKELEY" style={{ "--g-dur": "7s" }}>
          UC BERKELEY
        </div>
        <span className="hud-label">B.S. · CS &amp; EE</span>
      </div>

      <div className="ed-branches">
        <svg className="ed-lines" viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <path className="ed-trunk" d={`M50 0 V ${H}`} />
          {leaves.map((l) => (
            <path key={l.i} className={`ed-branch${active === l.i ? " on" : ""}`} d={l.d} />
          ))}
        </svg>
        <span className="ed-pulse" aria-hidden="true" />

        <ol className="ed-list" aria-label="Relevant coursework" onMouseLeave={() => setActive(null)}>
          {leaves.map((l) => (
            <li
              key={`${l.course}-${l.i}`}
              className={`ed-leaf ${l.side}`}
              style={{ "--nx": `${l.nx}%` }}
              data-active={active === l.i}
              data-dim={active !== null && active !== l.i}
              tabIndex={0}
              onMouseEnter={() => setActive(l.i)}
              onFocus={() => setActive(l.i)}
              onBlur={() => setActive(null)}
            >
              <span className="ed-node" aria-hidden="true" />
              <span className="ed-course">
                <i aria-hidden="true">{hex(l.i)}</i>
                {l.course}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="ed-end">
        <span className="hud-label">GRADUATED</span>
        {/* <b className="hud-display">Class of 2024</b> */}
      </div>

      <div className="hud-label ed-cap" aria-hidden="true">
        // RELEVANT COURSEWORK · <b>{pad(n)}</b> NODES
      </div>
    </div>
  );
}