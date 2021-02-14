/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { IExpense } from './IExpense';
import SingleExpense from './SingleExpense';

const useStyles = makeStyles(() => createStyles({
  root: {
    paddingTop: 5,
    paddingBottom: 5,
    height: '90vh',
    overflowY: 'auto',
  },
}));

type ExpenseListProps = {
    expenses: IExpense[],
    handleOpen(exp: IExpense): void,
};

function ExpenseList({ expenses, handleOpen }: ExpenseListProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
                expenses?.map((exp) => (
                  <SingleExpense
                    key={exp?._id}
                    expense={exp}
                    handleOpen={() => handleOpen(exp)}
                  />
                ))
            }
    </div>
  );
}

export default ExpenseList;
