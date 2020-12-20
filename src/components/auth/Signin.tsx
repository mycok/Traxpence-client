import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Form from './AuthForm';
import { emailRegex, passwordRegex } from '../../utils/authValidation';
import ServerMessage from '../../shared/ServerMessage';
import { useAppDispatch } from '../../redux/store';
import { RootState } from '../../redux/reducers/rootReducer';
import { signinAction } from '../../redux/actions/auth';

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

type SigninProps = {
    elevation?: number,
    history: any
}

function Signin({ elevation, history }: SigninProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const {
    email, password, isLoading, inputError, serverError, signinSuccessful,
  } = useSelector(
    (state: RootState) => state.signin,
  );

  useEffect(() => {
    if (signinSuccessful) {
      history.push('/expenses');
    }
  }, [signinSuccessful, history]);

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

    dispatch(signinAction({ email, password }));
  }

  function hideServerMessage() {
    dispatch({ type: 'SET_SERVER_ERROR', payload: null });
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
          fields={2}
          email={email}
          password={password}
          isLoading={isLoading}
          inputError={inputError}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleSignin}
        />
        <div className={classes.switchTextDiv}>
          <Link to="/signup" className={classes.link}>
            <Typography variant="subtitle2" className={classes.typographyText}>
              Don't have an account?
              {' '}
              <span className={classes.textSpan}>
                Sign Up
              </span>
            </Typography>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Signin;
