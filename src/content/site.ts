export const isIndexable = process.env.VERCEL_ENV === "production";

export const site = {
  name: "Adarsh Trivedi",
  role: "Senior Frontend Engineer",
  email: "adarsh25trivedi@gmail.com",
  origin: process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://adarshtrivedi.com",
  description:
    "Senior frontend engineer in Bengaluru, building accessible, performant web applications with React, Next.js, and TypeScript.",
  socialLinks: [
    { label: "GitHub", href: "https://github.com/Adarsh2510" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/adarsh2510/" },
    { label: "X", href: "https://twitter.com/adarsh__trivedi" },
  ],
} as const;

export const navigation = [
  { label: "Work", href: "/#work" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;
