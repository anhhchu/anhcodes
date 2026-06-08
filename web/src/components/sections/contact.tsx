import { contact, socials } from "@/data/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-line bg-ink text-canvas"
    >
      <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <p className="mb-4 text-sm uppercase italic tracking-[0.2em] text-canvas/60">
          {contact.eyebrow}
        </p>
        <h2 className="font-display text-display font-semibold leading-tight tracking-tight">
          {contact.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-canvas/80">
          {contact.body}
        </p>

        <a
          href={`mailto:${contact.email}`}
          className="mt-10 inline-block bg-canvas px-8 py-3.5 text-lg italic text-ink transition-opacity hover:opacity-85"
        >
          {contact.email}
        </a>

        <div className="mt-10 flex justify-center gap-7">
          {socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="italic text-canvas/70 underline underline-offset-4 transition-colors hover:text-canvas"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
