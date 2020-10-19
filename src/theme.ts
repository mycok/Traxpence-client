import { green } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: green[400],
    },
    secondary: {
      main: '#ffa500',
    },
    info: {
      main: '#000000',
    },
  },
});
