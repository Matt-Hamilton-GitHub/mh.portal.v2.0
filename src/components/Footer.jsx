

const Footer = () => {
  return (
    <footer className="relative flex justify-between items-center px-12 py-8" style={{ zIndex: 1, borderTop: "1px solid #0a1520" }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "1.1rem", color: "var(--main-matrix-green)" }}>MATT HAMILTON © 2025</span>
        <div className="flex gap-8">
          {[["GitHub", "https://github.com/Matt-Hamilton-GitHub"],["LinkedIn", "https://www.linkedin.com/in/matt-hamilton-v/"]].map(s => (
            <span key={s} className="cursor-none" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.85rem", color: "var(--second-grey)", letterSpacing: "0.1em" }}><a href={s[1]}>{s[0]}</a></span>
          ))}
        </div>
      </footer>
  )
}

export default Footer