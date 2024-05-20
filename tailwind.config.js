/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightGrayishBlue: '#D0D5DD',
        lightGray: '#F9FAFB',
        customGray: '#F2F4F7',
      },
    },
  },
  plugins: [],
};
