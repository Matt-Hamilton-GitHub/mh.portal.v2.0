import { useEffect, useRef, useState } from "react";
import "./solar.prot.styles.css";

/* ------------------------------------------------------------------
   PHYSICS
   Every body follows a real Keplerian ellipse (sun at the focus), so it
   moves fast near perihelion and slow near aphelion. Orbital elements
   are the J2000 values, so the system starts in its real configuration.
   Only two things are artificial:
   - time is sped up (Earth laps in LAP seconds, others softened so
     Neptune still visibly moves)
   - distances are compressed: display distance = real AU ^ 0.4 out to
     36 AU, then logarithmic so the heliosphere still fits on screen
------------------------------------------------------------------- */
const TAU = Math.PI * 2;
const DEG = Math.PI / 180;
const LAP = 22;

/* distance compression (display units) */
const disp = (len) => (len <= 36 ? Math.pow(len, 0.4) : Math.pow(36, 0.4) + 0.5 * Math.log(len / 36));

/* heliosphere, in display units: nose faces right, tail trails left.
   real values: termination shock ~90 AU, heliopause ~120 AU */
const HP0 = 4.8;
const TS0 = 4.42;
const ARMS = 8;
const SPIRAL_K = 1.15;
const shape = (phi) => 1 + 0.12 * Math.pow(1 - Math.cos(phi), 1.5);

/* Matrix palette, same values as the .hx tokens */
const GREEN = [0, 255, 157];
const SOFT = [184, 205, 226];
const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789";

/* planet(id, name, color, px size, a AU, e, inclination, node, perihelion longitude, mean longitude, year) */
const planet = (id, name, color, size, a, e, inc, node, peri, L, year, extra = {}) => ({
  id, name, color, size, a, e, inc, node, w: peri - node, M0: L - peri, year, ...extra,
});

const prep = (el) => {
  const i = el.inc * DEG;
  const O = el.node * DEG;
  const w = el.w * DEG;
  el.b = el.a * Math.sqrt(1 - el.e * el.e);
  el.cw = Math.cos(w); el.sw = Math.sin(w);
  el.ci = Math.cos(i); el.si = Math.sin(i);
  el.cO = Math.cos(O); el.sO = Math.sin(O);
  el.m0 = el.M0 * DEG;
  el.period = Math.pow(el.a, 1.5);
  el.n = TAU / (LAP * Math.pow(el.period, 0.55));
  return el;
};

const BODIES = [
  planet("mercury", "Mercury", [143, 168, 192], 3.2, 0.3871, 0.2056, 7.005, 48.33, 77.46, 252.25, "88 days"),
  planet("venus", "Venus", [120, 255, 200], 5, 0.7233, 0.0068, 3.395, 76.68, 131.53, 181.98, "225 days"),
  planet("earth", "Earth", [0, 224, 255], 5.4, 1.0, 0.0167, 0, 0, 102.94, 100.46, "365 days", { moon: true }),
  planet("mars", "Mars", [255, 46, 110], 4, 1.5237, 0.0934, 1.85, 49.56, 336.04, 355.45, "687 days"),
  planet("jupiter", "Jupiter", [0, 255, 157], 12, 5.2026, 0.0484, 1.303, 100.46, 14.75, 34.4, "11.9 years"),
  planet("saturn", "Saturn", [200, 255, 230], 10, 9.5549, 0.0539, 2.489, 113.67, 92.43, 49.94, "29.5 years", { ring: true }),
  planet("uranus", "Uranus", [0, 190, 230], 7.5, 19.218, 0.0473, 0.773, 74.01, 170.96, 313.23, "84 years"),
  planet("neptune", "Neptune", [40, 140, 210], 7, 30.07, 0.0086, 1.77, 131.78, 44.97, 304.88, "165 years"),
  {
    id: "halley", name: "Halley", color: [255, 46, 110], size: 3.5, comet: true,
    a: 17.834, e: 0.96714, inc: 162.26, node: 58.42, w: 111.33, M0: 66, year: "76 years",
  },
].map(prep);

const HELIO = { id: "helio", name: "Heliosphere", color: GREEN, special: true };
const BLACKHOLE = { id: "blackhole", name: "Black hole", color: [234, 255, 246], special: true };
const ALL = [...BODIES, HELIO, BLACKHOLE];

