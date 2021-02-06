import { combineReducers } from '@reduxjs/toolkit';
import { signup, signin, signout } from './auth';
import { fetchExpensesReducer } from './expenses';
import { fetchCategoriesReducer } from './category';

const rootReducer = combineReducers({
  signup,
  signin,
  signout,
  fetchExpenses: fetchExpensesReducer,
  categories: fetchCategoriesReducer,
});

export default rootReducer;
