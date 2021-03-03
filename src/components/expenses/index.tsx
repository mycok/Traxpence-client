import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import ExpenseList from './ExpenseList';
import DateRangeSearch from './shared/DateRangeSearch';
import NoExpenses from './NoExpenses';
import ConfirmDialog from '../../shared/ConfirmDialog';
import { useAppDispatch, RootState } from '../../redux/store';
import { fetchExpenses, deleteExpense } from '../../redux/reducers/expenses/fetchOrDeleteExpenses';
import { ExpensesLoader } from '../../shared/ContentLoader';
import { IExpense } from './IExpense';

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
    justifyContent: 'center',
  },
}));

export default function () {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [fromDate, selectFromDate] = useState(new Date());
  const [toDate, selectToDate] = useState(new Date());
  const [expenseToDelete, setExpenseToDelete] = useState<IExpense | null>(null);

  const {
    isLoading,
    isDeleting,
    cursor,
    count,
    hasNextPage,
    expenses,
  } = useSelector(
    (state: RootState) => state.fetchOrDeleteExpenses,
  );

  useEffect(() => {
    dispatch(fetchExpenses({ startDate: undefined, endDate: undefined, cursor: undefined }));
  }, [dispatch]);

  function handleOpen(expense: IExpense) {
    setExpenseToDelete(expense);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDelete() {
    dispatch(deleteExpense(expenseToDelete?._id as string, () => handleClose()));
  }

  function handleDateRangeSearch() {
    dispatch(fetchExpenses({ startDate: fromDate, endDate: toDate }));
  }

  function handleShowMore() {
    dispatch(fetchExpenses({ cursor }));
  }

  if (isLoading && count === 0) {
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
        isLoading={isLoading}
        fromDate={fromDate}
        toDate={toDate}
        selectFromDate={selectFromDate}
        selectToDate={selectToDate}
        dateRangeSearchHandler={handleDateRangeSearch}
      />
      <div className={classes.root}>
        <ConfirmDialog
          open={open}
          isDeleting={isDeleting}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
        <ExpenseList
          isLoading={isLoading}
          expenses={expenses}
          hasMore={hasNextPage}
          handleOpen={handleOpen}
          handleShowMore={handleShowMore}
        />
      </div>
    </div>
  );
}
