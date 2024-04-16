/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkestPurple: "#050225",
        normalPurple: "#464590",
        lightPurple: "#7b79ff",
        red: "#dd1b10",
        darkestgray: "#686868",
        gray: "#d9d9d9",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
