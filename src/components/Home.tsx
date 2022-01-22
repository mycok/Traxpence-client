import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Button, Divider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import { ReactComponent as CashWallet } from '../images/wallet-with-cash.svg';

const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orContainer: {
    margin: 25,
  },
  divider: {
    height: 500,
  },
  child: {
    margin: 20,
  },
  button: {
    width: 300,
    margin: 10,
  },
  headerText: {
    fontFamily: 'Raleway',
    fontSize: 30,
    fontWeight: 900,
    letterSpacing: 0.6,
  },
  text: {
    fontFamily: 'Raleway',
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0.6,
    color: grey[300],
    fontStyle: 'italic',
  },
}));

type HomeProps = {
  history: any,
}

function Home({ history }: HomeProps) {
  const classes = useStyles();

  function pushToSignup() {
    history.push('/signup');
  }

  function pushToSignin() {
    history.push('/signin');
  }

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.child}>
          <Typography
            className={classes.headerText}
            variant="subtitle2"
            align="center"
          >
            Traxpense
          </Typography>
        </div>
        <CashWallet title="wallet-image" color="primary" />
        <div className={classes.child}>
          <Typography className={classes.text} variant="caption" align="center">
            Expenditure tracking at your finger tips
          </Typography>
        </div>
      </div>
      <Divider orientation="vertical" variant="middle" className={classes.divider} />
      <div className={classes.innerContainer}>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={pushToSignup}
        >
          Sign Up
        </Button>
        <div className={classes.orContainer}>
          <Typography>OR</Typography>
        </div>
        <Button
          className={classes.button}
          variant="outlined"
          color="secondary"
          onClick={pushToSignin}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Home;
