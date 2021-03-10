import { combineReducers } from '@reduxjs/toolkit';
import { signup, signin, signout } from './auth';
import {
  fetchOrDeleteExpensesReducer,
  createExpenseReducer,
  editExpenseReducer,
  currentMonthExpenditurePreviewReducer,
  monthlyCategoryExpAggregateReducer,
} from './expenses';
import { fetchCategoriesReducer } from './category';

const rootReducer = combineReducers({
  signup,
  signin,
  signout,
  fetchOrDeleteExpenses: fetchOrDeleteExpensesReducer,
  createExpense: createExpenseReducer,
  editExpense: editExpenseReducer,
  categories: fetchCategoriesReducer,
  currentMonthExpPreview: currentMonthExpenditurePreviewReducer,
  expenditureAvgByCategory: monthlyCategoryExpAggregateReducer,
});

export default rootReducer;
