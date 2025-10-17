const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#e0f2fe",
          DEFAULT: "#3b82f6",
          dark: "#1e40af",
        },
        accent: {
          purple: "#6366f1",
          blue: "#2563eb",
        },
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-blue": "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss", flowbite.plugin()],
};
