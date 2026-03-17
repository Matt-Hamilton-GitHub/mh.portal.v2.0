
import { ME } from "../utils/data"
import { Reveal, SectionLabel } from "../utils/utils"
const AboutSection = () => {
  return (
    <section id="about" className="relative flex  justify-center w-full py-36 px-12" style={{ zIndex: 1 }}>
            <div className="max-w-5xl mx-auto gap-16" >
              {/* <Reveal>
                <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "#0d1e2e", letterSpacing: "0.3em", userSelect: "none", paddingTop: "0.5rem" }}>
                  ABOUT — 01
                </div>
              </Reveal> */}
              <div>
                <Reveal>
                  <SectionLabel num="01" label="ABOUT" />
                  <h2 className="mb-10" style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(2.5rem,5vw,5.5rem)", fontWeight: 700, lineHeight: .95, letterSpacing: "-0.04em", color: "#e8f0f8" }}>
                    The engineer<br /><span style={{ color: "#00ff9d" }}>behind the</span><br />commit history.
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="leading-loose font-light max-w-2xl text-[.9rem] sm:text-[1.05rem]" style={{ color: "#7a9ab8" }}>{ME.about}</p>
                </Reveal>
                <Reveal delay={0.22}>
                  <div className="flex flex-wrap gap-14 mt-12 max-w-2xl justify-start items-center ">
                    {[["San Francisco","Location"],["Full Stack","Specialty"],["Open Source & Ownership","Mindset"]].map(([v,l]) => (
                      <div key={l} className="">
                        <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "1.25rem", fontWeight: 600, color: "#e8f0f8" }}>{v}</div>
                        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "var(--second-grey)", letterSpacing: "0.2em", marginTop: "0.3rem" }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
  )
}

export default AboutSection