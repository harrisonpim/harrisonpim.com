module.exports = {
  future: {},
  darkMode: 'media',
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
      visibility: ['hover', 'group-hover'],
      maxWidth: {
        measure: '34em',
      },
      colors: {
        white: '#f7f7f7',
        black: '#121212',
        gray: '#666',
        'light-gray': '#e0e0e0',
        'dark-gray': '#343434',
        'code-background': '#282c34',
      },
    },
  },
  variants: {
    visibility: ['group-hover'],
  },
  plugins: [],
}
