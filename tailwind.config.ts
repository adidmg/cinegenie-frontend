/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purplight: "#390f8c",
        purpdark: "#2a0354",
      },
    },
  },
  plugins: [],
};
