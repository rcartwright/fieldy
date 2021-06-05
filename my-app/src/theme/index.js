import { red, grey } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
      light: grey[100],
      dark: "#303443",
    },
    border: {
      light: grey[200],
    },
    black: {
      main: grey[900],
    },
    white: {
      default: "#fff",
    },
  },
});

export default theme;
