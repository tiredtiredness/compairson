/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
      extend: {
        animationDelay: {
          0: '0ms',
          200: '200ms',
          400: '400ms',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.animation-delay-0': { animationDelay: '0ms' },
        '.animation-delay-200': { animationDelay: '200ms' },
        '.animation-delay-400': { animationDelay: '400ms' },
      })
    },
  ],
}
