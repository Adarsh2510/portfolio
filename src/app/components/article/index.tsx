import type { Post } from "@/content/posts";
import { site } from "@/content/site";
import { articleLayout } from "./styles";

export function ArticleLayout({ post }: { post: Post }) {
  const styles = articleLayout();
  const date = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${post.publishedAt}T00:00:00Z`));

  return (
    <article className={styles.root}>
      <aside className={styles.nav} aria-label="Article sections">
        <p>Contents</p>
        <ol>
          {post.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ol>
      </aside>

      <div className={styles.content}>
        <details className={styles.mobileNav}>
          <summary>Contents</summary>
          <ol>
            {post.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </details>

        <p className={styles.topic}>{post.topic}</p>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.standfirst}>{post.standfirst}</p>
        <p className={styles.meta}>
          {site.name} · {date} · {post.readingTime}
        </p>
        <p className={styles.takeaway}>
          <strong>Takeaway:</strong> {post.takeaway}
        </p>

        <div className={styles.body}>
          {post.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2>{section.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: section.html }} />
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
