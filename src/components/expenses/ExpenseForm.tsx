import React from 'react';
import { Link } from 'react-router-dom';
import {
  TextField, Paper, Button, MenuItem, InputAdornment,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import NumberFormat from 'react-number-format';

import { IExpense } from './IExpense';

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
  container: {
    border: '1px solid #fff',
    margin: 0,
    width: 500,
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
    width: 180,
    margin: 20,
  },
  deleteButton: {
    width: 180,
    margin: 20,
    color: '#fff',
    backgroundColor: red[900],
  },
  link: {
    textDecoration: 'none',
  },
}));

export type Category = {
  _id: string,
  title: string
}

type ExpenseFormComponentProps = {
  state: IExpense,
  prefCurrency: string | null,
  selectedCategory: Category,
  categories: Category[],
  handleSubmit(event: React.FormEvent<HTMLFormElement>): void | undefined,
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void,
  handleDateChange(date: any, value: any): void
}

type NumberFormatComponentProps = {
  inputRef: (instance: NumberFormat | null) => void,
  onChange: (event: { target: { name: string; value: string } }) => void,
  name: string
}

// const categoryList = [
//   { _id: 1, title: 'Entertainment' },
//   { _id: 2, title: 'Food' },
//   { _id: 3, title: 'Utilities' },
//   { _id: 4, title: 'Car' },
//   { _id: 5, title: 'Meals' },
//   { _id: 6, title: 'Personal Care' },
// ];

// TODO: add a useEffect mutation to fetch all categories
function ExpenseForm({
  state,
  prefCurrency,
  selectedCategory,
  categories,
  handleSubmit,
  handleChange,
  handleDateChange,
}: ExpenseFormComponentProps) {
  const classes = useStyles();
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Paper elevation={0} className={classes.textFieldsPaper}>
        <TextField
          id="title"
          className={classes.textField}
          variant="outlined"
          label="Title"
          value={state?.title}
          required
        />

        <TextField
          id="amount"
          variant="outlined"
          className={classes.textField}
          label="Amount"
          value={state?.amount}
          required
          InputProps={{
            inputComponent: NumberFormatterInput as any,
            startAdornment: <InputAdornment position="start">{prefCurrency}</InputAdornment>,

          }}
        />
        <TextField
          id="category"
          variant="outlined"
          className={classes.textField}
          label="Category"
          value={selectedCategory.title}
          required
          select
          onChange={handleChange}
        >
          {
            categories.map((cat) => (
              <MenuItem
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
          variant="outlined"
          className={classes.textField}
          label="Add a note"
          value={state?.notes}
          multiline
          rowsMax={4}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            className={classes.textField}
            label="Incurred On"
            views={['year', 'month', 'date']}
            value={new Date()}
            onChange={handleDateChange}
            variant="inline"
            inputVariant="outlined"
            format="yyyy/MM/dd hh:mm a"
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
        <div>
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            type="submit"
            className={classes.submitButton}
          >
            Save
          </Button>
          <Link to="/expenses" className={classes.link}>
            <Button
              variant="outlined"
              fullWidth
              color="primary"
              className={classes.submitButton}
            >
              Cancel
            </Button>
          </Link>
        </div>
      </Paper>
    </form>
  );
}

function NumberFormatterInput(props: NumberFormatComponentProps) {
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
