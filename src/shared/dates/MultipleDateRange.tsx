/* eslint-disable no-unused-vars */
import React from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  textField: {
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
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableFuture
          autoFocus
          autoOk
          inputVariant="outlined"
          label="From"
          variant="inline"
          value={fromDate}
          format="dd/MM/yyyy"
          onChange={selectFromDate}
        />
        <KeyboardDatePicker
          disableFuture
          autoFocus
          autoOk
          inputVariant="outlined"
          label="To"
          variant="inline"
          value={toDate}
          format="dd/MM/yyyy"
          onChange={selectToDate}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default MultipleDateRange;
