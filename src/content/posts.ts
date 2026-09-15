export type PostStatus = "published" | "draft";

export type PostSection = {
  id: string;
  title: string;
  html: string;
};

export type Post = {
  slug: string;
  status: PostStatus;
  title: string;
  description: string;
  topic: string;
  publishedAt: string;
  readingTime: string;
  standfirst: string;
  takeaway: string;
  sections: PostSection[];
  listed?: boolean;
};

export const posts = [

  {
    slug: "mongodb-btree-prefix-search",
    status: "published",
    title: "Making a CMS Page Selector Fast with MongoDB B-tree Indexes",
    description:
      "A small admin performance fix: changing page search from regex-like matching to prefix range queries so MongoDB could use a UID index.",
    topic: "Performance",
    publishedAt: "2025-07-10",
    readingTime: "7 min read",
    standfirst:
      "A page selector in an internal CMS was slower than it needed to be. The useful fix was not a cache or a new service — it was shaping the search query so MongoDB could walk the existing B-tree index.",
    takeaway:
      "An index only helps when the query can use it. For known prefix search, a bounded range on the indexed field can be much cheaper than a broad pattern match.",
    sections: [
      {
        id: "executive-summary",
        title: "Executive summary",
        html: `
          <p>This was a small performance fix in a CMS admin UI. Editors needed to select pages by UID. The generic selector was too slow for that flow, especially when searching through a larger pages collection.</p>
          <p>The change replaced the default relationship selector with a custom page selector. It fetched only the fields the UI needed, debounced input, and changed the search from a broad match to an indexed prefix range.</p>
          <table>
            <thead><tr><th>Area</th><th>Before</th><th>After</th></tr></thead>
            <tbody>
              <tr><td>UI</td><td>Generic relationship selector</td><td>Purpose-built page selector</td></tr>
              <tr><td>Response</td><td>More data than the dropdown needed</td><td>Projection for only the option label and value</td></tr>
              <tr><td>Search</td><td>Broad UID match</td><td>Lowercase UID prefix range</td></tr>
            </tbody>
          </table>
        `,
      },
      {
        id: "why-the-query-shape-mattered",
        title: "Why the query shape mattered",
        html: `
          <p>A MongoDB B-tree index stores values in sorted order. That makes equality and range scans cheap: the database can seek to a starting point in the index and walk forward until the range ends.</p>
          <p>That property is useful for prefix search when the identifier format is constrained. For normalized lowercase ASCII-style UIDs under simple binary collation, if a user types <code>par</code>, matching UIDs can be queried as a range:</p>
          <pre><code>uid &gt;= "par"
uid &lt;  "par￿"</code></pre>
          <p>The upper bound uses a high Unicode sentinel. That is a convenient bound for this restricted identifier alphabet, not a universal Unicode prefix-search rule. The important part is the intent: this dropdown is searching from the start of a normalized UID, not anywhere inside it.</p>
          <p>That distinction is important. A contains-style regex can be convenient for users, but it often prevents the database from using the sorted index efficiently. The index is ordered by the beginning of the value; it cannot jump directly to “contains this substring somewhere.”</p>
        `,
      },
      {
        id: "what-changed-in-the-selector",
        title: "What changed in the selector",
        html: `
          <p>The selector kept the UI simple. It debounced search input, queried the pages collection, and asked only for the option value and label the dropdown needed.</p>
          <pre><code>fields: ["id", "uid"]
limit: 10</code></pre>
          <p>The search condition changed to a bounded range:</p>
          <pre><code>where: input
  ? {
      and: [
        { uid: { greater_than_equal: input.toLowerCase() } },
        { uid: { less_than: input.toLowerCase() + "\\uFFFF" } },
      ],
    }
  : {}</code></pre>
          <p>The PR also kept a separate lookup for selected IDs. That mattered because a selected value may not be present in the current search results. The dropdown still needs to render the saved label when the form loads.</p>
        `,
      },
      {
        id: "what-i-checked",
        title: "What I checked",
        html: `
          <p>The useful part is the method: compare the query plan before and after, not just the UI feeling faster. On representative data, validate the winning plan, keys examined, documents examined, and response shape.</p>
          <p>The checks worth keeping are:</p>
          <ul>
            <li>Does the winning plan use the UID index?</li>
            <li>How many keys were examined?</li>
            <li>How many documents were examined?</li>
            <li>Is the query returning only fields the UI needs?</li>
            <li>Does the selected value still render when it is not in the current search result?</li>
          </ul>
        `,
      },
      {
        id: "scope",
        title: "Scope",
        html: `
          <p>I still kept the scope small. This was not a generic search framework. It was a specific selector for a known access pattern: editors search page UIDs by prefix and choose one or more pages.</p>
        `,
      },
      {
        id: "takeaways",
        title: "Takeaways",
        html: `
          <ul>
            <li>Do not assume an indexed field is fast. Check whether the query shape can use the index.</li>
            <li>Prefix search and contains search are different database problems.</li>
            <li>Admin dropdowns should fetch the smallest useful projection, especially on every keystroke.</li>
            <li>A small custom control can be better than a generic relationship field when the access pattern is known.</li>
            <li>Keep the UX honest: if you optimize for prefix search, design the placeholder and behavior around prefix search.</li>
          </ul>
        `,
      },
    ],
  },

  {
    slug: "agent-skills-i-use",
    status: "published",
    title: "Agent Skills I Actually Use",
    description:
      "A short note on the reusable agent skills I keep reaching for: pressure-testing, simplicity checks, peer review, token cleanup, and project kickoff.",
    topic: "AI-assisted engineering",
    publishedAt: "2025-08-20",
    readingTime: "6 min read",
    standfirst:
      "I do not use agent skills as magic commands. I use them as small operating procedures: ask harder questions, keep work simple, review with receipts, normalize design tokens, and start projects with less drift.",
    takeaway:
      "The useful skill is not the prompt itself. It is the repeatable boundary it creates: when to ask questions, what evidence is required, and what kind of output is acceptable.",
    sections: [
      {
        id: "how-i-think-about-skills",
        title: "How I think about skills",
        html: `
          <p>Skills are the lightweight playbooks I use with coding agents. I reach for them when a task has a repeatable shape: review this PR, challenge this plan, normalize these styles, or set up a project branch without losing the thread.</p>
          <p>The best ones are boring. They do not try to be a second brain. They make one kind of work easier to repeat, and they make the acceptance criteria harder to skip.</p>
        `,
      },
      {
        id: "general-purpose-skills",
        title: "General-purpose skills",
        html: `
          <p>Two skills are useful across almost any engineering task:</p>
          <ul>
            <li><strong>Grill me</strong> — a pressure-test before building. It is useful when I have an approach but want the weak assumptions challenged before code exists.</li>
            <li><strong><a href="https://github.com/DietrichGebert/ponytail">Ponytail</a></strong> — a simplicity pass. It pushes toward deleting, inlining, or deferring anything that does not need to exist yet.</li>
          </ul>
          <p>I like these because they do not make the agent more ambitious. They make it more skeptical.</p>
        `,
      },
      {
        id: "custom-skills",
        title: "Custom skills I keep using",
        html: `
          <p>I also have a few custom skills that grew out of repeated work patterns. I keep their detailed notes separate so this article stays readable:</p>
          <ul>
            <li><a href="/blog/agent-skill-peer-review">Peer review</a> — reviews a teammate's diff against the repository's own rules, not memory.</li>
            <li><a href="/blog/agent-skill-token-normalization">Token normalization</a> — cleans migrated UI styles into the design/token system after visual parity.</li>
            <li><a href="/blog/agent-skill-project-start">Project start</a> — turns a task into a ticket, branch, and implementation outline so the work starts with less drift.</li>
          </ul>
        `,
      },
      {
        id: "what-makes-a-skill-useful",
        title: "What makes a skill useful",
        html: `
          <p>The skills I keep are the ones that create a clear boundary. A review skill should not silently edit. A planning skill should not jump into implementation. A token cleanup skill should run after visual parity, not before.</p>
          <p>That separation is the point. When the skill is small, I can tell whether it did its job.</p>
        `,
      },
    ],
  },
  {
    slug: "agent-skill-peer-review",
    status: "published",
    listed: false,
    title: "Agent Skill: Peer Review",
    description:
      "A private linked note about a custom peer-review skill that reviews PRs against repository-specific rules.",
    topic: "Agent skills",
    publishedAt: "2025-08-20",
    readingTime: "3 min read",
    standfirst:
      "A peer-review skill is useful when it treats the repository as the source of truth and requires evidence for every finding.",
    takeaway:
      "Good agent review is not a list of opinions. It is a small number of claims backed by repo rules, sibling code, or a check that actually ran.",
    sections: [
      {
        id: "what-it-does",
        title: "What it does",
        html: `
          <p>This skill reviews someone else's pull request. It first looks for the repository's own guidance: working agreements, contribution docs, local agent files, design notes, or sibling patterns.</p>
          <p>Then it reviews the diff against that context. The important constraint is that every finding needs a receipt: a rule, a neighboring implementation, or a reproducible check.</p>
        `,
      },
      {
        id: "why-it-helps",
        title: "Why it helps",
        html: `
          <p>It reduces two common review problems: generic advice and confident-but-wrong comments. The skill is intentionally read-only until comments are approved, so it stays a reviewer instead of becoming a surprise implementer.</p>
        `,
      },
      {
        id: "sanitized-skill-notes",
        title: "Sanitized skill notes",
        html: `
          <p>This is the public version of the saved skill markdown. I removed machine paths, repository names, and private review references.</p>
          <pre><code>name: peer-review
purpose: Review another person's pull request using the repository's own rules.

not for:
  - silently editing the author's code
  - reviewing from memory
  - posting comments without approval

workflow:
  1. Find the repository guidance.
     Look for working agreements, contribution docs, local agent files,
     architecture docs, and nearby examples.

  2. Read what the PR claims.
     Review against the stated intent, not a different design preference.

  3. Review in passes.
     - conventions from the repo docs
     - reuse of existing helpers, components, and patterns
     - sibling consistency in nearby code
     - correctness, empty states, boundaries, and failure paths

  4. Verify before writing a finding.
     A finding needs a receipt: a rule, sibling code, or a check that ran.

  5. Ask before posting.
     Draft review comments first; only post after explicit approval.</code></pre>
        `,
      },
    ],
  },
  {
    slug: "agent-skill-token-normalization",
    status: "published",
    listed: false,
    title: "Agent Skill: Token Normalization",
    description:
      "A private linked note about cleaning migrated UI styles into a design-token system after visual parity.",
    topic: "Agent skills",
    publishedAt: "2025-08-20",
    readingTime: "3 min read",
    standfirst:
      "Token cleanup is safest after the UI already matches. The goal is to replace arbitrary values with design-system primitives without changing the result.",
    takeaway:
      "Visual accuracy comes first. Tokenization is a cleanup pass, not a redesign pass.",
    sections: [
      {
        id: "what-it-does",
        title: "What it does",
        html: `
          <p>This skill reviews migrated UI code and colocated style files, then replaces arbitrary colors, spacing, typography, and sizing with the closest approved design tokens where safe.</p>
          <p>It also checks whether a design-system primitive should replace custom markup. The goal is consistency with the token system, not clever refactoring.</p>
        `,
      },
      {
        id: "why-it-helps",
        title: "Why it helps",
        html: `
          <p>During migration, raw values often appear because the first priority is visual parity. A separate token pass keeps that pragmatic implementation step from becoming permanent design debt.</p>
        `,
      },
      {
        id: "sanitized-skill-notes",
        title: "Sanitized skill notes",
        html: `
          <p>This is the public version of the saved skill markdown. I replaced product, package, and repository names with generic placeholders.</p>
          <pre><code>name: token-normalization
purpose: Normalize migrated UI to design-system primitives and design tokens.

when to run:
  After visual parity is achieved, not before.

priority order:
  1. Preserve visual accuracy.
  2. Prefer design-system primitives for common UI elements.
  3. Prefer shared design tokens over raw values.
  4. Keep custom values only when no safe token exists.

checks:
  - replace raw colors with approved color tokens
  - replace spacing, sizing, typography, and borders with tokens where safe
  - consolidate matching typography into text styles
  - use token references consistently
  - avoid redesigning during cleanup

verification:
  Re-check the UI after token changes so cleanup does not create visual drift.</code></pre>
        `,
      },
    ],
  },
  {
    slug: "agent-skill-project-start",
    status: "published",
    listed: false,
    title: "Agent Skill: Project Start",
    description:
      "A private linked note about starting a task with a ticket, branch, and implementation outline.",
    topic: "Agent skills",
    publishedAt: "2025-08-20",
    readingTime: "2 min read",
    standfirst:
      "Project-start automation is useful when it turns a loose task into a named branch, a short plan, and explicit next steps.",
    takeaway:
      "The value is not ceremony. It is reducing drift before implementation begins.",
    sections: [
      {
        id: "what-it-does",
        title: "What it does",
        html: `
          <p>This skill takes a task description or existing ticket and sets up the working lane: ticket context, branch naming, and a small implementation outline.</p>
          <p>The public idea is simple: start with a stable reference and a branch that explains the work. Keep the operational details private and environment-specific.</p>
        `,
      },
      {
        id: "why-it-helps",
        title: "Why it helps",
        html: `
          <p>It prevents the first half hour of a task from becoming scattered setup. It also makes handoff easier because the branch, task, and plan share the same intent.</p>
        `,
      },
      {
        id: "sanitized-skill-notes",
        title: "Sanitized skill notes",
        html: `
          <p>This is the public version of the saved skill markdown. I replaced tracker names, project keys, branch conventions, and API details with placeholders.</p>
          <pre><code>name: project-start
purpose: Turn a task or existing ticket into a ready working lane.

workflow:
  1. Detect whether the prompt references an existing ticket.
     - if yes, fetch or summarize its intent
     - if no, draft a short ticket summary and description for approval

  2. Create or confirm the work item.
     Use the team's tracker and status flow.

  3. Create a feature branch.
     Suggested shape: [ticket-key]-[short-task-slug]

  4. Suggest implementation changes.
     - affected areas
     - likely files
     - data or API boundaries
     - checks to run

  5. Save a short plan.
     Keep the plan close to the work so future sessions can resume safely.</code></pre>
        `,
      },
    ],
  },
  {
    slug: "ai-agent-component-migration",
    status: "published",
    title: "What I Learned Trying to Automate a Frontend Migration",
    description:
      "A practical case study on several LLM-agent migration workflows I tried, what failed, and the smaller operating model that worked better.",
    topic: "AI-assisted engineering",
    publishedAt: "2025-08-01",
    readingTime: "12 min read",
    standfirst:
      "A large frontend migration became an experiment in agent architecture. I went in curious, broke a few of my own assumptions, and learned that the useful part was not a bigger prompt — it was bounded work, explicit evidence, and independent review.",
    takeaway:
      "Give coding agents bounded problems, not custody of an entire migration. Keep requirements and evidence outside the conversation, trace data back to working code, and make verification a separate job.",
    sections: [
      {
        id: "executive-summary",
        title: "Executive summary",
        html: `
          <p>I spent a few months experimenting with LLM coding agents on a large frontend migration. This is not a victory lap or a claim that I found a perfect system. It is a field note from a curious engineer who tried several workflows, broke many of them, and learned where agents helped — and where they confidently said “done” too early.</p>
          <p>The work was a component migration across a legacy frontend, a new frontend architecture, a CMS change, and a shared design system. I have anonymized internal names here. Think of it as a legacy frontend, a new frontend, a design system, and a migration engine.</p>
          <table>
            <thead><tr><th>Experiment</th><th>What I tried</th><th>What broke</th><th>What I kept</th></tr></thead>
            <tbody>
              <tr><td>Six-phase pipeline</td><td>Research → context → plan → build → integrate → review</td><td>Context filled up before verification</td><td>The phase order</td></tr>
              <tr><td>Architect/executor</td><td>One agent designs; smaller agents implement</td><td>The architect still ran out of context</td><td>Separate planning from implementation</td></tr>
              <tr><td>ERD/spec-first</td><td>Exhaustive component document before coding</td><td>Intent did not identify exact utilities or data sources</td><td>Research artifacts</td></tr>
              <tr><td>Lead agent + skills</td><td>One orchestrator with passes, skills, IDs, state files</td><td>The lead session accumulated too much context</td><td>Traceability and on-disk artifacts</td></tr>
              <tr><td>Visual test agent</td><td>Agent compares screenshots and fixes</td><td>It accepted differences and skipped root-cause checks</td><td>Component screenshots + computed styles</td></tr>
              <tr><td>Script-controlled loop</td><td>Shell script controls iterations; fresh agents do bounded work</td><td>Still needs prompt tuning</td><td>This became the most useful direction</td></tr>
            </tbody>
          </table>
        `,
      },
      {
        id: "actual-problem",
        title: "The actual problem",
        html: `
          <p>At first, I treated the migration as a code generation task. That was too simple.</p>
          <p>A component migration usually required understanding what the legacy component did, identifying variants and fallbacks, deciding what belonged in the design system versus the application layer, recreating the data boundary in the new frontend, matching desktop and mobile output, and proving that the result did not just look plausible.</p>
          <p>This is why a “convert this component” prompt was never enough. The code could compile and still use the wrong data source. The screenshot could look close and still use the wrong token. A migrated component could be structurally wrong even if the UI seemed fine.</p>
          <p>The hardest part was not getting an agent to write code. It was getting the workflow to preserve judgment, evidence, and verification across a task that was too large for one conversation.</p>
        `,
      },
      {
        id: "early-workflows",
        title: "Early workflows: useful shape, weak boundaries",
        html: `
          <p>The first serious attempt was a clean pipeline:</p>
          <pre><code>Research → Context → Plan → Build → Integrate → Review</code></pre>
          <p>Each phase had its own instructions. The idea was reasonable: the researcher should not be writing code, and the builder should not be doing review. The phase structure matched how I would manually approach the work, but the same long-running session still carried too much history.</p>
          <p>Next, I tried an architect/executor model. One agent would read everything and produce a detailed design; smaller workers would implement it without making architectural decisions. This improved some things, but the architect had to absorb so much source context that its own window became crowded before the design was complete.</p>
          <p>Then I tried exhaustive research documents. The research artifact was genuinely helpful, but it still did not prevent incorrect code. “Fetch related content” describes an intention. It does not identify the existing utility, required filter, response shape, or fallback behavior in the destination frontend.</p>
        `,
      },
      {
        id: "orchestration-failure",
        title: "More orchestration did not automatically mean more reliability",
        html: `
          <p>The next version was more elaborate: a migration lead orchestrated passes, generated state files, and linked artifacts with stable IDs.</p>
          <pre><code>Lead agent
├─ extract intent
├─ define boundary
├─ design design-system component
├─ implement design-system work
├─ plan frontend integration
├─ implement frontend work
├─ run visual test
└─ review</code></pre>
          <p>This introduced good ideas: artifacts on disk, stable IDs for tracing requirements, explicit pass status, and specialized skills. But the lead agent still ran too much of the show in one conversation.</p>
          <p>By late passes, it had seen the research, plans, implementation attempts, partial fixes, and tool output. The summaries it wrote were also too optimistic. A status file might say “design complete” while missing an unresolved variant. A later session would trust that label and move on.</p>
          <p>The lesson for me was simple: state on disk is good. State written as an optimistic summary by an overloaded agent is not enough.</p>
        `,
      },
      {
        id: "visual-testing",
        title: "Visual testing needed evidence, not vibes",
        html: `
          <p>Visual testing looked like the obvious answer: compare old and new, fix, repeat. In practice, this exposed another set of problems.</p>
          <p>The agent would sometimes fix one thing and stop without re-running the comparison, dismiss a mismatch as “expected,” compare full-page screenshots where local differences disappeared, or inspect screenshots when exact computed styles were needed.</p>
          <p>The useful version became more mechanical:</p>
          <pre><code>1. Capture component-scoped screenshots
2. Extract computed styles and measurements
3. List all differences
4. Investigate root causes in source
5. Batch fixes
6. Rebuild once
7. Verify again</code></pre>
          <p>Screenshots were good for layout. Computed styles were better for exact values like color, font weight, dimensions, and spacing. “Looks close” was not enough when the difference was a wrong token or stale build.</p>
        `,
      },
      {
        id: "script-controlled-loop",
        title: "The version that worked better",
        html: `
          <p>The version that worked better was simpler: a shell script controlled the loop, and agents did bounded work inside it.</p>
          <pre><code>Research phase
  │
  ▼
Human gate
- confirm scope
- choose one variant
- provide reference screenshots
  │
  ▼
Implementation loop
  │
  ├─ fresh implementer session
  ├─ controlled rebuild / server restart
  ├─ fresh verifier session
  └─ status decides next iteration</code></pre>
          <p>The script was not smarter than the agent. That was the point. It did not get tired, did not want to declare victory, and did not forget to run the next iteration because the previous one felt close.</p>
          <p>Agents were still useful. They researched, implemented, and reviewed. But they no longer owned the loop. That distinction mattered.</p>
        `,
      },
      {
        id: "current-workflow",
        title: "How my workflow has evolved",
        html: `
          <p>My current setup has moved from a single all-purpose agent toward supervised, bounded subagents.</p>
          <pre><code>Main session
├─ scout: map files and risks
├─ context builder: collect conventions and patterns
├─ planner: write the implementation plan
├─ worker: implement one coherent slice
├─ reviewer: inspect the diff independently
└─ simplicity pass: remove unnecessary complexity</code></pre>
          <p>For UI work, browser checks are part of the loop. For code changes, I try to separate implementation from review. For over-engineering, I run a deliberately strict simplicity pass: what can be deleted, inlined, or deferred?</p>
          <p>This is not magic. It still depends on good prompts, good evidence, and a human who is willing to stop when something is assumed. But it is less dependent on one long context remembering everything.</p>
        `,
      },
      {
        id: "rules-i-would-keep",
        title: "Rules I would keep",
        html: `
          <ul>
            <li><strong>Every important field needs evidence.</strong> If you cannot trace it, mark it unknown.</li>
            <li><strong>Pick one variant before implementation.</strong> Let the agent identify variants, but make the target explicit.</li>
            <li><strong>Keep composition boundaries explicit.</strong> Decide what belongs in the design system and what belongs in the application adapter.</li>
            <li><strong>Do not let the implementer verify itself.</strong> Verification should be a separate job with fresh context and concrete checks.</li>
            <li><strong>Use screenshots and measurements together.</strong> Screenshots catch layout; computed styles catch exact values.</li>
            <li><strong>Automate boring infrastructure.</strong> Rebuilds, server restarts, required artifacts, and retry limits should not depend on memory.</li>
          </ul>
          <p>The main lesson for me was not “agents are bad at migration.” They were useful. The lesson was that broad ownership is different from bounded help. Do not start by designing the perfect autonomous agent. Start by making wrong assumptions easier to catch.</p>
        `,
      },
    ],
  },
] satisfies Post[];

export const publishedPosts = posts.filter((post) => post.status === "published");

export const listedPosts = publishedPosts
  .filter((post) => post.listed !== false)
  .sort((first, second) => first.publishedAt.localeCompare(second.publishedAt));

export const getPost = (slug: string) => publishedPosts.find((post) => post.slug === slug);
