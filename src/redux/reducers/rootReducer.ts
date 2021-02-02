import { combineReducers } from '@reduxjs/toolkit';
import { signup, signin } from './auth';
import { fetchExpensesReducer } from './expenses';
import { fetchCategoriesReducer } from './category';

const rootReducer = combineReducers({
  signup,
  signin,
  fetchExpenses: fetchExpensesReducer,
  categories: fetchCategoriesReducer,
});

export default rootReducer;
