import { useState } from "react"
import { Reveal, SectionLabel } from "../utils/utils"
import { EXPERIENCE } from "../utils/data"

const ExperienceSection = () => {
  const [hovExp, setHovExp] = useState(null);
  return (
    <section id="experience" className="relative py-32 px-12" style={{ zIndex: 1 }}>
            <div className="max-w-5xl mx-auto">
              <Reveal>
                <SectionLabel num="03" label="EXPERIENCE" />
                <h2 className="mb-20" style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(2.5rem,5vw,5rem)", fontWeight: 700, color: "#e8f0f8", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  Where I've<br />shipped.
                </h2>
              </Reveal>
              {EXPERIENCE.map((e, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div
                    className="exp-row grid gap-12 py-14 transition-opacity duration-300"
                    onMouseEnter={() => setHovExp(i)} onMouseLeave={() => setHovExp(null)}
                    style={{ gridTemplateColumns: "220px 1fr 80px", borderBottom: "1px solid #0d1e2e", alignItems: "start", opacity: hovExp !== null && hovExp !== i ? 0.25 : 1 }}
                  >
                    <div>
                      <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "1.35rem", fontWeight: 700, color: "#e8f0f8" }}>{e.company}</div>
                      <div className="mt-2" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.68rem", color: "var(--second-grey)", letterSpacing: "0.1em" }}>{e.period}</div>
                      <div>
                        {e.highlight?.map((h)=>{
                          return (
                      <div className="inline-flex mt-3 px-3 py-1" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.8rem", color: "var(--main-matrix-green)", background: "rgba(0,255,157,.06)", border: "1px solid rgba(0,255,157,.15)", borderRadius: "2px" }}>
                        {h}
                      </div>)
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="mb-3 italic font-bold text-[white]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.2rem"}}>{e.role}</div>
                      <p className="leading-loose font-light" style={{ color: "var(--second-grey)", fontSize: "1.1rem" }}>{e.desc}</p>
                    </div>
                    <div className="exp-number text-right select-none transition-colors duration-300"
                      style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "4.5rem", fontWeight: 700, color: "#0f1e2e", lineHeight: 1,  textShadow: ' 1px 1px 2px black, 0 0 1px white, 0 0 20px var(--main-matrix-green)' }}>
                      0{i + 1}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
  )
}

export default ExperienceSection