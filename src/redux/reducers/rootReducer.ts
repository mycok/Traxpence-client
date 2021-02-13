import { combineReducers } from '@reduxjs/toolkit';
import { signup, signin, signout } from './auth';
import {
  fetchExpensesReducer,
  createExpenseReducer,
  editExpenseReducer,
} from './expenses';
import { fetchCategoriesReducer } from './category';

const rootReducer = combineReducers({
  signup,
  signin,
  signout,
  fetchExpenses: fetchExpensesReducer,
  createExpense: createExpenseReducer,
  editExpense: editExpenseReducer,
  categories: fetchCategoriesReducer,
});

export default rootReducer;
