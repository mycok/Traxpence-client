import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IExpense } from '../../../components/expenses/IExpense';
import { update } from '../../../api';
import { AppThunk } from '../../store';

type OnchangePayloadType = {
    name: string,
    value: any,
}

type EditExpenseState = {
    expenseToEdit: IExpense,
    didFinishEditingExpense: boolean,
    isSaving: boolean,
    serverError: string | undefined,
    editedExpense: IExpense | undefined,
}

type EditExpenseResponse = {
  success: boolean,
  expense: IExpense,
  message?: string,
}

const initialExpenseState = {
  _id: '',
  title: '',
  amount: 0,
  category: {
    _id: '',
    title: '',
  },
  notes: '',
  incurredOn: Date.now(),
};

const initialEditExpenseState: EditExpenseState = {
  expenseToEdit: initialExpenseState,
  didFinishEditingExpense: false,
  isSaving: false,
  serverError: undefined,
  editedExpense: undefined,
};

export function editExpense(expenseId: string, expenseData: IExpense, cb: Function): AppThunk {
  return async (dispatch) => {
    let data: EditExpenseResponse;
    try {
      dispatch(setIsSaving(true));
      data = await update('expenses', expenseId, expenseData);
    } catch (error) {
      dispatch(setIsSaving(false));
      dispatch(setServerError(error.toString()));

      return;
    }

    dispatch(setIsSaving(false));
    if (data.success) {
      dispatch(editExpenseSuccessful(data.expense));
      dispatch(reset(initialExpenseState));
      cb();
    } else {
      /**
       * in case of bad request errors
       * such errors are better displayed with a toast for easy cancellation
       * */
      dispatch(setServerError(data.message));
    }
  };
}

const editExpenseSlice = createSlice({
  name: 'editExpense',
  initialState: initialEditExpenseState,
  reducers: {
    onValueChange(state, action: PayloadAction<OnchangePayloadType>) {
      const { name, value } = action.payload;
      state.expenseToEdit[name] = value;
    },
    setIsSaving(state, action: PayloadAction<boolean>) {
      state.isSaving = action.payload;
    },
    setServerError(state, action: PayloadAction<string | undefined>) {
      state.serverError = action.payload;
    },
    setDidFinishEditingExpense(state, action: PayloadAction<boolean>) {
      state.didFinishEditingExpense = action.payload;
    },
    editExpenseSuccessful(state, action: PayloadAction<IExpense>) {
      state.didFinishEditingExpense = true;
      state.editedExpense = action.payload;
    },
    resetStateToSelectedExpenseValues(state, action: PayloadAction<EditExpenseState>) {
      return action.payload;
    },
    reset(state, action: PayloadAction<IExpense>) {
      state.expenseToEdit = action.payload;
    },
  },
});

export const {
  onValueChange,
  setIsSaving,
  setServerError,
  setDidFinishEditingExpense,
  editExpenseSuccessful,
  reset,
  resetStateToSelectedExpenseValues,
} = editExpenseSlice.actions;

export const editExpenseReducer = editExpenseSlice.reducer;
