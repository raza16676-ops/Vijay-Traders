/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.js",
    "./layout/**/*.liquid",
    "./sections/**/*.liquid",
    "./snippets/**/*.liquid",
    "./templates/**/*.json"
  ],
  theme: {
    extend: {
      colors: {
        primaryRed: "#C62828",
        secondaryRed: "#E53935",
        subtleBg: "#FAF8F8",
        mutedBorder: "#EAE4E4",
        neutralText: "#222222"
      },
      fontFamily: {
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif']
      }
    }
  },
  plugins: []
};