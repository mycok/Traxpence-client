import React, { useState, useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import { IExpense } from './IExpense';
import ExpenseForm from './ExpenseForm';
import { useAppDispatch, RootState } from '../../redux/store/index';
import { setSelectedCategory, fetchCategories } from '../../redux/reducers/category/fetchCategories';

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

  const [expenseState, dispatch] = useReducer(
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

  const [prefCurrency] = useState<string | null>(localStorage.getItem('currency'));
  const storeDispatch = useAppDispatch();
  const { selectedCategory, categories } = useSelector(
    (state: RootState) => state.categories,
  );

  useEffect(() => {
    storeDispatch(fetchCategories());
  }, [storeDispatch]);

  function handleDateChange(date: Date | null) {
    return dispatch({ type: 'SET_DATE', payload: date });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    storeDispatch(setSelectedCategory(event.target.value));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) { }

  return (
    <div className={classes.container}>
      <Paper elevation={5}>
        <ExpenseForm
          state={expenseState}
          prefCurrency={prefCurrency}
          categories={categories}
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
