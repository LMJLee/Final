/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
     
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6E6",
        "gray-100": "#DFCCCC",
        "gray-500": "#5E0000",
        "primary-100":"#ffefdf",
        "primary-150":"#ffeed3",
        "primary-200": "#ffd7b4",
        "primary-300":"#FFA6A3",
        "primary-500":"#FF6B66",
        "secondary-400": "#FFCD58",
        "secondary-500": "#FFC132",
        "gray-blue": "#ABD2CF",
        "dark-gray-blue": "#90beba",
        "dark-blue": "#74b9c5",
        "white": "#FFFFFF",
        "light-blue": "#eaf3f5",
        "ll-blue": "#f3fbfd",
        "dark-gray": "#3f3f3f",
        "light-gray": "#5b5b5b",
      },
      backgroundImage : (theme) => ({
        "gradient-yellowred": "linear-gradient(90deg, #FF616A 0%, #FFC837 100%",
        "mobile-home": "url('./assets/HomePageGraphic.png')"
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      // content: {
      //   evolvetext: "url('./assets/EvolveText.png')",
      //   abstract: "url('./assets/AbstractWaves.png')",
      //   sparkles: "url('./assets/sparkles.png')",
      //   circles: "url('./assets/Circles.png')",
      // }
    },
    screens: {
      xs: "480px", 
      sm:  "768px",
      md: "1060px",
    }
  },
  plugins: [],
}