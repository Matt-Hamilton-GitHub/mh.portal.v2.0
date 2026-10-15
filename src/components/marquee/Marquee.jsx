import { MARQUEE_WORDS } from "../../utils/data";
import './marquee.style.css'

const HEX = Array.from({ length: 24 }, (_, i) =>
  "0x" + ((i * 2654435761) >>> 0).toString(16).slice(0, 6).toUpperCase().padEnd(6, "0")
).join("  ·  ");

const Group = ({ hidden = false }) => (
  <div className="mq-group" aria-hidden={hidden || undefined}>
    {MARQUEE_WORDS.map((w, i) => (
      <span key={i} className="mq-group" style={{ display: "contents" }}>
        <span className={`mq-word ${i % 2 === 0 ? "hot" : ""}`} style={{ "--i": i }}>{w}</span>
        <span className="mq-sep" aria-hidden="true">◆</span>
      </span>
    ))}
  </div>
);

const Marquee = () => (
  <div className="mq" role="marquee" aria-label={MARQUEE_WORDS.join(", ")}>
    <span className="mq-tick tl" /><span className="mq-tick tr" />
    <span className="mq-tick bl" /><span className="mq-tick br" />
    <div className="mq-scan" aria-hidden="true" />

    <div className="mq-row-wrap">
      {/* two identical groups; the animation shifts by -50% for a seamless loop */}
      <div className="mq-row">
        <Group />
        <Group hidden />
      </div>
    </div>

    <div className="mq-strip" aria-hidden="true">
      <div className="mq-strip-track">
        <span>{HEX}</span>
        <span>{HEX}</span>
      </div>
    </div>
  </div>
);

export default Marquee;