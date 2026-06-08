import { Section } from "@/components/section";
import { testimonials } from "@/data/site";

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      eyebrow="Testimonials"
      title="What people say."
      className="border-t border-line"
    >
      <div className="columns-1 gap-8 md:columns-2 [&>*]:mb-8 [&>*]:break-inside-avoid">
        {testimonials.map((t) => (
          <figure key={t.name} className="border border-line bg-surface p-7">
            <blockquote className="text-lg leading-relaxed text-ink">
              <span className="font-display text-3xl leading-none text-muted">
                &ldquo;
              </span>
              {t.comment}
            </blockquote>
            <figcaption className="mt-5">
              <div className="font-display text-lg font-medium text-ink">
                {t.name}
              </div>
              <div className="text-sm italic text-muted">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
