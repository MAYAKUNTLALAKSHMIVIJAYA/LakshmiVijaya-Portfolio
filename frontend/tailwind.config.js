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
        dark: {
          DEFAULT: '#0D0D0D',
          surface: '#141414',
          card: 'rgba(255, 255, 255, 0.03)',
          cardHover: 'rgba(255, 255, 255, 0.05)',
          pill: 'rgba(255, 255, 255, 0.06)',
          pillHover: 'rgba(255, 255, 255, 0.12)',
        },
        accent: {
          blue: '#3872FF',
          blueTint: 'rgba(56, 114, 255, 0.15)',
          blueText: '#8BA8FF',
          blueLink: '#77A8FF',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'card': '0 24px 48px rgba(0, 0, 0, 0.4)',
        'card-lg': '0 32px 64px rgba(0, 0, 0, 0.5)',
        'avatar': '0 16px 48px rgba(0, 0, 0, 0.6)',
        'nav': '0 10px 40px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
