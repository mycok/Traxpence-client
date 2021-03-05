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
} from '@material-ui/core';
import { EditSharp, CloseRounded } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { IUser } from '../user';
import CurrentExpenseSummary from '../expenses/summaries/CurrentExpenseSummary';
import CustomTooltip from '../../shared/CustomTooltip';
import { useAppDispatch, RootState } from '../../redux/store';
import { signout } from '../../api/auth';
import { signOut } from '../../redux/actions/auth';
import { fetchCurrentMonthExpenditurePreview } from '../../redux/reducers/expenses/currentMonthPreview';

const useStyles = makeStyles(() => createStyles({
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
    margin: 10,
    width: 400,
  },
  expenseTotals: {
    marginLeft: 10,
    fontWeight: 800,
  },
  signoutButton: {
    width: 180,
    margin: 10,
  },
}));

type ProfileCardProps = {
  user: Partial<IUser>,
  classes: any,
  currency: string | null,
  expensePreview: any,
  handleSignout(): void,
  handleCurrencyChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void,
};
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

function Profile() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [currency, setCurrency] = useState<string | null>(
    localStorage.getItem('currency'),
  );
  const [userData] = useState(
    JSON.parse(localStorage.getItem('authData') as string),
  );

  const { data } = useSelector((state: RootState) => state.currentMonthExpPreview);

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
    <div className={classes.container}>
      <ProfileCard
        classes={classes}
        user={userData.user}
        currency={currency}
        expensePreview={data}
        handleCurrencyChange={handleCurrencyChange}
        handleSignout={handleSignout}
      />
    </div>
  );
}

function ProfileCard({
  classes,
  user,
  currency,
  expensePreview,
  handleCurrencyChange,
  handleSignout,
}: ProfileCardProps) {
  return (
    <Card className={classes.root} elevation={5}>
      <CardHeader
        avatar={<Avatar src={user?.avatar ?? ''} />}
        action={(
          <>
            <CustomTooltip title="Edit" placement="bottom">
              <IconButton aria-label="edit" className={classes.editButton}>
                <EditSharp />
              </IconButton>
            </CustomTooltip>

            <Link to="/expenses">
              <IconButton aria-label="close" className={classes.editButton}>
                <CloseRounded />
              </IconButton>
            </Link>
          </>
        )}
        title={(
          <div className={classes.titleContainer}>
            <Typography variant="h6">{user?.username}</Typography>
          </div>
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
      <>
        <Typography>Select Currency</Typography>
        <TextField
          id="category"
          variant="standard"
          className={classes.textField}
          value={currency ?? ''}
          select
          onChange={handleCurrencyChange}
        >
          {currencies.map((curr) => (
            <MenuItem key={curr?.label} value={curr?.label}>
              {curr?.label}
            </MenuItem>
          ))}
        </TextField>
      </>
    </CardContent>
  );
}

export default Profile;
