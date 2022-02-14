import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { list } from '../../../api';
import { AppThunk } from '../../store';

export type MonthlyCategoryExpAggregate = {
    _id: string,
    mergedValues: {
      average: number,
      total?: number
    }
  };

type MonthlyCategoryExpenditureAggregateState = {
  isLoading: boolean;
  serverError: string | null;
  categoryExpAggregates: MonthlyCategoryExpAggregate[];
};

type MonthlyCategoryExpenditureAggregateResponse = {
  success: false;
  categoryExpAggregates: MonthlyCategoryExpAggregate[];
};

const initialMonthlyCategoryExpenditureAggregateState: MonthlyCategoryExpenditureAggregateState = {
  isLoading: false,
  serverError: null,
  categoryExpAggregates: [],
};

export function fetchMonthlyCategoryExpenditureAggregate(): AppThunk {
  return async (dispatch) => {
    dispatch(setLoading(true));

    await list('expenses/by/category')
      .then((res: MonthlyCategoryExpenditureAggregateResponse) => {
        dispatch(setLoading(false));
        dispatch(
          fetchMonthlyCategoryExpenditureAggregateSuccessful(res.categoryExpAggregates),
        );
      })
      .catch((err: any) => {
        dispatch(setLoading(false));
        dispatch(setServerError(err.toString()));
      });
  };
}

const monthlyCategoryExpenditureAggregateSlice = createSlice({
  name: 'monthlyCategoryExpenditureAggregate',
  initialState: initialMonthlyCategoryExpenditureAggregateState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setServerError(state, action: PayloadAction<string | null>) {
      state.serverError = action.payload;
    },
    fetchMonthlyCategoryExpenditureAggregateSuccessful(
      state,
      action: PayloadAction<MonthlyCategoryExpAggregate[]>,
    ) {
      state.categoryExpAggregates = action.payload;
    },
  },
});

const {
  setLoading,
  setServerError,
  fetchMonthlyCategoryExpenditureAggregateSuccessful,
} = monthlyCategoryExpenditureAggregateSlice.actions;

export const monthlyCategoryExpAggregateReducer = monthlyCategoryExpenditureAggregateSlice.reducer;
