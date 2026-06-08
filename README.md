# anhcodes.dev

Personal website and blog of **Anh Chu** — a data engineer/architect — covering portfolio, experience, and writing about Spark, Delta Lake, and Databricks.

🔗 **Live site:** https://anhcodes.dev/

## Tech stack

- **[Next.js 15](https://nextjs.org/)** (App Router) + **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com/)** — warm editorial theme
- **Markdown** content via [`gray-matter`](https://github.com/jonschlinkert/gray-matter) + [`unified`](https://unifiedjs.com/) (remark/rehype), with [`rehype-pretty-code`](https://rehype-pretty.pages.dev/) for syntax highlighting
- **[Firebase Hosting](https://firebase.google.com/docs/hosting)** — served as a static export (site `anhcodesdev`)

## Project layout

The entire app lives in the [`web/`](web/) subdirectory.

```
.
├── firebase.json          # Firebase Hosting config (serves web/out)
├── .firebaserc            # Firebase project alias (anhcodesdev)
├── web/
│   ├── content/blog/      # Blog posts (Markdown + front matter)
│   ├── public/images/     # Static assets (blog covers, portfolio)
│   └── src/
│       ├── app/           # App Router routes (home, blog, resume, …)
│       ├── components/    # Section + UI components
│       ├── data/site.ts   # Typed homepage/site content (edit here)
│       └── lib/posts.ts   # Markdown parsing & rendering
└── .github/workflows/     # CI: build + deploy to Firebase
```

## Development

All commands run from `web/`:

```bash
cd web
npm install        # first-time setup
npm run dev        # dev server at http://localhost:3000 (live reload)
npm run build      # static export → web/out/
npm run lint       # eslint
```

There is no test suite; use `npm run build` and `npx tsc --noEmit` to catch errors.

## Editing content

- **Homepage** — edit the relevant export in [`web/src/data/site.ts`](web/src/data/site.ts) (`hero`, `about`, `experience`, `skills`, `projects`, `testimonials`, `contact`, `socials`), not the components.
- **New blog post** — add `web/content/blog/<slug>.md` with front matter (`title`, `date`, `description`, `cover`, `categories`, `tags`, `author`, `draft`). Put images in `web/public/images/single-blog/<slug>/`. Posts with `draft: true` show in dev but are hidden in production builds.
- **New project** — add an entry to the `projects` array in `web/src/data/site.ts`; thumbnails go in `web/public/images/portfolio/`.

## Deployment

The site is a **static export** (`next.config.ts` sets `output: "export"`, `images.unoptimized: true`, `trailingSlash: true`). `npm run build` emits directory-style HTML to `web/out/`.

Deployment is automated via GitHub Actions:

- **`firebase-hosting-merge.yml`** — on push to `master`, runs `npm ci && npm run build` in `web/` and deploys to the Firebase **live** channel.
- **`firebase-hosting-pull-request.yml`** — on PRs, deploys to a temporary preview channel.

To deploy manually:

```bash
cd web && npm ci && npm run build
cd .. && npx firebase-tools deploy --only hosting   # requires `firebase login`
```
