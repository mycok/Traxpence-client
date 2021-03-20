import React from 'react';

import {
  Dialog, DialogTitle, DialogActions, Button,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import CircularLoader from './CircularLoader';

const useStyles = makeStyles(() => createStyles({
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
            onClick={handleDelete}
          >
            {isDeleting ? (
              <div className={classes.circularLoaderContainer}>
                <CircularLoader styleClass={classes.buttonProgress} />
              </div>
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
