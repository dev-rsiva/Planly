/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        segoe: ["Segoe UI", "sans-serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Noto Sans",
          "Ubuntu",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      textColor: {
        custom: "rgb(68, 84, 111)",
      },
      boxShadow: {
        spread: "0 0 10px rgba(68, 84, 111, 0.5)",
      },
    },
  },
  plugins: [],
};
