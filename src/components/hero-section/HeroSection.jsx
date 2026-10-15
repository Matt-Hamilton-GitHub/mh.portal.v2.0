import { useEffect, useRef, useState } from "react";
import { scrollTo } from "../../utils/utils";
import { MatrixName } from "../../utils/matrixSetups";
import { ME } from "../../utils/data";

import "./herosection.style.css";
import HeroEcosystem from "./HeroEcosystem";




/* Transparent matrix code rain, sits behind the right side */
function CodeRain() {
  const ref = useRef(null);

  return <canvas ref={ref} className="hx-rain" aria-hidden="true" />;
}

/* Live uptime / clock for the status bar */
function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString("en-GB");
}

const STATS = [
  { v: "6+", l: "YEARS OF CRAFT" },
  { v: "50M+", l: "EVENTS / DAY" },
  { v: "15k+", l: "OSS DOWNLOADS" },
];

export default function HeroSection() {
  const tagline = ME.tagline;
  const toneClass = ["hx-t1", "hx-t2", "hx-t3"];

  return (
    <section id="home" className="hx home-p w-full">
      {/* background layers */}
      <div className="hx-grid" aria-hidden="true" />
      <CodeRain />
      <div className="hx-scanbar" aria-hidden="true" />
      <div className="hx-scanlines" aria-hidden="true" />

    

      <div className="hx-wrap">
        {/* ---------- LEFT ---------- */}
        <div className="hx-left">
          <div className="hero-1"></div>

          <div className="hero-2" style={{ display: "grid", gap: "1.5rem" }}>
            <MatrixName name={ME.name} />
            <h1 className="hx-title">
              {tagline.slice(0, 3).map((line, i) => (
                <span
                  key={i}
                  className={`glitch ${toneClass[i]}`}
                  data-text={line}
                  style={{
                    "--g-dur": `${4.5 + i * 1.3}s`,
                    "--g-del": `${i * 0.7}s`,
                  }}
                >
                  {line}
                </span>
              ))}
            </h1>
          </div>

          <p className="hero-3 hx-manifesto">{ME.manifesto}</p>

          <div className="hero-4" style={{ display: "grid", gap: "1.5rem" }}>
            <div className="hx-btns">
              <button
                className="hx-btn primary cursor-pointer"
                onClick={() => scrollTo("projects")}
              >
                SEE MY WORK
              </button>
              <button
                className="hx-btn ghost cursor-pointer"
                onClick={() => scrollTo("contact")}
              >
                GET IN TOUCH ↗
              </button>
            </div>
            <div className="hx-prompt" aria-hidden="true">
              <em>root@mh</em>:~$ ./portfolio --init{" "}
              <span className="hx-caret" />
            </div>
          </div>
        </div>

        {/* ---------- RIGHT ---------- */}
        <div className="hx-right">

        <HeroEcosystem />
        </div>
      </div>
    </section>
  );
}
