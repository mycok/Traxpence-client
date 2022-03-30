import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import BarGraph from './BarGraph';
import PieGraph from './PieGraph';
import ScatterPlotGraph from './ScatterPlot';
import RadialBarGraph from './RadialBarChart';

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
    // height: '50%',
    // border: '2px solid green',
  },
  item: {
    width: '100%',
    height: '100%',
    // border: '2px solid pink',
  },
}));

function Charts() {
  const classes = useStyles();

  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid item container xs={12} className={classes.gridContainer}>
        <Grid item xs={6} className={classes.item}>
          <PieGraph />
        </Grid>
        <Grid item xs={6} className={classes.item}>
          <RadialBarGraph />
        </Grid>
      </Grid>
      <Grid item container xs={12} className={classes.gridContainer}>
        <Grid item xs={6} className={classes.item}>
          <ScatterPlotGraph />
        </Grid>
        <Grid item xs={6} className={classes.item}>
          <BarGraph />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Charts;
