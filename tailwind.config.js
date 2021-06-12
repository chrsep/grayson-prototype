module.exports = {
  important: true,
  purge: ["**/*.tsx"],
  theme: {
    extend: {
      colors: {
        surface: "#fff",
        background: "rgba(227,242,253,0.12)",
        primary: "#2962ff",
        onPrimary: "#fff",
        overlay: "rgba(0, 0, 0, 0.8)",
      },
    },
  },
  variants: {
    boxShadow: ["responsive", "responsive", "hover", "focus", "focus-within"],
  },
  plugins: [require("@tailwindcss/typography")],
  future: {
    removeDeprecatedGapUtilities: true,
  },
}
