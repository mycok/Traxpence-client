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
      paper: '#392B43',
      // paper: '#2C1F35',
    },
  },
});

theme = responsiveFontSizes(theme);

theme = createMuiTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius * 2,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.common.white,
        },
      },
    },
  },
});

export const CustomTheme = theme;
