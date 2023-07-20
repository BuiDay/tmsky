/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow:{
        'tb':"rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      },
      textColor:{
        'main':'#6B5DD1'
      },
      backgroundColor:{
        'main':'#6B5DD1',
      },
      borderColor:{
        'comfirm':'#F95146 !important',
        'comfirmed':'#00DA38 !important'
      }
  },
  plugins: [],
}
}