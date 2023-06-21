/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#EDFDF4',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        white: '#FFFFFF',
      },
      textColor: {
        default: '#333333', // Black
        heading: '#222222', // Dark Gray
        link: '#388E3C', // Green
      },
      backgroundColor: {
        hover: '#4D9F44', // Dark Green
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
        link: ['Poppins', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',   // Default padding value
          sm: '1.5rem',      // Padding value for small screens (sm breakpoint)
          lg: '2rem',        // Padding value for large screens (lg breakpoint)
        },
      },
    },
  },
  plugins: [],
}

