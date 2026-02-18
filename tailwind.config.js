/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Habilita el control por clase CSS
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}", // Asegúrate de incluir tus extensiones
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}