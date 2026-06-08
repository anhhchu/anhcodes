import type { ReactNode } from "react";

/** Editorial section wrapper: anchor id, small italic eyebrow, display heading. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-5xl scroll-mt-24 px-6 py-20 sm:py-28 ${className}`}
    >
      {(eyebrow || title) && (
        <div className="mb-12 max-w-2xl">
          {eyebrow && (
            <p className="mb-4 text-sm uppercase italic tracking-[0.2em] text-muted">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-display font-semibold leading-tight tracking-tight text-ink">
              {title}
            </h2>
          )}
          {intro && (
            <p className="mt-6 text-xl leading-relaxed text-muted">{intro}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
