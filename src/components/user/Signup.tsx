import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import Form from "../auth/AuthForm";

const useStyles = makeStyles(() => 
    createStyles({
        root: {
            display: "flex",
            alignItems: "center"
        }
    })
)

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
    const classes = useStyles();
    const [state, dispatch] = React.useReducer((state: SignupState, action: Action) => {
        return state;
    }, initialState);

    function handleSignup(e: React.FormEvent) {
        e.preventDefault();

        dispatch({ type: "SET_USERNAME", payload: state.username });
    };

    return (
        <div className={classes.root}>
            <Form
                fields={3}
                username={state?.username}
                email={state?.email}
                password={state?.password}
                handler={handleSignup}
            />
        </div>
    )
}

export default Signup;