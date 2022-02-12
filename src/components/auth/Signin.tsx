import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteChildrenProps } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Form from './AuthForm';
import { emailRegex, passwordRegex } from '../../utils/authValidation';
import ServerMessage from '../../shared/ServerMessage';
import { useAppDispatch, RootState } from '../../redux/store';
import { signinAction, onChange, setServerError } from '../../redux/actions/auth';
import { setAuthError } from '../../redux/reducers/expenses/fetchOrDeleteExpenses';

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
    color: theme.palette.secondary.main,
    fontWeight: 'bolder',
  },
  typographyText: {
    color: theme.palette.common.white,
  },
  link: {
    textDecoration: 'none',
  },
}));

type SigninProps = {
    elevation?: number,
    history: RouteChildrenProps['history']
    location: any,
}

function Signin({ elevation, history, location }: SigninProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { authError } = useSelector((state: RootState) => state.fetchOrDeleteExpenses);
  const {
    email, password, isLoading, inputError, serverError, signinSuccessful,
  } = useSelector(
    (state: RootState) => state.signin,
  );

  useEffect(() => {
    if (signinSuccessful) {
      if (location && location?.state) {
        const { from } = location.state;
        history.push(from);
      } else {
        history.push('/profile');
      }
    }
  }, [signinSuccessful, history, location]);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target: { id, value } } = event;
    const inputErr:{[k: string]: boolean} = {};

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

    dispatch(onChange({ id, value, inputErr }));
  }

  async function handleSignin(e: React.FormEvent) {
    // TODO:-add check for empty sign-in fields, disable signin button if all fields are empty
    e.preventDefault();

    if (authError) {
      dispatch(setAuthError(undefined));
    }
    dispatch(signinAction({ email, password }));
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
