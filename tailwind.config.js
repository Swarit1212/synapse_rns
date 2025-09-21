/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Nunito", "Inter", "ui-sans-serif", "system-ui"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        "synapse-50": "#f7eef2",
        "synapse-300": "#c4a6d6",
        "synapse-600": "#6b4b7a",
        "synapse-deep": "#49345a",
        "accent-amber": "#f6b676",
      },
      backgroundImage: {
        "custom-bg": "url('../public/background_image.png')",
      },
    },
  },
  plugins: [],
};
