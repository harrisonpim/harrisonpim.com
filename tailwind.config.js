const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {},
  darkMode: 'media',
  content: [
    './components/**/*.{html,js,ts,jsx,tsx}',
    './app/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      lg: '800px',
      xl: '1200px',
    },
    extend: {
      screens: { print: { raw: 'print' } },
      visibility: ['hover', 'group-hover'],
      maxWidth: { measure: '34em' },
      colors: {
        white: '#f7f7f7',
        black: '#121212',
        gray: '#666',
        'light-gray': '#d1d1d1',
        'dark-gray': '#343434',
        'code-background': '#282c34',
        'code-text': '#d9dce2',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        'space-grotesk': [
          'var(--font-space-grotesk)',
          ...defaultTheme.fontFamily.sans,
        ],
        'roboto-mono': [
          'var(--font-roboto-mono)',
          ...defaultTheme.fontFamily.mono,
        ],
      },
    },
  },
  variants: {
    visibility: ['group-hover'],
  },
  plugins: [],
}
