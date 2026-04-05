/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bob's warm salmon/coral palette
        brand: {
          50:  '#fef6f3',
          100: '#fde9e3',
          200: '#fad0c4',
          300: '#f5ad9a',
          400: '#ed7f65',
          500: '#d4896e',  // lobster body
          600: '#c8705a',  // primary action
          700: '#a85a47',
          800: '#8a4739',
          900: '#713b30',
          950: '#3d1c16',
        },
        // Warm cream backgrounds
        sand: {
          50:  '#fdfcf9',
          100: '#f9f6ef',
          200: '#f2ece0',
          300: '#e8dece',
          400: '#d9cbb6',
          500: '#c5b49a',
        },
        // Deep warm dark
        ink: {
          900: '#1a1714',
          800: '#262320',
          700: '#35312d',
          600: '#4a4540',
          400: '#7a7470',
          300: '#a8a29e',
          200: '#d4cfc9',
          100: '#edeae6',
          50:  '#f7f5f2',
        },
        // Sparkle gold (from the star accents)
        spark: {
          300: '#f7e08a',
          400: '#f2d16b',
          500: '#e8bc40',
        },
        // Bubble blue (from the circle accents)
        bubble: {
          200: '#daeef9',
          300: '#b8ddf0',
          400: '#7ec2e6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '8xl':  ['6rem',    { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        '7xl':  ['4.5rem',  { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        '6xl':  ['3.75rem', { lineHeight: '1',    letterSpacing: '-0.03em' }],
        '5xl':  ['3rem',    { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        '4xl':  ['2.25rem', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        '3xl':  ['1.875rem',{ lineHeight: '1.2',  letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card':    '0 1px 4px 0 rgb(26 23 20 / 0.06), 0 6px 24px 0 rgb(26 23 20 / 0.07)',
        'card-lg': '0 4px 12px 0 rgb(26 23 20 / 0.08), 0 20px 56px 0 rgb(26 23 20 / 0.12)',
        'brand':   '0 8px 32px 0 rgb(200 112 90 / 0.35)',
      },
      keyframes: {
        marquee:   { '0%': { transform: 'translateX(0)' },   '100%': { transform: 'translateX(-50%)' } },
        float:     { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        wiggle:    { '0%, 100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        float:   'float 4s ease-in-out infinite',
        wiggle:  'wiggle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
