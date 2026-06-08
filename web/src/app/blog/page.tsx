import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on data engineering — Spark, Delta Lake, Databricks, and building reliable data platforms.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 pt-20 pb-12">
      <header className="mb-16 text-center">
        <h1 className="font-display text-display font-semibold tracking-tight text-ink">
          Writing
        </h1>
        <p className="mt-5 text-xl text-muted">
          Field notes on data engineering, big data, and the systems behind them.
        </p>
      </header>

      <ul className="divide-y divide-line">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-5 py-8 transition-opacity hover:opacity-80 sm:flex-row sm:gap-6"
            >
              {post.cover && (
                <div className="relative aspect-video w-full shrink-0 overflow-hidden border border-line sm:w-56">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 192px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized={post.cover.endsWith(".gif")}
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-6">
                  <h2 className="font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
                    {post.title}
                  </h2>
                  <time className="shrink-0 text-sm italic text-muted">
                    {formatDate(post.date)}
                  </time>
                </div>
                <p className="mt-3 text-lg leading-relaxed text-muted">
                  {post.description}
                </p>
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-line px-2.5 py-0.5 text-xs italic text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="text-center italic text-muted">No posts yet.</p>
      )}
    </div>
  );
}
