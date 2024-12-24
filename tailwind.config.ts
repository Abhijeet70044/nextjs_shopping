/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {fontFamily: {
      sans: ['Lato', 'sans-serif'], // Add Lato as the default sans font
    },},
  },
  plugins: [],
};
