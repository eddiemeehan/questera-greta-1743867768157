/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',    // ScoreDate primary color
        secondary: '#4ECDC4',  // ScoreDate secondary color
        dark: '#2C3333',
      }
    }
  },
  plugins: [],
}