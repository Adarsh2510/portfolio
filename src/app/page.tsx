import Link from "next/link";
import Banner from "./components/banner";
import Experience from "./components/experience";
import { homePage } from "./page.styles";
import { selectedWork } from "@/content/portfolio";
import { publishedPosts } from "@/content/posts";
import { homeJsonLd, jsonLd } from "@/content/seo";
import { site } from "@/content/site";

export default function Home() {
  const styles = homePage();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homeJsonLd) }}
      />
      <Banner />

      <section id="work" className={styles.section} aria-labelledby="work-heading">
        <h2 id="work-heading" className={styles.sectionTitle}>
          Selected work
        </h2>
        <div className={styles.workGrid}>
          {selectedWork.map((work) => (
            <article key={work.title} className={styles.workCard}>
              <p>{work.meta}</p>
              <h3>{work.title}</h3>
              <p>{work.summary}</p>
              {"href" in work ? (
                <p>
                  <Link href={work.href} target="_blank" rel="noreferrer" prefetch={false}>
                    Visit project
                  </Link>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {publishedPosts.length > 0 ? (
        <section className={styles.section} aria-labelledby="writing-heading">
          <h2 id="writing-heading" className={styles.sectionTitle}>
            Writing
          </h2>
          <div className={styles.writingRail} aria-label="Published articles">
            {publishedPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.writingCard}>
                <p>{post.topic} · {post.readingTime}</p>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <Experience />

      <section id="contact" className={styles.section} aria-labelledby="contact-heading">
        <h2 id="contact-heading" className={styles.sectionTitle}>
          Contact
        </h2>
        <p className={styles.prose}>
          Reach me at <Link href={`mailto:${site.email}`}>{site.email}</Link>, or find me on{" "}
          <Link href="https://github.com/Adarsh2510" target="_blank" rel="noreferrer" prefetch={false}>
            GitHub
          </Link>{" "}
          and{" "}
          <Link href="https://www.linkedin.com/in/adarsh2510/" target="_blank" rel="noreferrer" prefetch={false}>
            LinkedIn
          </Link>
          .
        </p>
      </section>
    </>
  );
}
