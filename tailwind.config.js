/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
      },
      animation: {
        shine: 'shine 2s infinite linear',
      },
      keyframes: {
        shine: {
          '0%': { left: '-100%', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { left: '200%', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
