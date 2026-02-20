export const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
import { MatrixName } from "../utils/matrixSetups";
const Navbar = () => {

  return (
     <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-12 py-6" style={{ zIndex: 500, background: "linear-gradient(to bottom, rgba(2,6,8,.92), transparent)", backdropFilter: "blur(2px)" }}>
        <span className="text-[1rem] tracking-[.38rem] text-(--main-matrix-green)" style={{ fontFamily: "'Share Tech Mono', monospace" }}>MH Portal</span>
        <div className="flex gap-10">
          {["about","skills","experience","projects","education","contact"].map(s => (
            <span key={s} className=" hidden md:flex nav-link tracking-[0.18rem] cursor-none transition-colors duration-200 text-[#ffffff] text-[0.85rem]" onClick={() => scrollTo(s)}
              style={{ fontFamily: "'Share Tech Mono', monospace", textTransform: "uppercase" }}>
              {s}
            </span>
          ))}
        </div>
      </nav>
  )
}

export default Navbar