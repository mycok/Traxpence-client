import React, { useState, useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import { IExpense } from './IExpense';
import ExpenseForm from './ExpenseForm';
import { useAppDispatch, RootState } from '../../redux/store/index';
import { fetchCategories } from '../../redux/reducers/category/fetchCategories';

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

  const [expenseState] = useReducer(
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

  const [selectedDate, selectDate] = useState<Date>(new Date());
  const [prefCurrency] = useState<string | null>(localStorage.getItem('currency'));
  const storeDispatch = useAppDispatch();
  const { categories } = useSelector(
    (state: RootState) => state.categories,
  );

  useEffect(() => {
    storeDispatch(fetchCategories());
  }, [storeDispatch]);

  function handleDateSelection(date: Date) {
    selectDate(date);
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    // storeDispatch(setSelectedCategory(event.target.value));
  }

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) { }

  return (
    <div className={classes.container}>
      <Paper elevation={5}>
        <ExpenseForm
          state={expenseState}
          isLoading={false}
          prefCurrency={prefCurrency}
          categories={categories}
          selectedDate={selectedDate}
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          handleDateSelection={handleDateSelection}
        />
      </Paper>
    </div>
  );
}

export default EditExpense;
