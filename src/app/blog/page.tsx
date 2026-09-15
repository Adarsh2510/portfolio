import type { Metadata } from "next";
import { ArticlesCarousel } from "@/app/components/articlesCarousel";
import { listedPosts } from "@/content/posts";
import { defaultOgImage } from "@/content/seo";
import { site } from "@/content/site";
import { blogPage } from "./styles";

export const metadata: Metadata = {
  title: "Writing",
  description: "Articles and notes from Adarsh Trivedi.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: site.name,
    title: `Writing — ${site.name}`,
    description: "Articles and notes from Adarsh Trivedi.",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Writing — ${site.name}`,
    description: "Articles and notes from Adarsh Trivedi.",
    images: [defaultOgImage.url],
  },
};

export default function BlogPage() {
  const styles = blogPage();

  return (
    <section className={styles.root} aria-labelledby="writing-heading">
      <p className={styles.eyebrow}>Writing</p>
      <h1 id="writing-heading" className={styles.title}>
        Practical notes from the workbench.
      </h1>
      <p className={styles.body}>
        Case studies and notes on frontend engineering, performance, migrations, and AI-assisted workflows.
      </p>

      <ArticlesCarousel posts={listedPosts} />
    </section>
  );
}
