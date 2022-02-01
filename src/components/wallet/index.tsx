import React from 'react';
import NumberFormat from 'react-number-format';

import AccountBalance from '@material-ui/icons/AccountBalance';
import {
  Typography, Box, Icon, IconButton,
} from '@material-ui/core';
import { EditSharp } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import CustomTooltip from '../../shared/CustomTooltip';

const useStyles = makeStyles((theme) => createStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.6)',
  },
  cashText: {
    fontSize: 15,
    fontWeight: 600,
    fontFamily: 'Roboto',
  },
  walletIcon: {
    width: '100%',
    height: '100%',
  },
  summaryTotalText: {
    fontSize: 15,
    fontWeight: 900,
  },
}));

function Wallet() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box flexDirection="column" padding={1}>
        <Icon component="div" className={classes.walletIcon}>
          <AccountBalance fontSize="large" />
        </Icon>
      </Box>
      <Box display="flex" flexDirection="column" padding={1}>
        <Typography component="span" align="center" className={classes.cashText}>
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
      <Box display="flex" padding={1} justifyContent="flex-end" width={120}>
        <CustomTooltip title="Edit Account Balance" placement="bottom">
          <IconButton aria-label="edit">
            <EditSharp />
          </IconButton>
        </CustomTooltip>
      </Box>
    </Box>
  );
}

export default Wallet;
