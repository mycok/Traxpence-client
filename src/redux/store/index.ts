import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { signup } from '../reducers/auth/signupReducer';
import { signin } from '../reducers/auth/signinReducer';

export const store = configureStore({
  reducer: {
    signup,
    signin,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
