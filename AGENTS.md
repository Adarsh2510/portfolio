# Portfolio working agreement

## Purpose and current stage

- Build Adarsh Trivedi's personal portfolio around frontend engineering, selected work, and learnings, including experiments with AI.
- The user approved the Quiet Studio direction and two distinct layouts: a conventional portfolio homepage and an article/case-study layout with section navigation on the left and content on the right.
- Use the supplied resume and current `src/content/*` modules for role, location, selected work, and experience; newer content there supersedes older component copy.
- First visual milestone: homepage plus a separate article specimen, reviewed together before publishing infrastructure.
- Intended domain: `https://adarshtrivedi.com`. Domain ownership and production setup are not yet confirmed.

## Implementation principles

- Prefer static pages and content maintained in the repository. No CMS, database, authentication, or publishing dashboard is needed for the initial scope.
- Inspect existing patterns before adding code. The current stack is Next.js App Router, TypeScript, and Panda CSS; reuse it unless there is a concrete reason to change.
- Use shared theme tokens and components. Do not introduce a second styling system or dependency for something native HTML/CSS or existing tools can handle simply.
- Keep article text and essential navigation in generated HTML, usable without client JavaScript.
- Preserve unrelated work, including existing untracked experiments, unless their modification is explicitly in scope.

## Visual rules

- Keep the design clean, minimal, and readable, with generous spacing and a clear type hierarchy.
- Selected direction: off-white, dark ink, and restrained green; predominantly sans-serif typography. Theme tokens live in `panda.config.ts`: background `#F7F8F5`, text `#242B27`, accent `#315949`, divider `#DDE2DA`, occasional annotation background `#E8EDCF`.
- Keep the shared top header/navigation. The homepage has a normal vertical flow and no left-side section menu. Do not apply the Anthropic article layout to the homepage.
- Express personality through real work, natural copy, personal photography, and useful annotations. Do not add generic illustrations or simulated personal details to make the site appear authentic.
- Use shared values for color, typography, spacing, content widths, borders, and focus styles. Articles must inherit the portfolio theme.
- Avoid decorative motion, parallax, entrance animations, and animated backgrounds. Small interaction transitions must respect reduced-motion preferences.
- Support narrow screens, keyboard navigation, visible focus, semantic landmarks, accessible names, and sufficient contrast.

## Articles and reusable blocks

- Use one shared article layout. Individual articles supply content and metadata, not their own navigation, typography, colors, or layout CSS.
- Required metadata: stable slug, title, description, publication date, and topic. Author defaults centrally to Adarsh Trivedi. Add an updated date only after a meaningful content change.
- Article opening: topic, title, short standfirst, author/date/reading time, followed by a concise takeaway or introduction.
- Use one H1 supplied by the layout; content starts at H2, with H3 for subsections. Use stable heading anchors.
- Suggested learning narrative: context/problem, approach, examples or evidence, lessons/trade-offs, references. Short notes may omit sections that add no value.
- Standard prose blocks: headings, paragraphs, links, ordered/unordered lists, and blockquotes.
- Shared enhanced blocks, added when needed: language-labelled code, note/warning callout, figure with caption, and accessible comparison table. Diagrams use the same figure treatment.
- For long articles and case studies, place sticky section navigation on the left and article content on the right, beneath the shared header. Highlight the active section with progressive enhancement; anchor links must work without JavaScript. On mobile, use a collapsible contents menu above the article. Short notes may omit it.
- First planned article: how Adarsh used AI agents during the Prismic-to-Payload migration, alongside the frontend move from Next.js Pages Router to App Router and migration of components to the Espeon design system library. These three tracks are user-confirmed; their sequencing, agent assignments, examples, and results are still to be supplied. Do not infer speedup from unrelated resume metrics or publish a fabricated sample as a finished article.
- Niyati Prep's public project link is `https://niyatiprep.com`. The user reports it is temporarily down and is restoring it in parallel; retain the link as requested without claiming verified availability.
- Images need meaningful alternative text, or empty alt text when decorative, plus explicit dimensions. Code and tables may scroll within their containers on small screens.
- Do not invent personal experiences, employers, project outcomes, metrics, dates, or citations. Mark missing material as a draft for review and exclude drafts from production output.
- AI may help edit and illustrate; technical examples and factual claims must be checked before publication. Distinguish observed results from expectations.

## Discoverability

- Every published page needs an appropriate title, description, canonical URL, and social preview metadata.
- Use one configured site origin for URLs. Switch the production origin to the intended domain when ownership and deployment are confirmed.
- Generate sitemap and RSS entries from published article metadata. Drafts must not produce public routes, feed entries, or sitemap entries.
- Render JSON-LD in page HTML: site/person identity where appropriate, and BlogPosting plus breadcrumbs for articles. Structured data must match visible content.
- Keep author identity, dates, sources, internal links, and direct explanations clear for readers and crawlers.
- Do not promise rankings or AI citations. Do not add speculative GEO markup or files without a demonstrated use.
- Keep previews out of search. At launch verify HTTPS, preferred-host redirects, canonicals, robots rules, and sitemap URLs.

## Verification and publishing

- Document the actual publishing commands and content template in the README when publishing is implemented.
- For implementation changes, run relevant build, type, and lint checks using the repository's working scripts; update obsolete tooling when necessary.
- Inspect home, writing index, and a representative article at mobile and desktop sizes. Check keyboard access, links, image layout, and code/table overflow.
- Check generated metadata, JSON-LD, sitemap, feed, missing-page behavior, and draft exclusion when publishing infrastructure changes.
- Keep verification proportional. Add a small runnable regression check for non-trivial content-selection or parsing logic, not tests that merely mirror styles.
