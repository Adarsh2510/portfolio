import { site } from "./site";

export const defaultOgImage = {
  url: "/bannerImage.jpg",
  width: 2000,
  height: 1125,
  alt: "Illustration of a developer working on a laptop",
} as const;

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.origin}/#website`,
      url: site.origin,
      name: site.name,
      description: site.description,
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${site.origin}/#person`,
      name: site.name,
      url: site.origin,
      email: `mailto:${site.email}`,
      jobTitle: site.role,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      sameAs: site.socialLinks.map((link) => link.href),
    },
  ],
} as const;

export const jsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c");
