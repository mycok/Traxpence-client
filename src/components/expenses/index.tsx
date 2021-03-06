import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Fab } from '@material-ui/core';

import ExpenseList from './ExpenseList';
import DateRangeSearch from './shared/DateRangeSearch';
import NoExpenses from './NoExpenses';
import ConfirmDialog from '../../shared/ConfirmDialog';
import { ExpensesLoader } from '../../shared/ContentLoader';
import CustomTooltip from '../../shared/CustomTooltip';

import { useAppDispatch, RootState } from '../../redux/store';
import { fetchExpenses, deleteExpense } from '../../redux/reducers/expenses/fetchOrDeleteExpenses';
import { IExpense } from './IExpense';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '90vh',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
  },
  dateContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  backButton: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

export default function ({ location }: RouteComponentProps<'location', {}, { from: string }>) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [isBackButtonShown, setShowBackButton] = useState(false);
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
    if (!location?.state) {
      dispatch(fetchExpenses({ startDate: undefined, endDate: undefined, cursor: undefined }));
    } else if (location?.state?.from) {
      setShowBackButton(true);
    }

    return () => setShowBackButton(false);
  }, [dispatch, location]);

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
    setShowBackButton(true);
    dispatch(fetchExpenses({ startDate: fromDate, endDate: toDate }));
  }

  function handleShowMore() {
    dispatch(fetchExpenses({ cursor }));
  }

  function handleBackButton() {
    selectFromDate(new Date());
    selectToDate(new Date());
    dispatch(fetchExpenses({ startDate: undefined, endDate: undefined, cursor: undefined }));
    setShowBackButton(false);
  }

  if ((isLoading && count === 0) || (isLoading && !isBackButtonShown && !hasNextPage)) {
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
      <div className={classes.dateContainer}>
        {
          isBackButtonShown && (
            <CustomTooltip title="back to expenses">
              <Fab
                aria-label="search"
                className={classes.backButton}
                size="small"
                // disabled={isLoading}
                onClick={handleBackButton}
              >
                <ArrowBackIcon />
              </Fab>
            </CustomTooltip>
          )
        }
        <DateRangeSearch
          isLoading={isLoading}
          isBackButtonShown={isBackButtonShown}
          fromDate={fromDate}
          toDate={toDate}
          selectFromDate={selectFromDate}
          selectToDate={selectToDate}
          dateRangeSearchHandler={handleDateRangeSearch}
        />
      </div>
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
