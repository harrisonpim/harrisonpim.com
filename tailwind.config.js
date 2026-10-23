const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {},
  darkMode: 'media',
  content: [
    './components/**/*.{html,js,ts,jsx,tsx}',
    './app/**/*.{html,js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
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
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.black'),
            '--tw-prose-headings': theme('colors.black'),
            '--tw-prose-lead': theme('colors.black'),
            '--tw-prose-links': theme('colors.black'),
            '--tw-prose-bold': theme('colors.black'),
            '--tw-prose-counters': theme('colors.gray'),
            '--tw-prose-bullets': theme('colors.gray'),
            '--tw-prose-hr': theme('colors.light-gray'),
            '--tw-prose-quotes': theme('colors.black'),
            '--tw-prose-quote-borders': theme('colors.light-gray'),
            '--tw-prose-captions': theme('colors.gray'),
            '--tw-prose-code': theme('colors.black'),
            '--tw-prose-pre-code': theme('colors.code-text'),
            '--tw-prose-pre-bg': theme('colors.code-background'),
            '--tw-prose-th-borders': theme('colors.light-gray'),
            '--tw-prose-td-borders': theme('colors.light-gray'),
            '--tw-prose-invert-body': theme('colors.white'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.white'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.light-gray'),
            '--tw-prose-invert-bullets': theme('colors.light-gray'),
            '--tw-prose-invert-hr': theme('colors.gray'),
            '--tw-prose-invert-quotes': theme('colors.white'),
            '--tw-prose-invert-quote-borders': theme('colors.gray'),
            '--tw-prose-invert-captions': theme('colors.light-gray'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.code-text'),
            '--tw-prose-invert-pre-bg': theme('colors.code-background'),
            '--tw-prose-invert-th-borders': theme('colors.gray'),
            '--tw-prose-invert-td-borders': theme('colors.gray'),
            a: {
              'text-decoration': 'underline',
              'text-underline-offset': '3px',
              'text-decoration-thickness': '1px',
            },
            'a.no-underline': {
              'text-decoration': 'none',
            },
            p: {
              'margin-top': '1em',
              'margin-bottom': '1em',
            },
          },
        },
      }),
    },
  },
  variants: {
    visibility: ['group-hover'],
  },
  plugins: [require('@tailwindcss/typography')],
}
