import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { ReactComponent as Wallet } from "../../images/wallet.svg";

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
        text: {
            fontFamily: "Raleway",
            fontSize: 25,
            fontWeight: 900,
            letterSpacing: 0.6
        }
    })
);

function NoExpenses() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div>
                <Wallet />
            </div>
            <div className={classes.child}>
                <Typography className={classes.text} variant="h5" align="center">
                    You currently have no expenses recorded!
                </Typography>
                <Typography className={classes.text} variant="h5" align="center">
                    Use the {" "}
                    <Typography className={classes.text} variant="h5" align="center" color="secondary" component="span">
                    + / add {" "}
                    </Typography>
                    button to record an expense
                </Typography>
            </div>
        </div>
    )
}


export default NoExpenses;
