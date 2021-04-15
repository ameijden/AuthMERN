
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ['group-hover'],
      width: ['group-hover'],
      margin: ['hover']
      // visibility: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
