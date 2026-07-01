/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#090909",
        lead: "#f0ece8",
        iron: "#1a1a1a",
        slag: "#2a2a2a",
        ember: "#ff6b00",
        emberlight: "#ff8c3a",
        emberdark: "#cc5500",
        brass: "#e7c435",
        brassdark: "#b8942a",
        smoke: "#7a7a7a",
        soot: "#e2bfb0",
        graphite: "#353534",
        ash: "#5a4136",
      },
      fontFamily: {
        display: ['"Archivo Narrow"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"Geist"', "monospace"],
      },
      fontSize: {
        "display-xl": [
          "clamp(3rem, 8vw, 7rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        "display-lg": [
          "clamp(2.25rem, 5vw, 4.5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-md": [
          "clamp(1.75rem, 3.5vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "heading-lg": [
          "clamp(1.5rem, 2.5vw, 2.25rem)",
          { lineHeight: "1.2", fontWeight: "600" },
        ],
        "heading-md": [
          "clamp(1.125rem, 1.5vw, 1.5rem)",
          { lineHeight: "1.3", fontWeight: "600" },
        ],
        "body-lg": [
          "clamp(1rem, 1.2vw, 1.125rem)",
          { lineHeight: "1.7", fontWeight: "400" },
        ],
        "body-md": [
          "0.9375rem",
          { lineHeight: "1.7", fontWeight: "400" },
        ],
        "label-sm": [
          "0.75rem",
          { lineHeight: "1", letterSpacing: "0.12em", fontWeight: "500" },
        ],
        "label-xs": [
          "0.625rem",
          { lineHeight: "1", letterSpacing: "0.15em", fontWeight: "600" },
        ],
        number: [
          "clamp(3rem, 6vw, 5rem)",
          { lineHeight: "1", fontWeight: "700", letterSpacing: "-0.03em" },
        ],
      },
      spacing: {
        gutter: "clamp(1rem, 3vw, 2.5rem)",
        section: "clamp(4rem, 10vw, 8rem)",
      },
    },
  },
  plugins: [],
};
