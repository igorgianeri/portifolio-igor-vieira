/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#f5f5f5',
          200: '#e0e0e0',
          300: '#bdbdbd',
          400: '#9e9e9e',
          500: '#757575',
          600: '#616161',
          700: '#424242',
          800: '#212121',
          900: '#0a0a0a',
        },
        purple: {
          primary: '#8b5cf6',
          dark: '#6d28d9',
          light: '#a855f7',
          accent: '#c084fc',
          deep: '#4c1d95',
        }
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'slideIn': 'slideIn 0.5s ease-out',
        'pulse-glow': 'pulse-glow 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideIn: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'pulse-glow': {
          '0%': {
            boxShadow: '0 0 0 0 rgba(106, 27, 154, 0.7)',
          },
          '70%': {
            boxShadow: '0 0 0 10px rgba(106, 27, 154, 0)',
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(106, 27, 154, 0)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}