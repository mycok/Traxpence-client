import React from 'react';

import { Snackbar } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

type SnackbarProps = {
    open: boolean,
    message: string,
    onClose(): void,
}

function ServerMessage({ open, message, onClose }: SnackbarProps) {
  const classes = useStyles();

  return (
    <Snackbar
      open={open}
      message={message}
      onClose={onClose}
      autoHideDuration={3000}
      ContentProps={{
        classes: {
          root: classes.error,
        },
        variant: 'outlined',
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    />
  );
}

export default ServerMessage;
