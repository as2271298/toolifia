import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc8fb",
          400: "#36a9f7",
          500: "#0c8ce9",
          600: "#026fc7",
          700: "#0359a1",
          800: "#074c83",
          900: "#0c406e",
          950: "#082849",
        },
        dark: {
          bg: "#0b0f17",
          card: "#131b2e",
          border: "#1e293b",
          hover: "#1a243b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(12, 140, 233, 0.25)",
        "glow-lg": "0 0 50px -10px rgba(12, 140, 233, 0.35)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
        "card-dark": "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
