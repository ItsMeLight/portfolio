/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#05070d",
          panel: "#0a0e1a",
          card: "#0d1220",
        },
        accent: {
          DEFAULT: "#2563ff",
          light: "#4d8aff",
          glow: "#3b82f6",
        },
        border: "#1b2236",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(59,130,246,0.35)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
