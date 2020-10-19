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
    views: any[],
    fromDate: Date,
    toDate: Date,
    selectFromDate(date: any, value?: any): void,
    selectToDate(date: any, value?: any): void
}
// TODO: - add date limits to ensure that fromDate is always greater than the toDate
function MultipleDateRange({
  views,
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
          views={views}
          inputVariant="outlined"
          label="From"
          variant="inline"
          value={fromDate}
          onChange={selectFromDate}
        />
        <KeyboardDatePicker
          disableFuture
          autoFocus
          autoOk
          views={views}
          inputVariant="outlined"
          label="To"
          variant="inline"
          value={toDate}
          onChange={selectToDate}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default MultipleDateRange;
