import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import ExpenseForm from './ExpenseForm';
import ServerMessage from '../../shared/ServerMessage';

import { useAppDispatch, RootState } from '../../redux/store';
import { fetchCategories, Category } from '../../redux/reducers/category/fetchCategories';
import { onValueChange, editExpense, setServerError } from '../../redux/reducers/expenses/editExpense';

const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function EditExpense({ history }: RouteComponentProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { isLoading, categories } = useSelector(
    (state: RootState) => state.categories,
  );
  const { expenseToEdit, isSaving, serverError } = useSelector(
    (state: RootState) => state.editExpense,
  );

  const [selectedDate, selectDate] = useState<Date>(expenseToEdit.incurredOn);
  const [prefCurrency] = useState<string | null>(localStorage.getItem('currency'));

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

  function hideServerMessage() {
    dispatch(setServerError(undefined));
  }

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    // TODO: add field validation
    event.preventDefault();

    const {
      _id,
      title,
      amount,
      category,
      notes,
    } = expenseToEdit;

    const editedExpense = {
      title,
      amount: Number(amount),
      category: { _id: category?._id },
      notes,
      incurredOn: selectedDate,
    };
    dispatch(editExpense(_id as string, editedExpense, () => history.push('/expenses')));
  }

  return (
    <div className={classes.container}>
      <Paper elevation={5}>
        <ExpenseForm
          state={expenseToEdit}
          isLoading={isLoading}
          isSaving={isSaving}
          prefCurrency={prefCurrency}
          categories={categories}
          selectedDate={selectedDate}
          path="edit-expense"
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          handleDateSelection={handleDateSelection}
        />
      </Paper>
      <ServerMessage
        open={!!serverError}
        message={serverError as string}
        onClose={hideServerMessage}
      />
    </div>
  );
}

export default EditExpense;
