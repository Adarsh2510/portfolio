import type { Metadata } from "next";
import { blogPage } from "./styles";

export const metadata: Metadata = {
  title: "Writing",
  description: "Articles and notes from Adarsh Trivedi.",
  alternates: {
    canonical: "/blog",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function BlogPage() {
  const styles = blogPage();

  return (
    <section className={styles.root} aria-labelledby="writing-heading">
      <p className={styles.eyebrow}>Writing</p>
      <h1 id="writing-heading" className={styles.title}>
        Notes are coming soon.
      </h1>
      <p className={styles.body}>
        I&apos;m setting up a static writing space for practical frontend notes, migration learnings, and AI experiments. Drafts stay unpublished until they are ready.
      </p>
    </section>
  );
}
