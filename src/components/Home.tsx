import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import { ReactComponent as Wallet } from "../images/wallet.svg";
import Signin from './auth/Signin';
import Signup from './user/Signup';

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        innerContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // border: "1px solid teal"
        },
        orContainer: {
            margin: 25
        },
        divider: {
            height: 500
        },
        child: {
            margin: 20
        },
        button: {
            width: 180,
            margin: 10
        },
        headerText: {
            fontFamily: "Raleway",
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: 0.6
        },
        text: {
            fontFamily: "Raleway",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 0.6,
            color: grey[300],
            fontStyle: "italic"
        }
    })
);

function Home() {
    const classes = useStyles();
    const [isSignin, setSignin] = React.useState(true);

    return (
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                <div className={classes.child}>
                    <Typography className={classes.headerText} variant="subtitle2" align="center">
                        Traxpense
                </Typography>
                </div>
                <div>
                    <Wallet />
                </div>
                <div className={classes.child}>
                    <Typography className={classes.text} variant="caption" align="center">
                        Expenditure tracking at your finger tips
                    </Typography>
                </div>
            </div>
            <Divider orientation="vertical" variant="middle" className={classes.divider} />
            <div className={classes.innerContainer}>
                <div>
                    {
                        isSignin ? (
                            <Signin />
                        ) : (
                            <Signup />
                        )
                    }
                </div>
                <div className={classes.orContainer}>
                    <Typography>OR</Typography>
                </div>
                <Button
                    className={classes.button}
                    variant="outlined"
                    color="secondary"
                    onClick={() => setSignin(!isSignin)}
                >
                    {isSignin ? "Sign Up" : "Sign In"}
                </Button>
            </div>
        </div>
    )
}


export default Home;
