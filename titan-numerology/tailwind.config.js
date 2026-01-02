/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        titan: {
          dark: '#0f172a', // Slate 900
          gold: '#d4af37',
          accent: '#3b82f6', // Blue 500
          text: '#e2e8f0', // Slate 200
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'Impact', 'sans-serif'],
      }
    },
  },
  plugins: [],
}