import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import ExpenseForm from './ExpenseForm';
import { useAppDispatch, RootState } from '../../redux/store';
import { fetchCategories, Category } from '../../redux/reducers/category/fetchCategories';
import { onValueChange, editExpense } from '../../redux/reducers/expenses/editExpense';

const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

type EditExpenseProps = {
  history: any
}

function EditExpense({ history }: EditExpenseProps) {
  const classes = useStyles();
  const [selectedDate, selectDate] = useState<Date>(new Date());
  const [prefCurrency] = useState<string | null>(localStorage.getItem('currency'));
  const dispatch = useAppDispatch();
  const { categories } = useSelector(
    (state: RootState) => state.categories,
  );
  const {
    _id,
    title,
    amount,
    category,
    notes,
    incurredOn,
    isLoading,
  } = useSelector(
    (state: RootState) => state.editExpense,
  );

  const expenseFormState = {
    title,
    amount,
    category,
    notes,
    incurredOn,
  };

  console.log('history-location-state', history?.location?.state?.isBackButtonShown);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target: { name, value } } = event;

    if (name === 'category') {
      const selectedCategory = categories.find((cat: Category) => cat.title === value);
      dispatch(onValueChange({ name, value: selectedCategory }));
    } else {
      dispatch(onValueChange({ name, value }));
    }
  }

  function handleDateSelection(date: Date) {
    selectDate(date);
  }

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    // TODO: add field validation
    event.preventDefault();

    const editedExpense = {
      ...expenseFormState,
      category: { _id: category?._id },
      amount: Number(amount),
      incurredOn: selectedDate,
    };
    dispatch(editExpense(_id as string, editedExpense, () => history.push('/expenses')));
  }

  return (
    <div className={classes.container}>
      <Paper elevation={5}>
        <ExpenseForm
          state={expenseFormState}
          isLoading={isLoading}
          prefCurrency={prefCurrency}
          categories={categories}
          selectedDate={selectedDate}
          isBackButtonShown={history?.location?.state?.isBackButtonShown}
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          handleDateSelection={handleDateSelection}
        />
      </Paper>
    </div>
  );
}

export default EditExpense;
