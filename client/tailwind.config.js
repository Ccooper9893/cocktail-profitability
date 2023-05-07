/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1f2937",
          secondary: "#d1d5db",
          accent: "#f59e0b",
          neutral: "#3D4451",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
