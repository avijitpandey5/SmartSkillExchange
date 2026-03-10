/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
        dark: '#1f2937',
        light: '#f3f4f6'
      }
    },
  },
  plugins: [],
}
