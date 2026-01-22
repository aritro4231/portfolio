export default function About() {
  return (
    <section id="about" className="pt-10 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <h2 className="text-4xl font-bold">About</h2>
        </div>
        <div className="mt-6 space-y-5 text-xl leading-tight text-foreground">
          <p>
            I’m a third-year computer science student at{" "}
            <span className="font-semibold text-accent">Virginia Tech</span> who
            builds{" "}
            <span className="font-semibold text-accent">
              interactive projects
            </span>{" "}
            across industry and research environments. I strive to focus on
            continuously learning new technologies in AI, cloud computing, and
            modern software systems.
          </p>
          <p>
            I like systems that pair{" "}
            <span className="font-semibold text-accent">
              strong backend logic
            </span>{" "}
            with{" "}
            <span className="font-semibold text-accent">
              intuitive user experiences!
            </span>{" "}
            I'm currently seeking{" "}
            <span className="font-semibold text-accent">
              software engineering internships
            </span>
            .
          </p>
          <p>
            Outside of software, I compete in{" "}
            <span className="font-semibold text-accent">
              Rubik's Cube competitions
            </span>{" "}
            and enjoy{" "}
            <span className="font-semibold text-accent">DJing</span>, both feed my love for{" "}
            <span className="font-semibold text-accent">
              problem-solving and creativity)
            </span>
            !
          </p>
        </div>
        <div className="mt-10 text-center">
          <h3 className="text-3xl font-bold">Technical Skills</h3>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            {[
              "Java",
              "JavaScript",
              "Python",
              "C",
              "HTML/CSS",
              "React",
              "Angular",
              "Django",
              "SQL",
              "Kubernetes",
              "Docker",
              "Git/GitHub",
              "Pandas",
            ].map((skill) => (
              <div
                key={skill}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold uppercase tracking-wider text-foreground/90"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
