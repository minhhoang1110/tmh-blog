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
    extend: {
      zIndex: {
        1000: "1000",
      },
      borderWidth: {
        1: "1px",
      },
      borderRadius: {
        "50%": "50%",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
