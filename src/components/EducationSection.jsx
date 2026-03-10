import { Reveal,SectionLabel } from "../utils/utils"
import { COURSEWORK } from "../utils/data"
import EducationVisual from "./EducationVisual"

const EducationSection = () => {
  return (
    <section id="education" className="relative py-36 px-12" style={{ zIndex: 1 }}>
            <div className="max-w-5xl mx-auto">
              <Reveal>
                <SectionLabel num="05" label="EDUCATION" />
              </Reveal>
              <div className="grid gap-24 items-center mt-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {/* Visual */}
                <Reveal>
                  <EducationVisual />
                </Reveal>
    
                {/* Text */}
                <div className="pl-4">
                  <Reveal>
                    <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(2rem,4vw,4.5rem)", fontWeight: 700, color: "#e8f0f8", letterSpacing: "-0.04em", lineHeight: .95, marginBottom: "0.8rem" }}>
                      University of<br />California,<br /><span style={{ color: "#FDB515" }}>Berkeley.</span>
                    </h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="italic font-light mb-8" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "var(--main-matrix-green)" }}>B.S. Computer Science & Electrical Engineering</p>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <p className="leading-loose font-light mb-12" style={{ color: "#7a9ab8", fontSize: "0.95rem" }}>
                      Berkeley shaped how I think about systems at a fundamental level. The rigor of the CS program — combined with the relentless energy of the Bay Area startup scene — gave me both the theoretical foundations and the bias for action that define how I work today. Some of the best conversations of my life happened in Soda Hall at midnight.
                    </p>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <div style={{ borderTop: "1px solid #0d1e2e", paddingTop: "2rem" }}>
                      <div className="mb-6" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "var(--second-grey)", letterSpacing: "0.28em" }}>RELEVANT COURSEWORK</div>
                      <div className="grid grid-cols-2 gap-3">
                        {COURSEWORK.map((c, i) => (
                          <div key={i} className="flex items-baseline gap-3">
                            <div className="rounded-full flex-shrink-0" style={{ width: 3, height: 3, background: "#FDB515", marginTop: 2 }} />
                            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", color: "#6a8aaa", letterSpacing: "0.02em", lineHeight: 1.6 }}>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
  )
}

export default EducationSection