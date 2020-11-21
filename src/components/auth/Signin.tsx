import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Form from './AuthForm';
import { signin, authenticate, isAuthenticated } from '../../api/auth';
import { authReducer } from '../../utils/authReducer';
import { emailRegex, passwordRegex } from '../../utils/authValidation';
import ServerMessage from '../../shared/ServerMessage';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}));

type SigninProps = {
    elevation?: number,
    history: any,
    setShowUserIcon: any
}

const initialState = {
  email: '',
  password: '',
  inputError: {},
  serverError: null,
};

function Signin({ elevation, history, setShowUserIcon }: SigninProps) {
  const classes = useStyles();
  const [signinState, dispatch] = React.useReducer(authReducer, initialState);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target: { id, value } } = event;
    const inputErr:{[s: string]: any} = {};

    switch (id) {
      case 'email':
        inputErr.email = emailRegex(value);
        break;
      case 'password':
        inputErr.password = passwordRegex(value);
        break;
      default:
        break;
    }

    dispatch({ type: 'ON_CHANGE', payload: { id, value, inputErr } });
  }

  async function handleSignin(e: React.FormEvent) {
    e.preventDefault();
    const { email, password } = signinState;

    await signin({ email, password })
      .then((resp) => {
        if (resp.success) {
          authenticate(resp, () => {
            setShowUserIcon(isAuthenticated());
            history.push('/expenses');
          });
        } else {
          dispatch({ type: 'SET_SERVER_ERROR', payload: resp.message });
        }
      })
      .catch((err) => dispatch({ type: 'SET_SERVER_ERROR', payload: err.message }));
  }

  function hideServerMessage() {
    dispatch({ type: 'SET_SERVER_ERROR', payload: null });
  }

  return (
    <>
      <ServerMessage
        open={!!signinState.serverError}
        message={signinState.serverError}
        onClose={hideServerMessage}
      />
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
    </>
  );
}

export default Signin;
