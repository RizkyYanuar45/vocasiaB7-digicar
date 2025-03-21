export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["DM Sans", "sans-serif"],
      },
      colors: {
        primary: "#A80743",
        secondary: "#FEE3E0",
        text: "#5C5656",
        coklat: "#351C22",
        krem: "#FFF8F7",
        transparent: "transparent",
        cinderella: {
          50: "#fef3f2",
          100: "#fee3e0",
          200: "#fecfca",
          300: "#fcaea5",
          400: "#f87e71",
          500: "#ef5544",
          600: "#dc3826",
          700: "#b92c1c",
          800: "#99281b",
          900: "#7f271d",
          950: "#45100a",
        },
        scorpion: {
          50: "#f3f3f3",
          100: "#e2dfdf",
          200: "#c6c4c2",
          300: "#a5a09f",
          400: "#8c8583",
          500: "#7d7675",
          600: "#6b6363",
          700: "#5c5656",
          800: "#4c4747",
          900: "#434041",
          950: "#252323",
        },
        white: {
          50: "#ffffff",
          100: "#efefef",
          200: "#dcdcdc",
          300: "#bdbdbd",
          400: "#989898",
          500: "#7c7c7c",
          600: "#656565",
          700: "#525252",
          800: "#464646",
          900: "#3d3d3d",
          950: "#292929",
        },
        black: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#000000",
        },
        "night-shadz": {
          50: "#fff0f2",
          100: "#ffe2e7",
          200: "#ffc9d5",
          300: "#ff9db3",
          400: "#ff668c",
          500: "#ff3169",
          600: "#f00e55",
          700: "#cb0548",
          800: "#a80743",
          900: "#910a41",
          950: "#51001f",
        },
        jon: {
          50: "#faf6f6",
          100: "#f6eded",
          200: "#eeddde",
          300: "#e0c1c4",
          400: "#ce9ea3",
          500: "#b97a82",
          600: "#a25c69",
          700: "#864a56",
          800: "#71404b",
          900: "#623944",
          950: "#351c22",
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};