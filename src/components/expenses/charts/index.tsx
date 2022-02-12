/* eslint-disable no-unused-vars */
import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: '99%',
    width: '96%',
    boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.1)',
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    // border: '2px solid green',
  },
}));

function Charts() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item container xs={6} direction="column" className={classes.gridContainer}>
        <Grid item xs={6} style={{ border: '2px solid red', width: '100%', height: '100%' }} />
        <Grid item xs={6} style={{ border: '2px solid yellow', width: '100%', height: '100%' }} />
      </Grid>
      <Grid item container xs={6} direction="column" className={classes.gridContainer}>
        <Grid item xs={6} style={{ border: '2px solid purple', width: '100%', height: '100%' }} />
        <Grid item xs={6} style={{ border: '2px solid blue', width: '100%', height: '100%' }} />
      </Grid>
    </Grid>
  );
}

export default Charts;
