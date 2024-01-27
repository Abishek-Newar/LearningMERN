/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chill: ['Poppins', 'sans-serif'],
      },
    },
    colors: {
      nocap: "#7F7F7F",
      white: "#FFFFFF",
      black: "#000000",
      green: "#21C55D"
    }
  },
  plugins: [],
}