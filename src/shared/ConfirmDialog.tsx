import React from 'react';

import {
  Dialog, DialogTitle, DialogActions, Button,
  Box,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import CircularLoader from './CircularLoader';

const useStyles = makeStyles((theme) => createStyles({
  dialogTitle: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
  },
  circularLoaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    position: 'relative',
    height: 25,
  },
  deleteButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

type ConfirmDialogProps = {
  open: boolean;
  isDeleting: boolean;
  handleClose(): void;
  handleDelete(): void;
};

function ConfirmDialog({
  open,
  isDeleting,
  handleClose,
  handleDelete,
}: ConfirmDialogProps) {
  const classes = useStyles();

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="sm"
      aria-labelledby="confirm-delete-dialog"
      open={open}
    >
      <DialogTitle id="confirm-delete-dialog" className={classes.dialogTitle}>
        Are you sure you want to delete this record?
      </DialogTitle>
      <DialogActions>
        <>
          <Button
            className={classes.deleteButton}
            autoFocus
            variant="contained"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? (
              <Box className={classes.circularLoaderContainer}>
                <CircularLoader styleClass={classes.buttonProgress} />
              </Box>
            ) : (
              'Delete'
            )}
          </Button>
        </>
        <Button color="primary" variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
