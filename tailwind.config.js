/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontSize: {
        'standard': '18px',
      },
      colors: {
        primary: '#003462',
        gray: '#757575',
        secondary: '#CA9E6D',
        green: '#00B259',
        danger: '#F00',
        "gray-light":'#E0E0E0',
        'gray-lighter':'#EFEFEF',
        'primary-lighter': '#FCFCFD',
        'primary-light': '#fafafa',
        'red-lighter': '#FFF2F2',
        'green-lighter': '#F2FBF6AA'
      },
    },
    fontFamily: {
      Montserrat: 'Montserrat'
    }
  },
  plugins: [],
};

