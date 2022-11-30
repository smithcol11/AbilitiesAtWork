/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        light: "#f8fafc",
        accentLight: "#a78bfa",
        main: "#c026d3",
        accentDark: "#5b21b6",
        dark: "#0f172a",
      },
    },
  },
  plugins: [],
};
