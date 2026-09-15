import { sva } from "styled-system/css";

export const experienceCard = sva({
  slots: ["root", "header", "body", "logo", "role", "date"],
  base: {
    root: {
      border: "hairline solid token(colors.divider)",
      borderRadius: "card",
      bg: "white",
      boxShadow: "card",
      overflow: "hidden",
    },
    header: {
      display: "grid",
      gridTemplateColumns: { base: "auto 1fr", md: "auto 1fr auto" },
      gap: "gap",
      alignItems: "center",
      p: "1.25rem",
      borderBottom: "hairline solid token(colors.divider)",
    },
    body: {
      p: "1.25rem",
      color: "rgba(36, 43, 39, 0.78)",
      lineHeight: "body",
      "& > ul": { pl: "1.2rem" },
      "& li + li": { mt: "0.65rem" },
      "& li::marker": { color: "accent" },
    },
    logo: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "accent",
      "& svg": { maxW: "2rem", maxH: "2rem" },
    },
    role: {
      fontSize: "1.05rem",
      fontWeight: 700,
    },
    date: {
      gridColumn: { base: "2", md: "auto" },
      color: "accent",
      fontSize: "0.92rem",
      fontWeight: 700,
    },
  },
});
