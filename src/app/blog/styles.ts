import { sva } from "styled-system/css";

export const blogPage = sva({
  slots: ["root", "eyebrow", "title", "body"],
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
  },
});
