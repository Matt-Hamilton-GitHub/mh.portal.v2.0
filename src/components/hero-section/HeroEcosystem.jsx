import { useEffect, useRef, useState } from "react";
import "./hero-ecosystem.css";

/* ------------------------------------------------------------------
   DATA — edit freely. Every node connects to a parent (null = core).
   ring 1 = workflow (inner), ring 2 = stack (middle), ring 3 = infra (outer)
   a = starting angle in degrees
------------------------------------------------------------------- */
const RINGS = {
  1: { r: 108, speed: 0.114, name: "workflow" },
  2: { r: 188, speed: -0.074, name: "stack" },
  3: { r: 264, speed: 0.048, name: "infra" },
};

const NODES = [
  // workflow
  { id: "git", ring: 1, a: -90, glyph: "GT", label: "GIT", parent: null, role: "trunk-based history, small reviewable changes" },
  { id: "test", ring: 1, a: 0, glyph: "TS", label: "TESTS", parent: null, role: "unit, integration and contract checks gate every merge" },
  { id: "ci", ring: 1, a: 90, glyph: "CI", label: "CI", parent: null, role: "pipelines build, scan and publish every commit" },
  { id: "ship", ring: 1, a: 180, glyph: "SH", label: "SHIP", parent: null, role: "progressive rollouts with a one-step rollback" },
  // stack
  { id: "react", ring: 2, a: -60, glyph: "RE", label: "REACT", parent: "test", role: "typed interfaces that stay fast under load" },
  { id: "node", ring: 2, a: 0, glyph: "ND", label: "NODE", parent: "git", role: "APIs and services behind a clean contract" },
  { id: "go", ring: 2, a: 60, glyph: "GO", label: "GO", parent: "ci", role: "high-throughput workers and pipelines" },
  { id: "sql", ring: 2, a: 120, glyph: "SQ", label: "SQL", parent: "git", role: "schemas and migrations treated like code" },
  { id: "kafka", ring: 2, a: 180, glyph: "KF", label: "KAFKA", parent: "ship", role: "event streams that decouple services" },
  { id: "redis", ring: 2, a: 240, glyph: "RD", label: "REDIS", parent: "ci", role: "caching and queues on the hot path" },
  // infra
  { id: "docker", ring: 3, a: -30, glyph: "DK", label: "DOCKER", parent: "node", role: "reproducible builds from laptop to prod" },
  { id: "k8s", ring: 3, a: 30, glyph: "K8", label: "K8S", parent: "go", role: "scheduling, scaling and self-healing" },
  { id: "aws", ring: 3, a: 90, glyph: "AW", label: "AWS", parent: "kafka", role: "the cloud footprint everything runs on" },
  { id: "tf", ring: 3, a: 150, glyph: "TF", label: "TERRAFORM", parent: "sql", role: "infrastructure declared, reviewed and versioned" },
  { id: "graf", ring: 3, a: 210, glyph: "GF", label: "GRAFANA", parent: "redis", role: "dashboards and alerts that close the loop" },
  { id: "otel", ring: 3, a: 270, glyph: "OT", label: "OTEL", parent: "react", role: "traces and metrics flowing back to the core" },
];

const TAU = Math.PI / 180;
const BY_ID = Object.fromEntries(NODES.map((n, i) => [n.id, { ...n, i }]));
const CHILDREN = {};
NODES.forEach((n) => {
  const key = n.parent ?? "core";
  (CHILDREN[key] ||= []).push(n.id);
});

/* walk order for the idle auto-tour (spreads attention around the structure) */
const TOUR = ["ship", "kafka", "aws", "ci", "go", "k8s", "git", "sql", "tf", "test", "react", "otel", "redis", "graf", "node", "docker"];

const ancestors = (id) => {
  const out = [];
  let cur = BY_ID[id]?.parent;
  while (cur) {
    out.push(cur);
    cur = BY_ID[cur].parent;
  }
  return out;
};

