import { css } from "styled-system/css";

export const card = css({
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  background: "#e8e4ed",
  height: "auto",
  minH: "15rem",
  width: "40rem",
  display: "flex",
  flexDir: "column",
  lgDown: {
    minH: "10rem",
    w: "90%",
  }
});

export const cardHeader = css({
  display: "flex",
  flexDir: "row",
  backgroundColor: "#c5ace8",
  minH: "4rem",
  gap: "1rem",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingRight: "1rem",
  paddingLeft: "1rem",
  flexWrap: 'wrap',
  fontWeight:'600',
  mdDown : {
    padding: "1rem"
  },
});

export const cardBody = css({
  fontWeight:'300',
  fontSize: "1.2rem",
  padding: "2rem",
  "& > ul": { listStyleType: "disc" },
});

//TODO Implement Timelines effects in exprience cards
// const timeline = {
//     borderLeft: "6px solid #b78ee6",
//     height: "auto",
//     position: "relative",
//     marginLeft: "20%",
//   };
  
