import { sva } from "styled-system/css";

export const banner = sva({
  slots: ["root", "text", "image"],
  base: {
    root: {
      maxW: "content",
      mx: "auto",
      px: "pageX",
      py: { base: "3rem", md: "sectionY" },
      display: "grid",
      gridTemplateColumns: { base: "1fr", lg: "0.82fr 1.18fr" },
      gap: { base: "2rem", lg: "3.5rem" },
      alignItems: "center",
    },
    text: {
      maxW: "38rem",
      zIndex: 1,
      "& > h1": {
        fontSize: { base: "3.8rem", md: "5rem" },
        lineHeight: "tight",
        letterSpacing: "-0.06em",
      },
      "& > h2": {
        mt: "0.35rem",
        fontSize: { base: "2rem", md: "3rem" },
        lineHeight: "1.05",
        letterSpacing: "-0.05em",
      },
      "& > p": {
        mt: "1rem",
        fontSize: { base: "body", md: "lead" },
        lineHeight: "body",
        color: "rgba(36, 43, 39, 0.78)",
      },
    },
    image: {
      position: "relative",
      width: "100%",
      maxW: { base: "100%", lg: "640px" },
      justifySelf: { base: "center", lg: "end" },
      h: { base: "min(68vw, 360px)", md: "420px", lg: "clamp(420px, 38vw, 520px)" },
      mt: { base: "0.5rem", lg: 0 },
      borderRadius: "card",
      overflow: "hidden",
      border: "hairline solid token(colors.divider)",
      bg: "#fff",
      boxShadow: "0 24px 70px rgba(36, 43, 39, 0.08)",
      "& img": {
        objectFit: "cover",
        objectPosition: { base: "50% 76%", md: "50% 72%", lg: "52% 70%" },
      },
    },
  },
});
