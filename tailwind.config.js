/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        "custom-yellow": "#f4cb71",
        "custom-black": "#131313",
        primary: {
          DEFAULT: "#333",
          100: "#484848",
          200: "#151515",
          300: "#111",
        },
        accent: "#d4000d",
      },
      fontFamily: {
        oswald: "var(--font-oswald)",
        roboto: "var(--font-roboto)",
      },
      keyframes: {
        "rotate-slow": {
          "0%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        "rotate-slow-back": {
          "0%": { transform: "rotateY(180deg)" },
          "50%": { transform: "rotateY(360deg)" },
          "100%": { transform: "rotateY(540deg)" },
        },
      },
      animation: {
        "rotate-slow": "rotate-slow 8s linear infinite",
        "rotate-slow-back": "rotate-slow-back 8s linear infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
