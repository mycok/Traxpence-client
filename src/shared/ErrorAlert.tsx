import React from 'react';

import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  closeIcon: {
    color: theme.palette.common.white,
  },
}));

type SnackbarProps = {
    open: boolean,
    message: string,
    onClose(): void,
}

function ErrorAlert({ open, message, onClose }: SnackbarProps) {
  const classes = useStyles();

  return (
    <Snackbar
      open={open}
      message={message}
      onClose={onClose}
      autoHideDuration={5000}
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
      action={(
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" className={classes.closeIcon} />
          </IconButton>
        </>
      )}
    />
  );
}

export default ErrorAlert;
