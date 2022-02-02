/* eslint-disable no-unused-vars */
import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import CircularLoader from '../../../shared/CircularLoader';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    '& label.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    margin: 10,
    width: 400,
  },
  saveButton: {
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
  },
  dialogTitle: {
    textAlign: 'center',
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
  },
  circularLoaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    position: 'relative',
    height: 25,
  },
}));

type AddDialogProps = {
  open: boolean;
  label: string;
  dialogTitle: string;
  isSaving: boolean;
  value: string | number;
  handleClose(): void;
  handleSave(): void;
  handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void;
};

function AddDialog({
  open,
  label,
  dialogTitle,
  isSaving,
  value,
  handleClose,
  handleSave,
  handleOnChange,
}: AddDialogProps) {
  const classes = useStyles();

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="sm"
      aria-labelledby="add-category-dialog"
      open={open}
    >
      <DialogTitle id="add-category-dialog" className={classes.dialogTitle}>
        {dialogTitle}
      </DialogTitle>
      <DialogContent>
        {/* TODO: Add error text component and serverErr prop */}
        <TextField
          id={label}
          name={label}
          className={classes.root}
          variant="outlined"
          label={label}
          value={value}
          required
          onChange={handleOnChange}
        />
      </DialogContent>
      <DialogActions>
        <>
          <Button
            autoFocus
            variant="contained"
            color="secondary"
            disabled={isSaving}
            className={classes.saveButton}
            onClick={handleSave}
          >
            {isSaving ? (
              <div className={classes.circularLoaderContainer}>
                <CircularLoader styleClass={classes.buttonProgress} />
              </div>
            ) : (
              'Save'
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

export default AddDialog;
