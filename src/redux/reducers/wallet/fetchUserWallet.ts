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

// type ServerErrResponse = {
//     args: []
//     failedOperation: string
//     message: string
//     status: number
//     success: boolean
// };

type WalletDataResponse = Wallet

const initialWalletState: WalletState = {
  isLoading: false,
  wallet: null,
  serverError: null,
};

export function fetchWallet(): AppThunk {
  return async (dispatch) => {
    let data: any;

    try {
      dispatch(setIsLoading(true));
      data = await read('wallet', isAuthenticated().user._id);
    } catch (error: any) {
      dispatch(setIsLoading(false));
      dispatch(setServerError(error.toString()));

      return;
    }

    dispatch(setIsLoading(false));

    if (data?.success === false) {
      dispatch(setServerError(data.message));
    } else {
      dispatch(fetchWalletSuccessful(data as WalletDataResponse));
    }
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
      state.wallet = action.payload;
    },
  },
});

export const { setIsLoading, setServerError, fetchWalletSuccessful } = fetchWalletSlice.actions;

export const fetchWalletReducer = fetchWalletSlice.reducer;
