import React from 'react';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Fab,
  Badge,
  Box,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from '@material-ui/icons/DashboardSharp';
import AccBalanceWallet from '@material-ui/icons/AccountBalanceWalletSharp';
import BarChart from '@material-ui/icons/BarChartSharp';
import Categories from '@material-ui/icons/CategorySharp';
import Add from '@material-ui/icons/Add';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import AppRouter from './router';
import CustomTooltip from './shared/CustomTooltip';
import { isAuthenticated } from './api/auth';
import { RootState } from './redux/store';
import { IExpense } from './components/expenses/IExpense';
import Wallet from './components/wallet';

const useStyles = makeStyles((theme) => createStyles({
  layoutContainer: {
    backgroundColor: 'rgb(94,57,89)',
    width: '100%',
    height: '100vh',
  },
  mainContentContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '90vh',
  },
  appBar: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 20,
    height: 80,
  },
  drawer: {
    flexShrink: 0,
    zIndex: 10,
  },
  drawerPaper: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 20,
  },
  drawerList: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    marginTop: 40,
  },
  menu: {
    zIndex: 30,
    margin: 10,
    backgroundColor: theme.palette.primary.main,
  },
  addButtonContainer: {
    position: 'absolute',
    margin: 0,
    bottom: 30,
  },
  addButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  link: {
    textDecoration: 'none',
  },
}));

type RenderListProps = {
  classes: any;
  itemList: IconListProps[];
  selected: string;
  expenses: IExpense[];
  selectionHandler: React.Dispatch<React.SetStateAction<string>>;
};

type AddButtonProps = {
  classes: any;
};

type IconListProps = {
  name: string
  to: string
  icon: any
}

type AppBarProps = {
  classes: any
}

const iconList: IconListProps[] = [
  {
    name: 'Expenses',
    to: '/expenses',
    icon: (expenses: IExpense[], selected: string) => (
      <Badge
        color="secondary"
        badgeContent={expenses.length}
        invisible={expenses.length === 0 || selected !== 'Expenses'}
        max={999}
      >
        <AccBalanceWallet
          fontSize="large"
          htmlColor={selected === 'Expenses' ? '#0da86c' : '#fff'}
        />
      </Badge>
    ),
  },
  {
    name: 'Categories',
    to: '/current-month-avg-and-total-exp-by-category',
    icon: (selected: string) => (
      <Categories
        fontSize="large"
        htmlColor={selected === 'Categories' ? '#0da86c' : '#fff'}
      />
    ),
  },
  {
    name: 'Charts',
    to: '/charts',
    icon: (selected: string) => (
      <BarChart
        fontSize="large"
        htmlColor={selected === 'Charts' ? '#0da86c' : '#fff'}
      />
    ),
  },
];

function RenderList({
  itemList,
  classes,
  selected,
  expenses,
  selectionHandler,
}: RenderListProps) {
  return (
    <List id="drawer-icon-list" className={classes.drawerList}>
      {isAuthenticated() && (
        <CustomTooltip title="User Dashboard" placement="right">
          <Link to="/profile" className={classes.link}>
            <ListItem
              classes={{
                root: classes.listItem,
              }}
              button
              selected={selected === 'Profile'}
              onClick={() => selectionHandler('Profile')}
            >
              <ListItemIcon>
                <Dashboard fontSize="large" htmlColor={selected === 'Profile' ? '#0da86c' : '#fff'} />
              </ListItemIcon>
            </ListItem>
          </Link>
        </CustomTooltip>
      )}
      {itemList
        && itemList.map(({ name, to, icon }) => (
          <CustomTooltip key={name} title={name} placement="right">
            <Link key={name} to={to} className={classes.link}>
              <ListItem
                classes={{
                  root: classes.listItem,
                  selected: classes.selected,
                }}
                button
                key={name}
                selected={selected === name}
                onClick={() => selectionHandler(name)}
              >
                <ListItemIcon>
                  {name === 'Expenses' ? icon(expenses, selected) : icon(selected)}
                </ListItemIcon>
              </ListItem>
            </Link>
          </CustomTooltip>
        ))}
    </List>
  );
}

function AddButton({ classes }: AddButtonProps) {
  return (
    <Box className={classes.addButtonContainer}>
      <CustomTooltip title="New Expense" placement="right">
        <Link to="/new-expense">
          <Fab aria-label="add new expense" className={classes.addButton}>
            <Add fontSize="large" />
          </Fab>
        </Link>
      </CustomTooltip>
    </Box>
  );
}

function AppBar({ classes }: AppBarProps) {
  const location = useLocation();

  return isAuthenticated() && (location.pathname !== '/profile') && (
    <Box className={classes.appBar}><Wallet /></Box>
  );
}

function Layout() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string>('Profile');
  const { signupSuccessful } = useSelector((state: RootState) => state.signup);
  const { signinSuccessful } = useSelector((state: RootState) => state.signin);
  const { didSignout } = useSelector((state: RootState) => state.signout);
  const { authError, expenses } = useSelector(
    (state: RootState) => state.fetchOrDeleteExpenses,
  );

  React.useEffect(() => {}, [
    signupSuccessful,
    signinSuccessful,
    didSignout,
    authError,
  ]);

  return (
    <Router>
      <Grid container className={classes.layoutContainer}>
        <CssBaseline />
        {isAuthenticated() && (
          <Grid item xs={1}>
            <Drawer
              id="persistent-drawer"
              variant="permanent"
              className={classes.drawer}
              classes={{ paper: classes.drawerPaper }}
            >
              <RenderList
                expenses={expenses}
                itemList={iconList}
                selected={selected}
                classes={classes}
                selectionHandler={setSelected}
              />
              <AddButton classes={classes} />
            </Drawer>
          </Grid>
        )}
        <Grid item xs={isAuthenticated() ? 11 : 12}>
          <AppBar classes={classes} />
          <Box className={classes.mainContentContainer}>
            <AppRouter
              selectionHandler={setSelected}
            />
          </Box>
        </Grid>
      </Grid>
    </Router>
  );
}

export default Layout;
