/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Paths to your template files
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(133, 176, 190)',    // Light Blue
        accent: 'rgb(255, 160, 122)',     // Coral
        background: 'rgb(206, 237, 233)', // Soft Pastel Teal
        text: 'rgb(100, 100, 100)',       // Gray
      },
    },
  },
  plugins: [],
};
