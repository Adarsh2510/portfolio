import { sva } from "styled-system/css";

export const blogPage = sva({
  slots: ["root", "eyebrow", "title", "body", "grid", "card", "meta"],
  base: {
    root: {
      maxW: "content",
      mx: "auto",
      px: "pageX",
      py: "sectionY",
    },
    eyebrow: {
      color: "accent",
      fontWeight: 700,
      mb: "1rem",
    },
    title: {
      fontSize: "hero",
      letterSpacing: "-0.06em",
      lineHeight: 1,
      mb: "1rem",
    },
    body: {
      maxW: "reading",
      color: "rgba(36, 43, 39, 0.76)",
      fontSize: "body",
      lineHeight: "body",
    },
    grid: {
      mt: "2rem",
      display: "grid",
      gap: "gap",
    },
    card: {
      display: "block",
      border: "hairline solid token(colors.divider)",
      borderRadius: "card",
      p: "1.25rem",
      bg: "rgba(255, 255, 255, 0.38)",
      textDecoration: "none",
      _hover: { borderColor: "accent" },
      "& h2": { fontSize: "1.4rem", mb: "0.5rem" },
      "& p": { color: "rgba(36, 43, 39, 0.76)", lineHeight: "body" },
    },
    meta: {
      color: "accent!",
      fontWeight: 700,
      fontSize: "0.92rem",
      mb: "0.75rem",
    },
  },
});
