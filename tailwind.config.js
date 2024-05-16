/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sec: "#1d2021",
        pri: "#181a1b",
      },
    },
  },
  plugins: [],
};
