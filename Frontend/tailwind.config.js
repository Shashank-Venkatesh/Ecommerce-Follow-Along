/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Includes all relevant files
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Poppins: ['Poppins', "sans-serif"],
      },
      screens: {
        '1000px': '1050px', // Custom screen sizes
        '1100px': '1110px',
        '800px': '800px',
        '1300px': '1300px',
        '400px': '400px',
      },
    },
  },
  plugins: [], // Empty, but you can add Tailwind plugins here if needed
}
