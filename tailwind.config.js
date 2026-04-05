/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lobster: {
          50:  '#fff1f0',
          100: '#ffe0dd',
          200: '#ffc5bf',
          300: '#ff9d94',
          400: '#ff6459',
          500: '#ff3528',
          600: '#ed1a0d',
          700: '#c8120a',
          800: '#a5130e',
          900: '#881712',
          950: '#4b0504',
        },
        ocean: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7cd2fd',
          400: '#36bbfa',
          500: '#0ca2eb',
          600: '#0081c9',
          700: '#0167a4',
          800: '#065787',
          900: '#0b4970',
          950: '#072e4a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
