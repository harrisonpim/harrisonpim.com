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
      colors: {
        gray: '#999',
        'light-gray': '#e0e0e0',
      },
    },
  },
  variants: {},
  plugins: [],
}
