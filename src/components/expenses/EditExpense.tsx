import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import { IExpense } from './IExpense';
import ExpenseForm from './ExpenseForm';

const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

type EditExpenseProps = {
  location: any
}

type Action = {
    type: string;
    payload: any;
};

function EditExpense({ location }: EditExpenseProps) {
  const classes = useStyles();

  const [expenseState, dispatch] = React.useReducer(
    (state: IExpense, action: Action) => {
      switch (action.type) {
        case 'SET_TITTLE':
          break;

        default:
          break;
      }
      return state;
    },
    location?.state,
  );

  const [prefCurrency] = React.useState(localStorage.getItem('currency'));
  const [selectedCategory, selectCategory] = React.useState(expenseState?.category?.title);

  function handleDateChange(date: Date | null) {
    return dispatch({ type: 'SET_DATE', payload: date });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    selectCategory(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) { }

  return (
    <div className={classes.container}>
      <Paper elevation={5}>
        <ExpenseForm
          state={expenseState}
          prefCurrency={prefCurrency}
          selectedCategory={selectedCategory}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
        />
      </Paper>
    </div>
  );
}

export default EditExpense;
