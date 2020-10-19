import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Form from '../auth/AuthForm';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}));

type SignupProps = {
    elevation?: number,
}

type SignupData = {
    username: string,
    email: string,
    password: string
}

type Action = {
    type: string,
    payload: any
}

const initialState: SignupData = {
  username: '',
  email: '',
  password: '',
};

function Signup({ elevation }: SignupProps) {
  const classes = useStyles();
  const [signupState, dispatch] = React.useReducer(
    (state: SignupData, action: Action) => state, initialState,
  );

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    dispatch({ type: 'SET_USERNAME', payload: signupState.username });
  }

  return (
    <div className={classes.root}>
      <Form
        elevation={elevation}
        fields={3}
        username={signupState?.username}
        email={signupState?.email}
        password={signupState?.password}
        handler={handleSignup}
      />
    </div>
  );
}

export default Signup;
