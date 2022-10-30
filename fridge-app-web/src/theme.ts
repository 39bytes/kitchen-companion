import { createTheme } from "@mui/material";
import { green, blue, grey, red } from "@mui/material/colors";
import { fontWeight } from "@mui/system";

const theme = createTheme({
    palette: {
        primary: {
            main: green[500],
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
        fontFamily: "sans-serif",
        caption: {
            color: "#AAA",
            fontStyle: "italic",
            fontWeight: "lighter"
        },
    }
})

export default theme;