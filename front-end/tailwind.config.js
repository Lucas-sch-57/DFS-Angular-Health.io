/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  safelist: [
    "drop-shadow",
    "drop-shadow-sm",
    "drop-shadow-md",
    "drop-shadow-lg",
    "drop-shadow-xl",
    "drop-shadow-2xl",
    "drop-shadow-none",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["synthwave"],
  },
  plugins: [require("daisyui")],
}

