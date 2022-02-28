module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['bumblebee'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    darkTheme: 'dark',
  },
}
