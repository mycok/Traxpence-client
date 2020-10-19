import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Form from './AuthForm';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}));

type SigninProps = {
    elevation?: number,
}

type SigninData = {
    email: string,
    password: string
}

type Action = {
    type: string,
    payload: any
}

const initialState: SigninData = {
  email: '',
  password: '',
};

function Signin({ elevation }: SigninProps) {
  const classes = useStyles();
  const [signinState, dispatch] = React.useReducer(
    (state: SigninData, action: Action) => state, initialState,
  );

  function handleSignin(e: React.FormEvent) {
    e.preventDefault();

    dispatch({ type: 'SET_EMAIL', payload: signinState.email });
  }

  return (
    <div className={classes.root}>
      <Form
        elevation={elevation}
        fields={2}
        email={signinState?.email}
        password={signinState?.password}
        handler={handleSignin}
      />
    </div>
  );
}

export default Signin;
