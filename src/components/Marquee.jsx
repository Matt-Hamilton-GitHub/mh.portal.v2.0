import { MARQUEE_WORDS } from "../utils/data"

const Marquee = () => {
  return (
    <div className="relative overflow-hidden py-4 z-1" style={{ borderTop: "1px solid rgba(255,255,255,.09)", borderBottom: "1px solid rgba(255,255,255,.04)"}}>
            <div className="marquee-track flex gap-12 whitespace-nowrap">
              {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
                <span key={i} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", color: i % 2 === 0 ? "var(--main-matrix-green)" : "var(--second-grey)", letterSpacing: "0.2em", textTransform: "uppercase" }}>{w}</span>
              ))}
            </div>
          </div>
  )
}

export default Marquee