import Image from "next/image";
import { about } from "@/data/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 sm:py-28 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm uppercase italic tracking-[0.2em] text-muted">
            {about.eyebrow}
          </p>
          <h2 className="font-display text-display font-semibold leading-tight tracking-tight text-ink">
            {about.title}
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-muted">
            {about.body}
          </p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <Image
            src={about.image}
            alt="Anh Chu logo"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
