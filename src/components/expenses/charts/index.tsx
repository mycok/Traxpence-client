import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AnnualTotalExpByMonth from './BarGraph';

const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: '99%',
    width: '96%',
  },
  gridContainer: {
    display: 'flex',
    width: '100%',
    height: '50%',
    // border: '2px solid green',
  },
  item: {
    width: '100%',
    height: '100%',
    border: '2px solid pink',
  },
}));

function Charts() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item container xs={12} className={classes.gridContainer}>
        <Grid item xs={6} className={classes.item}>
          <AnnualTotalExpByMonth />
        </Grid>
        <Grid item xs={6} className={classes.item}>
          <AnnualTotalExpByMonth />
        </Grid>
      </Grid>
      <Grid item container xs={12} className={classes.gridContainer}>
        <Grid item xs={6} className={classes.item}>
          <AnnualTotalExpByMonth />
        </Grid>
        <Grid item xs={6} className={classes.item}>
          <AnnualTotalExpByMonth />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Charts;
