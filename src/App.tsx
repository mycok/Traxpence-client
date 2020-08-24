import React from 'react';
import { Grid, Drawer, Paper, List, ListItem, ListItemIcon } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Account from '@material-ui/icons/AccountCircleSharp';
import Date from '@material-ui/icons/DateRangeSharp';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      height: "100%",
      backgroundColor: "teal"
    }, 
    drawerList: {
      marginTop: 30
    }
  })
);

function App() {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <Drawer variant="permanent">
        <List className={classes.drawerList}>
          <ListItem button key="icon-1">
            <ListItemIcon>
              <Account />
            </ListItemIcon>
          </ListItem>
          <ListItem button key="icon-2">
            <ListItemIcon>
              <Date color="secondary" />
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
      <Paper className={classes.paper}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} justify="center" >
            <div>Content Area</div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default App;
