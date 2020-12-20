import { combineReducers } from '@reduxjs/toolkit';

import { signup } from './auth/signupReducer';
import { signin } from './auth/signinReducer';

const rootReducer = combineReducers({
  signup,
  signin,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
