# Portfolio revamp plan

Status: user approved the Quiet Studio direction and two distinct layouts. Resume content has been supplied; see `portfolio-content.md`. Application code has not been changed.

The concrete build sequence and acceptance checks are in [implementation-plan.md](implementation-plan.md). This document records the product/design rationale; the implementation plan resolves the technical defaults below.

## Goal

A considered, minimal portfolio that demonstrates Adarsh's frontend judgment through both the work presented and the quality of the site itself. Writing should make it easy to publish practical learnings and AI experiments as static pages.

Suggested positioning, subject to personal copy review: “Frontend engineer building thoughtful interfaces and exploring AI through practical experiments.”

## Current repository

- Next.js 14.1.3, React 18, TypeScript, and Panda CSS.
- Home page currently contains an introduction, photo, experience cards, social links, and footer.
- Root metadata still uses the Create Next App defaults. There is no writing infrastructure, sitemap, or robots metadata in the inspected source tree.
- Existing styles mix neutral surfaces with purple gradients, shadows, and animated cards. Replace these in the main portfolio with the selected coherent theme.
- Use the supplied resume and user clarifications as the current content source. Current role is Frontend Engineer at Headout, based in Bengaluru; older site copy says Gurugram. The user confirmed the Headout start date as November 2022.
- Untracked `src/app/test2/` and `public/test2/` contain a separate experiment. Preserve this work; decide whether it belongs on the public deployment before launch.

## Approved visual direction and distinct layouts

The user preferred Quiet Studio and rejected the cream/terracotta treatment as too reminiscent of generic AI-generated designs. Use real work, personal voice, considered typography, and image composition to create character.

Working palette: chalk white `#F7F8F5`, dark ink `#242B27`, deep green `#315949`, divider `#DDE2DA`, and occasional annotation background `#E8EDCF`. Verify contrast in actual text/background pairings. Start with one light theme. Typography is predominantly sans-serif; test any restrained serif accents against actual article content.

Homepage: shared top header with Work/Writing/About/Contact; introduction and personal photo; selected work; latest writing; experience/about; contact. Normal vertical flow, with no left-side section menu. Retain the approved header/navigation concept and refine visual presentation.

