import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { Grid, Drawer, Paper, List, ListItem, ListItemIcon, MenuItem, Grow, Popper, ClickAwayListener, Fab } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Account from "@material-ui/icons/AccountCircleSharp";
import Date from "@material-ui/icons/DateRangeSharp";
import AccBalance from "@material-ui/icons/AccountBalanceSharp";
import AccBalanceWallet from "@material-ui/icons/AccountBalanceWalletSharp";
import ScatterPlot from "@material-ui/icons/ScatterPlotSharp";
import Add from "@material-ui/icons/Add";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import AppRouter from './router';

const useStyles = makeStyles((theme) =>
    createStyles({
        paper: {
            display: "flex",
            justifyContent: "center",
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
            marginTop: 50,
            backgroundColor: theme.palette.background.paper,
        },
        listItem: {
            margin: 20,
            width: 70,
        },
        menu: {
            zIndex: 30,
            margin: 10,
            backgroundColor: theme.palette.primary.main
        },
        addButtonContainer: {
            position: "absolute",
            margin: 0,
            bottom: 30
        },
        addButton: {
            color: theme.palette.common.black,
            backgroundColor: theme.palette.secondary.main,
            '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
            },
        }
    })
);

type LayoutProps = {
    classes: any,
    anchorEl: any,
    itemList: Array<any>,
    selected?: string,
    handleClick(event: React.MouseEvent<HTMLElement, MouseEvent>): void | undefined,
    handleClose: any
    selectionHandler: any
}

const iconList = [
    { name: "Account", icon: <Account fontSize="large" /> },
    { name: "Date", icon: <Date fontSize="large" /> },
    { name: "Bank Balance", icon: <AccBalance fontSize="large" /> },
    { name: "Wallet Balance", icon: <AccBalanceWallet fontSize="large" /> },
    { name: "ScatterPlot", icon: <ScatterPlot fontSize="large" /> }
]

function Layout() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selected, setSelected] = React.useState<string>("");

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
                    <Drawer
                        variant="permanent"
                        className={classes.drawer}
                        classes={{ paper: classes.drawerPaper }}>
                        <RenderList
                            itemList={iconList}
                            selected={selected}
                            classes={classes}
                            handleClick={handleClick}
                            selectionHandler={setSelected}
                        />
                        <UserMenu
                            classes={classes}
                            anchorEl={anchorEl}
                            handleClose={handleClose} />
                        <AddButton classes={classes} />
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

function RenderList({ itemList, classes, selected, handleClick, selectionHandler }: Partial<LayoutProps>) {
    return (
        <List className={classes.drawerList}>
            {
                itemList && itemList.map((icon) => {
                    return (
                        <ListItem
                            className={classes.listItem}
                            button
                            key={icon.name}
                            selected={selected === icon.name}
                            autoFocus={icon.name === "Account"}
                            onClick={icon.name === "Account" ? handleClick : () => selectionHandler(icon.name)}
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

function UserMenu({ classes, anchorEl, handleClose }: Partial<LayoutProps>) {
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

function AddButton({ classes }: { classes: any }) {
    return (
        <div className={classes.addButtonContainer}>
            <Link to="/new-expense">
                <Fab aria-label="add new expense" className={classes.addButton}>
                    <Add fontSize="large" />
                </Fab>
            </Link>
        </div>
    )
}

export default Layout; 