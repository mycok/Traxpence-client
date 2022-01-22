import React from 'react';
import NumberFormat from 'react-number-format';
// import { useLocation } from 'react-router-dom';

import AccountBalance from '@material-ui/icons/AccountBalance';
import { Typography, Box, Icon } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 20,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
  },
  walletIcon: {
    width: '100%',
    height: '100%',
  },
  summaryTotalText: {
    fontWeight: 900,
  },
}));

function Wallet() {
  const classes = useStyles();
  // const location = useLocation();

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box flexDirection="column" width="60px">
          <Icon component="div" className={classes.walletIcon}>
            <AccountBalance fontSize="large" />
          </Icon>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          padding={1}
        >
          <Typography
            component="span"
            align="center"
            variant="h6"
          >
            Cash Balance
            <Typography color="primary" className={classes.summaryTotalText}>
              <NumberFormat
                value={123500}
                displayType="text"
                thousandSeparator
                prefix="UGX "
              />
            </Typography>
          </Typography>
        </Box>

      </Box>
    </Box>
  );
}

export default Wallet;
