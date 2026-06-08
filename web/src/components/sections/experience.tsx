import { Section } from "@/components/section";
import { experience } from "@/data/site";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've worked."
      intro="A decade across data engineering, big data, data warehousing, and back-end systems — on-premises and across Azure, GCP, and AWS."
      className="border-t border-line"
    >
      <ol className="border-t border-line">
        {experience.map((role) => (
          <li
            key={`${role.org}-${role.period}`}
            className="grid gap-2 border-b border-line py-8 sm:grid-cols-[10rem_1fr] sm:gap-8"
          >
            <time className="pt-1 text-sm italic text-muted">
              {role.period}
            </time>
            <div>
              <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
                {role.title}
                <span className="text-muted"> · {role.org}</span>
              </h3>
              <p className="mt-2 text-lg leading-relaxed text-muted">
                {role.summary}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
