/** @type {import('tailwindcss').Config} */
const colors = require("material-ui-colors")

module.exports = {
  corePlugins: {
    preflight: false,
  },
  important: "#root",
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lp: "976px",
        xl: "1440px",
      },
      fontFamily: {
        title: ["Neutron", "sans-serif"],
        body: ["Imprima", "sans-serif"],
        span: ["Cormorant", "sans-serif"],
        pally: ["Pally", "sans-serif"],
      },
      colors: {
        ...colors,
        whiteSmoke: "#edede9",
        grey: "f0f0f0",
        brightYellow: "#ffeb3b",
        goldenYellow: "#e9a42d",
        tealBlue: "#59a9a1",
        scarletRed: "#e81200",
        brightGreen: "#4caf50",
        paleGreen: "#a3c382",
        purple: "#9c27b0",
        palePurple: "#ab47bc",
      },
      backgroundImage: {
        heroBg: "url('/imgs/Hero-bg.png')",
      },
    },
  },
  plugins: [],
}
