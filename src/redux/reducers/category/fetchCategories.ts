import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { list } from '../../../api';
import { AppThunk } from '../../store';

export type Category = {
    _id: string,
    title: string,
    createdByAdmin: boolean,
    user: string
}

type CategoriesState = {
  isLoading: boolean,
  categories: Category[],
  serverError: string | null,
}

type CategoriesDataResponse = {
  success: boolean,
  count: number,
  categories: Category[]
}

const initialCategoriesState: CategoriesState = {
  isLoading: false,
  categories: [],
  serverError: null,
};

export function fetchCategories(): AppThunk {
  return async (dispatch) => {
    let data: any;
    try {
      setIsLoading(true);
      data = await Promise.all([list('categories'), list('categories/by/user')]);
    } catch (error) {
      setIsLoading(false);
      dispatch(setServerError(error.toString()));

      return;
    }
    setIsLoading(false);
    dispatch(fetchCategoriesSuccessful(data));
  };
}

const categoriesSlice = createSlice({
  name: 'fetchCategories',
  initialState: initialCategoriesState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setServerError(state, action: PayloadAction<string>) {
      state.serverError = action.payload;
    },
    fetchCategoriesSuccessful(state, action: PayloadAction<CategoriesDataResponse[]>) {
      state.categories = [...action.payload[0].categories, ...action.payload[1].categories];
    },
  },
});

export const {
  setIsLoading,
  setServerError,
  fetchCategoriesSuccessful,
} = categoriesSlice.actions;

export const fetchCategoriesReducer = categoriesSlice.reducer;
