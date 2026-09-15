import { sva } from "styled-system/css";

export const articlesCarousel = sva({
  slots: ["root", "header", "controls", "button", "track", "card", "meta"],
  base: {
    root: { mt: "2rem" },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      mb: "0.75rem",
    },
    controls: {
      display: { base: "none", md: "flex" },
      gap: "0.5rem",
    },
    button: {
      w: "2.25rem",
      h: "2.25rem",
      border: "hairline solid token(colors.divider)",
      borderRadius: "pill",
      bg: "canvas",
      color: "ink",
      cursor: "pointer",
      _hover: { borderColor: "accent", color: "accent" },
      _disabled: { opacity: 0.45, cursor: "not-allowed" },
    },
    track: {
      display: "grid",
      gridAutoFlow: "column",
      gridAutoColumns: { base: "88%", md: "minmax(360px, 44%)", lg: "minmax(390px, 36%)" },
      gap: "gap",
      overflowX: "auto",
      overscrollBehaviorX: "contain",
      scrollSnapType: "x mandatory",
      scrollBehavior: "smooth",
      pb: "0.5rem",
      scrollbarWidth: "thin",
    },
    card: {
      scrollSnapAlign: "start",
      border: "hairline solid token(colors.divider)",
      borderRadius: "card",
      p: "1.25rem",
      bg: "rgba(255, 255, 255, 0.38)",
      textDecoration: "none",
      minH: "12rem",
      _hover: { borderColor: "accent" },
      "& h3": { fontSize: "1.35rem", mb: "0.75rem" },
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
