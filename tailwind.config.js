// https://tailwindcss.com/docs/guides/create-react-app

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "tmdb-dark-blue": "#0d253f",
        "tmdb-light-blue": "#01b4e4",
        "tmdb-light-green": "#90cea1",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
