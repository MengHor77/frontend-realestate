/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1d4ed8',
          green: '#059669',
        },
      },
    },
  },
  plugins: [],
};
