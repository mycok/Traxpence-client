/* eslint-disable no-unused-vars */
import React from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { TodaySharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  inputAdornment: {
    color: theme.palette.common.white,
  },
  textField: {
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
    '& .MuiInputLabel-outlined': {
      color: theme.palette.common.white,
    },
    '& label.Mui-focused': {
      color: theme.palette.common.white,
    },
    width: 300,
  },
}));

type MultipleDateRangeProps = {
    fromDate: Date,
    toDate: Date,
    selectFromDate(date: any, value?: string | null): void,
    selectToDate(date: any, value?: string | null): void
}
// TODO: - add date limits to ensure that fromDate is always greater than the toDate
function MultipleDateRange({
  fromDate,
  toDate,
  selectFromDate,
  selectToDate,
}: MultipleDateRangeProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.textField}
          disableFuture
          autoFocus
          autoOk
          inputVariant="outlined"
          label="From"
          variant="inline"
          value={fromDate}
          format="dd/MM/yyyy"
          keyboardIcon={(<TodaySharp className={classes.inputAdornment} />)}
          onChange={selectFromDate}
        />
        <KeyboardDatePicker
          className={classes.textField}
          disableFuture
          autoFocus
          autoOk
          inputVariant="outlined"
          label="To"
          variant="inline"
          value={toDate}
          format="dd/MM/yyyy"
          keyboardIcon={(<TodaySharp className={classes.inputAdornment} />)}
          onChange={selectToDate}
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
}

export default MultipleDateRange;
