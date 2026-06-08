import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPost, formatDate } from "@/lib/posts";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 pt-16 pb-12">
      <Link
        href="/blog"
        className="text-sm italic text-muted transition-colors hover:text-ink"
      >
        ← All writing
      </Link>

      <header className="mt-8 mb-12">
        <div className="mb-4 flex items-center gap-3 text-sm italic text-muted">
          <time>{formatDate(post.date)}</time>
          {post.categories[0] && (
            <>
              <span aria-hidden>·</span>
              <span>{post.categories[0]}</span>
            </>
          )}
        </div>
        <h1 className="font-display text-display font-semibold leading-tight tracking-tight text-ink">
          {post.title}
        </h1>
      </header>

      {post.cover && (
        <div className="relative mb-12 aspect-video w-full overflow-hidden border border-line">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
            unoptimized={post.cover.endsWith(".gif")}
          />
        </div>
      )}

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <footer className="mt-16 border-t border-line pt-8">
        <p className="italic text-muted">
          Written by {post.author}. Thanks for reading —{" "}
          <Link href="/#contact" className="text-ink underline">
            get in touch
          </Link>
          .
        </p>
      </footer>
    </article>
  );
}
