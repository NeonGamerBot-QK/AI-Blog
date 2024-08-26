import catppuccin from '@catppuccin/daisyui'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/**.tsx'
  ],
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      // You can simply select a catppuccin flavor with sane default colors
      catppuccin("mocha", { primary: 'mauve', secondary: 'blue' }),
    ],
  },
}

