import { css } from "styled-system/css";

export const bannerContainer = css({
  display: "flex",
  flexDir: "row",
  justifyContent: "space-between",
  flexWrap: "wrap",
  alignItems: "center",
  lgDown: {
    flexWrap: "wrap-reverse",
  },
});

export const bannerText = css({
  paddingLeft: "2rem",
  "& > h1": { fontSize: "5rem" },
  "& > h2": { fontSize: "3rem" },
  "& > p": { fontSize: "1.5rem" },
  "& > p > a": {
    color: "#723cb0",
    fontWeight: 500,
  },
  lgDown: {
    "& > h1": { fontSize: "3.6rem" },
    "& > h2": { fontSize: "2rem" },
    "& > p": { fontSize: "1rem" },
    paddingBottom:'2rem',
  },
});

export const bannerImage = css({
  position: "relative",
  height: "70vh",
  width: "50vw",
  lgDown: {
    height: "50vh",
    width: "90vw",
  },
});
