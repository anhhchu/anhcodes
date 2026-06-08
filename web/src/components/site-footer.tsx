import Link from "next/link";
import { LogoMark } from "./logo-mark";

const socials = [
  { label: "GitHub", href: "https://github.com/anhhchu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anhhchu/" },
  { label: "dev.to", href: "https://dev.to/anhhchu" },
];

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark size={22} />
          <span className="font-serif text-muted">
            © {new Date().getFullYear()} Anh Chu · Seattle, WA
          </span>
        </div>
        <nav className="flex gap-7">
          {socials.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="italic text-ink/80 transition-colors hover:text-ink"
              target="_blank"
              rel="noreferrer"
            >
              {s.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
