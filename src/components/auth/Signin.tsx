import React from 'react';

import Form from '../../pages/auth/AuthForm';

type SigninState = {
    email: string,
    password: string
}

type Action = {
    type: string,
    payload: any
}

const initialState = {
    email: "",
    password: ""
};

function Signin() {
    const [state, dispatch] = React.useReducer((state: SigninState, action: Action) => {
        return state;
    }, initialState);

    function handleSignin(e: React.FormEvent) {
        e.preventDefault();

        dispatch({ type: "SET_EMAIL", payload: state.email })
    };

    return (
        <Form
            fields={2}
            email={state?.email}
            password={state?.password}
            handler={handleSignin}
        />
    )
}

export default Signin;