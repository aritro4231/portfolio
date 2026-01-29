import { Github, Linkedin, Mail } from "lucide-react";

const CONTACTS = [
  {
    label: "Email",
    value: "aritro@vt.edu",
    href: "mailto:aritro@vt.edu",
    Icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/aritro4231",
    href: "https://github.com/aritro4231",
    Icon: Github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/aritro-sengupta",
    href: "https://www.linkedin.com/in/aritro-sengupta/",
    Icon: Linkedin,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="pt-10 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-4xl font-bold">Contact</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Please feel free to reach out! I would love to connect!
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTACTS.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon size={22} />
              </span>
              <span>
                <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {label}
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {value}
                </div>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
