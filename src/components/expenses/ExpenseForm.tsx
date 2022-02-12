/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  TextField, Paper, Button,
  MenuItem, InputAdornment,
  Typography, Box,
} from '@material-ui/core';
import { Add, TodaySharp } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

import { IExpense } from './IExpense';
import CircularLoader from '../../shared/CircularLoader';
import NumberFormatterInput from '../../shared/NumberFormatterInput';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    '& .MuiInputLabel-outlined': {
      color: theme.palette.grey[600],
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
    display: 'flex',
    alignItems: 'center',
  },
  textFieldsPaper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    '& .MuiSelect-icon': {
      color: theme.palette.common.white,
    },
    margin: 10,
    width: 400,
  },
  submitButton: {
    width: 180,
    margin: 20,
  },
  cancelButton: {
    width: 180,
    margin: 20,
  },
  link: {
    textDecoration: 'none',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addNewCategory: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.secondary.light,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  addNewCategoryIcon: {
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
  listItem: {
    color: theme.palette.common.white,
  },
}));

export type Category = {
  _id: string,
  title: string
}

type ExpenseFormComponentProps = {
  state: IExpense,
  isSaving: boolean,
  isLoading: boolean,
  prefCurrency: string | null,
  categories: Category[],
  selectedDate: Date,
  path?: string,
  handleCancel?: () => void,
  handleShowAddCategoryDialog?: () => void,
  handleOnSubmit(event: React.FormEvent<HTMLFormElement>): void,
  handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void,
  handleDateSelection(date: any, value?: string | null): void
}

function ExpenseForm({
  state,
  isSaving,
  isLoading,
  prefCurrency,
  categories,
  selectedDate,
  path,
  handleCancel,
  handleOnSubmit,
  handleOnChange,
  handleDateSelection,
  handleShowAddCategoryDialog,
}: ExpenseFormComponentProps) {
  const classes = useStyles();
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (titleInputRef?.current) {
      titleInputRef.current.focus();
    }
  }, [titleInputRef]);

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleOnSubmit}
    >
      <Paper elevation={0} className={classes.textFieldsPaper}>
        <TextField
          id="title"
          name="title"
          className={classes.textField}
          inputRef={titleInputRef}
          variant="outlined"
          label="Title"
          value={state?.title}
          required
          onChange={handleOnChange}
        />

        <TextField
          id="amount"
          name="amount"
          variant="outlined"
          className={classes.textField}
          label="Amount"
          value={state?.amount}
          required
          InputProps={{
            inputComponent: NumberFormatterInput as any,
            startAdornment: (
              <InputAdornment position="start">
                <Typography className={classes.inputAdornment}>
                  {prefCurrency ?? '$'}
                </Typography>
              </InputAdornment>
            ),

          }}
          onChange={handleOnChange}
        />

        <TextField
          id="category"
          name="category"
          variant="outlined"
          className={classes.textField}
          label="Select Category"
          value={state?.category?.title ?? ''}
          required
          select
          onChange={handleOnChange}
        >
          {
            isLoading ? (
              <div className={classes.circularLoaderContainer}>
                <CircularLoader styleClass={classes.buttonProgress} />
              </div>
            ) : (
              categories.map((cat) => (
                <MenuItem
                  id="category"
                  key={cat?._id}
                  value={cat?.title}
                  className={classes.listItem}
                >
                  {cat?.title}
                </MenuItem>
              ))
            )
          }
          {
            !isLoading && (
              <MenuItem
                className={classes.addNewCategory}
                onClick={handleShowAddCategoryDialog}
              >
                <Add fontSize="large" className={classes.addNewCategoryIcon} />
              </MenuItem>
            )
          }
        </TextField>

        <TextField
          id="notes"
          name="notes"
          variant="outlined"
          className={classes.textField}
          label="Add a note"
          value={state?.notes}
          multiline
          rowsMax={4}
          onChange={handleOnChange}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            id="date-picker"
            name="date-picker"
            className={classes.textField}
            label="Incurred On"
            value={selectedDate}
            onChange={handleDateSelection}
            variant="inline"
            inputVariant="outlined"
            format="dd/MM/yyyy"
            autoOk
            disableFuture
            keyboardIcon={(<TodaySharp className={classes.inputAdornment} />)}
            PopoverProps={{
              anchorReference: 'anchorPosition',
              anchorPosition: {
                top: 500,
                left: 770,
              },
              anchorOrigin: {
                vertical: 'center',
                horizontal: 'center',
              },
              transformOrigin: {
                vertical: 'center',
                horizontal: 'center',
              },
            }}
          />
        </MuiPickersUtilsProvider>
        <Box className={classes.buttonContainer}>
          <>
            <Button
              id="save-button"
              variant="contained"
              fullWidth
              color="secondary"
              type="submit"
              disabled={isSaving}
              className={classes.submitButton}
            >
              {isSaving ? (
                <Box className={classes.circularLoaderContainer}>
                  <CircularLoader styleClass={classes.buttonProgress} />
                </Box>
              ) : 'Save'}
            </Button>
          </>
          <Link
            to={{
              pathname: '/expenses',
              state: { from: path },
            }}
            className={classes.link}
          >
            <Button
              id="cancel-button"
              variant="outlined"
              fullWidth
              color="primary"
              className={classes.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Link>
        </Box>
      </Paper>
    </form>
  );
}

export default ExpenseForm;
