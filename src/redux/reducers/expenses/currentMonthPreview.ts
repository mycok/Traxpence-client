import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { list } from '../../../api';
import { AppThunk } from '../../store';

type CurrentMonthExpenditurePreviewState = {
    isLoading: boolean,
    serverError: string | null,
    data: any
}

const initialCurrentMonthExpenditurePreviewState: CurrentMonthExpenditurePreviewState = {
  isLoading: false,
  serverError: null,
  data: {},
};

export function fetchCurrentMonthExpenditurePreview(): AppThunk {
  return async (dispatch) => {
    let data: any;
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
      dispatch(fetchCurrentMonthExpenditurePreviewSuccessful(data.expensePreview));
    } else {
      // in case of bad request errors
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
    setServerError(state, action: PayloadAction<string | null>) {
      state.serverError = action.payload;
    },
    fetchCurrentMonthExpenditurePreviewSuccessful(state, action: PayloadAction<any>) {
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
