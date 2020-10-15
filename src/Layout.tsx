import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { Grid, Drawer, Paper, List, ListItem, ListItemIcon, Fab } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Account from "@material-ui/icons/AccountCircleSharp";
import AccBalanceWallet from "@material-ui/icons/AccountBalanceWalletSharp";
import ScatterPlot from "@material-ui/icons/ScatterPlotSharp";
import BarChart from "@material-ui/icons/BarChartSharp";
import Categories from "@material-ui/icons/CategorySharp";
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
        },
        link: {
            textDecoration: "none"
        }
    })
);

type LayoutProps = {
    classes: any,
    itemList: Array<any>,
    selected?: string,
    selectionHandler: any
}

const iconList = [
    { name: "Account", to: "/profile", icon: <Account fontSize="large" /> },
    { name: "Categories", to: "/exps-avg-by-category", icon: <Categories fontSize="large" /> },
    { name: "Wallet Balance", to: "/expenses", icon: <AccBalanceWallet fontSize="large" /> },
    { name: "ScatterPlot", to: "/scatter-graph-chart", icon: <ScatterPlot fontSize="large" /> },
    { name: "BarChart", to: "/bar-graph-chart", icon: <BarChart fontSize="large" /> }
]

function Layout() {
    const classes = useStyles();
    const [selected, setSelected] = React.useState<string>("");

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
                            selectionHandler={setSelected}
                        />
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

function RenderList({ itemList, classes, selected, selectionHandler }: Partial<LayoutProps>) {
    return (
        <List className={classes.drawerList}>
            {
                itemList && itemList.map((icon) => {
                    return (
                        <Link key={icon.name} to={icon.to}>
                            <ListItem
                                className={classes.listItem}
                                button
                                key={icon.name}
                                selected={selected === icon.name}
                                onClick={() => selectionHandler(icon.name)}
                            >
                                <ListItemIcon>
                                    {icon.icon}
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                    )
                })
            }
        </List>
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