import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { update } from '../../../api';
import { isAuthenticated } from '../../../api/auth';
import { AppThunk } from '../../store';
import { Wallet, ServerErrResponse, WalletDataResponse } from './types';

type WalletState = {
  isSaving: boolean;
  updatedWallet: Wallet | null;
  updateServerError: string | null;
};

type UpdateWalletData = {
    currentBalance: number
};

const initialWalletState: WalletState = {
  isSaving: false,
  updatedWallet: null,
  updateServerError: null,
};

export function updateWallet(updateData: UpdateWalletData, cb: Function): AppThunk {
  return async (dispatch) => {
    dispatch(setIsSaving(true));

    await update<UpdateWalletData>('wallet', isAuthenticated().user._id, updateData)
      .then((res: WalletDataResponse | ServerErrResponse) => {
        dispatch(setIsSaving(false));

        if ((res as ServerErrResponse).message) {
          dispatch(setServerError((res as ServerErrResponse).message));
        } else {
          dispatch(updateWalletSuccessful(res as WalletDataResponse));
          cb();
        }
      })
      .catch((err: any) => {
        dispatch(setIsSaving(false));
        dispatch(setServerError(err.toString()));
      });
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
      state.updatedWallet = action.payload.wallet;
    },
  },
});

export const { setIsSaving, setServerError, updateWalletSuccessful } = updateWalletSlice.actions;

export const updateWalletReducer = updateWalletSlice.reducer;
