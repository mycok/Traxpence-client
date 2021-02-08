/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import MultipleDateRange from '../../../shared/dates/MultipleDateRange';
import SearchButton from '../../../shared/SearchButton';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
  },
}));

type DateRangeSearchProps = {
    fromDate: Date,
    toDate: Date,
    selectFromDate(date: any, value?: any): void,
    selectToDate(date: any, value?: any): void
}

function DateRangeSearch({
  fromDate,
  toDate,
  selectFromDate,
  selectToDate,
}: DateRangeSearchProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MultipleDateRange
        fromDate={fromDate}
        toDate={toDate}
        selectFromDate={selectFromDate}
        selectToDate={selectToDate}
      />
      <SearchButton />
    </div>
  );
}

export default DateRangeSearch;
