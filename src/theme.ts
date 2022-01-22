// import { green, deepOrange } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#33859e',
    },
    secondary: {
      main: '#0da86c',
    },
    background: {
      paper: '#eff0f2',
    },
  },
  shape: {
    borderRadius: 3,
  },
});

theme = responsiveFontSizes(theme);

theme = createMuiTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
  },
});

export const CustomTheme = theme;
