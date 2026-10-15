/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        limeGreen: {
          DEFAULT: '#acee01',
          light: '#acee01',
          dark: '#62a30d',
          neutral: '#b4bbab',
          glow: 'rgba(172, 238, 1, 0.35)',
        },
        caribbean: {
          DEFAULT: '#acee01',
          50: '#f6fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#acee01',
          500: '#acee01',
          600: '#62a30d',
          700: '#4e830a',
          800: '#3f6212',
          900: '#365314',
          glow: 'rgba(172, 238, 1, 0.35)',
        },
        beige: {
          DEFAULT: '#e8dcc4',
          neutral: '#b4bbab',
          50: '#FDFBF7',
          100: '#F7F3EB',
          200: '#EDE4D3',
          300: '#E8DCC4',
          400: '#b4bbab',
          500: '#9ca493',
          600: '#7e8675',
        },
        cinema: {
          950: '#000000',
          900: '#000000',
          850: '#050505',
          800: '#0a0a0a',
          700: '#121212',
          600: '#1e1e1e',
          500: '#333333',
          400: '#666666',
          300: '#b4bbab',
          200: '#e4e4e7',
          100: '#ffffff',
          gold: '#acee01', /* Light and bright green from screenshot */
          green: '#acee01',
          lime: '#acee01',
          amber: '#acee01',
          silver: '#b4bbab',
          beige: '#e8dcc4',
          red: '#ef4444',
          cyan: '#acee01'
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
        serif: ['Cinzel', 'serif']
      },
      letterSpacing: {
        cinematic: '0.25em',
        ultra: '0.4em'
      },
      aspectRatio: {
        'cinema': '2.39 / 1',
        'imax': '1.43 / 1',
        'academy': '1.375 / 1',
        'vertical': '9 / 16'
      },
      backgroundImage: {
        'film-grain': "radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        filmRoll: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s infinite',
        filmRoll: 'filmRoll 20s linear infinite'
      }
    },
  },
  plugins: [],
}
