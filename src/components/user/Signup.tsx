import React from 'react';

import Form from '../../pages/auth/AuthForm';

type SignupState = {
    username: string,
    email: string,
    password: string
}

type Action = {
    type: string,
    payload: any
}

const initialState = {
    username: "",
    email: "",
    password: ""
}

function Signup() {
    const [state, dispatch] = React.useReducer((state: SignupState, action: Action) => {
        return state;
    }, initialState);

    function handleSignup(e: React.FormEvent) {
        e.preventDefault();

        dispatch({ type: "SET_USERNAME", payload: state.username });
    };

    return (
        <Form
            fields={3}
            username={state?.username}
            email={state?.email}
            password={state?.password}
            handler={handleSignup}
        />
    )
}

export default Signup;