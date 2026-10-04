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
        // Oswald — має кирилицю (попередній Big Shoulders Display її не мав)
        display: ["'Oswald Variable'", "'Arial Narrow'", "sans-serif"],
        body: ["'Inter Variable'", "-apple-system", "'Segoe UI'", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
