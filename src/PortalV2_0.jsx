import AboutSection from "./components/AboutSection"
import ContactSection from "./components/ContactSection"
import EducationSection from "./components/EducationSection"
import ExperienceSection from "./components/ExperienceSection"
import Footer from "./components/Footer"
import HeroSection from "./components/HeroSection"
import Marquee from "./components/Marquee"
import Navbar from "./components/Navbar"
import ProjectsSection from "./components/ProjectsSection"
import SkillsSection from "./components/SkillsSection"


const PortalV2_0 = () => {
  return (
    <div
      className="bg-black min-h-screen overflow-x-hidden"
      style={{
        color: "#c8d6e5",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "none",
      }}
    >
      <Navbar />
      <HeroSection />
      <Marquee />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default PortalV2_0