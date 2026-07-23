/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B2B', // Saffron Fire
          saffron: '#FF6B2B',
          indigo: '#1E1B4B',  // Deep Indigo
          gold: '#F5A623',    // Sacred Gold
        },
        secondary: {
          purple: '#7C3AED',  // Cosmic Purple
          emerald: '#059669', // Emerald Growth
          blue: '#0EA5E9',    // Electric Blue
        },
        neutral: {
          ghost: '#F8F7FF',   // Ghost White
          cloud: '#F1F0F7',   // Cloud Gray
          mist: '#E5E4F0',    // Mist Gray
          charcoal: '#374151',// Charcoal body text
          dark: '#0F0E1A',    // Near Black
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans Variable"', 'sans-serif'],
        body: ['"DM Sans Variable"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-glow': 'pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 107, 43, 0.4)' },
          '50%': { boxShadow: '0 0 0 15px rgba(255, 107, 43, 0)' },
        }
      },
      boxShadow: {
        'card-hover': '0 20px 60px rgba(30, 27, 75, 0.12)',
        'card-default': '0 4px 20px rgba(30, 27, 75, 0.06)',
        'button-saffron': '0 8px 30px rgba(255, 107, 43, 0.35)',
        'cta-glow': '0 0 60px rgba(255, 107, 43, 0.20)',
        'hero-glow': '0 0 120px rgba(124, 58, 237, 0.30)',
        'trust-badge': '0 2px 10px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
