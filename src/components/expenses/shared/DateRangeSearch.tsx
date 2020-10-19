import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import MultipleDateRange from '../../../shared/dates/MultipleDateRange';
import SearchButton from '../../../shared/SearchButton';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 90,
    width: '100%',
  },
}));

type DateRangeSearchProps = {
    views: any[],
    fromDate: Date,
    toDate: Date,
    selectFromDate(date: any, value?: any): void,
    selectToDate(date: any, value?: any): void
}

function DateRangeSearch({
  views,
  fromDate,
  toDate,
  selectFromDate,
  selectToDate,
}: DateRangeSearchProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MultipleDateRange
        views={views}
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
