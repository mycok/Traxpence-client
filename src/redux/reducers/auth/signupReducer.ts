import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  onChange,
  setLoading,
  setInputError,
  setServerError,
  reset,
  SignupState,
  OnchangePayloadType,
  signupInitialState,
  signupSuccess,
} from '../../actions/auth';

export const signup = createReducer(signupInitialState, {
  [setLoading.type]: (state, action: PayloadAction<boolean>) => (
    { ...state, isLoading: action.payload }
  ),
  [onChange.type]: (state, action: PayloadAction<OnchangePayloadType>) => {
    const { id, value, inputErr } = action.payload;
    return { ...state, [id]: value, inputError: inputErr };
  },
  [signupSuccess.type]: (state, action: PayloadAction<boolean>) => (
    { ...state, signupSuccessful: action.payload }
  ),
  [reset.type]: (state, action: PayloadAction<SignupState>) => action.payload,
  [setInputError.type]: (state, action: PayloadAction<{[k: string]: boolean}>) => (
    { ...state, inputError: action.payload }
  ),
  [setServerError.type]: (state, action: PayloadAction<string>) => (
    { ...state, serverError: action.payload }
  ),
});
