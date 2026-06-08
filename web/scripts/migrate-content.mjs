/**
 * One-shot migration: Hugo blog posts -> clean Markdown for the Next.js app.
 *
 * Reads  ../content/blog/*.md   (Hugo source, with shortcodes)
 * Writes ./content/blog/*.md     (normalized front matter + standard Markdown/HTML)
 *
 * Transforms Hugo shortcodes:
 *   {{< image image="P" width=N >}}      -> <img src="/P" width="N" />
 *   {{< highlight lang "opts" >}}..{{< /highlight >}} -> ```lang fenced block
 *   {{< bootstrap-table ... >}} / {{</bootstrap-table>}} -> stripped (keep table)
 *   {{< youtube ID >}}                   -> responsive iframe
 *   {{< table_of_contents >}}            -> stripped
 *
 * Run: node scripts/migrate-content.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(here, "../../content/blog");
const OUT = path.resolve(here, "../content/blog");

fs.mkdirSync(OUT, { recursive: true });

/** Normalize an image/asset path to a root-absolute, space-encoded URL. */
function normalizeAsset(p) {
  let s = p.trim();
  if (!s.startsWith("/")) s = "/" + s;
  // Encode spaces (e.g. "Untitled 2.png") but keep slashes readable.
  return s.split("/").map(encodeURIComponent).join("/");
}

/** Coerce Hugo's "True"/"False"/true/false/undefined into a real boolean. */
function toBool(v) {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") return v.trim().toLowerCase() === "true";
  return false;
}

/** Flatten tags into a clean, deduped array (handles "a b" and "a, b"). */
function normalizeTags(tags) {
  const arr = Array.isArray(tags) ? tags : tags ? [tags] : [];
  const out = [];
  for (const t of arr) {
    for (const piece of String(t).split(/[,\s]+/)) {
      const v = piece.trim().toLowerCase();
      if (v && !out.includes(v)) out.push(v);
    }
  }
  return out;
}

function transformBody(body) {
  let s = body;

  // table_of_contents -> remove
  s = s.replace(/\{\{<\s*table_of_contents\s*>\}\}\s*/g, "");

  // highlight -> fenced code block
  s = s.replace(
    /\{\{<\s*highlight\s+(\w+)[^>]*>\}\}\n?([\s\S]*?)\{\{<\s*\/highlight\s*>\}\}/g,
    (_m, lang, code) => "```" + lang + "\n" + code.replace(/\s+$/, "") + "\n```"
  );

  // bootstrap-table wrappers -> strip (keep inner markdown table)
  s = s.replace(/\{\{<\s*bootstrap-table[^>]*>\}\}\s*/g, "");
  s = s.replace(/\{\{<\s*\/?\s*bootstrap-table\s*>\}\}\s*/g, "");

  // youtube -> responsive iframe
  s = s.replace(
    /\{\{<\s*youtube\s+([\w-]+)\s*>\}\}/g,
    (_m, id) =>
      `<div class="video-embed"><iframe src="https://www.youtube.com/embed/${id}" title="YouTube video" loading="lazy" allowfullscreen></iframe></div>`
  );

  // image -> <img> (supports optional width=N or width="N")
  s = s.replace(
    /\{\{<\s*image\s+image="([^"]+)"(?:\s+width=("?)(\d+)\2)?[^>]*>\}\}/g,
    (_m, src, _q, width) => {
      const url = normalizeAsset(src);
      const w = width ? ` width="${width}"` : "";
      return `<img src="${url}" alt=""${w} loading="lazy" />`;
    }
  );

  return s.trim() + "\n";
}

/** First prose paragraph -> short plain-text excerpt. */
function deriveExcerpt(body) {
  const text = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/^#{1,6}\s.*$/gm, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const words = text.split(" ").slice(0, 32).join(" ");
  return words.length < text.length ? words + "…" : words;
}

function yamlString(v) {
  return JSON.stringify(String(v)); // safe double-quoted scalar
}

const files = fs
  .readdirSync(SRC)
  .filter((f) => f.endsWith(".md") && f !== "_index.md");

let count = 0;
for (const file of files) {
  const raw = fs.readFileSync(path.join(SRC, file), "utf8");
  const { data, content } = matter(raw);

  const slug = file.replace(/\.md$/, "");
  const body = transformBody(content);
  const cover = data.featureImage || data.postImage;

  const fm = {
    title: data.title ?? slug,
    date: new Date(data.date ?? Date.now()).toISOString(),
    description: data.caption || deriveExcerpt(body),
    cover: cover ? normalizeAsset(cover) : "",
    categories: data.categories
      ? [String(data.categories).trim().toLowerCase()]
      : [],
    tags: normalizeTags(data.tags),
    author: data.author || "Anh Chu",
    draft: toBool(data.draft),
  };

  const fmYaml = [
    "---",
    `title: ${yamlString(fm.title)}`,
    `date: ${yamlString(fm.date)}`,
    `description: ${yamlString(fm.description)}`,
    `cover: ${yamlString(fm.cover)}`,
    `categories: [${fm.categories.map(yamlString).join(", ")}]`,
    `tags: [${fm.tags.map(yamlString).join(", ")}]`,
    `author: ${yamlString(fm.author)}`,
    `draft: ${fm.draft}`,
    "---",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(OUT, `${slug}.md`), fmYaml + body);
  count++;
  console.log(`  ✓ ${slug}  (draft=${fm.draft}, tags=[${fm.tags.join(",")}])`);
}

console.log(`\nMigrated ${count} posts -> ${path.relative(process.cwd(), OUT)}`);
