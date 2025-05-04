/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        title_point_1:"#ff5f57",
        title_point_2:"#ffbc2a",
        title_point_3:"#29c840",
      }
    },
  },
  plugins: [],
}