const ORDINAL = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"];
const rgb = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/* solve Kepler's equation M = E - e sin E */
function kepler(M, e) {
  M = ((M % TAU) + TAU) % TAU;
  let E = e > 0.8 ? Math.PI : M;
  for (let k = 0; k < 8; k++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  return E;
}

/* eccentric anomaly -> 3D position. out = [x, y, z, realDistanceAU] */
function orbitPoint(el, E, yaw, out) {
  const xp = el.a * (Math.cos(E) - el.e);
  const yp = el.b * Math.sin(E);
  const x1 = xp * el.cw - yp * el.sw;
  const y1 = xp * el.sw + yp * el.cw;
  const y2 = y1 * el.ci;
  const z2 = y1 * el.si;
  let X = x1 * el.cO - y2 * el.sO;
  let Y = x1 * el.sO + y2 * el.cO;
  let Z = z2;
  const len = Math.hypot(X, Y, Z);
  const f = len ? disp(len) / len : 0;
  X *= f; Y *= f; Z *= f;
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  out[0] = X * cy - Y * sy;
  out[1] = X * sy + Y * cy;
  out[2] = Z;
  out[3] = len;
}

export default function SolarProto({ rain = true }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const distRef = useRef(null);
  const posRef = useRef([]);
  const activeRef = useRef("earth");
  const redrawRef = useRef(() => {});
  const rainRef = useRef(rain);
  rainRef.current = rain;

  const [hover, setHover] = useState(null);
  const [tour, setTour] = useState("earth");

  const activeId = hover || tour;
  const idx = ALL.findIndex((b) => b.id === activeId);
  const active = ALL[idx];

  useEffect(() => {
    activeRef.current = activeId;
    redrawRef.current();
  }, [activeId]);

  /* idle tour */
  useEffect(() => {
    if (hover) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setTour((cur) => ALL[(ALL.findIndex((b) => b.id === cur) + 1) % ALL.length].id);
    }, 4200);
    return () => clearInterval(id);
  }, [hover]);

  /* ---------- canvas ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const MONO = "'Share Tech Mono', ui-monospace, monospace";

    let size = { w: 0, h: 0 };
    let t = reduce ? 40 : 0;
    let raf;
    let last = performance.now();
    let visible = true;
    let cols = [];

    let seed = 7;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

    /* asteroid belt: each rock on its own small ellipse */
    const belt = Array.from({ length: 140 }, () => {
      const a = 2.2 + rand() * 1.0;
      return prep({
        a, e: rand() * 0.25, inc: rand() * 10, node: rand() * 360, w: rand() * 360,
        M0: rand() * 360, ch: GLYPHS[Math.floor(rand() * GLYPHS.length)],
      });
    });

    /* background stars (they get lensed by the black hole) */
    const stars = Array.from({ length: 90 }, () => ({ x: rand(), y: rand(), r: rand() * 1.2 + 0.4, p: rand() * TAU }));

    /* accretion disk: particles on Keplerian orbits, sheared (inner edge spins fastest) */
    const disk = Array.from({ length: 420 }, () => {
      const u = rand();
      const rho = 1.6 + 2.6 * u * u;
      return {
        rho,
        phi: rand() * TAU,
        w: 2.0 * Math.pow(rho, -1.5),
        size: 1.3 + rand() * 1.3,
        col: u < 0.25 ? [234, 255, 246] : u < 0.6 ? [0, 255, 157] : [0, 200, 225],
        glyph: rho > 3.2 && rand() < 0.3 ? "01"[Math.floor(rand() * 2)] : null,
        fx: 0, fy: 0, front: false, b: 1,
      };
    });

    const P = [0, 0, 0, 0];
    const Q = [0, 0, 0, 0];

    /* galactic cosmic rays: most are diverted around the bubble, a few high-energy ones get through */
    const rays = Array.from({ length: 70 }, () => ({}));
    const spawn = (p, early) => {
      p.u = 7 + rand() * (early ? 16 : 2);
      p.v = (rand() - 0.5) * 11.5;
      p.vx = -(1.4 + rand() * 0.8);
      p.vy = (rand() - 0.5) * 0.08;
      p.mode = 0;
      p.hi = rand() < 0.12;
      p.flash = 0;
      p.phi = 0;
      p.dir = 1;
      p.fu = 0;
      p.fv = 0;
    };
    rays.forEach((p) => spawn(p, true));
    const step = (dt) => {
      rays.forEach((p) => {
        if (p.mode === 0) {
          p.u += p.vx * dt;
          p.v += p.vy * dt;
          const r = Math.hypot(p.u, p.v);
          const phi = Math.atan2(p.v, p.u);
          if (!p.hi && r < HP0 * shape(phi)) {
            p.mode = 1;
            p.phi = phi;
            p.dir = p.v >= 0 ? 1 : -1;
            p.flash = 1;
            p.fu = p.u;
            p.fv = p.v;
          } else if (r < 0.7 || p.u < -9) {
            spawn(p, false);
          }
        } else {
          const R = HP0 * shape(p.phi) * 1.012;
          p.phi += (p.dir * 1.7 * dt) / R;
          p.u = R * Math.cos(p.phi);
          p.v = R * Math.sin(p.phi);
          if (Math.abs(p.phi) > 3.0) spawn(p, false);
        }
        if (p.flash > 0) p.flash -= dt * 1.6;
      });
    };
    let prevT = t;
    for (let i = 0; i < 900; i++) step(1 / 60);

    const makeRain = (w, h) => {
      const count = Math.ceil(w / 22);
      cols = Array.from({ length: count }, (_, i) => ({
        x: i * 22 + 11,
        y0: rand() * h * 2,
        v: 40 + rand() * 80,
        len: 5 + Math.floor(rand() * 7),
      }));
    };

    const disc = (x, y, r, col, sx, sy, on) => {
      const halo = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 2.8);
      halo.addColorStop(0, rgb(col, on ? 0.4 : 0.2));
      halo.addColorStop(1, rgb(col, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(x, y, r * 2.8, 0, TAU);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.fillStyle = rgb(col);
      ctx.fill();

      const d = Math.hypot(sx, sy) || 1;
      const hx = x - (sx / d) * r * 0.45;
      const hy = y - (sy / d) * r * 0.45;
      const g = ctx.createRadialGradient(hx, hy, 0, x, y, r);
      g.addColorStop(0, "rgba(255,255,255,0.35)");
      g.addColorStop(0.55, "rgba(255,255,255,0)");
      g.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = g;
      ctx.fill();

      /* CRT scanlines across the sphere */
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.clip();
      ctx.fillStyle = "rgba(4,7,10,0.38)";
      for (let yy = Math.floor(y - r); yy < y + r; yy += 2) ctx.fillRect(x - r, yy, r * 2, 1);
      ctx.restore();

      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.strokeStyle = rgb(col, 0.9);
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const draw = (time) => {
      const { w, h } = size;
      if (!w) return;
      ctx.clearRect(0, 0, w, h);

      const k = Math.min(1.4, Math.max(0.7, Math.min(w, h) / 700));
      /* wide screens look at the system at a low angle, square ones almost top-down */
      const c = Math.min(0.95, Math.max(0.42, (0.95 * h) / w));
      const s = Math.sqrt(1 - c * c);
      const cx = w / 2;
      const cy = h / 2;
      const FIT = w < 700 ? 4.4 : 5.4;
      const S = Math.min((w / 2 - 24) / FIT, (h / 2 - 14) / (FIT * c));
      const yaw = 0.3 * Math.sin(time * 0.05);
      const act = activeRef.current;
      let activeDist = null;
      const dt = Math.min(Math.max(time - prevT, 0), 0.1);
      prevT = time;
      step(dt);

      /* plane coordinates (display units) -> screen, swaying with the camera */
      const cyw = Math.cos(yaw);
      const syw = Math.sin(yaw);
      const O = [0, 0];
      const scr = (u, v, z) => {
        const X = u * cyw - v * syw;
        const Y = u * syw + v * cyw;
        O[0] = cx + X * S;
        O[1] = cy + (Y * c - z * s) * S;
      };
      const bp = (N, phi) => {
        const R = N * shape(phi);
        scr(R * Math.cos(phi), R * Math.sin(phi), 0);
      };
      const trace = (N, from, to, steps) => {
        for (let j = 0; j <= steps; j++) {
          const phi = from + ((to - from) * j) / steps;
          bp(N, phi);
          if (j === 0) ctx.moveTo(O[0], O[1]);
          else ctx.lineTo(O[0], O[1]);
        }
      };
      const helioOn = act === "helio";

      /* black hole crossing the background, plus a point-lens that bends everything behind it */
      const bhR = Math.min(w, h) * 0.17;
      const bhE = bhR * 1.35;
      const bhU = (time % 170) / 170;
      const bhX = w * (1.15 - 1.3 * bhU);
      const bhY = h * (0.12 + 0.76 * bhU);
      const bhOn = act === "blackhole";
      const lensOut = [0, 0];
      const lens = (x, y) => {
        const dx = x - bhX;
        const dy = y - bhY;
        const r = Math.hypot(dx, dy) || 1;
        const k2 = (r + Math.sqrt(r * r + 4 * bhE * bhE)) / (2 * r);
        lensOut[0] = bhX + dx * k2;
        lensOut[1] = bhY + dy * k2;
      };

      /* stars */
      ctx.fillStyle = "rgb(242,248,255)";
      stars.forEach((st) => {
        lens(st.x * w, st.y * h);
        ctx.globalAlpha = 0.12 + 0.25 * (0.5 + 0.5 * Math.sin(time * 1.2 + st.p));
        ctx.fillRect(lensOut[0], lensOut[1], st.r, st.r);
      });
      ctx.globalAlpha = 1;

      /* matrix rain */
      if (rainRef.current) {
        ctx.font = `14px ${MONO}`;
        ctx.textAlign = "center";
        cols.forEach((col, ci) => {
          const head = (col.y0 + time * col.v) % (h + col.len * 16);
          for (let j = 0; j < col.len; j++) {
            const y = head - j * 16;
            if (y < -16 || y > h + 16) continue;
            const row = Math.abs(Math.floor(y / 16));
            const ch = GLYPHS[(ci * 31 + row * 17) % GLYPHS.length];
            if (j === 0) {
              ctx.globalAlpha = 0.34;
              ctx.fillStyle = "rgb(184,255,225)";
            } else {
              ctx.globalAlpha = 0.17 * (1 - j / col.len);
              ctx.fillStyle = "rgb(0,255,157)";
            }
            lens(col.x, y);
            ctx.fillText(ch, lensOut[0], lensOut[1]);
          }
        });
        ctx.globalAlpha = 1;
      }

      /* black hole: jets, lensed back of the disk, shadow, photon ring, front of the disk */
      if (bhX > -7 * bhR && bhX < w + 7 * bhR) {
        const tilt = -0.32;
        const ct = Math.cos(tilt);
        const st2 = Math.sin(tilt);
        const KD = 0.2;

        [1, -1].forEach((sg) => {
          const x0 = bhX - st2 * bhR * sg * 0.9;
          const y0 = bhY + ct * bhR * sg * 0.9;
          const x1 = bhX - st2 * bhR * sg * 7;
          const y1 = bhY + ct * bhR * sg * 7;
          const g = ctx.createLinearGradient(x0, y0, x1, y1);
          g.addColorStop(0, "rgba(0,224,255,0.45)");
          g.addColorStop(1, "rgba(0,224,255,0)");
          ctx.strokeStyle = g;
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        });

        ctx.font = `9px ${MONO}`;
        ctx.textAlign = "center";
        const plot = (x, y, d, a) => {
          ctx.fillStyle = `rgba(${d.col[0]},${d.col[1]},${d.col[2]},${a.toFixed(2)})`;
          if (d.glyph) ctx.fillText(d.glyph, x, y);
          else ctx.fillRect(x - d.size / 2, y - d.size / 2, d.size, d.size);
        };

        /* pass 1: advance every particle, draw the half behind the hole through the lens */
        disk.forEach((d) => {
          d.phi += d.w * dt;
          const sp = Math.sin(d.phi);
          const cp = Math.cos(d.phi);
          const ox = d.rho * bhR * cp;
          const oy = d.rho * bhR * sp * KD;
          d.fx = ox * ct - oy * st2;
          d.fy = ox * st2 + oy * ct;
          d.front = sp > 0;
          d.b = 0.55 + 0.45 * cp;
          if (d.front) return;
          const b = Math.hypot(d.fx, d.fy) || 1;
          const root = Math.sqrt(b * b + 4 * bhE * bhE);
          const kp = (b + root) / (2 * b);
          const ks = (b - root) / (2 * b);
          plot(bhX + d.fx * kp, bhY + d.fy * kp, d, 0.35 + 0.55 * d.b);
          if (Math.abs(ks) * b > bhR * 1.01) plot(bhX + d.fx * ks, bhY + d.fy * ks, d, 0.2 * d.b);
        });

        /* the shadow, and the thin photon ring hugging it */
        ctx.beginPath();
        ctx.arc(bhX, bhY, bhR, 0, TAU);
        ctx.fillStyle = "#000";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(bhX, bhY, bhR * 1.04, 0, TAU);
        ctx.strokeStyle = "rgba(184,255,225,0.18)";
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.strokeStyle = "rgba(234,255,246,0.95)";
        ctx.lineWidth = 2;
        ctx.stroke();

        /* pass 2: the near side of the disk crosses in front, unlensed */
        disk.forEach((d) => {
          if (d.front) plot(bhX + d.fx, bhY + d.fy, d, 0.35 + 0.55 * d.b);
        });

        if (bhOn) {
          ctx.save();
          ctx.setLineDash([3, 5]);
          ctx.lineDashOffset = -time * 8;
          ctx.beginPath();
          ctx.arc(bhX, bhY, bhR * 4.6, 0, TAU);
          ctx.strokeStyle = "#00ff9d";
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        }
      }

      /* heliosphere: the sun's magnetic bubble */
      ctx.lineJoin = "round";
      ctx.beginPath();
      trace(HP0, -Math.PI, Math.PI, 180);
      ctx.closePath();
      ctx.fillStyle = `rgba(0,255,157,${helioOn ? 0.07 : 0.035})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(0,255,157,${helioOn ? 0.18 : 0.08})`;
      ctx.lineWidth = 10;
      ctx.stroke();
      ctx.strokeStyle = `rgba(0,255,157,${helioOn ? 0.95 : 0.55})`;
      ctx.lineWidth = helioOn ? 2 : 1.4;
      ctx.stroke();

      /* termination shock, where the solar wind slows down */
      ctx.beginPath();
      trace(TS0, -Math.PI, Math.PI, 180);
      ctx.closePath();
      ctx.setLineDash([3, 6]);
      ctx.strokeStyle = `rgba(0,224,255,${helioOn ? 0.85 : 0.4})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      /* heliosheath: field and plasma sweeping back toward the tail */
      [4.55, 4.65, 4.74].forEach((N, li) => {
        ctx.setLineDash([10, 16]);
        ctx.lineDashOffset = -(time * (26 + li * 8));
        ctx.strokeStyle = `rgba(0,255,157,${helioOn ? 0.5 : 0.22})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        trace(N, 0, Math.PI, 90);
        ctx.stroke();
        ctx.beginPath();
        trace(N, 0, -Math.PI, 90);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.lineDashOffset = 0;

      /* magnetic field lines: a spiral, because the sun rotates while the wind flows out.
         alternating polarity (green out, cyan in), stylized winding */
      const ARM = ["rgba(0,255,157,", "rgba(0,224,255,"];
      for (let i = 0; i < ARMS; i++) {
        const base = (i * TAU) / ARMS + time * 0.35;
        const alpha = helioOn ? 0.75 : 0.36;
        let rmax = 0.2;
        ctx.beginPath();
        for (let r = 0.2; r < 5; r += 0.05) {
          const phi = base - SPIRAL_K * r;
          if (r >= TS0 * shape(phi)) break;
          scr(r * Math.cos(phi), r * Math.sin(phi), 0.08 * r * Math.sin(phi * 2 + time * 0.6));
          if (r === 0.2) ctx.moveTo(O[0], O[1]);
          else ctx.lineTo(O[0], O[1]);
          rmax = r;
        }
        ctx.strokeStyle = `${ARM[i % 2]}${alpha})`;
        ctx.lineWidth = helioOn ? 1.6 : 1.2;
        ctx.stroke();

        /* plasma riding the field lines outward */
        ctx.fillStyle = `${ARM[i % 2]}0.95)`;
        for (let j = 0; j < 5; j++) {
          const f = (time * 0.18 + j / 5 + i * 0.11) % 1;
          const r = 0.2 + f * (rmax - 0.2);
          const phi = base - SPIRAL_K * r;
          scr(r * Math.cos(phi), r * Math.sin(phi), 0.08 * r * Math.sin(phi * 2 + time * 0.6));
          ctx.fillRect(O[0] - 1.1, O[1] - 1.1, 2.2, 2.2);
        }
      }

      /* cosmic rays hitting the shield */
      ctx.lineCap = "round";
      rays.forEach((p) => {
        let tu;
        let tv;
        if (p.mode === 0) {
          tu = p.u - p.vx * 0.14;
          tv = p.v - p.vy * 0.14;
        } else {
          const R = HP0 * shape(p.phi) * 1.012;
          const pp = p.phi - p.dir * (0.28 / R);
          tu = R * Math.cos(pp);
          tv = R * Math.sin(pp);
        }
        scr(tu, tv, 0);
        const x0 = O[0];
        const y0 = O[1];
        scr(p.u, p.v, 0);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(O[0], O[1]);
        ctx.strokeStyle = p.hi ? "rgba(255,46,110,0.85)" : "rgba(184,255,225,0.7)";
        ctx.lineWidth = 1.4;
        ctx.stroke();
        if (p.flash > 0) {
          scr(p.fu, p.fv, 0);
          ctx.beginPath();
          ctx.arc(O[0], O[1], (1 - p.flash) * 16 + 2, 0, TAU);
          ctx.strokeStyle = `rgba(0,255,157,${(p.flash * 0.8).toFixed(2)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });

      /* orbit lines: the true ellipses, sampled */
      BODIES.forEach((el) => {
        const on = el.id === act;
        const n = el.e > 0.5 ? 240 : 128;
        ctx.beginPath();
        for (let j = 0; j <= n; j++) {
          orbitPoint(el, (j / n) * TAU, yaw, P);
          const x = cx + P[0] * S;
          const y = cy + (P[1] * c - P[2] * s) * S;
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        if (el.comet) ctx.setLineDash([6, 7]);
        ctx.strokeStyle = on ? "rgba(0,255,157,0.9)" : el.comet ? "rgba(255,46,110,0.3)" : "rgba(0,255,157,0.2)";
        ctx.lineWidth = on ? 1.6 : 1;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      /* asteroid belt, drawn as falling code */
      ctx.font = `10px ${MONO}`;
      ctx.textAlign = "center";
      ctx.fillStyle = "rgb(0,255,157)";
      ctx.globalAlpha = 0.5;
      belt.forEach((a) => {
        orbitPoint(a, kepler(a.m0 + a.n * time, a.e), yaw, P);
        ctx.fillText(a.ch, cx + P[0] * S, cy + (P[1] * c - P[2] * s) * S);
      });
      ctx.globalAlpha = 1;

      /* collect bodies */
      const items = [{ kind: "sun", x: cx, y: cy, d: 0 }];
      BODIES.forEach((el) => {
        const M = el.m0 + el.n * time;
        orbitPoint(el, kepler(M, el.e), yaw, P);
        const x = cx + P[0] * S;
        const y = cy + (P[1] * c - P[2] * s) * S;
        const on = el.id === act;
        if (on) activeDist = P[3];
        items.push({ kind: "body", el, x, y, d: P[1] * s + P[2] * c, r: el.size * k, on, dist: P[3] });

        /* fading trail along the real path */
        if (!el.comet) {
          let px = x;
          let py = y;
          const N = 14;
          ctx.lineWidth = on ? 2.6 : 2;
          ctx.lineCap = "round";
          for (let j = 1; j <= N; j++) {
            orbitPoint(el, kepler(M - el.n * 0.16 * j, el.e), yaw, Q);
            const qx = cx + Q[0] * S;
            const qy = cy + (Q[1] * c - Q[2] * s) * S;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(qx, qy);
            ctx.strokeStyle = rgb(el.color, (1 - j / N) * (on ? 0.9 : 0.55));
            ctx.stroke();
            px = qx;
            py = qy;
          }
        }
      });

      items.sort((a, b) => a.d - b.d);
      const pos = [];
      const sunR = 14 * k;

      items.forEach((it) => {
        if (it.kind === "sun") {
          const glowR = sunR * 4.2 * (1 + 0.05 * Math.sin(time * 1.5));
          const glow = ctx.createRadialGradient(cx, cy, sunR * 0.5, cx, cy, glowR);
          glow.addColorStop(0, "rgba(0,255,157,0.55)");
          glow.addColorStop(0.4, "rgba(0,255,157,0.14)");
          glow.addColorStop(1, "rgba(0,255,157,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(cx, cy, glowR, 0, TAU);
          ctx.fill();

          const core = ctx.createRadialGradient(cx - sunR * 0.25, cy - sunR * 0.25, 0, cx, cy, sunR);
          core.addColorStop(0, "#ffffff");
          core.addColorStop(0.5, "#b8ffe1");
          core.addColorStop(1, "#00ff9d");
          ctx.fillStyle = core;
          ctx.beginPath();
          ctx.arc(cx, cy, sunR, 0, TAU);
          ctx.fill();

          ctx.save();
          ctx.setLineDash([4, 7]);
          ctx.lineDashOffset = -time * 8;
          ctx.beginPath();
          ctx.ellipse(cx, cy, sunR * 2, sunR * 2 * c, 0, 0, TAU);
          ctx.strokeStyle = "rgba(0,255,157,0.65)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
          return;
        }

        const { el, x, y, r, on, dist } = it;
        const sx = cx - x;
        const sy = cy - y;
        pos.push({ id: el.id, x, y, r });

        if (el.comet) {
          /* tails point away from the sun and shrink with distance */
          const dx = x - cx;
          const dy = y - cy;
          const dl = Math.hypot(dx, dy) || 1;
          const ux = dx / dl;
          const uy = dy / dl;
          const tl = Math.min(170 * k, Math.max(18, (190 * k) / Math.sqrt(dist)));
          const g1 = ctx.createLinearGradient(x, y, x + ux * tl, y + uy * tl);
          g1.addColorStop(0, "rgba(255,46,110,0.85)");
          g1.addColorStop(1, "rgba(255,46,110,0)");
          ctx.strokeStyle = g1;
          ctx.lineWidth = 2.5;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + ux * tl, y + uy * tl);
          ctx.stroke();
          const ca = Math.cos(0.2);
          const sa = Math.sin(0.2);
          const vx = ux * ca - uy * sa;
          const vy = ux * sa + uy * ca;
          const g2 = ctx.createLinearGradient(x, y, x + vx * tl * 0.7, y + vy * tl * 0.7);
          g2.addColorStop(0, "rgba(0,224,255,0.45)");
          g2.addColorStop(1, "rgba(0,224,255,0)");
          ctx.strokeStyle = g2;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + vx * tl * 0.7, y + vy * tl * 0.7);
          ctx.stroke();

          const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
          halo.addColorStop(0, "rgba(255,46,110,0.5)");
          halo.addColorStop(1, "rgba(255,46,110,0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(x, y, r * 4, 0, TAU);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(x, y, r, 0, TAU);
          ctx.fill();
        } else {
          const ringRx = r * 2.1;
          const ringRy = ringRx * Math.max(0.26, c * 0.8);
          if (el.ring) {
            ctx.beginPath();
            ctx.ellipse(x, y, ringRx, ringRy, -0.25, Math.PI, TAU);
            ctx.strokeStyle = "rgba(200,255,230,0.5)";
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          disc(x, y, r, el.color, sx, sy, on);
          if (el.ring) {
            ctx.beginPath();
            ctx.ellipse(x, y, ringRx, ringRy, -0.25, 0, Math.PI);
            ctx.strokeStyle = "rgba(200,255,230,0.85)";
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          if (el.moon) {
            const ma = (time * TAU) / 3.2;
            const mr = r + 12 * k;
            ctx.beginPath();
            ctx.ellipse(x, y, mr, mr * c, 0, 0, TAU);
            ctx.strokeStyle = "rgba(184,205,226,0.16)";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x + Math.cos(ma) * mr, y + Math.sin(ma) * mr * c, 2 * k, 0, TAU);
            ctx.fillStyle = "rgba(225,235,245,0.95)";
            ctx.fill();
          }
        }

        if (on) {
          ctx.save();
          ctx.setLineDash([3, 4]);
          ctx.lineDashOffset = -time * 6;
          ctx.beginPath();
          ctx.arc(x, y, r + (el.ring ? 20 * k : el.comet ? 12 * k : 9 * k), 0, TAU);
          ctx.strokeStyle = "#00ff9d";
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }
      });

      /* labels */
      ctx.font = `11px ${MONO}`;
      ctx.textAlign = "left";
      ctx.lineJoin = "round";
      const label = (txt, x, y, on) => {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgba(4,7,10,0.85)";
        ctx.strokeText(txt, x, y);
        ctx.fillStyle = on ? "#00ff9d" : "rgba(184,205,226,0.62)";
        ctx.fillText(txt, x, y);
      };
      label("SOL", cx + sunR + 8, cy + 4, false);
      items.forEach((it) => {
        if (it.kind === "body") label(it.el.name.toUpperCase(), it.x + it.r + 8, it.y + 4, it.on);
      });

      if (bhX > -2 * bhR && bhX < w + 2 * bhR) {
        pos.push({ id: "blackhole", x: bhX, y: bhY, r: bhR * 1.3 });
        if (w > 700) label("BLACK HOLE", bhX + bhR * 1.5, bhY - bhR * 1.4, bhOn);
      }

      if (w > 700) {
        bp(HP0, -0.95);
        label("HELIOPAUSE 120 AU", O[0] + 8, O[1] - 6, helioOn);
        bp(TS0, 0.95);
        label("TERMINATION SHOCK 90 AU", O[0] + 8, O[1] + 14, helioOn);
      }

      posRef.current = pos;

      /* live distance from the sun for the selected body */
      if (distRef.current && activeDist != null) {
        const txt = `${activeDist.toFixed(2)} AU`;
        if (distRef.current.textContent !== txt) distRef.current.textContent = txt;
      }
    };

    redrawRef.current = () => draw(t);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size = { w: r.width, h: r.height };
      makeRain(r.width, r.height);
      draw(t);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      last = performance.now();
    });
    io.observe(wrap);

    if (!reduce) {
      const loop = (now) => {
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        if (visible) {
          t += dt;
          draw(t);
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const onPointer = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let best = null;
    let bestD = Infinity;
    posRef.current.forEach((p) => {
      const d = Math.hypot(p.x - mx, p.y - my);
      if (d < Math.max(p.r + 12, 18) && d < bestD) {
        best = p.id;
        bestD = d;
      }
    });
    setHover(best);
  };

  return (
    <div className="sp">
      <div className="sp-stage" ref={wrapRef}>
        <span className="sp-corner tl" aria-hidden="true" />
        <span className="sp-corner tr" aria-hidden="true" />
        <span className="sp-corner bl" aria-hidden="true" />
        <span className="sp-corner br" aria-hidden="true" />
        <canvas
          ref={canvasRef}
          className="sp-canvas"
          role="img"
          aria-label="Animated model of the solar system: eight planets and Halley's comet on elliptical orbits, inside the sun's magnetic bubble that deflects cosmic rays, with a giant black hole drifting past in the background"
          onPointerMove={onPointer}
          onPointerDown={onPointer}
          onPointerLeave={() => setHover(null)}
        />

        <div className="sp-readout" key={activeId}>
          {active.id === "blackhole" ? (
            <>
              <span className="hd">thought experiment</span>
              <div>
                <em>$</em> scan <b>black hole</b>
              </div>
              <div className="role">bends light around it</div>
              <div className="rel">
                mass <b>~4 million suns</b>
              </div>
              <div className="rel">
                shadow <b>2.6x its horizon</b>
              </div>
              <div className="rel">
                flyby <b>illustrative</b>
              </div>
            </>
          ) : active.special ? (
            <>
              <span className="hd">shield</span>
              <div>
                <em>$</em> scan <b>heliosphere</b>
              </div>
              <div className="role">deflects cosmic rays</div>
              <div className="rel">
                solar wind <b>~400 km/s</b>
              </div>
              <div className="rel">
                termination shock <b>90 AU</b>
              </div>
              <div className="rel">
                heliopause <b>120 AU</b>
              </div>
            </>
          ) : (
            <>
              <span className="hd">{active.comet ? "comet" : `planet ${idx + 1} of 8`}</span>
              <div>
                <em>$</em> scan <b>{active.name.toLowerCase()}</b>
              </div>
              <div className="role">
                {active.comet
                  ? `retrograde, tilted ${active.inc.toFixed(0)}°`
                  : `${ORDINAL[idx]} from the sun`}
              </div>
              <div className="rel">
                distance now <b ref={distRef}>-</b>
              </div>
              <div className="rel">
                eccentricity <b>{active.e.toFixed(3)}</b> tilt <b>{active.inc.toFixed(1)}°</b>
              </div>
              <div className="rel">
                one lap <b>{active.year}</b>
              </div>
            </>
          )}
        </div>
      </div>

      <ul className="sp-legend">
        {ALL.map((b) => (
          <li key={b.id}>
            <button
              type="button"
              className={`sp-chip cursor-none${b.id === activeId ? " is-active" : ""}`}
              onMouseEnter={() => setHover(b.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(b.id)}
              onBlur={() => setHover(null)}
            >
              <i style={{ background: rgb(b.color) }} aria-hidden="true" />
              {b.name.toLowerCase()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}