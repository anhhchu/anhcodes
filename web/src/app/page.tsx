import { getAllPosts } from "@/lib/posts";
import BlogIndex from "@/components/blog-index";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 pt-20 pb-12">
      <header className="mb-12 text-center">
        <h1 className="font-display text-display font-semibold tracking-tight text-ink">
          Writing
        </h1>
        <p className="mt-5 text-xl text-muted">
          Field notes on data engineering, big data, data warehouse, GenAI, and the systems behind them.
        </p>
      </header>

      <BlogIndex posts={posts} />
    </div>
  );
}
