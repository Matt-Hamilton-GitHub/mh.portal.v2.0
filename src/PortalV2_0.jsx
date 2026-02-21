import HeroSection from "./components/HeroSection"
import Navbar from "./components/Navbar"


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
    </div>
  )
}

export default PortalV2_0