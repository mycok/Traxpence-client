import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router-dom';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import ExpenseForm from './ExpenseForm';
import AddCategoryDialog from './shared/AddDialog';

import { useAppDispatch, RootState } from '../../redux/store';
import { fetchCategories, Category } from '../../redux/reducers/category/fetchCategories';
import { onValueChange, createExpense } from '../../redux/reducers/expenses/createExpense';
import { setDidFinishDateRangeSearch } from '../../redux/reducers/expenses/fetchOrDeleteExpenses';
import { onCategoryValueChange, createCategory } from '../../redux/reducers/category/createCategory';

const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

type RouteProps = {
  history: RouteChildrenProps['history'],
};

function NewExpense({ history }: RouteProps) {
  const classes = useStyles();
  const [selectedDate, selectDate] = useState<Date>(new Date());
  const [prefCurrency] = useState<string | null>(localStorage.getItem('currency'));
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {
    title,
    amount,
    category,
    notes,
    incurredOn,
    isSaving,
  } = useSelector(
    (state: RootState) => state.createExpense,
  );
  const { isLoading, categories } = useSelector(
    (state: RootState) => state.categories,
  );
  const {
    title: categoryTitle,
    isSavingCategory,
    didFinishCreatingCategory,
  } = useSelector(
    (state: RootState) => state.createCategory,
  );
  const { didFinishDateRangeSearch } = useSelector(
    (state: RootState) => state.fetchOrDeleteExpenses,
  );

  const expenseFormState = {
    title,
    amount,
    category,
    notes,
    incurredOn,
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, didFinishCreatingCategory]);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target: { name, value } } = event;

    if (name === 'category' && value) {
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

    const newExpense = {
      ...expenseFormState,
      category: { _id: category?._id },
      amount: Number(amount),
      incurredOn: selectedDate,
    };

    if (didFinishDateRangeSearch) dispatch(setDidFinishDateRangeSearch(false));
    dispatch(createExpense(newExpense, () => history.push('/expenses')));
  }

  // new category functionality

  function handleNewCategoryOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target: { value } } = event;

    dispatch(onCategoryValueChange({ value }));
  }

  function handleSaveNewCategory() {
    dispatch(createCategory({ title: categoryTitle }, handleCloseNewCategoryDialog));
  }

  function handleCloseNewCategoryDialog() {
    setOpen(false);
  }

  function handleOpenNewCategoryDialog() {
    setOpen(true);
  }

  // TODO: add functionality to display toast with server error

  return (
    <div className={classes.container}>
      <Paper elevation={5}>
        <ExpenseForm
          state={expenseFormState}
          isLoading={isLoading}
          isSaving={isSaving}
          prefCurrency={prefCurrency}
          categories={categories}
          path="new-expense"
          selectedDate={selectedDate}
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          handleDateSelection={handleDateSelection}
          handleShowAddCategoryDialog={handleOpenNewCategoryDialog}
        />
      </Paper>
      <AddCategoryDialog
        open={open}
        isSaving={isSavingCategory}
        label="Title"
        dialogTitle="Add New Category"
        value={categoryTitle}
        handleOnChange={handleNewCategoryOnChange}
        handleSave={handleSaveNewCategory}
        handleClose={handleCloseNewCategoryDialog}
      />
    </div>
  );
}

export default NewExpense;
