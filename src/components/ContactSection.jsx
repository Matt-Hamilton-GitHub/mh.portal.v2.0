import { useState } from "react";
import { Reveal, SectionLabel } from "../utils/utils";

const ContactSection = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  return (
    <section
      id="contact"
      className="relative py-32 px-12 pb-40"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-20">
            <SectionLabel num="06" label="CONTACT" />
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(3.5rem,9vw,8rem)",
                fontWeight: 700,
                color: "#e8f0f8",
                letterSpacing: "-0.05em",
                lineHeight: 0.88,
              }}
            >
              Let's build
              <br />
              <span style={{ color: "#00ff9d" }}>something</span>
              <br />
              together.
            </h2>
            <p
              className="font-light max-w-sm mx-auto leading-loose"
              style={{ color: "#7a9ab8" }}
            >
              Whether it's a new project, a collaboration, or just a
              conversation — I'm all ears.
            </p>
          </div>
        </Reveal>
        {sent ? (
          <Reveal>
            <div
              className="max-w-md mx-auto text-center py-16 px-8"
              style={{
                border: "1px solid rgba(0,255,157,.15)",
                borderRadius: "3px",
                background: "rgba(0,255,157,.03)",
              }}
            >
              <div
                className="mb-4"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "3rem",
                  color: "#00ff9d",
                }}
              >
                Sent ✓
              </div>
              <p
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.75rem",
                  color: "#4a6a8a",
                }}
              >
                I'll be in touch with you soon!
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="max-w-xl mx-auto flex flex-col gap-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="transition-all duration-300 px-5 py-4"
                  style={{
                    background: "#060d14",
                    border: "1px solid #0d1e2e",
                    borderRadius: "2px",
                    color: "#e8f0f8",
                    fontSize: "0.9rem",
                  }}
                />
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="transition-all duration-300 px-5 py-4"
                  style={{
                    background: "#060d14",
                    border: "1px solid #0d1e2e",
                    borderRadius: "2px",
                    color: "#e8f0f8",
                    fontSize: "0.9rem",
                  }}
                />
              </div>
              <textarea
                required
                rows={5}
                placeholder="Tell me about your project..."
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
                className="transition-all duration-300 px-5 py-4 resize-y"
                style={{
                  background: "#060d14",
                  border: "1px solid #0d1e2e",
                  borderRadius: "2px",
                  color: "#e8f0f8",
                  fontSize: "0.9rem",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
              <button
                type="submit"
                className="send-btn transition-all duration-300 py-4 cursor-none"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.78rem",
                  letterSpacing: "0.15em",
                  border: "1px solid rgba(0,255,157,.3)",
                  background: "transparent",
                  color: "#00ff9d",
                  borderRadius: "2px",
                }}
              >
                SEND MESSAGE →
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
