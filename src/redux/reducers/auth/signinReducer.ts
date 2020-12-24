import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  onChange,
  setLoading,
  setInputError,
  setServerError,
  reset,
  SigninState,
  OnchangePayloadType,
  signinSuccess,
  signinInitialState,
} from '../../actions/auth';

export const signin = createReducer(signinInitialState, {
  [setLoading.type]: (state, action: PayloadAction<boolean>) => (
    { ...state, isLoading: action.payload }
  ),
  [onChange.type]: (state, action: PayloadAction<OnchangePayloadType>) => {
    const { id, value, inputErr } = action.payload;
    return { ...state, [id]: value, inputError: inputErr };
  },
  [signinSuccess.type]: (state, action: PayloadAction<boolean>) => (
    { ...state, signinSuccessful: action.payload }
  ),
  [reset.type]: (state, action: PayloadAction<SigninState>) => action.payload,
  [setInputError.type]: (state, action: PayloadAction<{[k: string]: boolean}>) => (
    { ...state, inputError: action.payload }
  ),
  [setServerError.type]: (state, action: PayloadAction<string>) => (
    { ...state, serverError: action.payload }
  ),
});
