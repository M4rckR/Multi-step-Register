/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/*.ts"],
  theme: {
    extend: {
      colors: {
        "m-morado" : "#652CD1",
        "m-l-morado": "#845EEE",
        "m-dark": "#121826",
        "m-l-dark": "#212936",
        "m-sl-dark": "#394150",
        "m-gray" : "#394150",
        "m-l-gray": "#4D5562",
        "m-sl-gray": "#A1A1A9",
        "m-white": "#E5E7EB"
      },
      fontFamily: {
        "m-inter" : ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

