import Link from "next/link";
import { DataFlow } from "@/components/ui/data-flow";
import { hero } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-clip px-6 pt-28 pb-32 sm:pt-32">
      <DataFlow
        eyebrow={hero.eyebrow}
        title={`${hero.titleLead} ${hero.titleEmphasis}`}
        description={hero.intro}
      >
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/"
            className="bg-ink px-8 py-3.5 text-lg italic text-canvas transition-colors hover:bg-ink/85"
          >
            Read the blog
          </Link>
          <Link
            href="/projects"
            className="border border-ink px-8 py-3.5 text-lg italic text-ink transition-colors hover:bg-ink hover:text-canvas"
          >
            View projects
          </Link>
          <Link
            href="/resume"
            className="border border-ink px-8 py-3.5 text-lg italic text-ink transition-colors hover:bg-ink hover:text-canvas"
          >
            View résumé
          </Link>
        </div>
      </DataFlow>
    </section>
  );
}
