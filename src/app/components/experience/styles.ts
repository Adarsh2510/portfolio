import { css } from "styled-system/css";

export const experienceContainer = css({
  backgroundColor: "#cfd1e8",
  padding: "2rem",
  "& > h2": {
    fontSize: "3rem",
    fontWeight: "400",
    color: "#3d3d42",
  },
  "& > p": {
    fontSize: "1.2rem",
    fontWeight: "300",
    paddingBottom: "2rem",
  },
});

export const timelineContainer = css({
  display: "flex",
  flexDir: "column",
  alignItems: "center",
  gap: "2rem",
});
