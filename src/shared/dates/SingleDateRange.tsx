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
    justifyContent: 'center',
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
    width: 200,
  },
}));

type SingleDateRangeProps = {
    views: any[],
    selectedDate: Date,
    selectDate(date: any, value?: any): void
}

function SingleDateRange({ views, selectedDate, selectDate }: SingleDateRangeProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.textField}
          disableFuture
          autoFocus
          autoOk
          views={views}
          inputVariant="outlined"
          label="Year"
          variant="inline"
          keyboardIcon={(<TodaySharp className={classes.inputAdornment} />)}
          value={selectedDate}
          onChange={selectDate}
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
}

export default SingleDateRange;
