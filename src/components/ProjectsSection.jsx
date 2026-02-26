import { Reveal, SectionLabel } from "../utils/utils"
import { PROJECTS } from "../utils/data"

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-32 px-12" style={{ zIndex: 1, background: "linear-gradient(to bottom, transparent, rgba(6,13,20,.8) 40%, transparent)" }}>
            <div className="max-w-5xl mx-auto">
              <Reveal>
                <SectionLabel num="04" label="PROJECTS" />
                <h2 className="mb-16" style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(2.5rem,5vw,5rem)", fontWeight: 700, color: "#e8f0f8", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  Recent things I<br />made real.
                </h2>
              </Reveal>
              <div className="grid grid-cols-2" style={{ gap: "1px", background: "#0d1e2e" }}>
                {PROJECTS.map((p, i) => (
                  <Reveal key={p.name} delay={i * 0.07}>
                    <div className="proj-card transition-transform duration-300 relative overflow-hidden flex flex-col justify-between p-12" style={{ background: "#020608", minHeight: 290 }}>
                      <div className="absolute top-0 left-0" style={{ width: 3, height: 70, background: p.accent, opacity: .45 }} />
                      <div className="absolute top-0 left-0" style={{ height: 3, width: 70, background: p.accent, opacity: .45 }} />
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "1.9rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#e8f0f8" }}>{p.name}</h3>
                          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "#f59e0b" }}>★ {p.stars}</span>
                        </div>
                        <p className="leading-loose font-light mb-6" style={{ color: "#7a9ab8", fontSize: "0.9rem" }}>{p.desc}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {p.tech.map(t => (
                          <span key={t} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.68rem", padding: "0.25rem 0.7rem", border: `1px solid ${p.accent}28`, color: p.accent, borderRadius: "2px", opacity: .85 }}>{t}</span>
                        ))}
                      </div>
                      <div className="absolute bottom-8 right-8" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "#0f1e2e" }}>{p.year}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
  )
}

export default ProjectsSection