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
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: 700,
    height: '90vh',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
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
    <div className={classes.container}>
      <DateRangeSearch
        fromDate={fromDate}
        toDate={toDate}
        selectFromDate={selectFromDate}
        selectToDate={selectToDate}
      />
      <div className={classes.root}>
        <ConfirmDialog
          open={open}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
        <ExpenseList
          expenses={expenses}
          handleOpen={handleOpen}
        />
      </div>
    </div>
  );
}
