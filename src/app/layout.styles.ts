import { sva } from "styled-system/css";

export const appShell = sva({
  slots: ["body", "main"],
  base: {
    body: {
      minH: "100vh",
      display: "flex",
      flexDir: "column",
      bg: "canvas",
      color: "ink",
    },
    main: {
      flex: 1,
    },
  },
});
