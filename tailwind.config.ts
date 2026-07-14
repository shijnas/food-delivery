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
        app: {
          bg: "#0D0B14",
          card: "#181424",
          "card-hover": "#1E1830",
          border: "rgba(255,255,255,0.08)",
        },
        purple: {
          DEFAULT: "#8B5CF6",
          light: "#A78BFA",
          dark: "#7C3AED",
          glow: "rgba(139,92,246,0.3)",
        },
        pink: {
          DEFAULT: "#A855F7",
          light: "#C084FC",
          glow: "rgba(168,85,247,0.3)",
        },
        neon: {
          purple: "#8B5CF6",
          pink: "#A855F7",
          blue: "#06B6D4",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-purple": "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
        "gradient-purple-dark":
          "linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(168,85,247,0.05) 100%)",
        "hero-gradient":
          "radial-gradient(ellipse at top, rgba(139,92,246,0.2) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(168,85,247,0.15) 0%, transparent 50%)",
      },
      boxShadow: {
        "neon-purple":
          "0 0 20px rgba(139,92,246,0.4), 0 0 60px rgba(139,92,246,0.15)",
        "neon-pink":
          "0 0 20px rgba(168,85,247,0.4), 0 0 60px rgba(168,85,247,0.15)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(139,92,246,0.1)",
        glass: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "bounce-cart": "bounceCart 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "spin-slow": "spin 3s linear infinite",
        "pulse-neon": "pulseNeon 2s ease-in-out infinite",
        "marquee": "marquee 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139,92,246,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(139,92,246,0.8), 0 0 80px rgba(139,92,246,0.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceCart: {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.2)" },
          "75%": { transform: "scale(0.95)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseNeon: {
          "0%, 100%": { textShadow: "0 0 10px rgba(139,92,246,0.8)" },
          "50%": { textShadow: "0 0 20px rgba(139,92,246,1), 0 0 40px rgba(139,92,246,0.5)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
