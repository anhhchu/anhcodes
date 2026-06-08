"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import type { PostMeta } from "@/lib/posts";

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<string | null>(null);

  // Tags with their post counts, most frequent first.
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      for (const tag of post.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  }, [posts]);

  const filtered = active
    ? posts.filter((post) => post.tags.includes(active))
    : posts;

  return (
    <>
      {tags.length > 0 && (
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          <TagChip
            label="All"
            count={posts.length}
            selected={active === null}
            onClick={() => setActive(null)}
          />
          {tags.map(({ tag, count }) => (
            <TagChip
              key={tag}
              label={tag}
              count={count}
              selected={active === tag}
              onClick={() => setActive(active === tag ? null : tag)}
            />
          ))}
        </div>
      )}

      <ul className="divide-y divide-line">
        {filtered.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block py-8 transition-opacity hover:opacity-80"
            >
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
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-center italic text-muted">No posts yet.</p>
      )}
    </>
  );
}

function TagChip({
  label,
  count,
  selected,
  onClick,
}: {
  label: string;
  count: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={clsx(
        "flex items-center gap-1.5 border px-3 py-1 text-sm italic transition-colors",
        selected
          ? "border-ink bg-ink text-surface"
          : "border-line text-muted hover:border-ink hover:text-ink",
      )}
    >
      <span>{label}</span>
      <span
        className={clsx(
          "text-xs not-italic tabular-nums",
          selected ? "text-surface/70" : "text-muted/70",
        )}
      >
        {count}
      </span>
    </button>
  );
}
