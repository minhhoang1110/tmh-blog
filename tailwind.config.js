module.exports = {
  content: [
    "./pages/**/*.js",
    "./components/**/*.js",
    "./slices/**/*.js",
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
    "./slices/**/*.tsx",
  ],
  theme: {
    fontFamily: {
      sans: "Roboto",
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
