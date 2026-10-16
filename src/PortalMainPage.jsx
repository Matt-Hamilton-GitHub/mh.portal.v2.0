import AboutSection from "./components/about-section/AboutSection"
import ContactSection from "./components/contact-section/ContactSection"
import CosmicGlitch from "./components/cosmic.glitch/CosmicGlitch"
import EducationSection from "./components/education-section/EducationSection"
import ExperienceSection from "./components/experience-section/ExperienceSection"
import Footer from "./components/footer-section/Footer"
import HeroSection from "./components/hero-section/HeroSection"
import SolarProto from "./components/hobbies-section/Solarproto"
import Marquee from "./components/marquee/Marquee"
import Navbar from "./components/navbar/Navbar"
import ProjectsSection from "./components/project-section/ProjectsSection"
import SkillsSection from "./components/skill-section/SkillsSection"



const PortalMainPage = () => {
  return (
    <div
      className="bg-black min-h-screen overflow-x-hidden"
      style={{
        color: "#c8d6e5",
        fontFamily: "'DM Sans', sans-serif",
      
      }}
    >
      <Navbar />
      {/* <SolarProto /> */}
      <HeroSection />
      <Marquee />
      {/* <CosmicGlitch /> */}
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

export default PortalMainPage