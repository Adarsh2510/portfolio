import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/app/components/article";
import { getPost, publishedPosts } from "@/content/posts";
import { defaultOgImage, jsonLd } from "@/content/seo";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.listed === false ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      authors: [site.name],
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [defaultOgImage.url],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);

  if (!post) notFound();

  const url = `${site.origin}/blog/${post.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        author: { "@type": "Person", name: site.name, url: site.origin },
        mainEntityOfPage: url,
        url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.origin },
          { "@type": "ListItem", position: 2, name: "Writing", item: `${site.origin}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <ArticleLayout post={post} />
    </>
  );
}
