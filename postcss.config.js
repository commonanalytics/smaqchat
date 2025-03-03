export default {
  plugins: {
    '@tailwindcss/postcss': {
      content: ['./src/**/*.{js,jsx,ts,tsx}'],
    },
    'postcss-import': {},
    autoprefixer: {},
  },
}
