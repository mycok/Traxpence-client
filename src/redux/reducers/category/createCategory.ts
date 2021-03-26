import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { create } from '../../../api';
import { AppThunk } from '../../store';

export type Category = {
  _id: string;
  title: string;
};

type CategoryState = {
  title: string;
  createdCategory: Category;
  isSavingCategory: boolean;
  didFinishCreatingCategory: boolean;
  serverError: string | null;
};

type CategoryDataResponse = {
  success: boolean;
  message?: string;
  category: Category;
};

type OnchangePayloadType = {
  value: string;
};

const initialCategoryState: CategoryState = {
  title: '',
  createdCategory: {
    _id: '',
    title: '',
  },
  isSavingCategory: false,
  didFinishCreatingCategory: false,
  serverError: null,
};

export function createCategory(
  categoryData: Pick<Category, 'title'>,
  cb: Function,
): AppThunk {
  return async (dispatch) => {
    let data: CategoryDataResponse;
    try {
      dispatch(setIsSaving(true));
      data = await create('categories', categoryData);
    } catch (error) {
      dispatch(setIsSaving(false));
      dispatch(setServerError(error.toString()));

      return;
    }

    dispatch(setIsSaving(false));
    if (data.success) {
      dispatch(createCategorySuccessful(data.category));
      // dispatch(reset());
      cb();
    } else {
      dispatch(setServerError(data.message as string));
    }
  };
}

const createCategorySlice = createSlice({
  name: 'createCategory',
  initialState: initialCategoryState,
  reducers: {
    onCategoryValueChange(state, action: PayloadAction<OnchangePayloadType>) {
      const { value } = action.payload;
      state.title = value;
    },
    setIsSaving(state, action: PayloadAction<boolean>) {
      state.isSavingCategory = action.payload;
    },
    setServerError(state, action: PayloadAction<string>) {
      state.serverError = action.payload;
    },
    createCategorySuccessful(state, action: PayloadAction<Category>) {
      state.didFinishCreatingCategory = true;
      state.createdCategory = action.payload;
    },
    reset() {
      return initialCategoryState;
    },
  },
});

export const {
  reset,
  onCategoryValueChange,
  setIsSaving,
  setServerError,
  createCategorySuccessful,
} = createCategorySlice.actions;

export const createCategoryReducer = createCategorySlice.reducer;
