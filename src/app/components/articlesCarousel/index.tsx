"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Post } from "@/content/posts";
import { articlesCarousel } from "./styles";

export function ArticlesCarousel({ posts }: { posts: Post[] }) {
  const styles = articlesCarousel();
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "previous" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const offset = direction === "next" ? track.clientWidth * 0.85 : -track.clientWidth * 0.85;
    track.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.controls} aria-label="Article carousel controls">
          <button className={styles.button} type="button" onClick={() => scroll("previous")} aria-label="Previous articles">
            ‹
          </button>
          <button className={styles.button} type="button" onClick={() => scroll("next")} aria-label="Next articles">
            ›
          </button>
        </div>
      </div>
      <div ref={trackRef} className={styles.track} aria-label="Published articles">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
            <p className={styles.meta}>
              {post.topic} · {post.readingTime}
            </p>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
