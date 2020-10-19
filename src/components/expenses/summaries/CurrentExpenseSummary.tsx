import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  summaryContainer: {
    display: 'flex',
  },
  leftSummary: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '5px solid #ffa500',
    borderRadius: '50%',
    boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.6)',
    margin: 20,
    padding: 20,
    width: 200,
    height: 200,
  },
  rightSummary: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 20,
    padding: 20,
  },
  summaryTotalText: {
    marginTop: 10,
    fontWeight: 900,
    color: grey[600],
    fontStyle: 'italic',
  },
  textBox: {
    border: `2px solid ${grey[500]}`,
    borderRadius: '8%',
    width: 150,
  },
  text: {
    padding: 10,
    fontWeight: 900,
  },
  text1: {
    color: 'gray',
    fontStyle: 'italic',
  },
  text2: {
    fontFamily: 'Raleway',
    fontSize: 30,
    fontWeight: 900,
    letterSpacing: 0.6,
  },
}));

function CurrentExpenseSummary() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography
          variant="h6"
          color="textPrimary"
          align="center"
          className={classes.text2}
        >
          You spent
        </Typography>
      </div>
      <div className={classes.summaryContainer}>
        <div className={classes.leftSummary}>
          <Typography
            component="span"
            align="center"
            variant="h4"
            color="primary"
          >
            $ 0.0
            <Typography className={classes.summaryTotalText}>this month</Typography>
          </Typography>
        </div>

        <div className={classes.rightSummary}>
          <div className={classes.textBox}>
            <Typography
              className={classes.text}
              align="center"
              color="primary"
            >
              $ 0.0
              <Typography component="span" className={classes.text1}> today</Typography>
            </Typography>
          </div>
          <div className={classes.textBox}>
            <Typography
              className={classes.text}
              align="center"
              color="primary"
            >
              $ 0.0
              <Typography component="span" className={classes.text1}> yesterday</Typography>
            </Typography>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CurrentExpenseSummary;
