import { Section } from "@/components/section";
import { projects } from "@/data/site";

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected work.">
      <div className="grid gap-10 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group block border-t border-line pt-6"
          >
            <p className="text-sm uppercase italic tracking-[0.15em] text-muted">
              {project.service}
            </p>
            <h3 className="mt-2 font-display text-2xl font-medium leading-snug tracking-tight text-ink">
              {project.title}
            </h3>
            <p className="mt-2 text-lg leading-relaxed text-muted">
              {project.description}
            </p>
            <span className="mt-3 inline-block italic text-ink underline underline-offset-4">
              View on GitHub →
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
