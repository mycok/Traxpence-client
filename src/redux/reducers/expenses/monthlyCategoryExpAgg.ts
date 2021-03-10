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
  serverError: string | undefined;
  data: MonthlyCategoryExpAggregate[];
};

type MonthlyCategoryExpenditureAggregateResponse = {
  success: false;
  categoryExpAggregates?: MonthlyCategoryExpAggregate[];
  message?: string;
};

const initialMonthlyCategoryExpenditureAggregateState: MonthlyCategoryExpenditureAggregateState = {
  isLoading: false,
  serverError: undefined,
  data: [],
};

export function fetchMonthlyCategoryExpenditureAggregate(): AppThunk {
  return async (dispatch) => {
    let data: MonthlyCategoryExpenditureAggregateResponse;
    try {
      dispatch(setLoading(true));
      data = await list('expenses/by/category');
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setServerError(error.toString()));

      return;
    }

    dispatch(setLoading(false));
    if (data.success) {
      dispatch(
        fetchMonthlyCategoryExpenditureAggregateSuccessful(data.categoryExpAggregates),
      );
    } else {
      // in case of bad request errors
      dispatch(setServerError(data.message));
    }
  };
}

const monthlyCategoryExpenditureAggregateSlice = createSlice({
  name: 'monthlyCategoryExpenditureAggregate',
  initialState: initialMonthlyCategoryExpenditureAggregateState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setServerError(state, action: PayloadAction<string | undefined>) {
      state.serverError = action.payload;
    },
    fetchMonthlyCategoryExpenditureAggregateSuccessful(
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
  fetchMonthlyCategoryExpenditureAggregateSuccessful,
} = monthlyCategoryExpenditureAggregateSlice.actions;

export const monthlyCategoryExpAggregateReducer = monthlyCategoryExpenditureAggregateSlice.reducer;
