/**
 *
 */
module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      "858C94": "#858C94",
      white: "white",
      black: "black",
    },
    fontFamily: {
      montserrat: ["Montserrat"],
    },
    extend: {},
    screens: {
      _sm: { max: "767px" },
      _sm800: { max: "799px" },
      _md: { min: "768px" },
      _lg: { max: "1000px" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
