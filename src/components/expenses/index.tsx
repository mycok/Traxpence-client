import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import ExpenseList from './ExpenseList';
import DateRangeSearch from './shared/DateRangeSearch';
import NoExpenses from './NoExpenses';
import ConfirmDialog from '../../shared/ConfirmDialog';
import { IExpense } from './IExpense';

const useStyles = makeStyles(() => createStyles({
  root: {
    marginTop: 70,
    display: 'flex',
    flexDirection: 'column',
    width: 650,
  },
}));

const expenseList: IExpense[] = [
  {
    _id: '54605',
    title: 'Lunch with john doe',
    amount: 50000,
    category: {
      _id: '53638',
      title: 'Meals',
    },
    notes: "This was un planned for and expensive lunch and if it wasn't the fact that i had the money, i wouldn't have spent that much.",
    incurredOn: new Date().toDateString(),
  },
  {
    _id: '54604',
    title: 'Yaka',
    amount: 30000,
    category: {
      _id: '42351',
      title: 'Utilities',
    },
    notes: '',
    incurredOn: new Date().toDateString(),
  },
  {
    _id: '67518',
    title: 'Hair Cut',
    amount: 5000,
    category: {
      _id: '09877',
      title: 'Personal Care',
    },
    notes: '',
    incurredOn: new Date().toDateString(),
  },
];

export default function () {
  const classes = useStyles();
  const [expenses] = React.useState(expenseList);
  const [open, setOpen] = React.useState(false);
  const [fromDate, selectFromDate] = React.useState(new Date());
  const [toDate, selectToDate] = React.useState(new Date());

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDelete() {

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
