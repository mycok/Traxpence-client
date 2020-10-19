import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { IExpense } from './IExpense';
import SingleExpense from './SingleExpense';

const useStyles = makeStyles(() => createStyles({
  root: {
    marginTop: 90,
  },
}));

type ExpenseListProps = {
    expenses: IExpense[],
    handleOpen(): void,
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
                    handleOpen={handleOpen}
                  />
                ))
            }
    </div>
  );
}

export default ExpenseList;
