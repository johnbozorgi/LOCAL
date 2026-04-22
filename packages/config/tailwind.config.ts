import type { Config } from "tailwindcss";

const config: Partial<Config> = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          blue: "#007AFF",
          green: "#34C759",
          red: "#FF3B30",
          orange: "#FF9500",
          yellow: "#FFCC00",
          purple: "#AF52DE",
          teal: "#5AC8FA",
          indigo: "#5856D6",
        },
        ios: {
          gray1: "#8E8E93",
          gray2: "#AEAEB2",
          gray3: "#C7C7CC",
          gray4: "#D1D1D6",
          gray5: "#E5E5EA",
          gray6: "#F2F2F7",
        },
      },
      borderRadius: {
        ios: "13px",
        "ios-lg": "20px",
        "ios-xl": "28px",
      },
      boxShadow: {
        ios: "0 2px 14px rgba(0,0,0,0.08)",
        "ios-md": "0 4px 24px rgba(0,0,0,0.12)",
        "ios-lg": "0 8px 40px rgba(0,0,0,0.16)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
        "slide-in-right": "slideInRight 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
        skeleton: "skeleton 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        skeleton: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      backdropBlur: {
        ios: "20px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
