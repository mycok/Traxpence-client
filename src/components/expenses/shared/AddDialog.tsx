/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  Typography,
  Box,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import CircularLoader from '../../../shared/CircularLoader';
import NumberFormatterInput from '../../../shared/NumberFormatterInput';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    '& .MuiInputLabel-outlined': {
      color: theme.palette.common.white,
    },
    '& label.Mui-focused': {
      color: theme.palette.common.white,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root': {
      color: theme.palette.common.white,
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
  inputAdornment: {
    color: theme.palette.common.white,
  },
}));

type AddDialogProps = {
  open: boolean;
  label: string;
  dialogTitle: string;
  isSaving: boolean;
  value: string | number;
  inputType: string;
  handleClose(): void;
  handleSave(): void;
  handleOnChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
};

function AddDialog({
  open,
  label,
  dialogTitle,
  isSaving,
  value,
  inputType,
  handleClose,
  handleSave,
  handleOnChange,
}: AddDialogProps) {
  const classes = useStyles();
  const addInputRef = useRef<HTMLInputElement | null>(null);
  const [prefCurrency] = useState<string | null>(localStorage.getItem('currency'));

  useEffect(() => {
    if (addInputRef?.current) {
      addInputRef.current.focus();
    }
  }, [addInputRef]);

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
        {
          inputType === 'text' ? (
            <TextField
              id={label}
              name={label}
              inputRef={addInputRef}
              className={classes.root}
              variant="outlined"
              label={label}
              value={value}
              required
              InputProps={{
                autoFocus: true,
              }}
              onChange={handleOnChange}
            />
          ) : (
            <TextField
              id={label}
              name={label}
              inputRef={addInputRef}
              variant="outlined"
              className={classes.root}
              label={label}
              value={value}
              required
              InputProps={{
                autoFocus: true,
                inputComponent: NumberFormatterInput as any,
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography className={classes.inputAdornment}>{prefCurrency ?? '$'}</Typography>
                  </InputAdornment>
                ),
              }}
              onChange={handleOnChange}
            />
          )
        }
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
              <Box className={classes.circularLoaderContainer}>
                <CircularLoader styleClass={classes.buttonProgress} />
              </Box>
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
