/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      animation: {
        aurora: 'aurora 60s linear infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        zoomIn: 'zoomIn 0.3s ease-out forwards',
        'dot-pulse': 'pulseDots 1.4s infinite ease-in-out',
        morph: 'morph 8s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        zoomIn: {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        pulseDots: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0.7' },
        },
      }
    },
  },
  plugins: [],
}
