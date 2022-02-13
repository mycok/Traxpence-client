import { responsiveFontSizes, createTheme } from '@material-ui/core/styles';

let theme = createTheme({
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

theme = createTheme(theme, {
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
    MuiLink: {
      defaultProps: {
        underline: false,
        component: 'button',
      },
      styleOverrides: {
        root: {
          color: theme.palette.common.white,
          textDecoration: 'none',
        },
      },
    },
  },
});

export const CustomTheme = theme;
