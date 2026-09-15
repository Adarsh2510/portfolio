# Portfolio implementation plan

Status: ready for implementation. This document plans the build; application code has not yet been changed.

Design decisions: `portfolio-revamp-plan.md`. Author-supplied facts: `portfolio-content.md`. Agent working agreement: `../AGENTS.md`.

## Confirmed scope

- Quiet Studio palette: off-white, dark ink, restrained green; predominantly sans-serif typography, real imagery, and minimal motion.
- Two distinct layouts sharing the site header, footer, and theme: a conventional portfolio homepage; articles with left-side section navigation and right-side reading content.
- Static, repository-authored writing with no CMS, database, authentication, or publishing dashboard.
- Adarsh Trivedi, Frontend Engineer at Headout since November 2022, Bengaluru. Use the supplied resume for experience and achievements.
- Featured personal project: Niyati Prep, linked to `https://niyatiprep.com` even while the user restores it.
- First planned article: AI agents in the Prismic → Payload migration, alongside Pages Router → App Router and components → Espeon. The user will supply the article; do not invent its details or results.
- Intended domain: `https://adarshtrivedi.com`. Domain ownership is needed for final launch configuration, not development.

## Implementation decisions

| Area | Decision |
| --- | --- |
| Framework | Keep Next.js App Router on the current Next.js 14.1.3 baseline for this revamp. Do not upgrade Next.js/React unless a separate task explicitly reopens that decision. |
| Language and styling | Keep TypeScript and Panda CSS. Add semantic theme tokens to the existing Panda config; no second styling framework or component library. |
| Rendering | Generate authored pages at build time. Server Components by default; narrow Client Components only for actual interactions. |
| Deployment output | Start with the normal Next.js build and statically generated content routes. Do not add `output: 'export'` unless plain-file hosting becomes a requirement. This keeps native image optimization available on a Next.js host. |
| Writing | Local MDX compiled by the official `@next/mdx` integration. Use MDX exports for metadata instead of adding a YAML parser. |
| Post discovery | A small explicit published-post registry with literal MDX imports. No remote content fetches or unrestricted dynamic file imports. |
| Content identity | One site/profile data module and one project/experience data module; individual posts own their metadata. |
| Article sections | Each post exports section IDs/titles; a shared Section block renders those headings and the same entries render the contents menu. No separate hand-maintained menu labels or custom Markdown parser. |
| Reading time | An author-reviewed estimate in each post's metadata initially; avoid a custom parser solely to estimate minutes. |
| Case studies | Reuse the article layout when substantial case-study content exists. Do not create empty case-study routes now. |

