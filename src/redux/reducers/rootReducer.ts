import { combineReducers } from '@reduxjs/toolkit';
import { signup, signin, signout } from './auth';
import {
  fetchExpensesReducer,
  createExpenseReducer,
} from './expenses';
import { fetchCategoriesReducer } from './category';

const rootReducer = combineReducers({
  signup,
  signin,
  signout,
  fetchExpenses: fetchExpensesReducer,
  createExpense: createExpenseReducer,
  categories: fetchCategoriesReducer,
});

export default rootReducer;
