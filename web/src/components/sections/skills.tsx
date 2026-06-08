import { Section } from "@/components/section";
import { skills } from "@/data/site";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I work with."
      intro="Bringing data insights closer to business users through the right technology."
      className="border-t border-line"
    >
      <ul className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
        {skills.map((skill) => (
          <li key={skill.title}>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-lg text-ink">{skill.title}</span>
              <span className="text-sm italic text-muted">
                {skill.percent}%
              </span>
            </div>
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-0.5 rounded-full bg-ink"
                style={{ width: `${skill.percent}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
