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
        lightGrayishBlue: '#D0D5DD',
        lightGray: '#F9FAFB',
        customGray: '#F2F4F7',
        mediumGray: '#98A2B3',
        offWhite: '#FCFCFD',
      },
    },
  },
  plugins: [],
};
