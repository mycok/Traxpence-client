import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IExpense } from '../../../components/expenses/IExpense';
import { list } from '../../../api';
import { isAuthenticated } from '../../../api/auth';
import { AppThunk } from '../../store';

type ExpensesState = {
    expenses: IExpense[],
    isLoading: boolean,
    serverError: string | null,
    authError: string | null,
}

const initialExpensesState: ExpensesState = {
  expenses: [],
  isLoading: false,
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

const expensesSlice = createSlice({
  name: 'fetchExpenses',
  initialState: initialExpensesState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
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
  },
});

export const {
  setLoading,
  setServerError,
  setAuthError,
  fetchExpensesSuccessful,
} = expensesSlice.actions;

export const fetchExpensesReducer = expensesSlice.reducer;
