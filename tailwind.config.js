/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightGray: '#F2F4F7',
        darkBlue: '#101828',
        mediumGray: '#98A2B3',
        offWhite: '#FCFCFD',
      },
    },
  },
  plugins: [],
};