export default function HeroEcosystem() {
  const svgRef = useRef(null);
  const pulseRef = useRef(null);
  const els = useRef({});
  const [hover, setHover] = useState(null);
  const [tour, setTour] = useState(TOUR[0]);

  const reg = (id, k) => (el) => {
    (els.current[id] ||= {})[k] = el;
  };

  /* ---------- animation loop (writes attributes directly, no re-renders) ---------- */
  useEffect(() => {
    if (!svgRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = {};
    let raf;

    const frame = (t) => {
      NODES.forEach((n) => {
        const R = RINGS[n.ring];
        const ang = n.a * TAU + R.speed * t;
        pos[n.id] = [Math.cos(ang) * R.r, Math.sin(ang) * R.r];
      });

      /* deploy pulse: expands from the core every 9s and lights nodes it passes */
      const cycle = 9;
      const pr = reduce ? 0 : ((t % cycle) / cycle) * 310;
      const pulse = pulseRef.current;
      if (pulse) {
        pulse.setAttribute("r", pr.toFixed(1));
        pulse.setAttribute("opacity", reduce ? 0 : ((1 - pr / 310) * 0.75).toFixed(2));
      }

      NODES.forEach((n, i) => {
        const e = els.current[n.id];
        if (!e || !e.g) return;
        const [x, y] = pos[n.id];
        const [px, py] = n.parent ? pos[n.parent] : [0, 0];

        e.g.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);

        e.line.setAttribute("x1", x.toFixed(1));
        e.line.setAttribute("y1", y.toFixed(1));
        e.line.setAttribute("x2", px.toFixed(1));
        e.line.setAttribute("y2", py.toFixed(1));

        /* data packet: outward for workflow + stack, inward (telemetry) for infra */
        const ph = (t * 0.16 + i * 0.37) % 1;
        const k = n.ring === 3 ? 1 - ph : ph;
        e.pk.setAttribute("cx", (px + (x - px) * k).toFixed(1));
        e.pk.setAttribute("cy", (py + (y - py) * k).toFixed(1));
        e.pk.setAttribute("opacity", Math.sin(Math.PI * ph).toFixed(2));

        const d = Math.hypot(x, y);
        const glow = reduce ? 0 : Math.max(0, 1 - Math.abs(d - pr) / 30) * (1 - pr / 360);
        e.halo.setAttribute("opacity", glow.toFixed(2));
      });
    };

    if (reduce) {
      frame(6.5);
      return;
    }
    const t0 = performance.now();
    const loop = (now) => {
      frame((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ---------- idle tour: highlights one node at a time until the user hovers ---------- */
  useEffect(() => {
    if (hover) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setTour((cur) => TOUR[(TOUR.indexOf(cur) + 1) % TOUR.length]);
    }, 3600);
    return () => clearInterval(id);
  }, [hover]);

  const activeId = hover || tour;
  const active = BY_ID[activeId];
  const lit = new Set([activeId, ...ancestors(activeId), ...(CHILDREN[activeId] || [])]);
  const parentLabel = active.parent ? BY_ID[active.parent].label : "MAIN";
  const kids = (CHILDREN[activeId] || []).map((c) => BY_ID[c].label);

  return (
    <div className="hx-eco">
      <svg
        ref={svgRef}
        className="hx-eco-svg has-active"
        viewBox="-300 -300 600 600"
        role="group"
        aria-label="Software engineering ecosystem: workflow, stack and infrastructure orbiting a main branch"
      >
        <defs>
          <radialGradient id="hx-eco-glow">
            <stop offset="0%" style={{ stopColor: "var(--hx-green)", stopOpacity: 0.22 }} />
            <stop offset="100%" style={{ stopColor: "var(--hx-green)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        <circle r="150" fill="url(#hx-eco-glow)" />

        {/* orbit rings */}
        <circle className="hx-eco-tickring" r="294" />
        <circle className="hx-eco-ring r1" r={RINGS[1].r} />
        <circle className="hx-eco-ring r2" r={RINGS[2].r} />
        <circle className="hx-eco-ring r3" r={RINGS[3].r} />

        {/* edges */}
        <g>
          {NODES.map((n) => (
            <line
              key={n.id}
              ref={reg(n.id, "line")}
              className={`hx-eco-edge r${n.ring}${lit.has(n.id) && (lit.has(n.parent) || !n.parent) ? " is-lit" : ""}`}
            />
          ))}
        </g>

        {/* data packets */}
        <g>
          {NODES.map((n) => (
            <circle key={n.id} ref={reg(n.id, "pk")} className={`hx-eco-packet r${n.ring}`} r="3.2" />
          ))}
        </g>

        {/* deploy pulse */}
        <circle ref={pulseRef} className="hx-eco-pulse" r="0" />

        {/* core */}
        <g className="hx-eco-core">
          <polygon className="hx-eco-hex outer" points="46,0 23,39.8 -23,39.8 -46,0 -23,-39.8 23,-39.8" />
          <polygon className="hx-eco-hex inner" points="34,0 17,29.4 -17,29.4 -34,0 -17,-29.4 17,-29.4" />
          <text className="hx-eco-core-text" y="5" textAnchor="middle">
            main
          </text>
        </g>

        {/* nodes */}
        {NODES.map((n) => {
          const on = n.id === activeId;
          const dim = !lit.has(n.id);
          return (
            <g
              key={n.id}
              ref={reg(n.id, "g")}
              className={`hx-eco-node r${n.ring}${on ? " is-active" : ""}${dim ? " is-dim" : ""}`}
              tabIndex={0}
              role="button"
              aria-label={`${n.label}: ${n.role}`}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(n.id)}
              onBlur={() => setHover(null)}
            >
              <circle ref={reg(n.id, "halo")} className="hx-eco-halo" r="30" opacity="0" />
              {n.ring === 1 && <rect className="hx-eco-shape" x="-19" y="-19" width="38" height="38" />}
              {n.ring === 2 && <rect className="hx-eco-shape" x="-16" y="-16" width="32" height="32" />}
              {n.ring === 3 && <rect className="hx-eco-shape" x="-12" y="-12" width="24" height="24" transform="rotate(45)" />}
              <text className="hx-eco-glyph" y="4.5" textAnchor="middle">
                {n.glyph}
              </text>
              <text className="hx-eco-label" y={n.ring === 1 ? 35 : n.ring === 2 ? 32 : 28} textAnchor="middle">
                {n.label}
              </text>
              <circle className="hx-eco-hit" r="26" />
            </g>
          );
        })}
      </svg>

      {/* readout */}
      <div className="hx-eco-readout" key={activeId}>
        <span className="hd">{RINGS[active.ring].name}</span>
        <div>
          <em>$</em> trace <b>{active.label.toLowerCase()}</b>
        </div>
        <div className="role">{active.role}</div>
        <div className="rel">
          fed by <b>{parentLabel.toLowerCase()}</b>
        </div>
        <div className="rel">
          feeds <b>{kids.length ? kids.join(", ").toLowerCase() : "nothing, it is a leaf"}</b>
        </div>
      </div>

      <ul className="hx-eco-legend" aria-hidden="true">
        <li><i className="k1" />workflow</li>
        <li><i className="k2" />stack</li>
        <li><i className="k3" />infra</li>
      </ul>
    </div>
  );
}