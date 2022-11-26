/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,

      light: "#f8fafc",
      accentLight: "#a78bfa",
      main: "#c026d3",
      accentDark: "#5b21b6",
      dark: "#0f172a",
    },
    extend: {},
  },
  plugins: [],
};
