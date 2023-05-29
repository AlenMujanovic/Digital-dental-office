/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        dentistChair: 'url(../../../03-front-end/src/assets/chairBg.png)',
        appointment: 'url(../../../03-front-end/src/assets/appointBg.png)',
      },
      boxShadow: {
        'inset-white': '0 0 12px 20px white inset',
      },
    },
  },
  plugins: [],
};
