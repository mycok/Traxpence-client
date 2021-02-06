import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { signOut, signoutInitialSate } from '../../actions/auth';

export const signout = createReducer(signoutInitialSate, {
  [signOut.type]: (state, action: PayloadAction<boolean>) => (
    { ...state, didSignout: action.payload }
  ),
});
