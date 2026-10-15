import { Reveal } from "../../utils/utils";
import EducationVisual from "./EducationVisual";
import "./education.styles.css";

const HEADING = ["University of", "California,", "Berkeley."];
const TONE = ["ed-t1", "ed-t2", "ed-t3"];

const EducationSection = () => (
  <section id="education" className="hud hud-aurora ed">
    

    <div className="ed-inner">
      <Reveal>
        <div className="ed-head">
          <div className="hud-eyebrow">
            <span className="ln" /><span className="dia" />
            <span>EDUCATION</span>
            <span className="dia" /><span className="ln" />
          </div>
        </div>
      </Reveal>

      <div className="ed-grid">
        <Reveal>
          <EducationVisual />
        </Reveal>

        <div className="ed-text">
          <Reveal>
            <h2 className="hud-display ed-h2">
              {HEADING.map((text, i) => (
                <span
                  key={text}
                  className={`glitch ${TONE[i]}`}
                  data-text={text}
                  style={{ "--g-dur": `${5 + i * 1.4}s`, "--g-del": `${i * 0.6}s` }}
                >
                  {text}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="ed-degree">B.S. Computer Science &amp; Electrical Engineering</p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="ed-p">
              Berkeley shaped how I think about systems at a fundamental level. The rigor of the CS program, combined with the relentless energy of the Bay Area startup scene, gave me both the theoretical foundations and the bias for action that define how I work today. Some of the best conversations of my life happened in Soda Hall — the heart of CS at Berkeley.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default EducationSection;