/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightestGray: '#F9FAFB',
        gray: '#D0D5DD',
        emeraldGreen: '#2AC18D',
        darkBlue: '#101828',
      },
    },
  },
  plugins: [],
};
