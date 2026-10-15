import { Reveal } from "../../utils/utils";
import { SKILLS } from "../../utils/data";
import "./skill.styles.css";

const Ticks = () => (
  <>
    <span className="sk-tick tl" />
    <span className="sk-tick tr" />
    <span className="sk-tick bl" />
    <span className="sk-tick br" />
  </>
);

/* decorative concentric rings behind the heading */
const Rings = () => (
  <div className="sk-rings" aria-hidden="true">
    <svg viewBox="0 0 400 400" fill="none">
      <circle cx="200" cy="200" r="198" stroke="rgba(190,225,255,.18)" />
      <g className="a">
        <circle
          cx="200"
          cy="200"
          r="170"
          stroke="rgba(0,255,157,.55)"
          strokeDasharray="2 10"
        />
        <circle cx="200" cy="30" r="3" fill="#00ff9d" />
      </g>
      <g className="b">
        <circle
          cx="200"
          cy="200"
          r="130"
          stroke="rgba(0,224,255,.45)"
          strokeDasharray="60 14 6 14"
        />
        <rect
          x="196"
          y="66"
          width="8"
          height="8"
          transform="rotate(45 200 70)"
          stroke="#00e0ff"
        />
      </g>
      <circle cx="200" cy="200" r="90" stroke="rgba(190,225,255,.12)" />
      <path
        d="M200 0v22M200 378v22M0 200h22M378 200h22"
        stroke="rgba(0,255,157,.6)"
      />
    </svg>
  </div>
);

const pad = (n) => String(n).padStart(2, "0");

const SkillsSection = () => {
  const total = SKILLS.length;

  return (
    <section id="skills" className="sk">
      
      <div className="sk-inner">
        <Reveal>
          <div className="sk-head">
            <div className="ex-label">
              <span className="ln" />
              <span className="dia" />
              <span>Skills</span>
              <span className="dia" />
              <span className="ln" />
            </div>
            {/* <Rings /> */}

            <h2 className="hx-title">My skillbox</h2>
          </div>
        </Reveal>

        <div className="sk-grid">
          {SKILLS.map((cat, i) => (
            <Reveal key={cat.category} delay={i * 0.09}>
              <article className="sk-card">
                <Ticks />
                <div className="sk-sheen" aria-hidden="true" />

                <div className="sk-top">
                  <div>
                   
                  </div>
                <h3 className="sk-cat">{cat.category}</h3>
                  <div className="sk-diamond" aria-hidden="true">
                    <span>{cat.icon}</span>
                  </div>
                </div>

                <div className="sk-scale" aria-hidden="true" />

                <ul className="sk-list">
                  {cat.items.map((skill, j) => (
                    <li key={skill} className="sk-item">
                      <span className="n" aria-hidden="true">
                        {pad(j + 1)}
                      </span>
                      {skill}
                      <span className="ar" aria-hidden="true">
                        ↗
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="sk-foot" aria-hidden="true">
                  <span>{pad(cat.items.length)} ITEMS</span>
                  <span className="dots">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
