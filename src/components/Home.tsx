import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Typography, Button, Divider, Box,
} from '@material-ui/core';

import { ReactComponent as CashWallet } from '../images/wallet-with-cash.svg';

const useStyles = makeStyles((theme) => createStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderTop: '400px solid #2C1F35',
    borderRight: '400px solid transparent',
  },
  bottomRightShape: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    borderBottom: '400px solid #2C1F35',
    borderLeft: '400px solid transparent',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orContainer: {
    margin: 25,
    color: theme.palette.common.white,
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
    color: theme.palette.common.white,
  },
  headerText: {
    fontFamily: 'Raleway',
    fontSize: 32,
    fontWeight: 900,
    letterSpacing: 0.6,
    lineHeight: 1.5,
    color: theme.palette.common.white,
  },
  text: {
    fontFamily: 'Raleway',
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0.6,
    color: theme.palette.common.white,
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
    <>
      <Box className={classes.topLeftShape} />
      <Box className={classes.bottomRightShape} />
      <Box className={classes.container}>
        <Box className={classes.innerContainer}>
          <Box className={classes.child}>
            <Typography
              className={classes.headerText}
              variant="subtitle2"
              align="center"
            >
              Traxpense
            </Typography>
          </Box>
          <CashWallet title="wallet-image" color="primary" />
          <Box className={classes.child}>
            <Typography className={classes.text} variant="caption" align="center">
              Expenditure tracking at your finger tips
            </Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" variant="middle" className={classes.divider} />
        <Box className={classes.innerContainer}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={pushToSignup}
          >
            Sign Up
          </Button>
          <Box className={classes.orContainer}>
            <Typography>OR</Typography>
          </Box>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={pushToSignin}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Home;
