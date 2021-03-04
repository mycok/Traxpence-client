/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

import {
  TextField, Paper, Button,
  MenuItem, InputAdornment,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import NumberFormat from 'react-number-format';

import { IExpense } from './IExpense';
import CircularLoader from '../../shared/CircularLoader';

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
    margin: 10,
    width: 400,
  },
  submitButton: {
    position: 'relative',
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
    marginLeft: 100,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export type Category = {
  _id: string,
  title: string
}

type ExpenseFormComponentProps = {
  state: IExpense,
  isLoading: boolean,
  prefCurrency: string | null,
  categories: Category[],
  selectedDate: Date,
  isBackButtonShown?: boolean,
  handleOnSubmit(event: React.FormEvent<HTMLFormElement>): void,
  handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void,
  handleDateSelection(date: any, value: any): void
}

type NumberFormatInputProps = {
  inputRef: (instance: NumberFormat | null) => void,
  onChange: (event: { target: { name: string; value: string } }) => void,
  name: string,
}

function ExpenseForm({
  state,
  isLoading,
  prefCurrency,
  categories,
  selectedDate,
  isBackButtonShown,
  handleOnSubmit,
  handleOnChange,
  handleDateSelection,
}: ExpenseFormComponentProps) {
  const classes = useStyles();

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
            startAdornment: <InputAdornment position="start">{prefCurrency ?? '$'}</InputAdornment>,

          }}
          onChange={handleOnChange}
        />

        <TextField
          id="category"
          name="category"
          variant="outlined"
          className={classes.textField}
          label="Category"
          value={state.category.title}
          required
          select
          onChange={handleOnChange}
        >
          {
            categories.map((cat) => (
              <MenuItem
                id="category"
                key={cat?._id}
                value={cat?.title}
              >
                {cat?.title}
              </MenuItem>
            ))
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
            PopoverProps={{
              anchorReference: 'anchorPosition',
              anchorPosition: {
                top: 500,
                left: 650,

              },
              anchorOrigin: {
                vertical: 'center',
                horizontal: 'right',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
            }}
          />
        </MuiPickersUtilsProvider>
        <div className={classes.buttonContainer}>
          <>
            <Button
              id="save-button"
              variant="contained"
              fullWidth
              color="secondary"
              type="submit"
              disabled={isLoading}
              className={classes.submitButton}
            >
              Save
            </Button>
            {isLoading && <CircularLoader styleClass={classes.buttonProgress} />}
          </>
          <Link
            to={{
              pathname: '/expenses',
              state: { from: 'edit-expense', isBackButtonShown },
            }}
            className={classes.link}
          >
            <Button
              id="cancel-button"
              variant="outlined"
              fullWidth
              color="primary"
              className={classes.cancelButton}
            >
              Cancel
            </Button>
          </Link>
        </div>
      </Paper>
    </form>
  );
}

function NumberFormatterInput(props: NumberFormatInputProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

export default ExpenseForm;
