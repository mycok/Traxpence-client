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
  currentMonthExpenditurePreview: ExpensePreview;
};

type CurrentMonthExpenditurePreviewState = {
  isLoading: boolean; // Not very sure it's needed.
  serverError: string | null;
  currentMonthExpenditurePreview: ExpensePreview;
};

const initialCurrentMonthExpenditurePreviewState: CurrentMonthExpenditurePreviewState = {
  isLoading: false,
  serverError: null,
  currentMonthExpenditurePreview: {},
};

export function fetchCurrentMonthExpenditurePreview(): AppThunk {
  return async (dispatch) => {
    dispatch(setLoading(true));

    await list('expenses/current')
      .then((res: CurrentMonthExpenditurePreviewResponse) => {
        dispatch(setLoading(false));
        dispatch(
          fetchCurrentMonthExpenditurePreviewSuccessful(res.currentMonthExpenditurePreview),
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
      state.currentMonthExpenditurePreview = action.payload;
    },
  },
});

const {
  setLoading,
  setServerError,
  fetchCurrentMonthExpenditurePreviewSuccessful,
} = currentMonthExpenditurePreviewSlice.actions;

export const currentMonthExpenditurePreviewReducer = currentMonthExpenditurePreviewSlice.reducer;
