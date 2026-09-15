import { sva } from "styled-system/css";

export const experienceSection = sva({
  slots: ["root", "timeline"],
  base: {
    root: {
      maxW: "content",
      mx: "auto",
      px: "pageX",
      py: "sectionY",
      borderTop: "hairline solid token(colors.divider)",
      "& > h2": {
        fontSize: "sectionTitle",
        letterSpacing: "-0.04em",
        mb: "0.75rem",
      },
      "& > p": {
        maxW: "reading",
        color: "rgba(36, 43, 39, 0.72)",
        lineHeight: "body",
        mb: "2rem",
      },
    },
    timeline: {
      display: "grid",
      gap: "gap",
    },
  },
});
