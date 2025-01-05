/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./srcInputCSS/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        borderColor : "#9E9E9E",
        backColor : "#ffffff1a",
        colorborder:"hsl(0, 0%, 100%)",
        color2:"hsl(252, 6%, 83%)",
        colorImgBack:"hsl(245, 15%, 58%)",
        colorFieldBack:"hsl(245, 19%, 35%)",
        colorText:"hsl(248, 70%, 10%)",
        colorTextBack: "hsl(7, 86%, 67%)",
      },
      // screens: {
      //   smQ: "375px",
      //   mdQ:"667px",
      // }
    },
  },
  plugins: [],
}

