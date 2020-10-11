import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { ReactComponent as Wallet } from "../images/wallet.svg";

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
        },
        child: {
            margin: 20
        },
        mainButton: {
            width: 500,
            fontSize: 18,
            textTransform: "capitalize"
        },
        text: {
            fontFamily: "Raleway",
            fontSize: 40,
            fontWeight: 900,
            letterSpacing: 0.6,
            textTransform: "capitalize"
        }
    })
);

function Home() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div>
                <Wallet />
            </div>
            <div className={classes.child}>
                <Typography className={classes.text} variant="subtitle2" align="center">
                    Thank you choosing Traxpense
                </Typography>
            </div>
            <div className={classes.child}>
                <Button
                    className={classes.mainButton}
                    variant="contained"
                    fullWidth
                    color="secondary"
                    component={Link}
                    to="/signin"
                >
                    Sign In
                </Button>
            </div>
            <div>
                <Typography>OR</Typography>
            </div>
            <div>
            <Button
                    className={classes.mainButton}
                    variant="text"
                    fullWidth
                    color="secondary"
                    component={Link}
                    to="/signup"
                >
                    Sign Up
                </Button> 
            </div>
        </div>
    )
}


export default Home;
