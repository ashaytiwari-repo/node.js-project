/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.html",      // All HTML files in the views folder
    "./public/**/*.html",     // If you ever have HTML in public
    "./*.html",               // In case you have HTML in root (optional)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}