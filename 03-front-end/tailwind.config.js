/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        dentistChair: 'url(../../../03-front-end/src/assets/chairBg.png)',
        appointment: 'url(../../../03-front-end/src/assets/appointBg.png)',
        'theme-green': 'linear-gradient(90deg, rgba(45,211,174,1) 0%, rgba(45,209,206,1) 50%, rgba(45,207,235,1) 100%)',
      },
      boxShadow: {
        'inset-white': '0 0 12px 20px white inset',
      },
    },
  },
  plugins: [],
};
