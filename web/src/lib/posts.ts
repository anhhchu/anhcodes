import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  cover: string;
  categories: string[];
  tags: string[];
  author: string;
  draft: boolean;
};

export type Post = PostMeta & { html: string };

// Hide drafts in production builds; show everything in dev.
const includeDrafts = process.env.NODE_ENV !== "production";

function readRaw(slug: string) {
  return fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    description: String(data.description ?? ""),
    cover: String(data.cover ?? ""),
    categories: (data.categories as string[]) ?? [],
    tags: (data.tags as string[]) ?? [],
    author: String(data.author ?? "Anh Chu"),
    draft: Boolean(data.draft),
  };
}

/** All published posts, newest first. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const { data } = matter(readRaw(slug));
      return toMeta(slug, data);
    })
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

async function markdownToHtml(md: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypePrettyCode, {
      theme: "github-light",
      keepBackground: false,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(md);
  return String(file);
}

/** A single post with rendered HTML, or null if missing. */
export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(readRaw(slug));
  const meta = toMeta(slug, data);
  if (meta.draft && !includeDrafts) return null;
  const html = await markdownToHtml(content);
  return { ...meta, html };
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