Articles and longer case studies: shared top header, then left-side section navigation and right-side reading content. The [Anthropic September 2026 report](https://www.anthropic.com/threat-intelligence-report-september-2026) is a reference for this layout only, not the homepage header or homepage structure.

Research references: [Paco Coursey](https://paco.me/) for restraint and personal writing, [Frank Chimero's archived design](https://httpster.net/website/frank-chimero/) for project imagery and composition, [Maggie Appleton](https://maggieappleton.com/) for illustrated explanations, and [Tania Rascia](https://www.taniarascia.com/) for the connection between personal history and technical writing. These inform individual decisions, not a combined template to copy.

## Site structure and content

| Route | Purpose |
| --- | --- |
| `/` | Introduction, selected work, latest writing, short experience/about section, contact links. |
| `/blog` | Chronological article list with title, description, topic, date, and reading time. |
| `/blog/[slug]` | Static article using the shared reading layout. |
| `/work/[slug]` | Optional detailed case studies only when enough real content exists to justify them. |

Use a small navigation: Work, Writing, About, Contact. Work/About/Contact can link to home sections initially.

Lead with two or three substantive work examples where content is available. Each should explain the problem, Adarsh's contribution, a meaningful technical/design decision, and the outcome, with screenshots or links when shareable. Treat existing resume bullets as inputs, not finished case studies.

Present AI experiments through the same work and writing formats, labelled clearly. A separate lab route is unnecessary until there are several experiments to browse.

Feature Niyati Prep with the user-provided link https://niyatiprep.com. The user reports it is temporarily down and is restoring it in parallel; retain the link as requested without claiming verified availability.

First planned article, confirmed by the user: how they used AI agents during the Prismic-to-Payload CMS migration, alongside the frontend repository's move from Next.js Pages Router to App Router and migration of components to the Espeon design system library. The user will write it. Tools, workflow, sequencing, examples, and results are still to be supplied. Do not reuse visual-QA/CMS-search metrics as evidence of AI speedup.

## Article format

Reading layout: prominent title and standfirst above an approximately 65–72-character text column; comfortable body size and line height; thin dividers and restrained accents. Long articles have a sticky contents menu on the left and reading content on the right. Highlight the active section through progressive enhancement, preserving ordinary anchor navigation without JavaScript. On mobile, move contents to a compact native disclosure above the text.

Suggested sequence:

1. Topic, title, summary, author, publication/update dates, reading time.
2. A short takeaway explaining what the reader will learn.
3. Context or problem.
4. Approach and examples, using clear sections.
5. Results, trade-offs, and lessons.
6. Sources and, when relevant, a related article.

Short learning notes use the same shell with fewer sections. Cover art is optional.

Shared block vocabulary: prose, anchored headings, lists, quotations, code, callouts, figures/captions, and tables. Implement enhanced blocks only as real content needs them; the template must demonstrate the initial ones. Do not build a block editor or per-post layouts.

## Static publishing approach

Keep Next.js, TypeScript, and Panda CSS. Check framework support/security and select an appropriate supported version before launch; do not couple the redesign to an unnecessary stack migration.

Recommended authoring: local MDX, which allows Markdown prose and shared React components. Use the official Next.js MDX integration and a small explicit published-post registry at first. Avoid a CMS, remote content fetching, or a custom Markdown parser. Next.js documents [local MDX and shared components](https://nextjs.org/docs/app/guides/mdx).

Each post has one metadata export consumed by the index, article layout, metadata generation, feed, and sitemap. Required fields: slug, title, description, publication date, and topic; optional fields include meaningful update date and image. Centralize author and site identity.

Publishing workflow: copy the article template, write/review the post, add it to the published registry, preview, run validation, then commit and deploy. Keep unpublished files outside routable content and outside the published registry; draft exclusion must be checked.

Pre-render all portfolio and article pages during the build. A `[slug]` route does not require request-time content generation. Use the normal Next.js build initially, retaining native image optimization on a Next.js host. Enable a pure [static export](https://nextjs.org/docs/app/guides/static-exports) only if plain-file hosting becomes a requirement; image handling and host redirects must then match that deployment.

## SEO, structured data, and GEO

- Unique page titles and descriptions; one canonical URL per published page.
- Open Graph/social cards, favicon, sitemap, robots rules, and a static RSS feed.
- Semantic HTML, one page H1, descriptive links, image alt text, optimized images/fonts, and minimal client JavaScript.
- JSON-LD: WebSite and Person identity on the home page; BlogPosting and BreadcrumbList for articles. Link article authors to a stable person identity. Include only truthful, visible information and relevant images/dates. Follow [Google's Article guidance](https://developers.google.com/search/docs/appearance/structured-data/article).
- For AI discoverability: clear summaries, informative headings, original examples, sources, visible authorship/dates, and useful internal links. Keep important content available in HTML.
- Google says AI Overviews and AI Mode use ordinary SEO foundations, require no special schema or AI text files, and do not guarantee inclusion. `llms.txt` is not a launch requirement. Other engines can differ; avoid promising a universal GEO outcome. See [Google's AI search guidance](https://developers.google.com/search/docs/appearance/ai-features).
- Use `https://adarshtrivedi.com` as the intended canonical origin once the domain is owned and configured. At launch configure HTTPS, a single preferred host, redirects, preview noindex, and production crawlability. Search Console verification and sitemap submission follow domain setup.

## Implementation sequence

1. Direction and content intake: completed for visual direction, resume details, and first article topic. Remaining assets and specific questions are recorded in `portfolio-content.md`; they do not prevent layout work.
2. Establish foundations: finalize tokens, shared shell/navigation/footer, and update AGENTS.md with exact theme references. Build a representative home view and article view to validate the direction together.
3. Revamp the portfolio: responsive home, selected-work presentation, concise experience, writing preview, and contact links.
4. Implement publishing: MDX, article layout/blocks, index, template, post registry, and README instructions. Use a clearly marked local sample until author content is approved.
5. Add discoverability: metadata, social images, JSON-LD, sitemap, robots, and RSS, using shared identity and post data.
6. Verify and prepare launch: production build, types/lint, mobile/desktop inspection, keyboard checks, draft/404 behavior, broken links, generated metadata/schema/feed checks, and Lighthouse assessment. Complete domain/host checks when the domain is available.

## Done criteria and deferred scope

- Home, writing index, and a representative article share the chosen theme and work from narrow mobile to desktop.
- Core article content and navigation work without client JavaScript; long code and tables do not overflow the page.
- A new post can be published from the documented template without editing shared UI or repeating SEO configuration.
- Production output excludes drafts and contains correct canonical URLs, discoverability files, and schema matching visible content.
- Relevant checks pass. Investigate material accessibility/performance problems rather than treating a Lighthouse score alone as acceptance.
- Defer comments, search, CMS, newsletter backend, theme toggle, and elaborate motion until a concrete need appears.

## Agent guidance

The root `AGENTS.md` records the approved direction, separate layouts, working palette, and content source. After implementation, add actual component/content paths and commands. It should keep future agents on the same article format without preventing a justified new block from being introduced centrally.
