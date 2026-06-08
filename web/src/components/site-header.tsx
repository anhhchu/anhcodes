import Link from "next/link";
import Image from "next/image";

const nav = [
  { label: "Blog", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-ink transition-opacity hover:opacity-70"
        >
          <Image
            src="/images/logo-noborder.png"
            alt="Anh Chu logo"
            width={32}
            height={32}
            priority
            className="rounded-full"
          />
          <span className="font-display text-xl font-semibold tracking-tight">
            Anh Chu
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[1.05rem] text-ink/80 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/about#contact"
          className="rounded-none bg-ink px-5 py-2.5 text-[1rem] italic text-canvas transition-colors hover:bg-ink/85"
        >
          Contact me
        </Link>
      </div>
    </header>
  );
}
