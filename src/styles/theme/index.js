import { createTheme } from "@mui/material";
import colorPaletteTheme from "./colorPaletteTheme";
import typographyTheme from "./typographyTheme";
import shadowTheme from "./shadowTheme";
import borderRadiusTheme from "./borderRadiusTheme";

const theme = createTheme({
  palette: colorPaletteTheme,
  typography: typographyTheme,
  boxShadow: shadowTheme,
  borderRadius: borderRadiusTheme,
});

export default theme;
