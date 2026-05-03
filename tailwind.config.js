/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#030306",
        panel: "#0b0713",
        neonPink: "#ff2da8",
        neonPurple: "#a855f7",
        neonBlue: "#22d3ee",
        voltage: "#fef08a"
      },
      boxShadow: {
        glow: "0 0 34px rgba(217, 70, 239, 0.45)",
        card: "0 24px 70px rgba(0, 0, 0, 0.34)"
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
