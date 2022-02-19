/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { list } from '../../../api';
import { AppThunk } from '../../store';

export type CurrentMonthAvgTotalExpByCategory = {
    _id: string,
    mergedValues: {
      average: number,
      total?: number
    }
  };

type CurrentMonthAvgTotalExpByCategoryState = {
  isLoading: boolean;
  serverError: string | null;
  currentMonthAvgTotalExpByCategory: CurrentMonthAvgTotalExpByCategory[];
};

type CurrentMonthAvgTotalExpByCategoryResponse = {
  success: false;
  currentMonthAvgTotalExpenditureByCategory: CurrentMonthAvgTotalExpByCategory[];
};

const initialCurrentMonthAvgTotalExpByCategoryState: CurrentMonthAvgTotalExpByCategoryState = {
  isLoading: false,
  serverError: null,
  currentMonthAvgTotalExpByCategory: [],
};

export function fetchCurrentMonthAvgTotalExpenditureByCategory(): AppThunk {
  return async (dispatch) => {
    dispatch(setLoading(true));

    await list('expenses/by/category/averages')
      .then((res: CurrentMonthAvgTotalExpByCategoryResponse) => {
        dispatch(setLoading(false));
        dispatch(
          fetchCurrentMonthAvgTotalExpenditureByCategorySuccessful(
            res.currentMonthAvgTotalExpenditureByCategory,
          ),
        );
      })
      .catch((err: any) => {
        dispatch(setLoading(false));
        dispatch(setServerError(err.toString()));
      });
  };
}

const currentMonthAvgTotalExpByCategorySlice = createSlice({
  name: 'currentMonthAvgTotalExpByCategory',
  initialState: initialCurrentMonthAvgTotalExpByCategoryState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setServerError(state, action: PayloadAction<string | null>) {
      state.serverError = action.payload;
    },
    fetchCurrentMonthAvgTotalExpenditureByCategorySuccessful(
      state,
      action: PayloadAction<CurrentMonthAvgTotalExpByCategory[]>,
    ) {
      state.currentMonthAvgTotalExpByCategory = action.payload.sort((a, b) => {
        if (a._id < b._id) return -1;
        if (a._id > b._id) return 1;
        return 0;
      });
    },
  },
});

const {
  setLoading,
  setServerError,
  fetchCurrentMonthAvgTotalExpenditureByCategorySuccessful,
} = currentMonthAvgTotalExpByCategorySlice.actions;

export const currentMonthAvgTotalExpByCategoryReducer = currentMonthAvgTotalExpByCategorySlice.reducer;
