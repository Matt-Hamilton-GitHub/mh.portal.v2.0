import { useState, useEffect, useRef } from "react";

/* ─── MATRIX RAIN ────────────────────────────────────────── */
export const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノ01ABCDEF!@#$%^&*";

export function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const id = setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drops.forEach((y, i) => {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const rand = Math.random();
        let color;
        if (rand > 0.97)
          color = "#00ff9dff"; // rare bright head
        else if (rand > 0.85)
          color = "#00ff9d70"; // medium
        else if (rand > 0.6)
          color = "#00ff9d30"; // dim
        else color = "#00ff9d12"; // very faint trail
        ctx.fillStyle = color;
        ctx.font = "14px monospace";
        ctx.fillText(ch, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 60);
    return () => clearInterval(id);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.55 }}
    />
  );
}

/* ─── MATRIX NAME ────────────────────────────────────────── */
export function MatrixName({ name }) {
  const [display, setDisplay] = useState(name);
  const [hovered, setHovered] = useState(false);
  const iRef = useRef(null);
  const fRef = useRef(0);

  const scramble = () => {
    fRef.current = 0;
    clearInterval(iRef.current);
    iRef.current = setInterval(() => {
      fRef.current++;
      setDisplay(
        name
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (fRef.current > i * 3) return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );
      if (fRef.current > name.length * 3) {
        clearInterval(iRef.current);
        setDisplay(name);
      }
    }, 40);
  };

  useEffect(() => () => clearInterval(iRef.current), []);

  return (
    <span
      onMouseEnter={() => {
        setHovered(true);
        scramble();
      }}
      onMouseLeave={() => {
        setHovered(false);
        scramble();
      }}
      className="block mb-2 tracking-widest cursor-none transition-all duration-200"
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "clamp(1rem,1.8vw,1.3rem)",
        color: hovered ? "#00ff9d" : "#e8f0f8",
        textShadow: hovered ? "0 0 20px #00ff9d80, 0 0 40px #00ff9d30" : "none",
      }}
    >
      {display}
    </span>
  );
}



export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const mv = (e) => setPos({ x: e.clientX, y: e.clientY });
    const md = () => setClicking(true);
    const mu = () => setClicking(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mousedown", md);
    window.addEventListener("mouseup", mu);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mousedown", md);
      window.removeEventListener("mouseup", mu);
    };
  }, []);

  const size = clicking ? 14 : 20;
  const thickness = 1.5;

  const barStyle = {
    position: "fixed",
    pointerEvents: "none",
    background: "#00ff9d",
    mixBlendMode: "difference",
    zIndex: 9999,
    transition: "width 0.12s, height 0.12s",
  };

  return (
    <>
      {/* Horizontal bar */}
      <div style={{
        ...barStyle,
        left: pos.x - size / 2,
        top: pos.y - thickness / 2,
        width: size,
        height: thickness,
      }} />
      {/* Vertical bar */}
      <div style={{
        ...barStyle,
        left: pos.x - thickness / 2,
        top: pos.y - size / 2,
        width: thickness,
        height: size,
      }} />
    </>
  );
}