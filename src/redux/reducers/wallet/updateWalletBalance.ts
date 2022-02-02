import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { update } from '../../../api';
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
  isSaving: boolean;
  updatedWallet: Wallet | null;
  updateServerError: string | null;
};

type UpdateWalletData = {
    currentBalance: number
};

type WalletDataResponse = {
    success: boolean
} & Wallet

const initialWalletState: WalletState = {
  isSaving: false,
  updatedWallet: null,
  updateServerError: null,
};

export function updateWallet(updateData: UpdateWalletData, cb: Function): AppThunk {
  return async (dispatch) => {
    let data: any;

    try {
      dispatch(setIsSaving(true));
      data = await update<UpdateWalletData>('wallet', isAuthenticated().user._id, updateData);
    } catch (error: any) {
      dispatch(setIsSaving(false));
      dispatch(setServerError(error.toString()));

      return;
    }

    dispatch(setIsSaving(false));

    if (data?.success === false) {
      dispatch(setServerError(data.message));
    } else {
      dispatch(updateWalletSuccessful(data as WalletDataResponse));
      cb();
    }
  };
}

const updateWalletSlice = createSlice({
  name: 'updateWallet',
  initialState: initialWalletState,
  reducers: {
    setIsSaving(state, action: PayloadAction<boolean>) {
      state.isSaving = action.payload;
    },
    setServerError(state, action: PayloadAction<string>) {
      state.updateServerError = action.payload;
    },
    updateWalletSuccessful(state, action: PayloadAction<WalletDataResponse>) {
      state.updateServerError = null;
      state.updatedWallet = action.payload;
    },
  },
});

export const { setIsSaving, setServerError, updateWalletSuccessful } = updateWalletSlice.actions;

export const updateWalletReducer = updateWalletSlice.reducer;
