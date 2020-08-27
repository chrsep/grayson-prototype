module.exports = {
  important: true,
  purge: ["**/*.tsx"],
  theme: {
    extend: {
      colors: {
        surface: "#fff",
        background: "#fafafa",
        primary: "#0c0c0c",
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
