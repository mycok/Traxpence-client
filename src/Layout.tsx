import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Grid, Drawer, Paper, List, ListItem, ListItemIcon, MenuItem, Grow, Popper, ClickAwayListener } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Account from "@material-ui/icons/AccountCircleSharp";
import Date from "@material-ui/icons/DateRangeSharp";
import AccBalance from "@material-ui/icons/AccountBalanceSharp";
import AccBalanceWallet from "@material-ui/icons/AccountBalanceWalletSharp";
import Assessment from "@material-ui/icons/Assessment";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import AppRouter from './router';

type MainProps = {
    classes: any,
    anchorEl: any,
    itemList: Array<any>,
    handleClick(event: React.MouseEvent<HTMLElement, MouseEvent>): void | undefined,
    handleClose: any
}

// type RouteProps = {
//     location: {},
//     match: {},
//     history: {}
// }

const useStyles = makeStyles((theme) =>
    createStyles({
        paper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%"
        },
        drawer: {
            width: 140,
            flexShrink: 0,
            zIndex: 10
        },
        drawerPaper: {
            display: "flex",
            alignItems: "center",
            width: 140,
            zIndex: 20
        },
        drawerList: {
            marginTop: 50
        },
        listItem: {
            margin: 20,
            width: 70
        },
        menu: {
            zIndex: 30,
            margin: 10,
            backgroundColor: theme.palette.primary.main
        }
    })
);

const iconList = [
    { name: "Account", icon: <Account fontSize="large" /> },
    { name: "Date", icon: <Date fontSize="large" /> },
    { name: "Bank Balance", icon: <AccBalance fontSize="large" /> },
    { name: "Wallet Balance", icon: <AccBalanceWallet fontSize="large" /> },
    { name: "Assessment", icon: <Assessment fontSize="large" /> }
]

function Layout() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Router>
            <Grid container>
                <CssBaseline />
                <Grid item xs={1}>
                    <Drawer variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
                        <RenderList itemList={iconList} classes={classes} handleClick={handleClick} />
                        <UserMenu classes={classes} anchorEl={anchorEl} handleClose={handleClose} />
                    </Drawer>
                </Grid>
                <Grid item xs={11}>
                    <Paper className={classes.paper}>
                        <AppRouter />
                    </Paper>
                </Grid>
            </Grid>
        </Router>
    );
}

function RenderList({ itemList, classes, handleClick }: Partial<MainProps>) {
    return (
        <List className={classes.drawerList}>
            {
                itemList && itemList.map((icon) => {
                    return (
                        <ListItem
                            className={classes.listItem}
                            button
                            key={icon.name}
                            // selected={icon.name === 'Account'}
                            onClick={icon.name === "Account" ? handleClick : undefined}
                        >
                            <ListItemIcon>
                                {icon.icon}
                            </ListItemIcon>
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

function UserMenu({ classes, anchorEl, handleClose }: Partial<MainProps>) {
    return (
        <Popper
            className={classes.menu}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            placement="right"
            role={undefined}
            transition
        >
            {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuItem selected onClick={handleClose}>
                            Sign Out
              </MenuItem>
                    </ClickAwayListener>
                </Grow>
            )}
        </Popper>
    )
}

export default Layout; 