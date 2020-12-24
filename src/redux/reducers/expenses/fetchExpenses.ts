import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IExpense } from '../../../components/expenses/IExpense';
import { list } from '../../../api';
import { AppThunk } from '../rootReducer';
import { isAuthenticated } from '../../../api/auth';

type ExpensesState = {
    expenses: IExpense[],
    isLoading: boolean,
    serverError: string | null,
}

const initialExpensesState: ExpensesState = {
  expenses: [],
  isLoading: false,
  serverError: null,
};

export function fetchExpenses(): AppThunk {
  return async (dispatch) => {
    const { token } = isAuthenticated();
    let data: any;
    try {
      dispatch(setLoading(true));
      data = await list('expenses', token);
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setServerError(error.toString()));

      return;
    }

    dispatch(setLoading(false));
    dispatch(fetchExpensesSuccessful(data.expenses));
  };
}

const expensesSlice = createSlice({
  name: 'fetchExpenses',
  initialState: initialExpensesState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setServerError(state, action: PayloadAction<string>) {
      state.serverError = action.payload;
    },
    fetchExpensesSuccessful(state, action: PayloadAction<IExpense[]>) {
      state.expenses = action.payload;
    },
  },
});

export const {
  setLoading,
  setServerError,
  fetchExpensesSuccessful,
} = expensesSlice.actions;

export const fetchExpensesReducer = expensesSlice.reducer;
