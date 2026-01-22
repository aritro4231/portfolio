import { Github } from "lucide-react";
import GitHubProjects from "./github-projects";

export default function ProjectsSection() {
  return (
    <section id="projects" className="pt-16 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg">
            Explore my latest work and contributions on GitHub
          </p>
        </div>

        <GitHubProjects />

        <div className="mt-12 text-center">
          <a
            href="https://github.com/aritro4231"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:opacity-90 text-accent-foreground rounded-lg transition-all hover:gap-3 font-medium"
          >
            <Github size={20} />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
