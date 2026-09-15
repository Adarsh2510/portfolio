import { sva } from "styled-system/css";

export const footer = sva({
  slots: ["root", "inner", "links", "link"],
  base: {
    root: {
      borderTop: "hairline solid token(colors.divider)",
      mt: "4rem",
    },
    inner: {
      maxW: "content",
      mx: "auto",
      px: "pageX",
      py: "2rem",
      display: "flex",
      justifyContent: "space-between",
      gap: "gap",
      flexWrap: "wrap",
      color: "rgba(36, 43, 39, 0.72)",
      fontSize: "0.95rem",
    },
    links: {
      display: "flex",
      gap: "gap",
      flexWrap: "wrap",
    },
    link: {
      color: "ink",
      textDecoration: "none",
      _hover: { color: "accent" },
    },
  },
});
