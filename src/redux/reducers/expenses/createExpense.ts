import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IExpense } from '../../../components/expenses/IExpense';
import { create } from '../../../api';
import { AppThunk } from '../../store';

type OnchangePayloadType = {
    name: string,
    value: any,
}

type NewExpenseState = {
    didFinishCreatingExpense: boolean,
    isSaving: boolean,
    serverError: string | null,
} & IExpense

export const initialCreateExpenseState: NewExpenseState = {
  title: '',
  amount: 0,
  category: {
    _id: '',
    title: '',
  },
  notes: '',
  incurredOn: Date.now(),
  didFinishCreatingExpense: false,
  isSaving: false,
  serverError: null,
};

export function createExpense(expenseData: IExpense, cb: Function): AppThunk {
  return async (dispatch) => {
    let data: any;

    try {
      dispatch(setIsSaving(true));
      data = await create<IExpense>('expenses', expenseData);
    } catch (error: any) {
      dispatch(setIsSaving(false));
      dispatch(setServerError(error.toString()));

      return;
    }

    dispatch(setIsSaving(false));
    if (data.success) {
      dispatch(createExpenseSuccessful(true));
      dispatch(reset(initialCreateExpenseState));
      cb();
    } else {
      // in case of bad request errors
      dispatch(setServerError(data.message));
    }
  };
}

const createExpenseSlice = createSlice({
  name: 'createExpense',
  initialState: initialCreateExpenseState,
  reducers: {
    onValueChange(state, action: PayloadAction<OnchangePayloadType>) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setIsSaving(state, action: PayloadAction<boolean>) {
      state.isSaving = action.payload;
    },
    setServerError(state, action: PayloadAction<string | null>) {
      state.serverError = action.payload;
    },
    createExpenseSuccessful(state, action: PayloadAction<boolean>) {
      state.didFinishCreatingExpense = action.payload;
    },
    reset(state, action: PayloadAction<NewExpenseState>) {
      return action.payload;
    },
  },
});

export const {
  onValueChange,
  setIsSaving,
  setServerError,
  createExpenseSuccessful,
  reset,
} = createExpenseSlice.actions;

export const createExpenseReducer = createExpenseSlice.reducer;
