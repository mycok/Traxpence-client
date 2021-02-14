import React from 'react';

import {
  Dialog, DialogTitle, DialogActions, Button,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import CircularLoader from './CircularLoader';

const useStyles = makeStyles(() => createStyles({
  deleteButton: {
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    marginRight: 115,
  },
}));

type ConfirmDialogProps = {
    open: boolean,
    isDeleting: boolean,
    handleClose(): void,
    handleDelete(): void
}

function ConfirmDialog({
  open, isDeleting, handleClose, handleDelete,
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
      <DialogTitle
        id="confirm-delete-dialog"
      >
        Are you sure you want to delete this record?
      </DialogTitle>
      <DialogActions>
        <>
          <Button
            autoFocus
            variant="contained"
            color="secondary"
            disabled={isDeleting}
            className={classes.deleteButton}
            onClick={handleDelete}
          >
            Yes
          </Button>
          { isDeleting && <CircularLoader styleClass={classes.buttonProgress} />}
        </>
        <Button color="primary" variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
