import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/components/**/*.{ts,tsx,js,jsx}", "./src/app/**/*.{ts,tsx,js,jsx}"],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          canvas: { value: "#F7F8F5" },
          ink: { value: "#242B27" },
          accent: { value: "#315949" },
          divider: { value: "#DDE2DA" },
          note: { value: "#E8EDCF" },
        },
        spacing: {
          pageX: { value: "clamp(1.25rem, 4vw, 2rem)" },
          sectionY: { value: "clamp(3rem, 8vw, 5rem)" },
          gap: { value: "1rem" },
        },
        fontSizes: {
          body: { value: "1.05rem" },
          lead: { value: "1.2rem" },
          sectionTitle: { value: "clamp(2rem, 5vw, 3rem)" },
          hero: { value: "clamp(3rem, 8vw, 4.5rem)" },
        },
        lineHeights: {
          body: { value: "1.7" },
          tight: { value: "0.98" },
        },
        sizes: {
          content: { value: "1120px" },
          reading: { value: "68ch" },
        },
        radii: {
          card: { value: "18px" },
          pill: { value: "999px" },
        },
        borderWidths: {
          hairline: { value: "1px" },
          focus: { value: "3px" },
        },
        shadows: {
          card: { value: "0 18px 45px rgba(36, 43, 39, 0.08)" },
        },
      },
    },
  },
  outdir: "styled-system",
});
