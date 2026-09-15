# Adarsh Trivedi portfolio

Personal portfolio built with Next.js App Router, TypeScript, and Panda CSS.

## Local development

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm lint
pnpm typecheck
pnpm check:public-content
pnpm build
```

## Content publishing

Articles live in `src/content/posts.ts`.

Required fields for each post:

- `slug`
- `status`: `published` or `draft`
- `title`
- `description`
- `topic`
- `publishedAt`
- `readingTime`
- `standfirst`
- `takeaway`
- `sections`

`publishedPosts` controls routable article pages. `listedPosts` controls the homepage writing rail, `/blog`, sitemap, and RSS.

Use `listed: false` for linked supporting notes that should be reachable from another article but excluded from public listings and feeds. These pages also emit `noindex, follow` metadata.

Keep drafts as `status: "draft"`; drafts must not receive public routes, feed entries, or sitemap entries.

## Production configuration

The live domain is `https://adarshtrivedi.com`.

No custom Vercel env vars are required for indexing or analytics. Vercel provides `VERCEL_ENV=production` for the production deployment; only then pages are indexable and Microsoft Clarity loads.

Preview and local environments emit noindex metadata and `robots.txt` disallows crawling.
