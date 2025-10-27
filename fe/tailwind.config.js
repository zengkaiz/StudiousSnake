/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00ce33',
          dark: '#00a329',
          light: '#33d85c',
        }
      }
    },
  },
  plugins: [],
}
