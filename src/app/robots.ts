import type { MetadataRoute } from "next";
import { isIndexable, site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isIndexable ? { allow: "/" } : { disallow: "/" }),
    },
    sitemap: `${site.origin}/sitemap.xml`,
  };
}
