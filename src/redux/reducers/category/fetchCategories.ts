import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { list } from '../../../api';
import { AppThunk } from '../../store';

export type Category = {
    _id: string,
    title: string,
}

type CategoriesState = {
    categories: Category[],
    serverError: string | null,
}

const initialCategoriesState: CategoriesState = {
  categories: [],
  serverError: null,
};

export function fetchCategories(): AppThunk {
  return async (dispatch) => {
    let data: any;
    try {
      data = await list('categories');
    } catch (error) {
      dispatch(setServerError(error.toString()));

      return;
    }
    dispatch(fetchCategoriesSuccessful(data.categories));
  };
}

const categoriesSlice = createSlice({
  name: 'fetchCategories',
  initialState: initialCategoriesState,
  reducers: {
    setServerError(state, action: PayloadAction<string>) {
      state.serverError = action.payload;
    },
    fetchCategoriesSuccessful(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
  },
});

export const {
  setServerError,
  fetchCategoriesSuccessful,
} = categoriesSlice.actions;

export const fetchCategoriesReducer = categoriesSlice.reducer;
