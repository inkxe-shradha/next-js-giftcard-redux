import { createTheme } from "@mui/material/styles";
import { deepPurple, cyan } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: deepPurple,
    default: {
      main: "#64748B",
      contrastText: "#fff",
    },
    tertiary: {
      main: cyan,
    },
  },
});

export default theme;
