import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import ExpenseList from './ExpenseList';
import DateRangeSearch from './shared/DateRangeSearch';
import NoExpenses from './NoExpenses';
import ConfirmDialog from '../../shared/ConfirmDialog';
import { useAppDispatch, RootState } from '../../redux/store';
import { fetchExpenses } from '../../redux/reducers/expenses/fetchExpenses';
import { ExpensesLoader } from '../../shared/ContentLoader';

const useStyles = makeStyles(() => createStyles({
  root: {
    marginTop: 70,
    display: 'flex',
    flexDirection: 'column',
    width: 650,
  },
}));

export default function () {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [fromDate, selectFromDate] = useState(new Date());
  const [toDate, selectToDate] = useState(new Date());

  const { isLoading, expenses } = useSelector(
    (state: RootState) => state.fetchExpenses,
  );

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDelete() {

  }

  if (isLoading) {
    return (
      <ExpensesLoader />
    );
  }

  if (expenses.length === 0) {
    return (
      <NoExpenses />
    );
  }

  return (
    <div className={classes.root}>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <DateRangeSearch
        views={['month']}
        fromDate={fromDate}
        toDate={toDate}
        selectFromDate={selectFromDate}
        selectToDate={selectToDate}
      />
      <ExpenseList
        expenses={expenses}
        handleOpen={handleOpen}
      />
    </div>
  );
}
