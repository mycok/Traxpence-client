import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { ReactComponent as NoGraphDataIllustration } from '../../../images/chart_data.svg';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: 'flex',
    width: '630px',
    height: '360px',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    fontFamily: 'Raleway',
    fontSize: 14,
    letterSpacing: 0.6,
    color: theme.palette.common.white,
  },
  subText: {
    fontFamily: 'Raleway',
    fontSize: 14,
    fontWeight: 'bolder',
    letterSpacing: 1,
    color: theme.palette.secondary.main,
  },
}));

function NoGraphData() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <NoGraphDataIllustration />
        <Typography
          className={classes.text}
          align="center"
        >
          No Graph Data Available!
          <Typography className={classes.text} align="center">
            Use the
            {' '}
            {' '}
            <Typography className={classes.subText} align="center" color="secondary" component="span">
              + / add
              {' '}
              {' '}
            </Typography>
            button add expenses
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
}

export default NoGraphData;
