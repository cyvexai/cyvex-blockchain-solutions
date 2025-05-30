import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // existing brand colors
      colors: {
        cyvexPurple: '#8b5cf6',
        cyvexBlue:   '#3b82f6',
        cyvexBg:     '#0f0c29',

        // 3rd accent color
        cyvexTeal:   '#14b8a6',
      },

      // 1) Subtle card shadows
      boxShadow: {
        glow:      '0 4px 30px rgba(0, 0, 0, 0.3)',
        highlight: '0 0 20px rgba(168, 85, 247, 0.4)',
      },

      // 2) Fade‐in‐up keyframes
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config