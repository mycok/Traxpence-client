import { combineReducers } from '@reduxjs/toolkit';
import { signup, signin, signout } from './auth';
import {
  fetchOrDeleteExpensesReducer,
  createExpenseReducer,
  editExpenseReducer,
  currentMonthExpenditurePreviewReducer,
  currentMonthAvgTotalExpByCategoryReducer,
  scatterPlotExpenseDataReducer,
  annualExpenseDataReducer,
} from './expenses';
import {
  fetchCategoriesReducer,
  createCategoryReducer,
} from './category';
import { fetchWalletReducer, updateWalletReducer } from './wallet';

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
  currentMonthAvgTotalExpByCategory: currentMonthAvgTotalExpByCategoryReducer,
  expensePlotData: scatterPlotExpenseDataReducer,
  annualExpenseData: annualExpenseDataReducer,
  userWallet: fetchWalletReducer,
  updateWallet: updateWalletReducer,
});

export default rootReducer;
