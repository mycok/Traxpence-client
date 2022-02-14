import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { read } from '../../../api';
import { isAuthenticated } from '../../../api/auth';
import { AppThunk } from '../../store';

export type Wallet = {
  _id: string;
  type: string;
  initialAmount: Number;
  currentBalance: Number;
  owner: {
    _id: string;
    username: string;
    email: string;
  };
};

type WalletState = {
  isLoading: boolean;
  wallet: Wallet | null;
  serverError: string | null;
};

type ServerErrResponse = {
    args: any[]
    failedOperation: string
    message: string
    status: number
    success: boolean
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
      .then((res: Wallet | ServerErrResponse) => {
        dispatch(setIsLoading(false));

        if ((res as ServerErrResponse).message) {
          dispatch(setServerError((res as ServerErrResponse).message));
        } else {
          dispatch(fetchWalletSuccessful(res as Wallet));
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
    fetchWalletSuccessful(state, action: PayloadAction<Wallet>) {
      state.serverError = null;
      state.wallet = action.payload;
    },
  },
});

export const { setIsLoading, setServerError, fetchWalletSuccessful } = fetchWalletSlice.actions;

export const fetchWalletReducer = fetchWalletSlice.reducer;