Next.js currently remains pinned at 14.1.3 for implementation simplicity. Revisit the framework lifecycle/security upgrade as a separate task after the revamp if needed. Follow the official [MDX guide](https://nextjs.org/docs/app/guides/mdx) only when adding the writing system, and verify the Next-14-compatible package version first. Static generation does not require a pure [static export](https://nextjs.org/docs/app/guides/static-exports).

## Intended structure

Reuse the existing component folders where appropriate; names below describe responsibilities rather than a requirement to reorganize unrelated files.

```text
src/
  app/
    layout.tsx                     shared header/footer, global metadata
    page.tsx                       portfolio homepage
    globals.css                    base styles and article typography
    blog/
      page.tsx                     published writing index
      [slug]/page.tsx              static article routes and metadata
    components/
      header/                      adapt existing component
      footer/                      adapt existing component
      article/                     ArticleLayout, Section, Contents, blocks
      ...                          reuse homepage components where useful
    sitemap.ts
    robots.ts
    feed.xml/route.ts               RSS generated at build time
    not-found.tsx
  content/
    site.ts                        identity, origin, contact/social links
    portfolio.ts                   selected work and experience
    posts/
      index.ts                     published-post registry
      *.mdx                        authored posts
  mdx-components.tsx               shared element/block mapping
content-drafts/
  article-template.mdx              reusable starting point, not routable
  ai-assisted-cms-migration.mdx     author outline, not published
scripts/
  check-content.mjs                one focused generated-output check
public/
  ...                              portrait, project images, social preview
```

## Phase 1 — Working baseline and theme

1. Record current build/lint/type-check status and Node/pnpm versions before changing dependencies. Preserve the untracked `src/app/test2/` and `public/test2/` work.
2. Keep Next.js, React, ESLint, and Panda versions pinned. Add a `typecheck` script for repeatable validation while retaining the currently working `next lint` command.
3. Keep the framework baseline focused: no experimental compiler/caching features, provider-specific runtime settings, or new application architecture.
4. Define semantic background/text/accent/border/focus tokens using the agreed palette. Add consistent spacing, type sizes, content widths, and responsive rules.
5. Reuse Inter initially. Correct the existing conflicting global font declaration. Refine typography against real content before adding another font.
6. Move the existing header/footer into the shared site shell. Make navigation work from all routes: home anchors for Work/About/Contact and `/blog` for Writing. Include a skip link and labelled social links.
7. Replace the main portfolio's gradients, entrance animations, and decorative card effects as their components are rebuilt. Check callers before removing shared styles used by other routes.

Acceptance: build, type-check, and lint work; the shared shell is usable at narrow widths and with a keyboard; theme values have one source.

## Phase 2 — First visual milestone: two layouts

Build the homepage and an article specimen together, with the agreed distinction visible immediately.

### Homepage

- Header: name and Work/Writing/About/Contact navigation, retained as a top header. No left-side section menu.
- Intro: real role/location and a concise personal statement; inspect and reuse the existing portrait with meaningful alt text and a considered crop.
- Selected work: Niyati Prep, visual regression testing, and CMS migration/performance. Use accurate summaries from the content brief, preserving qualifiers on metrics. Do not add an inert “Read case study” link.
- Use real project images when available. Until then use clean text-led project entries; do not fabricate product screenshots.
- Writing: recent published articles when available. With no posts, show a brief honest introduction to the planned writing; no fake dates, article links, or published counts.
- About/experience: Headout, Capgemini, and freelance experience, followed by concise education/selected achievements. Avoid an exhaustive resume wall or skill-rating graphics.
- Contact: email, GitHub, LinkedIn, and optional X. Add a resume download only once the PDF exists.

### Article specimen

- Shared top header; prominent article title, summary, author/date/reading-time treatment.
- Desktop body: approximately 220px contents column, a generous gap, and an approximately 68-character reading column inside an approximately 1120px container. Adjust to actual font metrics.
- Sticky contents on the left, reading content on the right. The homepage must not inherit this structure.
- Below approximately 900px, replace the rail with a native `details` contents menu above the article body. Verify against content rather than relying solely on the breakpoint.
- Demonstrate prose, section headings, links/lists, language-labelled code, a callout, and a figure/table treatment. Use explicitly labelled sample content for layout review.
- Preview the specimen only in development. Guard any temporary preview route so production returns no content for it; mark it noindex, omit it from registries/feeds/sitemaps, and verify this in the production check.

Acceptance: review desktop and mobile captures of both surfaces; the visual direction is consistent but their layouts remain distinct. No content is hidden pending an animation or JavaScript initialization.

## Phase 3 — Static writing and reusable article blocks

1. Configure official MDX support and the shared component mapping. Keep prose styles scoped to the article so homepage typography is unaffected.
2. Define a small post metadata contract: slug, title, description, publication date, topic, reading-time estimate; optional meaningful update date, social image, and related-post slugs. Author details come from the site data.
3. Use exported section entries with stable IDs and titles. The Section block and contents menu consume the same data. The layout owns the only H1; prose subsections use H3 under the main H2 sections.
4. Start the published registry empty until real content is ready. One literal import/registration publishes a reviewed post. Draft modules are outside the app routes and absent from this registry.
5. Use the registry for `generateStaticParams`, article lookup, `generateMetadata`, the writing index, and homepage previews. Unknown slugs return 404; disable generation of unregistered article paths at request time.
6. Style code with semantic `pre`/`code` and a language label. Code and tables scroll within their containers. Use a small shared callout and figure/caption treatment. Add syntax-highlighting tooling only if the first article requires it.
7. Implement active-section highlighting with a small IntersectionObserver client component. It receives only section IDs/titles; the MDX body remains outside its client boundary. Apply `aria-current`, clean up observers, and use anchor offsets so navigation lands visibly.
8. Link a related article only when one exists. Keep short notes compatible with the same layout without requiring a contents menu or unnecessary sections.

Acceptance: registering one reviewed MDX post produces its static route and index entry; a draft and unknown slug do not. Heading/menu IDs match. Core content and anchor navigation work without JavaScript.

## Phase 4 — Search, social previews, and feeds

1. Replace starter metadata. Centralize the intended origin and author identity; use page-specific titles/descriptions, self-canonicals, and Open Graph/Twitter metadata.
2. Add a theme-consistent site social image and favicon. Let posts optionally override the social image; use the site image as the initial fallback.
3. Render appropriate JSON-LD in initial HTML: WebSite/Person for the homepage, BlogPosting and BreadcrumbList for articles. Use stable IDs and matching visible facts; escape JSON serialization safely.
4. Generate sitemap and a static RSS GET response from the published registry. Include only public pages and published articles; serialize valid XML with escaped content and correct absolute URLs/dates.
5. Add robots rules for production crawlability and prevent preview environments from indexing. Configure preview noindex at metadata or host level; do not rely on a robots disallow alone to remove indexed pages.
6. Exclude the existing `/test2` experiment from portfolio navigation and sitemap. Preserve its source; report its public-route status during launch review rather than silently deleting or modifying unrelated work.
7. Support discoverability through clear summaries, source links, visible dates/authorship, descriptive headings, and readable HTML. Do not add speculative GEO markup or promise search/AI placement.

Acceptance: generated HTML contains correct canonicals, social tags, and parseable JSON-LD; sitemap/feed include exactly the intended published entries; draft content does not occur in public output. Check empty-blog output as well as one published fixture.

## Phase 5 — Authoring handoff

- Create a reusable MDX template showing metadata, section entries, and the shared blocks. Document the few steps required to publish in README.
- Keep the first article as an unpublished outline covering the three confirmed migrations. Add actual tools, prompts, examples, validation steps, and observations only from Adarsh's notes.
- Publishing sequence: copy template → write/review → set metadata and estimate reading time → register the post → preview → run checks → commit/deploy when requested.
- Update AGENTS.md with actual token/component paths, supported blocks, commands, image rules, and the two-layout requirement.

Acceptance: a new article can be added without changing shared UI, duplicating theme styles, or manually editing sitemap/feed/SEO output. Article content remains authored and reviewable.

## Phase 6 — Verification and launch readiness

Run the final production build, type-check, and lint. Keep automated content coverage to one focused script checking generated artifacts: published/unknown/draft routes, unique slugs and required metadata, heading/contents targets, JSON-LD, canonicals, and feed/sitemap consistency. Exercise a temporary synthetic article and remove its registration before the release build.

Inspect home, writing index, and the article specimen at 360px, 768px, and 1440px. Check keyboard traversal, focus visibility, mobile contents behavior, image sizing, code/table overflow, reduced motion, and navigation from article pages. Assess Lighthouse performance and accessibility; inspect concrete failures rather than promising a perfect score. Target no page-wide horizontal overflow, readable contrast, and minimal layout shifts.

Verify that essential content remains visible with JavaScript disabled. Remove development-only sample content from the production result. Treat Niyati Prep's known downtime as an external follow-up, not a reason to remove the user-requested link.

Prepare deployment documentation with the required Node version, build command, preview/production settings, and intended canonical origin. Once the domain is available, configure HTTPS, the preferred hostname and redirects, and confirm production indexing rules. Search Console verification and sitemap submission happen after the site is deployed and ownership is available. This planning task does not purchase the domain or deploy the site.

Acceptance: checks pass, both layouts have been visually reviewed, authoring instructions are usable, and remaining external launch tasks are explicitly listed.

## Inputs that can arrive during implementation

The design/build is not blocked. Later inputs are the article notes, project screenshots, optional repository links, and optional downloadable resume PDF. Domain ownership is needed only for the final custom-domain launch. Do not reopen confirmed questions about Headout's start date, Niyati Prep's URL, or the three migration tracks.

## Deferred work

No CMS, account system, comments, search, newsletter backend, dark-mode toggle, animation library, separate AI-lab page, or speculative case-study routes in the first version. Add them only when a concrete use appears.
