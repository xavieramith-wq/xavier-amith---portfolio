/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070b14",
        panel: "#0f172a",
        "panel-soft": "#111c34",
        accent: "#63a4ff",
        "accent-strong": "#2f7df4",
        line: "rgba(148, 163, 184, 0.18)"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(47, 125, 244, 0.18)"
      },
      fontFamily: {
        display: ['"Segoe UI Variable Display"', '"Trebuchet MS"', "sans-serif"],
        body: ['"Segoe UI Variable Text"', '"Lucida Sans"', "sans-serif"]
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
