import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0B0D0E",
        surface: "#15191B",
        surface2: "#1C2124",
        line: "#2A3033",
        paper: "#F3F3EF",
        "paper-dim": "#B9B9B3",
        orange: "#FF6A00",
        yellow: "#FFC400",
      },
      fontFamily: {
        display: ["'Big Shoulders Display'", "sans-serif"],
        body: ["Inter", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
