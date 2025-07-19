/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ml-yellow': '#FFE600',
        'ml-blue': '#3483FA',
        'ml-gray': '#666666',
        'ml-light-gray': '#F5F5F5',
        'ml-green': '#00A650',
        'ml-orange': '#FF6600',
      },
      fontFamily: {
        'proxima': ['Proxima Nova', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 