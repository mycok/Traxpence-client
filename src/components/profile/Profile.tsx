import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardHeader, CardContent, Avatar, Typography, IconButton, TextField, MenuItem, Button,
} from '@material-ui/core';
import { EditSharp, CloseRounded } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { IUser } from '../user';
import CurrentExpenseSummary from '../expenses/summaries/CurrentExpenseSummary';
import CustomTooltip from '../../shared/CustomTooltip';
import { isAuthenticated } from '../../api/auth';

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

type ProfileComponentProps = {
    user: Partial<IUser>,
    classes: any,
    currency: string | null,
    setShowUserIcon: any,
    handleSignout(): void,
    handleCurrencyChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
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
    value: 'SHS',
    label: 'shs',
  },
];

function Profile({ setShowUserIcon }: Partial<ProfileComponentProps>) {
  const classes = useStyles();

  const [currency, setCurrency] = React.useState<string | null>(localStorage.getItem('currency'));
  const [userData] = React.useState(JSON.parse(localStorage.getItem('authData') as string));

  function handleCurrencyChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrency(event.target.value);
    localStorage.setItem('currency', event.target.value);
  }

  function handleSignout() {
    localStorage.removeItem('authData');
    setShowUserIcon(isAuthenticated);
  }

  React.useEffect(() => {
    if (!currency) {
      setCurrency(currencies[0].label);
      localStorage.setItem('currency', currencies[0].label);
    }
  }, [currency]);

  return (
    <div className={classes.container}>
      <ProfileCard
        classes={classes}
        user={userData.user}
        currency={currency}
        handleCurrencyChange={handleCurrencyChange}
        handleSignout={handleSignout}
      />
    </div>
  );
}

function ProfileCard({
  classes, user, currency, handleCurrencyChange, handleSignout,
}: Partial<ProfileComponentProps>) {
  return (
    <Card className={classes.root} elevation={5}>
      <CardHeader
        avatar={
          <Avatar src="" />
                }
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
            <Typography variant="h6">
              {user?.username}
            </Typography>
          </div>
                  )}
        subheader={
          <Typography color="primary">{user?.email}</Typography>
                }
      />
      <CardContent className={classes.cardContent}>
        <CurrentExpenseSummary />
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
          to="/"
          onClick={handleSignout}
        >
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}

function SettingsCard({ classes, currency, handleCurrencyChange }: Partial<ProfileComponentProps>) {
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
          {
                        currencies.map((curr) => (
                          <MenuItem
                            key={curr?.label}
                            value={curr?.label}
                          >
                            {curr?.label}
                          </MenuItem>
                        ))
                    }
        </TextField>
      </>
    </CardContent>
  );
}

export default Profile;
