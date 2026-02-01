/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cricket-green': '#C5050C',
        'cricket-green-light': '#da3a3f',
        'cricket-green-dark': '#9b0000',
        'badger-black': '#1a1a1a',
        'cream': '#fbfbfb',
        'cream-dark': '#f5f5f0',
        'gold': '#d97706',
      },
      fontFamily: {
        headline: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-dot': 'pulse 2s infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
