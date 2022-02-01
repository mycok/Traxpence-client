import React from 'react';
import NumberFormat from 'react-number-format';

import { Typography, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import { ExpensePreview } from '../../../redux/reducers/expenses/currentMonthPreview';
import Wallet from '../../wallet';

const useStyles = makeStyles((theme) => createStyles({
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
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
  },
  summaryTotalText: {
    marginTop: 10,
    fontWeight: 900,
    color: grey[600],
    fontStyle: 'italic',
  },
  textBox: {
    borderRadius: theme.shape.borderRadius * 2,
    width: 300,
    boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.6)',
  },
  text: {
    padding: 10,
    fontWeight: 900,
  },
  text2: {
    fontFamily: 'Raleway',
    fontSize: 30,
    fontWeight: 900,
    letterSpacing: 0.6,
  },
}));

type CurrentExpenseSummaryProps = {
  currency: string | null,
  expensePreview: ExpensePreview
}

function CurrentExpenseSummary({ currency, expensePreview }: CurrentExpenseSummaryProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box>
        <Typography
          variant="h6"
          color="textPrimary"
          align="center"
          className={classes.text2}
        >
          You spent
        </Typography>
      </Box>
      <Box className={classes.summaryContainer}>
        <Box className={classes.leftSummary}>
          <Typography
            component="span"
            align="center"
            variant="h4"
            color="primary"
          >
            <NumberFormat
              value={expensePreview?.month?.totalSpent ?? 0.0}
              displayType="text"
              thousandSeparator
              prefix={`${currency} ` ?? '$ '}
            />
            <Typography className={classes.summaryTotalText}>this month</Typography>
          </Typography>
        </Box>

        <Box className={classes.rightSummary}>
          <Wallet />
          <Box className={classes.textBox}>
            <Typography
              className={classes.text}
              align="center"
              color="primary"
            >
              <NumberFormat
                value={expensePreview?.today?.totalSpent ?? 0.0}
                displayType="text"
                thousandSeparator
                isNumericString
                prefix={`${currency} ` ?? '$ '}
              />
              <Typography component="span" className={classes.summaryTotalText}> today</Typography>
            </Typography>
          </Box>
          <Box className={classes.textBox}>
            <Typography
              className={classes.text}
              align="center"
              color="primary"
            >
              <NumberFormat
                value={expensePreview?.yesterday?.totalSpent ?? 0.0}
                displayType="text"
                thousandSeparator
                prefix={`${currency} ` ?? '$'}
              />
              <Typography component="span" className={classes.summaryTotalText}> yesterday</Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CurrentExpenseSummary;
