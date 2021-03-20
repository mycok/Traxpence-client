import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { list } from '../../../api';
import { AppThunk } from '../../store';

export type ExpensePreview = {
  month?: {
    _id: string;
    totalSpent: number;
  };
  yesterday?: {
    _id: string;
    totalSpent: number;
  };
  today?: {
    _id: string;
    totalSpent: number;
  };
};

type CurrentMonthExpenditurePreviewState = {
  isLoading: boolean;
  serverError: string | undefined;
  data: ExpensePreview;
};

type CurrentMonthExpenditurePreviewResponse = {
  success: false;
  expensePreview?: ExpensePreview;
  message?: string;
};

const initialCurrentMonthExpenditurePreviewState: CurrentMonthExpenditurePreviewState = {
  isLoading: false,
  serverError: undefined,
  data: {},
};

export function fetchCurrentMonthExpenditurePreview(): AppThunk {
  return async (dispatch) => {
    let data: CurrentMonthExpenditurePreviewResponse;
    try {
      dispatch(setLoading(true));
      data = await list('expenses/current');
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setServerError(error.toString()));

      return;
    }

    dispatch(setLoading(false));
    if (data.success) {
      dispatch(
        fetchCurrentMonthExpenditurePreviewSuccessful(data.expensePreview),
      );
    } else {
      // in case of bad request errors
      localStorage.removeItem('authData');
      dispatch(setServerError(data.message));
    }
  };
}

const currentMonthExpenditurePreviewSlice = createSlice({
  name: 'currentMonthExpenditurePreview',
  initialState: initialCurrentMonthExpenditurePreviewState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setServerError(state, action: PayloadAction<string | undefined>) {
      state.serverError = action.payload;
    },
    fetchCurrentMonthExpenditurePreviewSuccessful(
      state,
      action: PayloadAction<any>,
    ) {
      state.data = action.payload;
    },
  },
});

const {
  setLoading,
  setServerError,
  fetchCurrentMonthExpenditurePreviewSuccessful,
} = currentMonthExpenditurePreviewSlice.actions;

export const currentMonthExpenditurePreviewReducer = currentMonthExpenditurePreviewSlice.reducer;
