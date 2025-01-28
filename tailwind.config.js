/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,css,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        "inner-sm": "inset 0 1px 2px 0 rgb(0 0 0 / 0.05)"
      }
    },
  },
  plugins: [],
}

