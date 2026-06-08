"use client";
import { useEffect } from "react";
import Link from "next/link";
import { animate, useMotionValue } from "framer-motion";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { hero } from "@/data/site";

export function Hero() {
  const p1 = useMotionValue(0);
  const p2 = useMotionValue(0);
  const p3 = useMotionValue(0);
  const p4 = useMotionValue(0);
  const p5 = useMotionValue(0);

  // Continuously draw/undraw the paths so the effect animates on its own
  // (no scrolling required).
  useEffect(() => {
    const values = [p1, p2, p3, p4, p5];
    const controls = values.map((mv, i) =>
      animate(mv, [0, 1], {
        duration: 4,
        delay: i * 0.15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      })
    );
    return () => controls.forEach((c) => c.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative overflow-clip px-6 pt-24 pb-28">
      <GoogleGeminiEffect
        eyebrow={hero.eyebrow}
        title={`${hero.titleLead} ${hero.titleEmphasis}`}
        description={hero.intro}
        pathLengths={[p1, p2, p3, p4, p5]}
        className="relative top-0"
      />

      {/* CTAs in normal flow, below the animated wave band */}
      <div className="relative z-40 mt-[20rem] flex flex-wrap items-center justify-center gap-5">
        <Link
          href="/blog"
          className="bg-ink px-8 py-3.5 text-lg italic text-canvas transition-colors hover:bg-ink/85"
        >
          Read the blog
        </Link>
        <a
          href={hero.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="border border-ink px-8 py-3.5 text-lg italic text-ink transition-colors hover:bg-ink hover:text-canvas"
        >
          Download résumé
        </a>
      </div>
    </section>
  );
}
