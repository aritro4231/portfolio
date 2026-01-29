import { useEffect, useState } from "react";
import portraitImg from "../assets/portrait.jpeg";

const ROLES = [
  "CS Junior @ Virginia Tech",
  "Full-Stack Web Developer",
  "Undergraduate AI Researcher"
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | holding | switching

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (phase === "typing") {
      const done = text === current;
      const t = setTimeout(() => {
        if (!done) setText(current.slice(0, text.length + 1));
        else setPhase("holding");
      }, 85);
      return () => clearTimeout(t);
    }

    if (phase === "holding") {
      const t = setTimeout(() => setPhase("switching"), 1200);
      return () => clearTimeout(t);
    }

    // switching: fade out, swap role, clear text, fade in + type next
    if (phase === "switching") {
      const t = setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setText("");
        setPhase("typing");
      }, 250); // matches fade duration
      return () => clearTimeout(t);
    }
  }, [text, phase, roleIndex]);

  const switching = phase === "switching";

  return (
    <section id="home" className="min-h-[80vh]">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-12">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left */}
          <div>
            <p className="text-accent font-medium text-xl">Hi, I’m Aritro!</p>

            <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl whitespace-normal break-words sm:whitespace-nowrap">
              <span
                className={`inline-block transition-all duration-200 ${
                  switching ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
                }`}
              >
                {text}
              </span>
              <span className="ml-1 inline-block w-[1ch] motion-safe:animate-pulse">
                |
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Aspiring software engineer with hands-on experience in full-stack web
              development, cybersecurity, and applied AI research.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-5 py-3 font-semibold hover:bg-secondary transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center md:justify-end">
            <img
              src={portraitImg}
              alt="Portrait"
              className="h-100 w-100 rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
