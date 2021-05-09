module.exports = {
  future: {},
  purge: [
    './components/**/*.{html,js,ts,jsx,tsx}',
    './pages/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      lg: '800px',
      xl: '1200px',
    },
    extend: {
      maxWidth: {
        measure: '34em',
      },
      textColor: {
        gray: '#aaa',
      },
    },
  },
  variants: {},
  plugins: [],
}
