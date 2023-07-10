/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    'flex':{
      '5': '5 5 0%',
    },
    'spacing':{
      '3/10':'30%',
    },
  },
};
export const plugins = [];

