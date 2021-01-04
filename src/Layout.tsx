import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Grid, Drawer, Paper, List, ListItem, ListItemIcon, Fab,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Account from '@material-ui/icons/AccountCircleSharp';
import AccBalanceWallet from '@material-ui/icons/AccountBalanceWalletSharp';
import ScatterPlot from '@material-ui/icons/ScatterPlotSharp';
import BarChart from '@material-ui/icons/BarChartSharp';
import PieChart from '@material-ui/icons/PieChartSharp';
import Categories from '@material-ui/icons/CategorySharp';
import Add from '@material-ui/icons/Add';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import AppRouter from './router';
import CustomTooltip from './shared/CustomTooltip';
import { isAuthenticated } from './api/auth';
import { RootState } from './redux/reducers/rootReducer';

const useStyles = makeStyles((theme) => createStyles({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
  },
  drawer: {
    width: 140,
    flexShrink: 0,
    zIndex: 10,
  },
  drawerPaper: {
    display: 'flex',
    alignItems: 'center',
    width: 140,
    zIndex: 20,
  },
  drawerList: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50,
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    margin: 20,
    width: 70,
    '&$selected': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
    },
    '&$selected:hover': {
      backgroundColor: 'transparent',
      color: 'white',
    },
    '&:hover': {
      backgroundColor: 'transparent',
      color: 'white',
    },
  },
  selected: {},
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
    color: theme.palette.common.black,
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
  classes: any,
  itemList: Array<any>,
  selected?: string,
  selectionHandler: any
}

type AddButtonProps = {
  classes: any
}

const iconList = [
  { name: 'Categories', to: '/exps-avg-by-category', icon: <Categories fontSize="large" /> },
  { name: 'Expenses', to: '/expenses', icon: <AccBalanceWallet fontSize="large" /> },
  { name: 'ScatterPlot', to: '/scatter-graph-chart', icon: <ScatterPlot fontSize="large" /> },
  { name: 'BarChart', to: '/bar-graph-chart', icon: <BarChart fontSize="large" /> },
  { name: 'PieChart', to: '/pie-graph-chart', icon: <PieChart fontSize="large" /> },
];

function RenderList({
  itemList, classes, selected, selectionHandler,
}: RenderListProps) {
  return (
    <List id="drawer-icon-list" className={classes.drawerList}>
      {
        isAuthenticated() && (
          <CustomTooltip
            title="Profile / signout"
            placement="right"
          >
            <Link to="/profile" className={classes.link}>
              <ListItem
                classes={{
                  root: classes.root,
                  selected: classes.selected,
                }}
                button
                selected={selected === 'Profile' }
                onClick={() => selectionHandler('Profile')}
              >
                <ListItemIcon style={{ color: selected === 'Profile' ? 'orange' : 'white' }}>
                  <Account fontSize="large" />
                </ListItemIcon>
              </ListItem>
            </Link>
          </CustomTooltip>
        )
      }
      {
        itemList && itemList.map(({ name, to, icon }) => (
          <CustomTooltip
            key={name}
            title={name}
            placement="right"
          >
            <Link key={name} to={to} className={classes.link}>
              <ListItem
                classes={{
                  root: classes.root,
                  selected: classes.selected,
                }}
                button
                key={name}
                selected={selected === name}
                onClick={() => selectionHandler(name)}
              >
                <ListItemIcon style={{ color: selected === name ? 'orange' : 'white' }}>
                  {icon}
                </ListItemIcon>
              </ListItem>
            </Link>
          </CustomTooltip>
        ))
      }
    </List>
  );
}

function AddButton({ classes }: AddButtonProps) {
  return (
    <div className={classes.addButtonContainer}>
      <CustomTooltip title="New Expense" placement="right">
        <Link to="/new-expense">
          <Fab aria-label="add new expense" className={classes.addButton}>
            <Add fontSize="large" />
          </Fab>
        </Link>
      </CustomTooltip>
    </div>
  );
}

function Layout() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string>('Expenses');
  const { signupSuccessful } = useSelector((state: RootState) => state.signup);
  const { signinSuccessful } = useSelector((state: RootState) => state.signin);

  React.useEffect(() => {}, [signupSuccessful, signinSuccessful]);

  return (
    <Router>
      <Grid container>
        <CssBaseline />
        {
          isAuthenticated() && (
            <Grid item xs={1}>
              <Drawer
                id="persistent-drawer"
                variant="permanent"
                className={classes.drawer}
                classes={{ paper: classes.drawerPaper }}
              >
                <RenderList
                  itemList={iconList}
                  selected={selected}
                  classes={classes}
                  selectionHandler={setSelected}
                />
                {
                isAuthenticated && (
                  <AddButton classes={classes} />
                )
              }
              </Drawer>
            </Grid>
          )
        }
        <Grid item xs={isAuthenticated() ? 11 : 12}>
          <Paper className={classes.paper}>
            <AppRouter />
          </Paper>
        </Grid>
      </Grid>
    </Router>
  );
}

export default Layout;
