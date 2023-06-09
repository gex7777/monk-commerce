import { ThemeOptions } from "@mui/material/styles";
export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#008060",
    },
    secondary: {
      main: "#006EFF",
    },
    background: {
      default: "#F6F6F8",
    },
    text: {
      primary: "#202223",
    },
    info: {
      main: "rgba(0, 0, 0, 0.4)",
      contrastText: "rgba(0, 0, 0, 0.6)",
    },
  },
  typography: {
    fontFamily: "SF Pro Text",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'SF Pro Text';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url(“https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-regular-webfont.woff 291”);
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
};
