import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Form from '../auth/AuthForm';
import ServerMessage from '../../shared/ServerMessage';
import { emailRegex, passwordRegex, usernameLength } from '../../utils/authValidation';
import { useAppDispatch, RootState } from '../../redux/store';
import { signupAction, onChange, setServerError } from '../../redux/actions/auth';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchTextDiv: {
    display: 'flex',
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  textSpan: {
    color: theme.palette.primary.main,
    fontWeight: 'bolder',
  },
  typographyText: {
    color: '#fff',
  },
  link: {
    textDecoration: 'none',
  },
}));

type SignupProps = {
    elevation?: number,
    history: any
}

function Signup({ elevation, history }: SignupProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const {
    username, email, password, isLoading, inputError, serverError, signupSuccessful,
  } = useSelector(
    (state: RootState) => state.signup,
  );

  useEffect(() => {
    if (signupSuccessful) {
      history.push('/profile');
    }
  }, [signupSuccessful, history]);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target: { id, value } } = event;
    const inputErr:{[k: string]: boolean} = {};

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

    dispatch(onChange({ id, value, inputErr }));
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    dispatch(signupAction({ username, email, password }));
  }

  function hideServerMessage() {
    dispatch(setServerError(''));
  }

  return (
    <>
      <ServerMessage
        open={!!serverError}
        message={serverError}
        onClose={hideServerMessage}
      />
      <div className={classes.root}>
        <Form
          elevation={elevation}
          fields={3}
          username={username}
          email={email}
          password={password}
          isLoading={isLoading}
          inputError={inputError}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleSignup}
        />
        <div className={classes.switchTextDiv}>
          <Link to="/signin" className={classes.link}>
            <Typography className={classes.typographyText} variant="subtitle2">
              Already have an account?
              {' '}
              <span className={classes.textSpan}>
                Sign In
              </span>
            </Typography>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Signup;
