import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography, Button } from '@material-ui/core';
import { ReactComponent as Wallet } from "../images/wallet.svg";

const useStyles = makeStyles(() =>
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
            width: 300
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
            <div>
                <Typography variant="h6" align="center">
                    Thank you choosing Traxpense for all your expense tracking needs
                </Typography>
            </div>
            <div className={classes.child}>
                <Button
                    className={classes.mainButton}
                    variant="contained"
                    fullWidth
                    color="secondary"
                >
                    Create Account
                </Button>
            </div>
        </div>
    )
}


export default Home;
