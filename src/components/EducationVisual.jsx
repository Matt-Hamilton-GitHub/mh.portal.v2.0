
function EducationVisual() {
  return (
    <div className="relative min-w-70 block">
                    <div className="relative " style={{ aspectRatio: "3/4", background: "linear-gradient(160deg,#0a1828,#0d1e30,#060f18)", borderRadius: "4px", border: "1px solid #0d1e2e" }}>
                      <svg viewBox="0 0 320 430" width="100%" height="100%" style={{ position: "absolute", inset: 0 }} xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <radialGradient id="glow" cx="50%" cy="55%" r="50%"><stop offset="0%" stopColor="#00ff9d" stopOpacity="0.07"/><stop offset="100%" stopColor="#04080c" stopOpacity="0"/></radialGradient>
                          <radialGradient id="goldglow" cx="50%" cy="30%" r="40%"><stop offset="0%" stopColor="#FDB515" stopOpacity="0.05"/><stop offset="100%" stopColor="#04080c" stopOpacity="0"/></radialGradient>
                          <linearGradient id="towerfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8f0f8" stopOpacity="0.22"/><stop offset="60%" stopColor="#8aa0ba" stopOpacity="0.14"/><stop offset="100%" stopColor="#3a5068" stopOpacity="0.1"/></linearGradient>
                        </defs>
                        <rect width="320" height="430" fill="url(#glow)"/>
                        <rect width="320" height="430" fill="url(#goldglow)"/>
                        <rect x="0" y="375" width="320" height="55" fill="#020608" opacity="0.9"/>
                        <ellipse cx="35" cy="335" rx="22" ry="38" fill="#00ff9d" opacity="0.04"/>
                        <rect x="33" y="355" width="4" height="20" fill="#00ff9d" opacity="0.04"/>
                        <ellipse cx="65" cy="345" rx="18" ry="30" fill="#00ff9d" opacity="0.035"/>
                        <ellipse cx="280" cy="338" rx="20" ry="35" fill="#00ff9d" opacity="0.04"/>
                        <rect x="105" y="355" width="110" height="20" fill="url(#towerfill)"/>
                        <rect x="118" y="135" width="84" height="220" fill="url(#towerfill)"/>
                        <rect x="114" y="200" width="92" height="8" fill="url(#towerfill)" opacity="1.5"/>
                        <rect x="114" y="260" width="92" height="8" fill="url(#towerfill)" opacity="1.5"/>
                        <rect x="114" y="320" width="92" height="8" fill="url(#towerfill)" opacity="1.5"/>
                        <rect x="112" y="105" width="96" height="32" fill="url(#towerfill)"/>
                        <circle cx="160" cy="121" r="14" fill="none" stroke="#FDB515" strokeWidth="0.6" opacity="0.25"/>
                        <circle cx="160" cy="121" r="1.5" fill="#FDB515" opacity="0.3"/>
                        <line x1="160" y1="121" x2="160" y2="112" stroke="#FDB515" strokeWidth="1" opacity="0.3"/>
                        <line x1="160" y1="121" x2="168" y2="121" stroke="#FDB515" strokeWidth="1" opacity="0.3"/>
                        <rect x="117" y="72" width="86" height="36" fill="url(#towerfill)"/>
                        <path d="M133 102 L133 82 Q143 74 153 82 L153 102" fill="#00ff9d" opacity="0.06"/>
                        <path d="M167 102 L167 82 Q177 74 187 82 L187 102" fill="#00ff9d" opacity="0.06"/>
                        <rect x="127" y="44" width="66" height="30" fill="url(#towerfill)"/>
                        <rect x="124" y="41" width="72" height="6" fill="url(#towerfill)"/>
                        <polygon points="160,4 127,44 193,44" fill="url(#towerfill)" opacity="1.2"/>
                        <line x1="160" y1="4" x2="160" y2="20" stroke="#FDB515" strokeWidth="0.8" opacity="0.4"/>
                        {[155,178,210,240,268].map((y,i)=>(
                          <g key={i}><rect x="142" y={y-200+145} width="16" height="12" rx="1" fill="#00ff9d" opacity="0.05"/><rect x="162" y={y-200+145} width="16" height="12" rx="1" fill="#00ff9d" opacity="0.04"/></g>
                        ))}
                        <ellipse cx="160" cy="374" rx="55" ry="6" fill="#000" opacity="0.4"/>
                        <path d="M0 360 Q80 320 160 340 Q240 320 320 355 L320 380 L0 380Z" fill="#060d14" opacity="0.7"/>
                      </svg>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "rgba(0,255,157,.45)", letterSpacing: "0.2em", marginBottom: "0.3rem" }}>BERKELEY, CA</div>
                        <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#e8f0f8" }}>Sather Tower — The Campanile</div>
                      </div>
                    </div>
                    {/* badge */}
                    <div className="absolute flex flex-col items-center justify-center" style={{ top: "-1.5rem", right: "-1.5rem", width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg,#003262,#001f40)", border: "2px solid #FDB515", boxShadow: "0 0 40px rgba(253,181,21,.18)" }}>
                      <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#FDB515", textAlign: "center", letterSpacing: "0.06em", lineHeight: 1.4 }}>UC<br />BERKELEY</div>
                      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.48rem", color: "rgba(253,181,21,.5)", letterSpacing: "0.08em", marginTop: "0.2rem" }}>EST. 1868</div>
                    </div>
                    {/* grad card */}
                    <div className="absolute px-5 py-4" style={{ bottom: "-3.5rem", left: "-1.5rem", background: "#060d14", border: "1px solid #0d1e2e", borderRadius: "3px", boxShadow: "0 8px 40px rgba(0,0,0,.5)" }}>
                      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "var(--second-grey)", letterSpacing: "0.15em", marginBottom: "0.2rem" }}>GRADUATED</div>
                      <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#e8f0f8" }}>Class of 2024</div>
                    </div>
                  </div>
  )
}

export default EducationVisual