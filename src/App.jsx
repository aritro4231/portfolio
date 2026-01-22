import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import About from "./components/About";
import Contact from "./components/Contact";


export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  // optional: auto-update activeSection while scrolling (nice touch)
  useEffect(() => {
    const ids = ["home", "projects", "about", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActiveSection(visible[0].target.id);
      },
      { root: null, threshold: 0.6 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      <HeroSection />
      <ProjectsSection />

      <About />
      <Contact />
    </div>
  );
}
