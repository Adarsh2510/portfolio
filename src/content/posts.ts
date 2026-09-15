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
              <tr><td>Payload</td><td>More data than the dropdown needed</td><td>Projection for only the option label and value</td></tr>
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
    slug: "ai-agent-component-migration",
    status: "draft",
    title: "What I Learned Trying to Automate a Frontend Migration",
    description:
      "A practical case study on several LLM-agent migration workflows I tried, what failed, and the smaller operating model that worked better.",
    topic: "AI-assisted engineering",
    publishedAt: "2026-09-15",
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

export const getPost = (slug: string) => publishedPosts.find((post) => post.slug === slug);
