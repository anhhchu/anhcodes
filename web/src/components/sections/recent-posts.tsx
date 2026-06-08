import Link from "next/link";
import { Section } from "@/components/section";
import { getAllPosts, formatDate } from "@/lib/posts";

export function RecentPosts() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section
      id="blog"
      eyebrow="Blog"
      title="Recent writing."
      intro="On SQL, Spark, data processing and storage, analytics, and distributed systems across cloud platforms."
      className="border-t border-line"
    >
      <ul className="divide-y divide-line border-t border-line">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex items-baseline justify-between gap-6 py-6 transition-opacity hover:opacity-80"
            >
              <h3 className="font-display text-2xl font-medium leading-snug tracking-tight text-ink">
                {post.title}
              </h3>
              <time className="shrink-0 text-sm italic text-muted">
                {formatDate(post.date)}
              </time>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/blog"
        className="mt-10 inline-block italic text-ink underline underline-offset-4"
      >
        All writing →
      </Link>
    </Section>
  );
}
