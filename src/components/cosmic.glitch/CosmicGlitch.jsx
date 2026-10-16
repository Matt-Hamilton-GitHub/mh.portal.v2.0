import "./cosmic.glitch.styles.css";

/* each block is 17 characters; the column is the block repeated 3x,
   so the falling animation (shifted by exactly one block) loops seamlessly */
const COLS = [
  { x: 36, block: "10110100110010101", t: 2.8 },
  { x: 48, block: "01001101011001011", t: 2.1 },
  { x: 60, block: "11010010110101001", t: 3.4 },
  { x: 72, block: "00101101001101110", t: 2.4 },
  { x: 84, block: "10011010100101101", t: 3.0 },
];

function DoorArt({ ghost = false }) {
  return (
    <svg className="hxd-svg" viewBox="0 0 120 190" aria-hidden="true" focusable="false">
      {!ghost && (
        <defs>
          <clipPath id="hxd-way">
            <rect x="30" y="48" width="60" height="122" />
          </clipPath>
        </defs>
      )}

      {/* hanging sign */}
      <line x1="48" y1="28" x2="48" y2="40" />
      <line x1="72" y1="28" x2="72" y2="40" />
      <g className="hxd-sign">
        <rect x="34" y="6" width="52" height="22" />
        <text x="60" y="22" textAnchor="middle">EXIT</text>
      </g>

      {/* neon frame */}
      <rect className="hxd-frame" x="22" y="40" width="76" height="130" />

      {/* what is behind the door */}
      {!ghost && (
        <g className="hxd-interior" clipPath="url(#hxd-way)">
          <rect className="hxd-glow" x="30" y="48" width="60" height="122" />
          {COLS.map((c) => (
            <text key={c.x} className="hxd-col" x={c.x} y={-110} style={{ "--t": `${c.t}s` }}>
              {(c.block + c.block + c.block).split("").map((ch, i) => (
                <tspan key={i} x={c.x} dy={i ? 8 : 0}>
                  {ch}
                </tspan>
              ))}
            </text>
          ))}
        </g>
      )}

      {/* the door itself, hinged on the left */}
      <g className="hxd-panel">
        <rect x="30" y="48" width="60" height="122" />
        <rect x="37" y="56" width="46" height="44" />
        <rect x="37" y="108" width="46" height="54" />
        <circle className="hxd-knob" cx="80" cy="112" r="2.6" />
      </g>

      {/* floor and the light leaking out */}
      <line x1="6" y1="172" x2="114" y2="172" />
      {!ghost && (
        <>
          <rect className="hxd-leak" x="34" y="169" width="52" height="2.5" />
          <polygon className="hxd-spill" points="30,172 90,172 112,188 8,188" />
        </>
      )}
    </svg>
  );
}

export default function CosmicGlitch({ label = "exit", onClick, className = "" }) {
  return (
    <button type="button" className={`hxd cursor-none ${className}`} onClick={onClick} aria-label={label}>
      <span className="hxd-stack">
        <span className="hxd-layer base">
          <DoorArt />
        </span>
        <span className="hxd-layer ghost pink">
          <DoorArt ghost />
        </span>
        <span className="hxd-layer ghost cyan">
          <DoorArt ghost />
        </span>
      </span>
      <span className="hxd-label" aria-hidden="true">
        <i className="hxd-dot" />
        {label}
      </span>
    </button>
  );
}