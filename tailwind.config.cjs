/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito'],
      },
      colors: {
        yellowBg: '#f3c78c',
        redBg: '#622624',
      },
    },
  },

  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
}
