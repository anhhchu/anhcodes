import type { Metadata } from "next";
import { PrintButton } from "@/components/print-button";
import { resume } from "@/data/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${resume.name} — ${resume.title}.`,
};

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-6 border-b border-line pb-2 text-sm uppercase italic tracking-[0.2em] text-muted">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <article className="resume mx-auto max-w-3xl px-6 pt-16 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-5xl font-semibold tracking-tight text-ink">
            {resume.name}
          </h1>
          <p className="mt-2 text-xl italic text-muted">{resume.title}</p>
          <p className="mt-1 text-muted">{resume.location}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {resume.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="italic text-ink underline underline-offset-4 hover:text-muted"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <PrintButton />
      </div>

      {/* Summary */}
      <p className="mt-10 text-lg leading-relaxed text-muted">{resume.summary}</p>

      {/* Experience */}
      <section className="mt-12">
        <SectionHeading>Experience</SectionHeading>
        <ol className="space-y-8">
          {resume.experience.map((role) => (
            <li key={`${role.org}-${role.period}`}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                  {role.title}
                  <span className="text-muted"> · {role.org}</span>
                </h3>
                <time className="shrink-0 text-sm italic text-muted">
                  {role.period}
                </time>
              </div>
              {role.summary && (
                <p className="mt-2 leading-relaxed text-ink/80">{role.summary}</p>
              )}
              {role.bullets.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-muted marker:text-line">
                  {role.bullets.map((b) => (
                    <li key={b} className="leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Education */}
      <section className="mt-12">
        <SectionHeading>Education</SectionHeading>
        <ul className="space-y-3">
          {resume.education.map((e) => (
            <li key={e.degree} className="text-lg text-ink">
              {e.degree}
              <span className="text-muted"> — {e.org}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section className="mt-12">
        <SectionHeading>Skills</SectionHeading>
        <dl className="space-y-4">
          {resume.skills.map((group) => (
            <div
              key={group.category}
              className="grid gap-1 sm:grid-cols-[12rem_1fr] sm:gap-6"
            >
              <dt className="text-sm uppercase italic tracking-[0.15em] text-muted">
                {group.category}
              </dt>
              <dd className="text-ink">{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
