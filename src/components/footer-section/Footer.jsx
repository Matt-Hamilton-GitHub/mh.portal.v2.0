import { useEffect, useRef, useState } from "react";
import { scrollTo } from "../../utils/utils";
import "./footer.styles.css";

const LINKS = [
  { cmd: "./github", href: "https://github.com/Matt-Hamilton-GitHub" },
  { cmd: "./linkedin", href: "https://www.linkedin.com/in/matt-hamilton-v/" },
];

/* static on purpose: no hydration mismatch if you ever SSR */

const SCRAMBLE = "01<>/\\{}[]#$%&*";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* types the closing command once, when the footer scrolls into view */
function useTypedOnView(text, speed = 70) {
  const ref = useRef(null);
  const [out, setOut] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      setOut(text);
      return;
    }
    let timer;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let i = 0;
        timer = setInterval(() => {
          i += 1;
          setOut(text.slice(0, i));
          if (i >= text.length) clearInterval(timer);
        }, speed);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [text, speed]);

  return [ref, out];
}

/* time spent on the page, hh:mm:ss */
function useSession() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
}

/* link that scrambles into place on hover or focus */
function CmdLink({ cmd, href }) {
  const [text, setText] = useState(cmd);
  const timer = useRef(null);

  const run = () => {
    if (prefersReduced()) return;
    clearInterval(timer.current);
    let frame = 0;
    timer.current = setInterval(() => {
      frame += 1;
      const settled = Math.floor(frame / 2);
      setText(
        cmd
          .split("")
          .map((c, i) =>
            i < settled ? c : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]
          )
          .join("")
      );
      if (settled >= cmd.length) {
        clearInterval(timer.current);
        setText(cmd);
      }
    }, 35);
  };

  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <a
      className="hxf-link cursor-pointer"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={cmd.replace("./", "")}
      onMouseEnter={run}
      onFocus={run}
    >
      <span className="hxf-chevron" aria-hidden="true">&gt;</span>
      <span aria-hidden="true" style={{ minWidth: `${cmd.length}ch`, display: "inline-block" }}>
        {text}
      </span>
    </a>
  );
}

const Footer = () => {
  const session = useSession();
  const [promptRef, typed] = useTypedOnView("./portfolio --close");
  const year = new Date().getFullYear();

  return (
    <footer className="hxf">
      <span className="hxf-corner tl" aria-hidden="true" />
      <span className="hxf-corner tr" aria-hidden="true" />

      {/* faint data stream */}
     

      <div className="hxf-main">
       
        <nav className="hxf-links" aria-label="Social links">
          {LINKS.map((l) => (
            <CmdLink key={l.cmd} {...l} />
          ))}
        </nav>
          <button type="button" className="hxf-top cursor-pointer" onClick={() => scrollTo("home")}>
            <span aria-hidden="true" >Back to top</span>
          </button>
      </div>

      <div className="hxf-meta">
        <span className="hxf-legal">MATTHIX © {year}</span>
        <span className="hxf-status">
          <i className="hxf-dot" aria-hidden="true" />
          CHANNEL SECURE
        </span>
        <span className="hxf-session">
          SESSION <b>{session}</b>
        </span>
      </div>
    </footer>
  );
};

export default Footer;