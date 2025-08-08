/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5f6FFF',
        // secondary: '#F3F4F6',
        // accent: '#D1D5DB',
      },
    },
  },
  plugins: [],
}
