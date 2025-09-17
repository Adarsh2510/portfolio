import { css } from "styled-system/css";

export const experienceContainer = css({
  backgroundColor: "#cfd1e8",
  padding: "3rem 2rem",
  position: "relative",
  overflow: "hidden",
  _before: {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(197, 172, 232, 0.1) 0%, rgba(207, 209, 232, 0.8) 100%)",
    zIndex: 0,
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
  "& > h2": {
    fontSize: "3.5rem",
    fontWeight: "600",
    color: "#2d2d32",
    textAlign: "center",
    marginBottom: "1rem",
    background: "linear-gradient(135deg, #723cb0, #b78ee6)",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  "& > p": {
    fontSize: "1.3rem",
    fontWeight: "400",
    paddingBottom: "3rem",
    textAlign: "center",
    color: "#3d3d42",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
});

export const timelineContainer = css({
  display: "flex",
  flexDir: "column",
  alignItems: "center",
  gap: "2.5rem",
  position: "relative",
  "& > div": {
    animationDelay: "calc(var(--index) * 0.2s)",
  },
  "& > div:nth-child(1)": {
    "--index": "0",
  },
  "& > div:nth-child(2)": {
    "--index": "1",
  },
  "& > div:nth-child(3)": {
    "--index": "2",
  },
  "& > div:nth-child(4)": {
    "--index": "3",
  },
  "& > div:nth-child(5)": {
    "--index": "4",
  },
});
