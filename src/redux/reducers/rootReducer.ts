import { combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import { signup, signin } from './auth';
import { fetchExpensesReducer } from './expenses';

const rootReducer = combineReducers({
  signup,
  signin,
  fetchExpenses: fetchExpensesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default rootReducer;
