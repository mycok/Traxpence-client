import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IExpense } from '../../../components/expenses/IExpense';
import { remove } from '../../../api';
import { listExpenses, FetchExpensesParams } from '../../../api/expenses';
import { AppThunk } from '../../store';

type ExpensesState = {
    expenses: IExpense[],
    isLoading: boolean,
    isDeleting: boolean,
    serverError: string | undefined,
    authError: string | undefined,
    hasNextPage: boolean,
    cursor: Date | string | undefined,
    count: number,
}

type FetchExpensesResponse = {
  success: boolean,
  count: number,
  expenses: IExpense[],
  cursor: Date | string,
  hasNextPage: boolean,
}

const initialExpensesState: ExpensesState = {
  expenses: [],
  isLoading: false,
  isDeleting: false,
  serverError: undefined,
  authError: undefined,
  hasNextPage: false,
  cursor: '',
  count: 0,
};

export function fetchExpenses({ startDate, endDate, cursor }: FetchExpensesParams): AppThunk {
  return async (dispatch) => {
    let data: any;
    try {
      dispatch(setLoading(true));
      data = await listExpenses({ startDate, endDate, cursor });
    } catch (error) {
      // for generic server errors
      dispatch(setLoading(false));
      dispatch(setServerError(error.toString()));

      return;
    }

    dispatch(setLoading(false));

    if (data.success) {
      if (startDate || endDate) {
        dispatch(fetchDateRangeExpensesSuccessful(data));
      } else {
        dispatch(fetchExpensesSuccessful(data));
      }
    } else {
      // in case of token based errors
      localStorage.removeItem('authData');
      dispatch(setAuthError(data.message));
    }
  };
}

export function deleteExpense(expenseId: string, cb: Function): AppThunk {
  return async (dispatch) => {
    let data: any;
    try {
      dispatch(setDeleting(true));
      data = await remove('expenses', expenseId);
    } catch (error) {
      // for generic server errors
      dispatch(setDeleting(false));
      dispatch(setServerError(error.toString()));

      return;
    }

    dispatch(setDeleting(false));

    if (data.success) {
      dispatch(deleteExpenseSuccessful(expenseId));
      cb();
    } else {
      // in case of token based errors
      localStorage.removeItem('authData');
      dispatch(setAuthError(data.message));
    }
  };
}

const expensesSlice = createSlice({
  name: 'fetchOrDeleteExpenses',
  initialState: initialExpensesState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setDeleting(state, action: PayloadAction<boolean>) {
      state.isDeleting = action.payload;
    },
    setServerError(state, action: PayloadAction<string | undefined>) {
      state.serverError = action.payload;
    },
    setAuthError(state, action: PayloadAction<string | undefined>) {
      state.authError = action.payload;
    },
    fetchDateRangeExpensesSuccessful(state, action: PayloadAction<FetchExpensesResponse>) {
      state.expenses = action.payload.expenses;
      state.cursor = action.payload.cursor;
      state.hasNextPage = action.payload.hasNextPage;
      state.count = action.payload.count;
    },
    fetchExpensesSuccessful(state, action: PayloadAction<FetchExpensesResponse>) {
      state.expenses = [...state.expenses, ...action.payload.expenses];
      state.cursor = action.payload.cursor;
      state.hasNextPage = action.payload.hasNextPage;
      state.count = action.payload.count;
    },
    deleteExpenseSuccessful(state, action: PayloadAction<string>) {
      state.expenses = state.expenses.filter((exp: IExpense) => exp._id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setDeleting,
  setServerError,
  setAuthError,
  deleteExpenseSuccessful,
  fetchExpensesSuccessful,
  fetchDateRangeExpensesSuccessful,
} = expensesSlice.actions;

export const fetchOrDeleteExpensesReducer = expensesSlice.reducer;
