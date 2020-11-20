import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Form from './AuthForm';
import { signin, authenticate } from '../../api/auth';
import { authReducer } from '../../utils/authReducer';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}));

type SigninProps = {
    elevation?: number,
    history: any
}

const initialState = {
  email: '',
  password: '',
  inputError: {},
  serverError: null,
};

function Signin({ elevation, history }: SigninProps) {
  const classes = useStyles();
  const [signinState, dispatch] = React.useReducer(authReducer, initialState);

  function handleOnChange(e: React.FormEvent) {
    e.persist();

    dispatch({ type: 'ON_CHANGE', payload: e });
  }

  async function handleSignin(e: React.FormEvent) {
    e.preventDefault();

    await signin(signinState)
      .then((resp) => {
        authenticate(resp, () => {
          history.push('/expenses');
        });
      })
      .catch((err) => dispatch({ type: 'SET_SERVER_ERROR', payload: err }));
  }

  return (
    <div className={classes.root}>
      <Form
        elevation={elevation}
        fields={2}
        email={signinState?.email}
        password={signinState?.password}
        inputError={signinState.inputError}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleSignin}
      />
    </div>
  );
}

export default Signin;
