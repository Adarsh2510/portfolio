import { readFileSync } from "node:fs";

const posts = readFileSync("src/content/posts.ts", "utf8");
const homepage = readFileSync("src/app/page.tsx", "utf8");
const blog = readFileSync("src/app/blog/page.tsx", "utf8");
const sitemap = readFileSync("src/app/sitemap.ts", "utf8");
const feed = readFileSync("src/app/feed.xml/route.ts", "utf8");

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

assert(
  /slug: "ai-agent-component-migration",[\s\S]*?status: "draft"/.test(posts),
  "AI migration article must stay draft until its first-person claims are verified.",
);

assert(
  /slug: "agent-skill-peer-review",[\s\S]*?listed: false/.test(posts) &&
    /slug: "agent-skill-token-normalization",[\s\S]*?listed: false/.test(posts) &&
    /slug: "agent-skill-project-start",[\s\S]*?listed: false/.test(posts),
  "Linked skill notes must stay unlisted.",
);

for (const [name, source] of Object.entries({ homepage, blog, sitemap, feed })) {
  assert(source.includes("listedPosts"), `${name} must use listedPosts, not every published route.`);
}

console.log("public content checks passed");
