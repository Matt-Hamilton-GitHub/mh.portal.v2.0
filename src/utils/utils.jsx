 import { useState, useEffect, useRef } from "react";
 export const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

 /* ─── REVEAL ON SCROLL ───────────────────────────────────── */
 export function Reveal({ children, delay = 0, className = "" }) {
   const ref = useRef(null);
   const [vis, setVis] = useState(false);
   useEffect(() => {
     const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
     if (ref.current) obs.observe(ref.current);
     return () => obs.disconnect();
   }, []);
   return (
     <div
       ref={ref}
       className={className}
       style={{
         opacity: vis ? 1 : 0,
         transform: vis ? "translateY(0)" : "translateY(36px)",
         transition: `opacity 0.9s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.9s cubic-bezier(.4,0,.2,1) ${delay}s`,
       }}
     >
       {children}
     </div>
   );
 }


 /* ─── SECTION LABEL ──────────────────────────────────────── */
export function SectionLabel({ num, label }) {
  return (
    <p className="mb-4 tracking-widest" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.68rem", color: "#00f09d60" }}>
      // {num} — {label}
    </p>
  );
}