import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Form from '../auth/AuthForm';
import { authReducer } from '../../utils/authReducer';
import { signup, authenticate } from '../../api/auth';

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
};

function Signup({ elevation, history, setShowUserIcon }: SignupProps) {
  const classes = useStyles();
  const [signupState, dispatch] = React.useReducer(authReducer, initialState);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target: { id, value } } = event;

    dispatch({ type: 'ON_CHANGE', payload: { id, value } });
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    await signup(signupState)
      .then((resp) => {
        if (resp.success) {
          authenticate(resp, () => {
            setShowUserIcon(true);
            history.push('/profile');
          });
        } else {
          // set server-error state error and display it as helper text
          console.log('db-error', resp);
        }
      })
      // set server-error state error and display it as helper text
      .catch((err) => console.log('errrrrrrrr', err));
  }

  return (
    <div className={classes.root}>
      <Form
        elevation={elevation}
        fields={3}
        username={signupState?.username}
        email={signupState?.email}
        password={signupState?.password}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleSignup}
      />
    </div>
  );
}

export default Signup;
