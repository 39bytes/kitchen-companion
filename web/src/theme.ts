import { createTheme } from "@mui/material";
import { green, blue, grey, red } from "@mui/material/colors";
import { fontWeight } from "@mui/system";

const theme = createTheme({
  palette: {
    primary: {
      main: green[600],
      contrastText: "#fff",
    },
    secondary: {
      main: blue[800],
    },
    background: {
      default: grey[50],
    },
    error: {
      main: red[600],
    },
  },
  typography: {
    fontFamily: "Public Sans, sans-serif",
    h6: {
      color: "black",
      //fontWeight: "bold",
      fontWeight: 550,
      fontSize: 19,
    },
    caption: {
      color: "#AAA",
      fontStyle: "italic",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {},
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 700,
      lg: 1000,
      xl: 1500,
    },
  },
  zIndex: {
    drawer: 1,
  },
  transitions: {},
});

export default theme;
