import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { list } from '../../../api';
import { AppThunk } from '../../store';

export type AnnualExpenseData = {
    x: number,
    y: number,
    count: number,
};

type AnnualExpenseDataResponse = {
  success: boolean,
  annualExpData: AnnualExpenseData[],
};

type AnnualExpenseDataState = {
  isLoading: boolean,
  serverError: string | null,
  annualExpData: { month: string, amount: number, numOfExpenses: number }[],
};

const initialAnnualExpenseDataState: AnnualExpenseDataState = {
  isLoading: false,
  serverError: null,
  annualExpData: [],
};

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function fetchAnnualExpenseData(year: number): AppThunk {
  return async (dispatch) => {
    dispatch(setLoading(true));

    await list(`expenses/annual?year=${year}`)
      .then((res: AnnualExpenseDataResponse) => {
        dispatch(setLoading(false));
        dispatch(
          fetchAnnualExpenseDataSuccessful(res.annualExpData as AnnualExpenseData[]),
        );
      })
      .catch((err: any) => {
        dispatch(setLoading(false));
        dispatch(setServerError(err.toString()));
      });
  };
}

const annualExpenseDataSlice = createSlice({
  name: 'annualExpenseData',
  initialState: initialAnnualExpenseDataState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setServerError(state, action: PayloadAction<string | null>) {
      state.serverError = action.payload;
    },
    fetchAnnualExpenseDataSuccessful(state, action: PayloadAction<AnnualExpenseData[]>) {
      // TODO: Fix the month name to month number mapping for accurate chart data.
      const modifiedData = [...action.payload]
        .sort((a, b) => a.x - b.x)
        .map((obj: AnnualExpenseData) => ({
          month: months[(obj.x) - 1],
          amount: obj.y,
          numOfExpenses: obj.count,
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
