import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';

import {
  Typography, Box, Icon, IconButton, SvgIcon,
  Menu, MenuItem, ListItemText, ListItemIcon,
} from '@material-ui/core';
import { EditSharp, MoreHorizSharp, HistorySharp } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import CustomTooltip from '../../shared/CustomTooltip';
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchWallet } from '../../redux/reducers/wallet/fetchUserWallet';
import { updateWallet } from '../../redux/reducers/wallet/updateWalletBalance';
import EditWalletBalanceDialog from '../expenses/shared/AddDialog';

const useStyles = makeStyles((theme) => createStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 300,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.6)',
  },
  cashText: {
    fontSize: 15,
    fontWeight: 600,
    fontFamily: 'Roboto',
    color: theme.palette.common.white,
  },
  walletIcon: {
    width: '100%',
    height: '100%',
    color: theme.palette.common.white,
  },
  icon: {
    color: theme.palette.common.white,
  },
  summaryTotalText: {
    fontSize: 15,
    fontWeight: 900,
  },
  menu: {
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(8),
      minWidth: 180,
      color: theme.palette.common.white,
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 20,
          color: theme.palette.common.white,
        },
      },
    },
  },
}));

function Wallet() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [newWalletBalance, setWalletBalance] = useState(0);
  const [checkd, setChecked] = useState(false);
  const { serverError, wallet } = useSelector((state: RootState) => state.userWallet);
  const { didFinishCreatingExpense } = useSelector((state: RootState) => state.createExpense);
  const { didFinishEditingExpense } = useSelector((state: RootState) => state.editExpense);
  const show = Boolean(anchorEl);
  // TODO: pick updateServerErr field and pass it to the NewWalletBalanceDialog text-field.
  const {
    isSaving,
    updatedWallet,
  } = useSelector((state: RootState) => state.updateWallet);

  useEffect(() => {
    dispatch(fetchWallet());
  }, [dispatch, updatedWallet, didFinishCreatingExpense, didFinishEditingExpense]);

  function handleOpen() {
    setOpen(true);
    handleMenuClose();
  }

  function handleClose() {
    setOpen(false);
    setWalletBalance(0);
    setChecked(false);
  }

  function toggleShow(e: React.MouseEvent<HTMLElement>) {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(e.currentTarget);
    }
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { target: { value } } = event;
    setWalletBalance(Number(value));
  }

  function handleSave() {
    dispatch(updateWallet(
      { currentBalance: newWalletBalance, shouldDeductBalance: checkd },
      handleClose,
    ));
  }

  function handleCheckboxOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
  }

  if (serverError) return null;

  return (
    <>
      <Box className={classes.container}>
        <Box flexDirection="column" padding={1}>
          <Icon component="div" className={classes.walletIcon}>
            <SvgIcon fontSize="large">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="coins"
                className="svg-inline--fa fa-coins"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#fff"
                  d="M512 80C512 98.01 497.7 114.6 473.6 128C444.5 144.1 401.2 155.5 351.3 158.9C347.7 157.2 343.9 155.5 340.1 153.9C300.6 137.4 248.2 128 192 128C183.7 128 175.6 128.2 167.5 128.6L166.4 128C142.3 114.6 128 98.01 128 80C128 35.82 213.1 0 320 0C426 0 512 35.82 512 80V80zM160.7 161.1C170.9 160.4 181.3 160 192 160C254.2 160 309.4 172.3 344.5 191.4C369.3 204.9 384 221.7 384 240C384 243.1 383.3 247.9 381.9 251.7C377.3 264.9 364.1 277 346.9 287.3C346.9 287.3 346.9 287.3 346.9 287.3C346.8 287.3 346.6 287.4 346.5 287.5L346.5 287.5C346.2 287.7 345.9 287.8 345.6 288C310.6 307.4 254.8 320 192 320C132.4 320 79.06 308.7 43.84 290.9C41.97 289.9 40.15 288.1 38.39 288C14.28 274.6 0 258 0 240C0 205.2 53.43 175.5 128 164.6C138.5 163 149.4 161.8 160.7 161.1L160.7 161.1zM391.9 186.6C420.2 182.2 446.1 175.2 468.1 166.1C484.4 159.3 499.5 150.9 512 140.6V176C512 195.3 495.5 213.1 468.2 226.9C453.5 234.3 435.8 240.5 415.8 245.3C415.9 243.6 416 241.8 416 240C416 218.1 405.4 200.1 391.9 186.6V186.6zM384 336C384 354 369.7 370.6 345.6 384C343.8 384.1 342 385.9 340.2 386.9C304.9 404.7 251.6 416 192 416C129.2 416 73.42 403.4 38.39 384C14.28 370.6 .0003 354 .0003 336V300.6C12.45 310.9 27.62 319.3 43.93 326.1C83.44 342.6 135.8 352 192 352C248.2 352 300.6 342.6 340.1 326.1C347.9 322.9 355.4 319.2 362.5 315.2C368.6 311.8 374.3 308 379.7 304C381.2 302.9 382.6 301.7 384 300.6L384 336zM416 278.1C434.1 273.1 452.5 268.6 468.1 262.1C484.4 255.3 499.5 246.9 512 236.6V272C512 282.5 507 293 497.1 302.9C480.8 319.2 452.1 332.6 415.8 341.3C415.9 339.6 416 337.8 416 336V278.1zM192 448C248.2 448 300.6 438.6 340.1 422.1C356.4 415.3 371.5 406.9 384 396.6V432C384 476.2 298 512 192 512C85.96 512 .0003 476.2 .0003 432V396.6C12.45 406.9 27.62 415.3 43.93 422.1C83.44 438.6 135.8 448 192 448z"
                />
              </svg>
            </SvgIcon>
          </Icon>
        </Box>
        <Box display="flex" flexDirection="column" padding={1}>
          <Typography component="span" align="center" className={classes.cashText}>
            Cash Balance
            <Typography color="primary" className={classes.summaryTotalText}>
              <NumberFormat
                value={wallet?.currentBalance as number}
                displayType="text"
                thousandSeparator
                prefix={`${localStorage.getItem('currency') as string} `}
              />
            </Typography>
          </Typography>
        </Box>
        <Box display="flex" padding={1} justifyContent="flex-end" width={120}>
          <CustomTooltip title="View Cash Balance Options" placement="bottom">
            <IconButton aria-label="edit" onClick={toggleShow}>
              <MoreHorizSharp className={classes.icon} />
            </IconButton>
          </CustomTooltip>
          {
            show && (
            <Menu
              id="cash balance menu"
              anchorEl={anchorEl}
              open={show}
              onClose={handleMenuClose}
              className={classes.menu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleOpen}>
                <ListItemIcon>
                  <EditSharp className={classes.icon} />
                </ListItemIcon>
                <ListItemText>Update Cash Balance</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <HistorySharp className={classes.icon} />
                </ListItemIcon>
                <ListItemText>View Cash Balance History</ListItemText>
              </MenuItem>
            </Menu>
            )
          }
        </Box>
      </Box>
      <EditWalletBalanceDialog
        open={open}
        label="Amount"
        dialogTitle="Edit Cash Balance"
        isSaving={isSaving}
        value={newWalletBalance}
        checked={checkd}
        inputType="number"
        handleOnChange={handleOnChange}
        handleSave={handleSave}
        handleClose={handleClose}
        handleCheckboxOnChange={handleCheckboxOnChange}
      />
    </>
  );
}

export default Wallet;
