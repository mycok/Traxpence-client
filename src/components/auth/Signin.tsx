import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import Form from "./AuthForm";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex",
            alignItems: "center"
        }
    })
)

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
    const classes = useStyles();
    const [state, dispatch] = React.useReducer((state: SigninState, action: Action) => {
        return state;
    }, initialState);

    function handleSignin(e: React.FormEvent) {
        e.preventDefault();

        dispatch({ type: "SET_EMAIL", payload: state.email })
    };

    return (
        <div className={classes.root}>
            <Form
                fields={2}
                email={state?.email}
                password={state?.password}
                handler={handleSignin}
            />
        </div>
    )
}

export default Signin;