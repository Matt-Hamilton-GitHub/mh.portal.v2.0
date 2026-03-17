
import {scrollTo} from "../utils/utils"
import { MatrixName} from "../utils/matrixSetups";
import { ME } from "../utils/data";

export default function HeroSection() {

  return (
      <section id="home" className="home-p min-h-screen grid relative w-full z-1" >
        {/* Left */}
        <div className="w-full flex flex-col justify-center items-center px-12 pt-36 pb-16">
        
          <div className="hero-1 flex items-center gap-3 mb-10">
            <div className="rounded-full pulse-dot bg-(--main-matrix-green)" style={{ width: 7, height: 7 }} />
            <span className="text-(--main-matrix-green) tracking-[0.3em] text-[0.72rem] "style={{ fontFamily: "'Share Tech Mono', monospace",  }}>AVAILABLE FOR WORK · 2026</span>
          </div>

          <div className="hero-2 mb-8">
            <MatrixName name={ME.name} />
            <h1 className="flex flex-col gap-2"style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(4rem,7vw,7.5rem)", fontWeight: 700, lineHeight: .92, letterSpacing: "-0.01em" }}>
              <span className="block" style={{ color: "#e8f0f8" }}>{ME.tagline[0]}</span>
              <span className="block" style={{ color: "#a0b8d0" }}>{ME.tagline[1]}</span>
              <span className="block" style={{ color: "#00ff9d" }}>{ME.tagline[2]}</span>
            </h1>
          </div>

          <p className="hero-3 leading-relaxed font-light max-w-sm lg:max-w-md" style={{ color: "#7a9ab8", fontSize: "1rem" }}>
            {ME.manifesto}
          </p>

          <div className="hero-4 flex gap-4 mt-10">
            <button className="cta-btn cursor-none transition-all duration-300 border px-8 py-3" onClick={() => scrollTo("projects")}
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em",borderColor: "rgba(0,255,157,.3)", background: "transparent", color: "#4a6a8a", borderRadius: "2px" }}>
              SEE MY WORK
            </button>
            <button className="cta-btn cursor-none transition-all duration-300 border px-8 py-3" onClick={() => scrollTo("contact")}
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em", borderColor: "rgba(0,255,157,.3)", background: "transparent", color: "#00ff9d", borderRadius: "2px" }}>
              GET IN TOUCH ↗
            </button>
          </div>

        </div>

        {/* Right — orbital */}
        {/* <div className="relative flex items-center justify-center">
          <div className="absolute rounded-full orbital border" style={{ width: 360, height: 360, borderColor: "rgba(0,255,157,.07)" }}>
            <div className="absolute rounded-full" style={{ top: -5, left: "50%", width: 10, height: 10, background: "#00ff9d", transform: "translateX(-50%)", boxShadow: "0 0 16px #00ff9d" }} />
          </div>
          <div className="absolute rounded-full orbital-inner" style={{ width: 260, height: 260, border: "1px dashed rgba(255,255,255,.04)" }}>
            <div className="absolute rounded-full" style={{ bottom: -4, left: "50%", width: 8, height: 8, background: "rgba(0,224,255,.5)", transform: "translateX(-50%)" }} />
          </div>
          <div className="absolute rounded-full" style={{ width: 180, height: 180, border: "1px solid rgba(255,255,255,.02)" }} />

          <div className="relative floaty text-center" style={{ zIndex: 2 }}>
            <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(5rem,10vw,8rem)", fontWeight: 700, color: "transparent", WebkitTextStroke: "1px rgba(0,255,157,.15)", letterSpacing: "-0.06em", lineHeight: 1 }}>MH</div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "rgba(0,255,157,.35)", letterSpacing: "0.35em", marginTop: "0.5rem" }}>SOFTWARE ENGINEER</div>
          </div>

          {[{ v: "6+", l: "years of craft", pos: "top-1/4 left-0" },{ v: "50M+", l: "events/day", pos: "bottom-1/4 right-0" },{ v: "15k+", l: "OSS downloads", pos: "bottom-20 left-8" }].map(({ v, l, pos }) => (
            <div key={v} className={`absolute ${pos}`}>
              <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "1.6rem", fontWeight: 700, color: "#e8f0f8" }}>{v}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "#3a5570", letterSpacing: "0.15em" }}>{l}</div>
            </div>
          ))}
        </div> */}
        
      </section>
      
  );
}