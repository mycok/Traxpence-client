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

type CurrentMonthExpenditurePreviewResponse = {
  success: boolean;
  expensePreview: ExpensePreview;
};

type CurrentMonthExpenditurePreviewState = {
  isLoading: boolean; // Not very sure it's needed.
  serverError: string | null;
  expensePreview: ExpensePreview;
};

const initialCurrentMonthExpenditurePreviewState: CurrentMonthExpenditurePreviewState = {
  isLoading: false,
  serverError: null,
  expensePreview: {},
};

export function fetchCurrentMonthExpenditurePreview(): AppThunk {
  return async (dispatch) => {
    dispatch(setLoading(true));

    await list('expenses/current')
      .then((res: CurrentMonthExpenditurePreviewResponse) => {
        dispatch(
          fetchCurrentMonthExpenditurePreviewSuccessful(res.expensePreview),
        );
      })
      .catch((err: any) => {
        dispatch(setLoading(false));
        dispatch(setServerError(err.toString()));
      });
  };
}

const currentMonthExpenditurePreviewSlice = createSlice({
  name: 'currentMonthExpenditurePreview',
  initialState: initialCurrentMonthExpenditurePreviewState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setServerError(state, action: PayloadAction<string | null>) {
      state.serverError = action.payload;
    },
    fetchCurrentMonthExpenditurePreviewSuccessful(
      state,
      action: PayloadAction<ExpensePreview>,
    ) {
      state.expensePreview = action.payload;
    },
  },
});

const {
  setLoading,
  setServerError,
  fetchCurrentMonthExpenditurePreviewSuccessful,
} = currentMonthExpenditurePreviewSlice.actions;

export const currentMonthExpenditurePreviewReducer = currentMonthExpenditurePreviewSlice.reducer;
