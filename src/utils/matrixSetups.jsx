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
        ctx.fillStyle = i % 7 === 0 ? "#00ff9d40" : "#00ff9d14";
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

export function CustomCursor () {
   const [cursor, setCursor] = useState({ x: -100, y: -100 });


  useEffect(() => {
    const mv = e => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, []);
  return (
    <>
      <div
        className="fixed rounded-full pointer-events-none"
        style={{
          left: cursor.x - 5,
          top: cursor.y - 5,
          width: 10,
          height: 10,
          background: "#00ff9d",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
      <div
        className="fixed rounded-full pointer-events-none border"
        style={{
          left: cursor.x - 18,
          top: cursor.y - 18,
          width: 36,
          height: 36,
          borderColor: "rgba(0,255,157,.2)",
          zIndex: 9998,
          transition: "left .12s, top .12s",
        }}
      />
    </>
  );
};
