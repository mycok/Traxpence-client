import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Form from '../auth/AuthForm';
import ServerMessage from '../../shared/ServerMessage';
import { signup, authenticate, isAuthenticated } from '../../api/auth';
import { emailRegex, passwordRegex, usernameLength } from '../../utils/authValidation';
import { useAppDispatch, RootState } from '../../redux/store';

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

function Signup({ elevation, history, setShowUserIcon }: SignupProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const signupState = useSelector((state: RootState) => state.signup);

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

    dispatch({ type: 'SET_LOADING', payload: true });

    await signup({ username, email, password })
      .then((resp) => {
        if (resp.success) {
          authenticate(resp, () => {
            dispatch({ type: 'SET_LOADING', payload: false });
            dispatch({ type: 'RESET' });
            setShowUserIcon(isAuthenticated);
            history.push('/profile');
          });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
          dispatch({ type: 'SET_SERVER_ERROR', payload: 'username or email already exists' });
        }
      })
      .catch((err) => {
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_SERVER_ERROR', payload: err.message });
      });
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
          username={signupState.username}
          email={signupState.email}
          password={signupState.password}
          isLoading={signupState.isLoading}
          inputError={signupState.inputError}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleSignup}
        />
      </div>
    </>
  );
}

export default Signup;
