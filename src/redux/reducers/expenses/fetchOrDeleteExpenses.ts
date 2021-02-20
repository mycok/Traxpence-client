import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IExpense } from '../../../components/expenses/IExpense';
import { list, remove } from '../../../api';
import { fetchExpensesByDateRange } from '../../../api/expenses';
import { isAuthenticated } from '../../../api/auth';
import { AppThunk } from '../../store';

type ExpensesState = {
    expenses: IExpense[],
    isLoading: boolean,
    isDeleting: boolean,
    serverError: string | null,
    authError: string | null,
}

const initialExpensesState: ExpensesState = {
  expenses: [],
  isLoading: false,
  isDeleting: false,
  serverError: null,
  authError: null,
};

export function fetchExpenses(): AppThunk {
  return async (dispatch) => {
    const { token } = isAuthenticated();
    let data: any;
    try {
      dispatch(setLoading(true));
      data = await list('expenses', token);
    } catch (error) {
      // for generic server errors
      dispatch(setLoading(false));
      dispatch(setServerError(error.toString()));

      return;
    }

    dispatch(setLoading(false));

    if (data.success) {
      dispatch(fetchExpensesSuccessful(data.expenses));
    } else {
      // in case of token based errors
      localStorage.removeItem('authData');
      dispatch(setAuthError(data.message));
    }
  };
}

export function fetchExpensesByDate(startDate: any, endDate: any): AppThunk {
  return async (dispatch) => {
    const { token } = isAuthenticated();
    let data: any;
    try {
      dispatch(setLoading(true));
      data = await fetchExpensesByDateRange(startDate, endDate, token);
    } catch (error) {
      // for generic server errors
      dispatch(setLoading(false));
      dispatch(setServerError(error.toString()));

      return;
    }

    dispatch(setLoading(false));

    if (data.success) {
      dispatch(fetchExpensesSuccessful(data.expenses));
    } else {
      // in case of token based errors
      localStorage.removeItem('authData');
      dispatch(setAuthError(data.message));
    }
  };
}

export function deleteExpense(expenseId: string, cb: Function): AppThunk {
  return async (dispatch) => {
    const { token } = isAuthenticated();
    let data: any;
    try {
      dispatch(setDeleting(true));
      data = await remove('expenses', expenseId, token);
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
    setServerError(state, action: PayloadAction<string | null>) {
      state.serverError = action.payload;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
      state.authError = action.payload;
    },
    fetchExpensesSuccessful(state, action: PayloadAction<IExpense[]>) {
      state.expenses = action.payload;
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
} = expensesSlice.actions;

export const fetchOrDeleteExpensesReducer = expensesSlice.reducer;
