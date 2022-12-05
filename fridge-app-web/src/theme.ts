import { createTheme } from "@mui/material";
import { green, blue, grey, red } from "@mui/material/colors";
import { fontWeight } from "@mui/system";

const theme = createTheme({
    palette: {
        primary: {
            main: green[600],
            contrastText: "#fff"
        },
        secondary: {
            main: blue[300],
        },
        background: {

        },
        error: {
            main: red[600]
        }

    },
    typography: {
        fontFamily: "Roboto",
        caption: {
            color: "#AAA",
            fontStyle: "italic",
            fontWeight: "lighter"
        },
        button: {
            textTransform: "none",
            fontWeight: 500
        }
    },
    components: {
        MuiButtonBase: {
            defaultProps: {

            }
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 400,
            md: 700,
            lg: 1000,
            xl: 1336
        }
    }
})

export default theme;