import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Form from '../auth/AuthForm';
import ServerMessage from '../../shared/ServerMessage';
import { authReducer } from '../../utils/authReducer';
import { signup, authenticate, isAuthenticated } from '../../api/auth';
import { emailRegex, passwordRegex, usernameLength } from '../../utils/authValidation';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}));

type SignupProps = {
    elevation?: number,
    history: any,
    setShowUserIcon: any
}

const initialState = {
  username: '',
  email: '',
  password: '',
  inputError: {},
  serverError: null,
};

function Signup({ elevation, history, setShowUserIcon }: SignupProps) {
  const classes = useStyles();
  const [signupState, dispatch] = React.useReducer(authReducer, initialState);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target: { id, value } } = event;
    const inputErr:{[s: string]: any} = {};

    switch (id) {
      case 'username':
        inputErr.username = usernameLength(value);
        break;
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

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const { username, email, password } = signupState;

    await signup({ username, email, password })
      .then((resp) => {
        if (resp.success) {
          authenticate(resp, () => {
            setShowUserIcon(isAuthenticated);
            history.push('/profile');
          });
        } else {
          dispatch({ type: 'SET_SERVER_ERROR', payload: 'username or email already exists' });
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
        open={!!signupState.serverError}
        message={signupState.serverError}
        onClose={hideServerMessage}
      />
      <div className={classes.root}>
        <Form
          elevation={elevation}
          fields={3}
          username={signupState?.username}
          email={signupState?.email}
          password={signupState?.password}
          inputError={signupState.inputError}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleSignup}
        />
      </div>
    </>
  );
}

export default Signup;
