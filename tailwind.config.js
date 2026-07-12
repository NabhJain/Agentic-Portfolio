/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        panel: "#0a0a0c",
        line: "rgba(255,255,255,0.1)",
        fog: "#F5F5F7",
        mist: "rgba(245,245,247,0.64)",
        ash: "rgba(245,245,247,0.4)",
        signal: "#0A84FF",
        violet: "#7B61FF",
        cyan: "#34E0D6",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-grotesk)",
          "-apple-system",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-jbm)",
          "SF Mono",
          "ui-monospace",
          "Menlo",
          "monospace",
        ],
      },
      backgroundImage: {
        orb: "radial-gradient(circle at 30% 30%, rgba(123,97,255,0.55), transparent 60%)",
        orb2: "radial-gradient(circle at 70% 60%, rgba(52,224,214,0.4), transparent 60%)",
      },
      borderRadius: {
        "4xl": "28px",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.5 },
          "50%": { opacity: 1 },
        },
        blink: {
          "0%, 50%": { opacity: 1 },
          "50.01%, 100%": { opacity: 0 },
        },
      },
      animation: {
        floatY: "floatY 7s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
