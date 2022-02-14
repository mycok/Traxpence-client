import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { read } from '../../../api';
import { isAuthenticated } from '../../../api/auth';
import { AppThunk } from '../../store';
import { Wallet, ServerErrResponse, WalletDataResponse } from './types';

type WalletState = {
  isLoading: boolean;
  wallet: Wallet | null;
  serverError: string | null;
};

const initialWalletState: WalletState = {
  isLoading: false,
  wallet: null,
  serverError: null,
};

export function fetchWallet(): AppThunk {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    await read('wallet', isAuthenticated().user._id)
      .then((res: WalletDataResponse | ServerErrResponse) => {
        dispatch(setIsLoading(false));

        if ((res as ServerErrResponse).message) {
          dispatch(setServerError((res as ServerErrResponse).message));
        } else {
          dispatch(fetchWalletSuccessful(res as WalletDataResponse));
        }
      })
      .catch((err: any) => {
        dispatch(setIsLoading(false));
        dispatch(setServerError(err.toString()));
      });
  };
}

const fetchWalletSlice = createSlice({
  name: 'fetchWallet',
  initialState: initialWalletState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setServerError(state, action: PayloadAction<string>) {
      state.serverError = action.payload;
    },
    fetchWalletSuccessful(state, action: PayloadAction<WalletDataResponse>) {
      state.serverError = null;
      state.wallet = action.payload.wallet;
    },
  },
});

export const { setIsLoading, setServerError, fetchWalletSuccessful } = fetchWalletSlice.actions;

export const fetchWalletReducer = fetchWalletSlice.reducer;
