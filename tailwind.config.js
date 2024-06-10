/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightGrayishBlue: '#D0D5DD',
        lightGray: '#F9FAFB',
        customGray: '#F2F4F7',
        cadetBlue: '#98A2B3',
        lightestGray: '#F9FAFB',
        gray: '#D0D5DD',
        emeraldGreen: '#2AC18D',
        darkBlue: '#101828',
        mediumGray: '#98A2B3',
        offWhite: '#FCFCFD',
        primaryGreen: '#073834',
        success: '#039855',
        mintGreen: '#ECFDF3',
        lightGreen: '#A6F4C5',
      },
      backgroundImage: {
        gradientGlow: 'radial-gradient(#A6F4C5, #2AC18D 60%)',
      },
      screens: {
        mobile: { max: '730px' },
        tablet: { max: '1099px', min: '731px' },
        desktop: { min: '1100px' },
        bigScreen: { min: '1550px' },
        desktopMax: { max: '1536px' },
        tall: { raw: '(min-height: 933px)' },
        short: { raw: '(max-height: 710px)' },
      },
    },
  },
  plugins: [],
};
