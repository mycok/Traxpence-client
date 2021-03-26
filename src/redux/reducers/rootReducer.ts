import { combineReducers } from '@reduxjs/toolkit';
import { signup, signin, signout } from './auth';
import {
  fetchOrDeleteExpensesReducer,
  createExpenseReducer,
  editExpenseReducer,
  currentMonthExpenditurePreviewReducer,
  monthlyCategoryExpAggregateReducer,
  scatterPlotExpenseDataReducer,
  annualExpenseDataReducer,
} from './expenses';
import {
  fetchCategoriesReducer,
  createCategoryReducer,
} from './category';

const rootReducer = combineReducers({
  signup,
  signin,
  signout,
  fetchOrDeleteExpenses: fetchOrDeleteExpensesReducer,
  createExpense: createExpenseReducer,
  editExpense: editExpenseReducer,
  categories: fetchCategoriesReducer,
  createCategory: createCategoryReducer,
  currentMonthExpPreview: currentMonthExpenditurePreviewReducer,
  expenditureAvgByCategory: monthlyCategoryExpAggregateReducer,
  expensePlotData: scatterPlotExpenseDataReducer,
  annualExpenseData: annualExpenseDataReducer,
});

export default rootReducer;
