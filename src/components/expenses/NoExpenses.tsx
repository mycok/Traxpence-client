import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

import { ReactComponent as NoExpensesIllustration } from '../../images/no_records.svg';

const useStyles = makeStyles((theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  child: {
    margin: 20,
  },
  text: {
    fontFamily: 'Raleway',
    fontSize: 20,
    letterSpacing: 0.6,
    color: theme.palette.common.white,
  },
  subText: {
    fontFamily: 'Raleway',
    fontSize: 20,
    letterSpacing: 0.6,
    color: theme.palette.secondary.main,
  },
  link: {
    textDecoration: 'none',
  },
}));

type NoExpensesProps = {
  didPerformSearch?: boolean
}

function NoExpenses({ didPerformSearch }: NoExpensesProps) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box>
        <NoExpensesIllustration />
      </Box>
      <Box className={classes.child}>
        {
          didPerformSearch ? (
            <>
              <Typography className={classes.text} variant="h4" align="center">
                No records found!
              </Typography>
              <Link
                className={classes.link}
                to={{ pathname: '/expenses', state: { from: {} } }}
              >
                <Typography
                  className={classes.subText}
                  align="center"
                  color="secondary"
                  component="span"
                >
                  {' '}
                  Click here to go back to the expense list
                </Typography>
              </Link>
            </>
          ) : (
            <>
              <Typography className={classes.text} variant="h4" align="center">
                You currently have no expenses recorded!
              </Typography>
              <Typography className={classes.text} variant="h4" align="center">
                Use the
                {' '}
                {' '}
                <Typography className={classes.subText} align="center" color="secondary" component="span">
                  + / add
                  {' '}
                  {' '}
                </Typography>
                button to add expenses
              </Typography>
            </>
          )
        }
      </Box>
    </Box>
  );
}

export default NoExpenses;
