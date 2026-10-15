import { useEffect, useRef } from "react";

const CHARS = "アイウエオカキクケコサシスセソタチツテト0123456789{}<>/;=+*".split("");

export default function CodeRain({ className = "", size = 16, interval = 65 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, drops = [], raf = 0, last = 0;

    const draw = (t) => {
      if (!reduce) raf = requestAnimationFrame(draw);
      if (!reduce && t - last < interval) return;
      last = t;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      ctx.font = `${size}px 'Share Tech Mono', monospace`;
      drops.forEach((y, i) => {
        ctx.fillStyle = Math.random() > 0.97 ? "#eafff6" : "rgba(0,255,157,.75)";
        ctx.fillText(CHARS[(Math.random() * CHARS.length) | 0], i * size, y * size);
        if (y * size > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from({ length: Math.floor(w / size) }, () => Math.random() * (h / size));
      if (reduce) for (let i = 0; i < 40; i++) draw(i * 100); // one static frame
    };

    const ro = new ResizeObserver(resize); // also fires when the parent grows
    ro.observe(canvas);
    resize();
    if (!reduce) raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [size, interval]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}