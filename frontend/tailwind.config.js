/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        light: "#f8fafc",
        accentLight: "#a78bfa",
        main: "#c026d3",
        accentDark: "#5b21b6",
        dark: "#0f172a",
        darkGray: "#1e1e1e",
        darkGrayAccent: "#2a2a2a",
        moreInfoGray: "#262626",
      },
    },
  },
  plugins: [],
};
