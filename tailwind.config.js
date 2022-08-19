/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      screens: {
        mobile: {
          max: '768px',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#006FCF',
          secondary: '#33BB75',
          accent: '#EA5234',
          neutral: '#333C4D',
          'base-100': '#F3F4F6',
          'base-200': '#D8E1E5',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
};
