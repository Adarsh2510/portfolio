import { css } from "styled-system/css";

export const card = css({
  position: "relative",
  background: "linear-gradient(135deg, rgba(232, 228, 237, 0.9), rgba(197, 172, 232, 0.1))",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(197, 172, 232, 0.3)",
  borderRadius: "20px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(197, 172, 232, 0.2)",
  minH: "18rem",
  width: "42rem",
  display: "flex",
  flexDir: "column",
  overflow: "hidden",
  transition: "all 0.3s ease",
  cursor: "pointer",
  animation: "slideInUp 0.6s ease-out",
  lgDown: { minH: "12rem", w: "90%", maxW: "42rem" },
  _hover: {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(197, 172, 232, 0.3)",
    border: "1px solid rgba(197, 172, 232, 0.5)",
  },
});

export const cardHeader = css({
  display: "flex",
  flexDir: "row",
  background: "linear-gradient(135deg, #c5ace8, #b78ee6)",
  minH: "5rem",
  gap: "1.5rem",
  alignItems: "center",
  padding: "1.5rem",
  flexWrap: "wrap",
  fontWeight: "600",
  color: "#2d2d32",
  mdDown: { padding: "1.2rem", gap: "1rem" },
});

export const cardBody = css({
  fontWeight: "300",
  fontSize: "1.1rem",
  padding: "2rem",
  lineHeight: "1.6",
  color: "#3d3d42",
  "& > ul": { listStyleType: "none", padding: 0, margin: 0 },
  "& > ul > li": {
    position: "relative",
    paddingLeft: "1.5rem",
    marginBottom: "0.8rem",
    transition: "all 0.2s ease",
    _before: {
      content: '""',
      position: "absolute",
      left: 0,
      top: "0.6rem",
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #723cb0, #b78ee6)",
    },
    _hover: {
      color: "#723cb0",
      transform: "translateX(4px)",
      _before: { transform: "scale(1.3)", boxShadow: "0 0 8px rgba(114, 60, 176, 0.4)" },
    },
  },
});

export const companyLogo = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  _hover: { transform: "scale(1.1) rotate(5deg)" },
});

export const roleTitle = css({
  fontSize: "1.3rem",
  fontWeight: "600",
  color: "#2d2d32",
  flex: 1,
  transition: "color 0.2s ease",
  _hover: { color: "#723cb0" },
});

export const dateBadge = css({
  background: "rgba(114, 60, 176, 0.1)",
  color: "white",
  padding: "0.5rem 1rem",
  borderRadius: "20px",
  fontSize: "0.9rem",
  fontWeight: "500",
  border: "1px solid rgba(114, 60, 176, 0.2)",
  transition: "all 0.2s ease",
  _hover: { background: "rgba(114, 60, 176, 0.2)", transform: "scale(1.05)" },
});
  
