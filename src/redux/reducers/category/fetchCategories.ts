import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { list } from '../../../api';
import { isAuthenticated } from '../../../api/auth';
import { AppThunk } from '../../store';

type Category = {
    _id: string,
    title: string,
}

type CategoriesState = {
    selectedCategory: Category,
    categories: Category[],
    serverError: string | null,
}

const initialCategoriesState: CategoriesState = {
  selectedCategory: { _id: '', title: '' },
  categories: [],
  serverError: null,
};

export function fetchCategories(): AppThunk {
  return async (dispatch) => {
    const { token } = isAuthenticated();
    let data: any;
    try {
      data = await list('categories', token);
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
    setSelectedCategory(state, action: PayloadAction<string>) {
      const matchedCategory = state.categories.find(
        (cat: Category) => cat.title === action.payload,
      );
      if (matchedCategory) {
        state.selectedCategory = matchedCategory;
      }
    },
  },
});

export const {
  setServerError,
  fetchCategoriesSuccessful,
  setSelectedCategory,
} = categoriesSlice.actions;

export const fetchCategoriesReducer = categoriesSlice.reducer;
