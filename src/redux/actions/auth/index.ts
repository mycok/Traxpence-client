import { createAction } from '@reduxjs/toolkit';

type OnchangePayloadType ={
    id: string,
    value: string,
    inputErr: {[k: string]: boolean}
}

export type SignupState = {
    username: string,
    email: string,
    password: string,
    isLoading: boolean,
    inputError: {[k: string]: boolean},
    serverError: string,
}

export type SigninState = {
    email: string,
    password: string,
    isLoading: boolean,
    inputError: {[k: string]: boolean},
    serverError: string,
}

export const onChange = createAction<OnchangePayloadType>('ON_CHANGE');
export const setInputError = createAction<{[k: string]: boolean}>('SET_INPUT_ERROR');
export const setServerError = createAction<string>('SET_SERVER_ERROR');
export const setLoading = createAction<boolean>('SET_LOADING');
export const reset = createAction<SignupState | SigninState>('RESET');
