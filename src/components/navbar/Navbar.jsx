import { useEffect, useState } from "react";
import { scrollTo } from "../../utils/utils";
import "./navbar.styles.css";

const LINKS = ["about", "skills", "experience", "projects", "education"];
const SECTION_IDS = ["home", ...LINKS, "contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  /* solidify the bar once the page moves */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* highlight the section currently in view */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  /* close the mobile menu with Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header className={`hxn${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <nav className="hxn-bar" aria-label="Primary">
        <button type="button" className="hxn-brand cursor-pointer" onClick={() => go("home")}>
          <span className="hxn-dot" aria-hidden="true" />
          The Matthix
        </button>

        <ul className="hxn-links">
          {LINKS.map((s) => (
            <li key={s}>
              <button
                type="button"
                className={`hxn-link cursor-pointer${active === s ? " is-active" : ""}`}
                aria-current={active === s ? "true" : undefined}
                onClick={() => go(s)}
              >
                {s}
              </button>
            </li>
          ))}
          <li>
            <button type="button" className="hxn-cta cursor-pointer" onClick={() => go("contact")}>
              contact
            </button>
          </li>
        </ul>

        <button
          type="button"
          className="hxn-burger "
          aria-expanded={open}
          aria-controls="hxn-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div id="hxn-menu" className="hxn-menu" hidden={!open}>
        {[...LINKS, "contact"].map((s) => (
          <button
            key={s}
            type="button"
            className={`hxn-mlink cursor-pointer${active === s ? " is-active" : ""}`}
            onClick={() => go(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Navbar;