import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { list } from '../../../api';
import { AppThunk } from '../../store';

export type ScatterPlotExpenseData = {
    _id: string,
    x: {
        daysOfMonth: string,
    },
    y: number
};

type ScatterPlotExpenseDataState = {
  isLoading: boolean,
  serverError: string | undefined,
  plotData: ScatterPlotExpenseData[];
};

type ScatterPlotExpenseDataResponse = {
  success: false,
  plotData?: ScatterPlotExpenseData[],
  message?: string,
};

const initialScatterPlotExpenseDataState: ScatterPlotExpenseDataState = {
  isLoading: false,
  serverError: undefined,
  plotData: [],
};

export function fetchScatterPlotExpenseData(period: Date): AppThunk {
  return async (dispatch) => {
    let data: ScatterPlotExpenseDataResponse;
    try {
      dispatch(setLoading(true));
      data = await list(`expenses/plot?period=${period}`);
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setServerError(error.toString()));

      return;
    }

    dispatch(setLoading(false));
    if (data.success) {
      dispatch(
        fetchScatterPlotDataSuccessful(data.plotData as ScatterPlotExpenseData[]),
      );
    } else {
      // in case of bad request errors
      dispatch(setServerError(data.message));
    }
  };
}

const scatterPlotExpenseDataSlice = createSlice({
  name: 'scatterPlotExpenseData',
  initialState: initialScatterPlotExpenseDataState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setServerError(state, action: PayloadAction<string | undefined>) {
      state.serverError = action.payload;
    },
    fetchScatterPlotDataSuccessful(state, action: PayloadAction<ScatterPlotExpenseData[]>) {
      state.plotData = action.payload;
    },
  },
});

const {
  setLoading,
  setServerError,
  fetchScatterPlotDataSuccessful,
} = scatterPlotExpenseDataSlice.actions;

export const scatterPlotExpenseDataReducer = scatterPlotExpenseDataSlice.reducer;
