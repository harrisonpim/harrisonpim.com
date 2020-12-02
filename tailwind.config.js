module.exports = {
  future: {},
  purge: [
    "./components/**/*.{html,js,ts,jsx,tsx}",
    "./layouts/**/*.{html,js,ts,jsx,tsx}",
    "./pages/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      lg: "800px",
      xl: "1200px",
    },
    fontSize: {
      base: ["20px", "28px"],
    },
    fontWeight: {
      bold: 600,
    },
    extend: {
      maxWidth: {
        measure: "34em",
      },
      textColor: {
        silver: "#bbb",
      },
    },
  },
  variants: {},
  plugins: [],
};
