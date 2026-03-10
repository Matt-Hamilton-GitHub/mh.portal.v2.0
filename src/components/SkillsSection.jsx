import { Reveal, SectionLabel } from "../utils/utils"
import { SKILLS } from "../utils/data"

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-32 px-12 z-1" style={{ background: "linear-gradient(to bottom, transparent, rgba(6,13,20,.8) 40%, transparent)" }}>
            <div className="max-w-5xl mx-auto">
              <Reveal>
                <SectionLabel num="02" label="SKILLS" />
                <h2 className="mb-16" style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(2.5rem,5vw,5rem)", fontWeight: 700, color: "#e8f0f8", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  My toolkit.
                </h2>
              </Reveal>
              <div className="grid grid-cols-4" style={{ borderLeft: "1px solid #0d1e2e" }}>
                {SKILLS.map((cat, i) => (
                  <Reveal key={cat.category} delay={i * 0.09}>
                    <div className="px-8 py-10" style={{ borderRight: "1px solid #0d1e2e", minHeight: 280 }}>
                      <div className="flex items-center gap-3 mb-8">
                        <span style={{ fontSize: "1rem", color: "var(--main-matrix-green" }}>{cat.icon}</span>
                        <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "var(--second-grey" }}>{cat.category}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {cat.items.map(skill => (
                          <span key={skill} className="skill-pill transition-all duration-200 inline-block w-fit"
                            style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.73rem", padding: "0.4rem 0.8rem", background: "transparent", border: "1px solid #1a2e42", color: "var(--second-grey)", borderRadius: "2px", letterSpacing: "0.04em" }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
  )
}

export default SkillsSection