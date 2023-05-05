/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  corePlugins: {
    preflight: false,
  },
  important: "#root",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: "Pilcrow Rounded",
        body: "Archivo",
      },
      boxShadow: {
        black: "4px 4px 0px 0px rgba(0,0,0,1);",
        white: "4px 4px 0px 0px rgba(256,256,256,1);",
      },
      container: {
        center: true,
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
        },
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      colors: {
        whiteSmoke: "#edede9",
        grey: "#505a6c",
        red: "#e81200",
        goldenOrange: "#e6a02d",
        brightOrange: "#ff9900",
        tealBlue: "#59a9a1",
        deepBlue: "#0a3d62",
        softCream: "#f5f5dc",
        brightGreen: "#4caf50",
        purple: "#9c27b0",
      },
    },
  },
  plugins: [],
}
