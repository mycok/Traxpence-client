import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { list } from '../../../api';
import { AppThunk } from '../../store';

export type AnnualExpenseData = {
    _id: number,
    x: number,
    y: number,
};

type AnnualExpenseDataState = {
  isLoading: boolean,
  serverError: string | undefined,
  annualExpData: {x: number, y: number}[],
};

export type AnnualExpenseDataResponse = {
  success: false,
  message?: string,
  annualExpData: AnnualExpenseData[],
};

const initialAnnualExpenseDataState: AnnualExpenseDataState = {
  isLoading: false,
  serverError: undefined,
  annualExpData: [],
};

export function fetchAnnualExpenseData(year: any): AppThunk {
  return async (dispatch) => {
    let data: AnnualExpenseDataResponse;
    try {
      dispatch(setLoading(true));
      data = await list(`expenses/annual?year=${year}`);
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setServerError(error.toString()));

      return;
    }

    dispatch(setLoading(false));
    if (data.success) {
      dispatch(
        fetchAnnualExpenseDataSuccessful(data.annualExpData as AnnualExpenseData[]),
      );
    } else {
      // in case of bad request errors
      dispatch(setServerError(data.message));
    }
  };
}

const annualExpenseDataSlice = createSlice({
  name: 'annualExpenseData',
  initialState: initialAnnualExpenseDataState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setServerError(state, action: PayloadAction<string | undefined>) {
      state.serverError = action.payload;
    },
    fetchAnnualExpenseDataSuccessful(state, action: PayloadAction<AnnualExpenseData[]>) {
      const modifiedData = [...action.payload].map((obj: AnnualExpenseData) => ({
        x: obj.x,
        y: obj.y,
      }));
      state.annualExpData = modifiedData;
    },
  },
});

const {
  setLoading,
  setServerError,
  fetchAnnualExpenseDataSuccessful,
} = annualExpenseDataSlice.actions;

export const annualExpenseDataReducer = annualExpenseDataSlice.reducer;
