const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "node_modules/vue-tailwind/dist/*.js",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: colors.gray,
      red: colors.rose,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      violet: colors.violet,
      black: colors.black,
      white: colors.white,
      orange: colors.orange,
      fuchsia: colors.fuchsia,
    },
  },
};
