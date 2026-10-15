import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Reveal } from "../../utils/utils";
import Ticks from "../Ticks";
import CodeRain from "../CodeRain";
import "./contact.styles.css";

const MAX = 500;
const HEADING = ["Let's build", "something", "together."];
const TONE = ["ct-t1", "ct-t2", "ct-t3"];
const LOG = ["encrypting payload", "opening secure channel", "routing to inbox", "handshake confirmed"];
const GLYPHS = "アイウエオカキクケコ01{}<>/;=+*#";

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* reveals log lines one at a time */
function useStepper(count, active, step = 550) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) { setN(0); return; }
    if (prefersReduced()) { setN(count); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 1; setN(i);
      if (i >= count) clearInterval(id);
    }, step);
    return () => clearInterval(id);
  }, [active, count, step]);
  return n;
}

/* matrix-style decode: random glyphs resolve left to right into the real text */
function useScramble(text, active, duration = 1000) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) { setOut(""); return; }
    if (prefersReduced()) { setOut(text); return; }
    const t0 = performance.now();
    const id = setInterval(() => {
      const k = Math.min((performance.now() - t0) / duration, 1);
      const shown = Math.floor(k * text.length);
      setOut(
        text.split("").map((c, i) =>
          c === " " ? " " : i < shown ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]
        ).join("")
      );
      if (k >= 1) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [text, active, duration]);
  return out;
}

function Field({ label, meta, filled, i, children }) {
  return (
    <label className="ct-field" data-filled={filled} style={{ "--i": i }}>
      <span className="ct-head hud-label">
        <span><span aria-hidden="true">&gt; </span>{label}</span>
        <span className="ct-right" aria-hidden="true">
          {meta && <em>{meta}</em>}
          <b key={String(filled)} className="ct-s">{filled ? "[ OK ]" : "[ -- ]"}</b>
        </span>
      </span>
      {children}
      <span className="ct-scan" aria-hidden="true" />
    </label>
  );
}

const ContactSection = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  const serviceId = import.meta.env.VITE_MAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const sending = status === "sending";
  const sent = status === "sent";

  const filled = {
    name: form.name.trim().length > 0,
    email: /\S+@\S+\.\S+/.test(form.email),
    msg: form.msg.trim().length > 0,
  };
  const pct = Math.round((Object.values(filled).filter(Boolean).length / 3) * 100);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setStatus("sending");
    try {
      await emailjs.send(
        serviceId,
        templateId,
        { form_name: form.name, form_email: form.email, message: form.msg },
        publicKey
      );
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const reset = () => { setForm({ name: "", email: "", msg: "" }); setStatus("idle"); };

  /* success sequence */
  const shown = useStepper(LOG.length, sent);
  const finished = sent && shown >= LOG.length;
  const title = useScramble("MESSAGE DELIVERED", finished);
  const first = form.name.trim().split(" ")[0];

  return (
    <section id="contact" className="hud ct">
     
      <div className="ct-inner">
        <Reveal>
          <div className="ct-top">
            <div className="hud-eyebrow">
              <span className="ln" /><span className="dia" />
              <span>CONTACT</span>
              <span className="dia" /><span className="ln" />
            </div>
            <h2 className="hud-display ct-h2">
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
            <p className="ct-lead">
              Whether it's a new project, a collaboration, or just a conversation — I'm all ears.
            </p>
          </div>
        </Reveal>

        {sent ? (
          <Reveal>
            <div className="ct-wrap">
              <div className="hud-hairline ct-done">
                <Ticks />
                <CodeRain className="ct-rain" />
                <span className="sr-only" role="status">
                  Message delivered. {first ? `Thanks, ${first}. ` : ""}I'll be in touch soon.
                </span>

                <div className="ct-done-inner" aria-hidden="true">
                  <span className="hud-label">// TRANSMISSION LOG</span>
                  <ul className="ct-log">
                    {LOG.slice(0, shown).map((l) => (
                      <li key={l}><span className="ok">[ OK ]</span> {l}…</li>
                    ))}
                  </ul>

                  {finished && (
                    <>
                      <div className="hud-display ct-done-t glitch" data-text="MESSAGE DELIVERED" style={{ "--g-dur": "4s" }}>
                        {title}
                      </div>
                      <p className="ct-done-p">
                        {first ? `Thanks, ${first}. ` : ""}I'll be in touch soon!
                        <span className="hud-caret" style={{ marginLeft: 8 }} />
                      </p>
                    </>
                  )}
                </div>

                {finished && (
                  <button type="button" className="hud-btn ghost ct-again" onClick={reset}>
                    SEND ANOTHER ↗
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <div className="ct-wrap">
              <form className="hud-hairline ct-form" onSubmit={handleSubmit} aria-busy={sending}>
                <Ticks />

                <div className="ct-bar hud-label" aria-hidden="true">
                  <span><i className="ct-led" /> NEW TRANSMISSION</span>
                  <span><b>{pct}%</b> READY</span>
                </div>
                <div className="ct-progress" aria-hidden="true"><i style={{ width: `${pct}%` }} /></div>

                <div className="ct-row">
                  <Field label="NAME" filled={filled.name} i={0}>
                    <input
                      required
                      className="ct-input"
                      autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={set("name")}
                    />
                  </Field>
                  <Field label="EMAIL" filled={filled.email} i={1}>
                    <input
                      required
                      type="email"
                      className="ct-input"
                      autoComplete="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={set("email")}
                    />
                  </Field>
                </div>

                <Field label="MESSAGE" meta={`${form.msg.length}/${MAX}`} filled={filled.msg} i={2}>
                  <textarea
                    required
                    rows={5}
                    maxLength={MAX}
                    className="ct-input"
                    placeholder="Tell me about your project..."
                    value={form.msg}
                    onChange={set("msg")}
                  />
                </Field>

                {status === "error" && (
                  <p className="ct-err" role="alert">
                    // TRANSMISSION FAILED — please try again in a moment.
                  </p>
                )}

                <button
                  type="submit"
                  className="hud-btn primary ct-send cursor-pointer"
                  data-sending={sending}
                  disabled={sending}
                >
                  {sending ? (
                    <>TRANSMITTING<span className="ct-dots" aria-hidden="true"><i /><i /><i /></span></>
                  ) : (
                    "SEND MESSAGE →"
                  )}
                </button>
              </form>

              <div className="hud-label ct-foot" aria-hidden="true">
                <span className="hud-dot" /> <b>CHANNEL OPEN</b> · AWAITING INPUT
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default ContactSection;