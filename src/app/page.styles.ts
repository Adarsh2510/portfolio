import { sva } from "styled-system/css";

export const homePage = sva({
  slots: ["section", "sectionTitle", "workGrid", "workCard", "writingRail", "writingCard", "prose"],
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
      bg: "rgba(255, 255, 255, 0.38)",
      "& > p:first-child": { color: "accent", fontWeight: 700, mb: "0.75rem" },
      "& > h3": { fontSize: "1.25rem", mb: "0.75rem" },
      "& > p": { lineHeight: "1.65", color: "rgba(36, 43, 39, 0.76)" },
      "& a": { color: "accent", fontWeight: 700 },
    },
    writingRail: {
      display: "grid",
      gridAutoFlow: "column",
      gridAutoColumns: { base: "88%", md: "minmax(360px, 44%)" },
      gap: "gap",
      overflowX: "auto",
      scrollSnapType: "x mandatory",
      pb: "0.5rem",
    },
    writingCard: {
      scrollSnapAlign: "start",
      border: "hairline solid token(colors.divider)",
      borderRadius: "card",
      p: "1.25rem",
      bg: "note",
      textDecoration: "none",
      _hover: { borderColor: "accent" },
      "& p:first-child": { color: "accent", fontWeight: 700, mb: "0.75rem" },
      "& h3": { fontSize: "1.35rem", mb: "0.75rem" },
      "& p": { color: "rgba(36, 43, 39, 0.76)", lineHeight: "body" },
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
