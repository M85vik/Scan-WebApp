/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

        colors: {
        bg: "#FAF3E1",
        surface: "#F5E7C6",
        primary: "#FA8112",
        text: "#222222",
      }


    },
  },
  plugins: [],
}