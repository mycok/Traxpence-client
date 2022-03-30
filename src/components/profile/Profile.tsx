/* eslint-disable no-unused-vars */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  Button,
  Box,
} from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { IUser } from '../user';
import CurrentExpenseSummary from '../expenses/summaries/CurrentExpenseSummary';

import { useAppDispatch, RootState } from '../../redux/store';
import { signout } from '../../api/auth';
import { signOut } from '../../redux/actions/auth';
import { fetchCurrentMonthExpenditurePreview, ExpensePreview } from '../../redux/reducers/expenses/currentMonthPreview';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    margin: 5,
    width: 700,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    marginTop: 12,
    color: theme.palette.common.white,
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textField: {
    '& .MuiInput-root': {
      color: theme.palette.common.white,
      width: 100,
      '& .MuiSelect-icon': {
        color: theme.palette.common.white,
      },
    },
    margin: 10,
    width: 400,
  },
  title: {
    color: theme.palette.common.white,
  },
  listItem: {
    color: theme.palette.common.white,
  },
  expenseTotals: {
    marginLeft: 10,
    fontWeight: 800,
  },
  selectCurrencyContainer: {
    display: 'flex',
    padding: 1,
    alignItems: 'center',
  },
  selectCurrency: {
    marginLeft: 10,
    width: 120,
  },
  signoutButton: {
    width: 180,
    margin: 10,
  },
}));

type ProfileCardProps = {
  user: Partial<IUser>
  classes: any
  currency: string | null
  expensePreview: ExpensePreview,
  selectionHandler: React.Dispatch<React.SetStateAction<string>>
  handleSignout(): void
  handleCurrencyChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void,
}
// TODO: consider using a currency component library
const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
  {
    value: 'UGX',
    label: 'UGX',
  },
];

function Profile({ selectionHandler }: Pick<ProfileCardProps, 'selectionHandler'>) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [currency, setCurrency] = useState<string | null>(
    localStorage.getItem('currency'),
  );
  const [userData] = useState(
    JSON.parse(localStorage.getItem('authData') as string),
  );

  const {
    currentMonthExpenditurePreview,
  } = useSelector((state: RootState) => state.currentMonthExpPreview);

  useEffect(() => {
    selectionHandler('Profile');
  }, [selectionHandler]);

  useEffect(() => {
    dispatch(fetchCurrentMonthExpenditurePreview());
  }, [dispatch]);

  useEffect(() => {
    if (!currency) {
      setCurrency(currencies[0].label);
      localStorage.setItem('currency', currencies[0].label);
    }
  }, [currency]);

  function handleCurrencyChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrency(event.target.value);
    localStorage.setItem('currency', event.target.value);
  }

  function handleSignout() {
    signout(() => dispatch(signOut(true)));
  }

  return (
    <>
      <Box className={classes.container}>
        <ProfileCard
          classes={classes}
          user={userData.user}
          currency={currency}
          expensePreview={currentMonthExpenditurePreview}
          handleCurrencyChange={handleCurrencyChange}
          handleSignout={handleSignout}
        />
      </Box>
    </>
  );
}

function ProfileCard({
  classes,
  user,
  currency,
  expensePreview,
  handleCurrencyChange,
  handleSignout,
}: Omit<ProfileCardProps, 'selectionHandler'>) {
  return (
    <Card className={classes.root} elevation={5}>
      <CardHeader
        avatar={<Avatar src={user?.avatar ?? ''} />}
        action={(
          <Link to="/expenses">
            <IconButton aria-label="close" className={classes.editButton}>
              <CloseRounded />
            </IconButton>
          </Link>
        )}
        title={(
          <Box className={classes.titleContainer}>
            <Typography variant="h6" className={classes.title}>{user?.username}</Typography>
          </Box>
        )}
        subheader={<Typography color="primary">{user?.email}</Typography>}
      />
      <CardContent className={classes.cardContent}>
        <CurrentExpenseSummary
          currency={currency}
          expensePreview={expensePreview}
        />
      </CardContent>
      <SettingsCard
        classes={classes}
        currency={currency}
        handleCurrencyChange={handleCurrencyChange}
      />
      <CardContent className={classes.cardContent}>
        <Button
          className={classes.signoutButton}
          variant="outlined"
          color="secondary"
          component={Link}
          to="/signin"
          onClick={handleSignout}
        >
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}

function SettingsCard({
  classes,
  currency,
  handleCurrencyChange,
}: Partial<ProfileCardProps>) {
  return (
    <CardContent className={classes.cardContent}>
      <Box className={classes.selectCurrencyContainer}>
        <Typography className={classes.title}>Select Currency</Typography>
        <Box className={classes.selectCurrency}>
          <TextField
            id="category"
            variant="standard"
            className={classes.textField}
            value={currency ?? ''}
            select
            onChange={handleCurrencyChange}
          >
            {currencies.map((curr) => (
              <MenuItem key={curr?.label} value={curr?.label} className={classes.listItem}>
                {curr?.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
    </CardContent>
  );
}

export default Profile;
