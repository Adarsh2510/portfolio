import { sva } from "styled-system/css";

export const homePage = sva({
  slots: ["section", "sectionTitle", "workGrid", "workCard", "prose"],
  base: {
    section: {
      maxW: "content",
      mx: "auto",
      px: "pageX",
      py: "sectionY",
      borderTop: "hairline solid token(colors.divider)",
    },
    sectionTitle: {
      fontSize: "sectionTitle",
      letterSpacing: "-0.04em",
      mb: "1.5rem",
    },
    workGrid: {
      display: "grid",
      gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" },
      gap: "gap",
    },
    workCard: {
      border: "hairline solid token(colors.divider)",
      borderRadius: "card",
      p: "1.25rem",
      bg: "white",
      boxShadow: "card",
      "& > p:first-child": { color: "accent", fontWeight: 700, mb: "0.75rem" },
      "& > h3": { fontSize: "1.25rem", mb: "0.75rem" },
      "& > p": { lineHeight: "1.65", color: "rgba(36, 43, 39, 0.76)" },
      "& a": { color: "accent", fontWeight: 700 },
    },
    prose: {
      maxW: "reading",
      color: "rgba(36, 43, 39, 0.76)",
      fontSize: "body",
      lineHeight: "body",
      "& a": { color: "accent", fontWeight: 700 },
    },
  },
});
