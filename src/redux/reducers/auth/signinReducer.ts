import { createReducer, AnyAction } from '@reduxjs/toolkit';

import {
  onChange,
  setLoading,
  setInputError,
  setServerError,
  reset,
  SigninState,
} from '../../actions/auth';

const initialState: SigninState = {
  email: '',
  password: '',
  isLoading: false,
  inputError: {},
  serverError: '',
};

export const signin = createReducer(initialState, {
  [setLoading.type]: (state, action: AnyAction) => ({ ...state, isLoading: action.payload }),
  [onChange.type]: (state, action: AnyAction) => {
    const { id, value, inputErr } = action.payload;
    return { ...state, [id]: value, inputError: inputErr };
  },
  [reset.type]: (state, action: AnyAction) => state,
  [setInputError.type]: (state, action: AnyAction) => ({ ...state, inputError: action.payload }),
  [setServerError.type]: (state, action: AnyAction) => ({ ...state, serverError: action.payload }),
});
