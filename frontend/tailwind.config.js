/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Paths to all of your template files
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(63, 74, 73)',        // Dark teal
        secondary: 'rgb(105, 119, 118)',   // Lighter teal
        accent: 'rgb(142, 162, 161)',      // Muted green
        contrast: 'rgb(221, 228, 228)',    // Light gray
        background: 'rgb(244, 247, 247)',  // Very light gray
      },
    },
  },
  plugins: [],
}
